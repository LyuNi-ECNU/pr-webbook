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

# 指数分布

指数分布
: 设一随机变量 $X$ ，其密度函数为：

$$
p(x)=\left\{\begin{matrix}
\lambda e^{-\lambda x} ,&x\ge 0 \\
0,&x<0
\end{matrix}\right.
$$

则称 $X$ 的分布为指数分布，记 $X\sim Exp(\lambda)$ ，其中参数 $\lambda>0$ 。

根据随机变量的密度函数，可以计算其分布函数为：

$$
F_{X} (x) = \left\{\begin{matrix}
\int_{0}^{x}p(t)dt=\int_{0}^{x}\lambda e^{-\lambda t} dt= e^{-\lambda t}|_{0}^{x} =1-e^{-\lambda x} ,&x\ge 0 \\
0,&x<0
\end{matrix}\right.
$$

类似于几何分布，指数分布也具有无记忆性。

````{prf:theorem} 指数分布的无记忆性
:label: property:no_memory_expential
如果随机变量 $X\sim Exp(\lambda)$ ，则对任意 $s>0,t>0$ 有：

$$
P(X>t+s|X>s)=P(X>t)
$$

```{dropdown} Proof
因为 $X\sim Exp(\lambda)$ ，所以 $P(X>s)=e^{-\lambda s},s>0$ 。又因为 $\left \{ X>s+t \right \} \subset \left \{ X>s \right \}$ ，于是，条件概率：

$$
P(X>s+t|X>s)=\frac{P(X>s+t)}{P(X>s)}=\frac{e^{-\lambda (s+t)} }{e^{-\lambda s} }=e^{-\lambda t}
$$
```
````

```{code-block} python3
:class: thebe
import numpy as np
import matplotlib.pyplot as plt


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


def read_parameter():
    print("Exponential Distribution Visualizer")
    lambd = prompt_positive_float("请输入参数 λ（>0，例如 1）: ")
    return lambd


def plot_exponential_distribution(lambd: float) -> None:
    x_max = max(10.0, 5.0 / lambd)
    x = np.linspace(0, x_max, 1000)
    pdf = lambd * np.exp(-lambd * x)
    x_threshold = 2
    exceed_prob = np.exp(-lambd * x_threshold)
    exceed_pct = exceed_prob * 100

    plt.figure(figsize=(12, 8))
    plt.plot(x, pdf, color="skyblue", linewidth=3, label=f"PDF (λ={lambd})")

    mask = x > x_threshold
    plt.fill_between(x[mask], pdf[mask], color="lightgreen", alpha=0.5,
                     label=f"P(X > {x_threshold}) = {exceed_pct:.1f}%")

    peak_y = lambd * np.exp(-lambd * (x_threshold + 0.5))
    plt.annotate(f"{exceed_pct:.1f}%",
                 xy=(x_threshold + 0.5, peak_y),
                 xytext=(x_threshold + 1.5, peak_y + 0.2),
                 arrowprops=dict(facecolor="black", shrink=0.05, width=1.5, headwidth=8),
                 fontsize=12)

    plt.xlabel("Time interval X")
    plt.ylabel("Density f(X)")
    plt.title("Exponential Distribution and Tail Probability")
    plt.grid(True, alpha=0.3)
    plt.xlim(0, x_max)
    plt.ylim(0, max(0.5, pdf.max() * 1.2))
    plt.legend()
    plt.figtext(0.15, 0.01,
                "Notes:\n"
                "1. Memoryless property: P(X>s+t | X>s) = P(X>t).\n"
                f"2. Shaded area represents P(X > {x_threshold}).",
                fontsize=10, bbox=dict(facecolor="white", alpha=0.85))
    plt.tight_layout(rect=[0, 0.08, 1, 0.97])
    plt.show()


def main():
    lambd = read_parameter()
    plot_exponential_distribution(lambd)


if __name__ == "__main__":
    main()
```

泊松分布与指数分布有非常紧密的关系，我们利用以下一个例子来说明。

````{prf:example}
如果某设备在长为 $t$ 的时间 $(0,t)$ 内发生故障的次数 $N(t)$ （与时间长度 $t$ 有关）服从参数为 $\lambda t$ 的泊松分布，且 $N(0)=0$ ，则从 $0$ 时开始首次发生故障的时间 $T$ 服从参数为 $\lambda$ 的指数分布。

```{dropdown} Solution
设 $N(t)\sim P(\lambda t)$ ，即：

$$
P(N(t)=k)=\frac{(\lambda t)^{k} }{k!} e^{-\lambda t} ,k=0,1,\cdots
$$

注意到从 $0$ 时开始首次发生故障的时间 $T$ 是非负随机变量且事件 $\left \{ T\geq t \right \}$ 说明此设备在 $\left [ 0,t \right ]$ 内没有发生故障。即 $\left \{ T\geq t \right \} =\left \{ N(t)=0 \right \} .$ 由此可得：

- 当 $t<0$ 时，有：

$$
F_{T} (t)=P(T\le t)=0
$$

- 当 $t\geq 0$ 时，有：

$$
F_{T} (t)=P(T\le t)=1-P(T> t) = 1-P(T\geq t)=1-P(N(t)=0)=1-e^{-\lambda t}
$$

因此， $T\sim {Exp}(\lambda)$ ，即从 $0$ 时开始首次发生故障的时间 $T$ 服从参数为 $\lambda$ 的指数分布。
```
````
