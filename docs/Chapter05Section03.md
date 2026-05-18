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
