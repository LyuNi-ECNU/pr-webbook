---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# 常见的连续随机变量





## 伽马分布

伽马函数
: 称

$$
\Gamma (\alpha )=\int_{0}^{+\infty } x^{\alpha -1} e^{-x} dx,\alpha >0
$$

为伽马函数。

根据伽马函数的定义，可以证明伽马函数的一些常用性质。

````{prf:property}
1. $\Gamma (1 )=1, \quad \Gamma (\frac{1}{2} )=\sqrt{\pi }$ ；
2. $\Gamma (\alpha +1 )=\alpha \Gamma(\alpha ), \quad \text{特别地，}\Gamma (n+1 )=n\Gamma(n)=n!$ 。

```{dropdown} Proof
1. 令 $x=u^{2}$ ，于是：

::: {math}
\begin{align*}
\Gamma \left(\frac{1}{2} \right) &= \int_{0}^{+\infty} x^{-\frac{1}{2}} e^{-x} dx \\
&= \int_{0}^{+\infty} u^{-1} e^{-u^{2}} d(u^{2}) \\
&= 2\int_{0}^{+\infty} e^{-u^{2}} du \\
&= \int_{-\infty}^{+\infty} e^{-u^{2}} du \\
&= \int_{-\infty}^{+\infty} \frac{1}{\sqrt{2\pi \cdot \frac{1}{2}}} e^{-\frac{u^{2}}{2(\frac{1}{2})}} du \cdot \sqrt{\pi} \\
&= \sqrt{\pi}.
\end{align*}
:::

2. 这里只需要证明 $\Gamma (\alpha +1 )=\alpha \Gamma(\alpha )$ ，即：

::: {math}
\begin{aligned}
\Gamma (\alpha +1)
&= \int_{0}^{+\infty} x^{\alpha } e^{-x} dx\\
&= \int_{0}^{+\infty} \left ( -x^{\alpha } \right ) d\left ( e^{-x} \right ) \\
&= -x^{\alpha }e^{-x}|_{0}^{+\infty } +\int_{0}^{+\infty} e^{-x} d\left ( x^{\alpha } \right ) \\
&= \int_{0}^{+\infty} \alpha x^{\alpha-1 }e^{-x} dx\\
&= \alpha \Gamma(\alpha ).
\end{aligned}
:::

```
````

基于伽马函数，我们来定义伽马分布。

伽马分布
: 假设 $X$ 为一随机变量，其密度函数为：

$$
p(x)=\left\{\begin{matrix} \frac{\lambda ^{\alpha } }{\Gamma (\alpha )}x^{\alpha -1}e^{-\lambda x} & ,x\ge 0\\ 
0&,x<0\end{matrix}\right.
$$

则称其分布为伽马分布，记作 $X\sim Ga(\alpha,\lambda)$ ，其中 $\alpha>0$ 为形状参数， $\lambda>0$ 为尺度参数。

```{prf:remark}
当 $\alpha = 1$ 时， $Ga(1,\lambda)=Exp(\lambda)$ 。
```

```{code-block} python3
:class: thebe
import numpy as np
import matplotlib.pyplot as plt
from scipy.special import gamma as gamma_func


def prompt_positive_float(message: str) -> float:
    while True:
        try:
            value = float(input(message))
        except ValueError:
            print("请输入有效的小数。")
            continue
        if value <= 0:
            print("参数必须大于 0。")
            continue
        return value


def read_parameters():
    print("Gamma Distribution Visualizer")
    alpha = prompt_positive_float("请输入形状参数 α（>0，例如 2）: ")
    lambd = prompt_positive_float("请输入尺度参数 λ（>0，例如 1）: ")
    return alpha, lambd


def plot_gamma_distribution(alpha: float, lambd: float) -> None:
    mean = alpha / lambd
    std = np.sqrt(alpha) / lambd
    x_max = max(5.0, mean + 5 * std)
    x = np.linspace(0, x_max, 1000)
    pdf = (lambd ** alpha * x ** (alpha - 1) * np.exp(-lambd * x)) / gamma_func(alpha)
    pdf[x < 0] = 0

    plt.figure(figsize=(10, 6))
    plt.plot(x, pdf, color="skyblue", linewidth=2)
    plt.xlabel("Random variable X")
    plt.ylabel("Density f(X)")
    plt.title(f"Gamma Distribution: α={alpha}, λ={lambd}")
    plt.grid(True, alpha=0.3)
    plt.xlim(0, x_max)
    plt.ylim(0, max(0.1, pdf.max() * 1.2))
    plt.tight_layout()
    plt.show()


def main():
    alpha, lambd = read_parameters()
    plot_gamma_distribution(alpha, lambd)


if __name__ == "__main__":
    main()

```

以下例子讲解了泊松分布与伽马分布之间的关系，和之前讲解过的关于泊松分布与指数分布之间的关系的证明过程类似，供学生课后自学。

````{prf:example}
若在 $(0,t)$ 内发生冲击的次数 $N(t)$ 服从参数为 $\lambda t$ 的泊松分布，试证明第 $n$ 次冲击来到的时间 $S_{n}$ 服从伽马分布 $Ga(n,\lambda)$ 。

```{dropdown} Proof
因为事件：

"第 $n$ 次冲击来到的时间 $S_{n}$ 小于等于 $t$ "

等价于事件：

"在 $(0,t)$ 内发生冲击的次数 $N(t)$ 大于等于 $n$ "，即：

$$
\left \{ S_{n} \le t \right \} =\left \{ N(t)\ge n \right \}
$$

于是， $S_{n}$ 的分布函数为：

$$
F(t)=P(S_{n}\le t )=P(N(t)\ge n)=\sum_{k=n}^{+\infty } \frac{(\lambda t)^{k} }{k!} e^{-\lambda t}
$$

令 $a_{k} = \frac{(\lambda t)^{k} }{k!} e^{-\lambda t}$ , $b_{k} = \frac{\lambda ^{k} }{\Gamma (k)}\int_{t}^{+\infty }x^{k-1}e^{-\lambda x}dx$ ，由于：

::: {math}
\begin{aligned}
b_{k}
&=\frac{\lambda ^{k} }{\Gamma (k)}\int_{t}^{+\infty }x^{k-1}e^{-\lambda x}dx \\
&=\frac{\lambda ^{k} }{(k-1)!}\int_{t}^{+\infty }-\frac{1}{\lambda } x^{k-1}d e^{-\lambda x} \\
&=\frac{\lambda ^{k} }{(k-1)!}\left(-\frac{1}{\lambda } x^{k-1}e^{-\lambda x} \Big|_{t}^{+\infty } +\frac{k-1}{\lambda }\int_{t}^{+\infty }x^{k-2} e^{-\lambda x}dx \right)\\
&=\frac{\lambda ^{k} }{(k-1)!}\left(\frac{1}{\lambda } t^{k-1}e^{-\lambda t} +\frac{k-1}{\lambda }\int_{t}^{+\infty }x^{k-2} e^{-\lambda x}dx \right)\\
&=\frac{\lambda ^{k-1} }{(k-1)!} t^{k-1}e^{-\lambda t} +\frac{\lambda ^{k-1} }{(k-2)!}\int_{t}^{+\infty }x^{k-2} e^{-\lambda x}dx \\
&=a_{k-1} +b_{k-1}
\end{aligned}
:::

可得 $a_{k-1} =b_{k}-b_{k-1}$ ，则：

::: {math}
\begin{aligned}
\sum_{k=1}^{n-1} a_{k} &=\sum_{k=1}^{n-1}(b_{k+1}-b_{k})\\
&=(b_{2}-b_{1})+\cdots +(b_{n}-b_{n-1})=b_{n}-b_{1}\\
&=\frac{\lambda ^{n} }{\Gamma (n)}\int_{t}^{+\infty } x^{n-1}e^{-\lambda x} dx-a_{0}
\end{aligned}
:::

且：

::: {math}
\begin{aligned}
b_{1} &=\frac{\lambda }{\Gamma (1)}\int_{t}^{+\infty } e^{-\lambda x} dx\\
&=\lambda \int_{t}^{+\infty } e^{-\lambda x} dx\\
&=-e^{-\lambda x}|_{t}^{+\infty }=e^{-\lambda t}=a_{0}
\end{aligned}
:::

由此，我们有：

$$
\sum_{k=0}^{n-1 } \frac{(\lambda t)^{k} }{k!} e^{-\lambda t}= \frac{\lambda ^{n} }{\Gamma (n)}\int_{t}^{+\infty } x^{n-1}e^{-\lambda x} dx
$$

因此：

::: {math}
\begin{eqnarray*}
   F(t)
   &=&\sum_{k=n}^{+\infty } \frac{(\lambda t)^{k} }{k!} e^{-\lambda t}\\
   &=&1-\frac{\lambda ^{n} }{\Gamma (n)}\int_{t}^{+\infty } x^{n-1} e^{-\lambda x} dx\\
   &=&1-\int_{t}^{+\infty } \frac{\lambda ^{n} }{\Gamma (n)}x^{n-1} e^{-\lambda x} dx\\
   &=&\int_{0}^{t} \frac{\lambda ^{n} }{\Gamma (n)}x^{n-1} e^{-\lambda x} dx
\end{eqnarray*}
:::
所以， $S_{n}\sim Ga(n,\lambda)$ .
```

````

## 贝塔分布

贝塔函数
: 称

$$
B(a,b)=\int_{0}^{1} x^{a-1} (1-x)^{b-1} dx,a>0,b>0
$$

为贝塔函数。

根据贝塔函数的定义，可以证明贝塔函数的一些常用性质。

````{prf:property}
1. % Todo
2. $B(a,b)=B(b,a)$ ；
3. $B(a,b)=\frac{\Gamma (a)\Gamma (b)}{\Gamma (a+b)}$ 。

```{dropdown} Proof
由伽马函数的定义可知：

$$
\Gamma (a)\Gamma (b)=\int_{0}^{+\infty } \int_{0}^{+\infty } x^{a-1} y^{b-1} e^{-(x+y)} dxdy
$$

作变量变换：

$$\left\{\begin{matrix}
x=uv\\
y=u(1-v)
\end{matrix}\right.\Longrightarrow
\left\{\begin{matrix}
u=x+y\\
v=\frac{u}{x} % Keeping the original LaTeX expression here.
\end{matrix}\right.\Longrightarrow
J=\begin{vmatrix}
v&u \\
(1-v)&-u
\end{vmatrix}=-u
$$

故：

::: {math}
\begin{eqnarray*}
     \Gamma (a)\Gamma (b)
   &=&\int_{0}^{1 } \int_{0}^{+\infty } (uv)^{a-1} (u(1-v))^{b-1} e^{-u} ududv\\
   &=& \int_{0}^{+\infty } u^{a+b-1}e^{-u}du \cdot \int_{0}^{1 }v^{a-1}(1-v)^{b-1}dv\\
   &=&\Gamma (a+b)B(a,b).
\end{eqnarray*}
:::
```
````

基于贝塔函数，我们来定义贝塔分布。

贝塔分布
: 假设一随机变量 $X$ ，其密度函数为：

$$
p(x)=\left\{\begin{matrix}
    \frac{\Gamma (a+b)}{\Gamma (a)\Gamma (b)}x^{a-1} (1-x)^{b-1}, &0<x<1, \\
    0,& \text{其他}.
    \end{matrix}\right.
$$

则称 $X$ 的分布为贝塔分布，记 $X\sim Be(a,b)$ ，其中 $a>0,b>0$ 均为形状参数。

```{prf:remark}
特别地，当 $a=1,b=1$ 时， $Be(1,1) = U(0,1)$ 。
```

```{code-block} python3
:class: thebe
import numpy as np
import matplotlib.pyplot as plt


def prompt_float(message: str) -> float:
    while True:
        try:
            return float(input(message))
        except ValueError:
            print("请输入有效的小数。")


def read_parameters():
    print("Uniform Distribution Visualizer")
    while True:
        a = prompt_float("请输入下限 a（可为负，例如 0）: ")
        b = prompt_float("请输入上限 b（需大于 a，例如 1）: ")
        if b <= a:
            print("必须满足 b > a，请重新输入。\n")
            continue
        return a, b


def plot_uniform_distribution(a: float, b: float) -> None:
    width = b - a
    margin = max(width * 0.1, 1.0)
    x_min = a - margin
    x_max = b + margin
    x = np.linspace(x_min, x_max, 1000)
    pdf = np.zeros_like(x)
    mask = (x >= a) & (x <= b)
    pdf[mask] = 1 / (b - a)

    plt.figure(figsize=(10, 6))
    plt.plot(x, pdf, color="skyblue", linewidth=2)
    plt.fill_between(x, pdf, where=mask, color="skyblue", alpha=0.3)
    plt.axvline(x=a, color="gray", linestyle="--", alpha=0.7)
    plt.axvline(x=b, color="gray", linestyle="--", alpha=0.7)
    plt.xlabel("Random variable X")
    plt.ylabel("Density f(X)")
    plt.title(f"Uniform Distribution U({a}, {b})")
    plt.grid(True, alpha=0.3)
    plt.xlim(x_min, x_max)
    plt.ylim(0, max(pdf.max() * 1.2, 0.2))
    plt.tight_layout()
    plt.show()


def main():
    a, b = read_parameters()
    plot_uniform_distribution(a, b)


if __name__ == "__main__":
    main()

```
