# 正态分布

正态分布
: 设定义在区间 $(-\infty,\infty)$ 的一个随机变量 $X$ 。 $X$ 的概率密度函数为：

$$
p(x) =\frac{1}{\sqrt{2\pi \sigma^2}} \exp\left\{-\frac{1}{2\sigma^2} (x-\mu)^2\right\}, x \in R
$$

称 $X$ 的分布为正态分布。记 $X\sim N(\mu,\sigma^2)$ ，其中参数 $\mu \in R, \sigma^2 >0$ 。

```{prf:remark}
1. 正态分布是最早由法国数学家棣莫弗（Abraham de Moivre）在近似二项分布时得到的，后由德国数学家高斯（Carolus Fridericus Gauss）在测量误差时导出。因高斯的工作对后世的贡献巨大，所以，正态分布又称**高斯分布**。
2. 概率密度函数 $p(x)$ 是一条钟型曲线，特点为：中间高，两边低，左右对称。
3. 正态分布的两个参数 $\mu$ 和 $\sigma^2$ 是决定密度函数位置和形状，称 $\mu$ 为位置参数， $\sigma^2$ 是尺度参数。
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
    print("Normal Distribution Visualizer")
    mean = prompt_float("请输入均值 μ（例如 0）: ")
    variance = prompt_positive_float("请输入方差 σ^2（>0，例如 1）: ")
    return mean, variance


def plot_normal_distribution(mean: float, variance: float) -> None:
    std_dev = np.sqrt(variance)
    span = max(1.0, 4 * std_dev)  # cover most of the density even when mean/variance shift
    x_min = mean - span
    x_max = mean + span
    x = np.linspace(x_min, x_max, 1000)
    y = (1 / (np.sqrt(2 * np.pi * variance))) * np.exp(-(x - mean) ** 2 / (2 * variance))

    plt.figure(figsize=(10, 6))
    plt.plot(x, y, color="skyblue", linewidth=2)
    plt.xlabel("Random variable X")
    plt.ylabel("Density f(X)")
    plt.title(f"Normal Distribution: mean={mean}, variance={variance}")
    plt.grid(True, alpha=0.3)
    plt.xlim(x_min, x_max)
    plt.ylim(0, max(0.1, y.max() * 1.2))
    plt.tight_layout()
    plt.show()


def main():
    mean, variance = read_parameters()
    plot_normal_distribution(mean, variance)


if __name__ == "__main__":
    main()
```

这里很自然我们构建一个正态分布类，即：

$$
\mathcal{P} = \{N(\mu,\sigma^2):\mu \in R, \sigma^2 >0\}
$$

其中有个极为特殊的正态分布——标准正态分布，即 $\mu = 0,\sigma^2 = 1$ 。下面我们具体讲解。

```{prf:remark}
1. 标准正态分布的密度函数为：

$$
\phi(z) = \frac{1}{\sqrt{2\pi}} \exp\left\{-\frac{1}{2}z^2\right\}
$$

2. 标准正态分布的分布函数为：

$$
\Phi(z) = \int_{-\infty}^z \phi(x)\text{d} x
$$

3. 标准正态分布的概率计算常用公式：

   a. $\Phi (-z)=P(Z\le -z)=P(Z\ge z)=1-\Phi(z)$   
   b. $P(Z>z)=1-\Phi(z)$   
   c. $P(a<Z<b)=\Phi(b)-\Phi(a)$   
   d. $P(\left | Z \right | <c)=2\Phi(c)-1， (c\ge 0)$ 
```

```{prf:theorem}
:label: property:standard_normal
若随机变量 $X\sim N(\mu,\sigma^{2})$ ，则 $Z=\frac{x-\mu }{\sigma } \sim N(0,1)$ 。

记 $X$ 和 $Z$ 的分布函数分别为 $F_{X}(x)$ 和 $F_{Z}(z)$ ，密度函数分别为 $p_{X}(x)$ 和 $p_{Z}(z)$ 。

则由分布函数的定义可知：

::: {math}
:label: eq:chap04_proof_normal_step1
\begin{aligned}
F_{Z}(z)
&=P(Z\le z)\\
&=P\left(\frac{X-\mu }{\sigma } \le z\right)\\
&=P(X\le \mu +\sigma z )\\ % Corrected typo from original LaTeX
&=F_{X} (\mu +\sigma z)
\end{aligned}
:::

由于正态分布函数是严格单调递增且处处可导。因此：
::: {math}
:label: eq:chap04_proof_normal_step2
\begin{aligned}
p_{Z}(z)
&=\frac{\mathrm{d}}{\mathrm{d} z} F_{Z}(z)\\
&=\frac{\mathrm{d}}{\mathrm{d} z} F_{X}(\mu +\sigma z)\\
&= p_{X}(\mu +\sigma z)\cdot \sigma \\
&=\frac{1}{\sqrt{2\pi \sigma ^{2}} } \exp\left\{-\frac{1}{2\sigma ^{2}}(\mu +\sigma z -\mu )^{2} \right\}\cdot \sigma \\
&=\frac{1}{\sqrt{2\pi \sigma ^{2}} } \exp\left\{-\frac{(\sigma z)^{2}}{2\sigma ^{2}} \right\}\cdot \sigma \\
&=\frac{1}{\sqrt{2\pi \sigma ^{2}} } \exp\left\{-\frac{\sigma^2 z^{2}}{2\sigma ^{2}} \right\}\cdot \sigma \\
&=\frac{1}{\sqrt{2\pi \sigma ^{2}} } \exp\left\{-\frac{z^{2}}{2} \right\}\cdot \sigma \\
&=\frac{\sigma}{\sqrt{2\pi \sigma ^{2}} } \exp\left\{-\frac{z^{2}}{2} \right\}\\
&=\frac{\sigma}{\sigma\sqrt{2\pi } } \exp\left\{-\frac{z^{2}}{2} \right\}\\
&=\frac{1}{\sqrt{2\pi } } \exp\left\{-\frac{z^{2}}{2} \right\}\\
\end{aligned}
:::

由此可得：

$$
Z=\frac{x-\mu }{\sigma } \sim N(0,1)
$$
```

```{prf:remark}
   $3\sigma$ 原则：
1. $P(\mu -\sigma <X<\mu +\sigma )=2\Phi(1)-1\approx 0.6826$ 
2. $P(\mu -2\sigma <X<\mu +2\sigma )=2\Phi(2)-1\approx 0.9545$ 
3. $P(\mu -3\sigma <X<\mu +\sigma )=2\Phi(3)-1\approx 0.9973$ 
```
