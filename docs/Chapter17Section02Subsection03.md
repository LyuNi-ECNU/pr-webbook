# $t$ 分布

$t$ 分布
: 设随机变量 $X_1$ 与 $X_2$ 独立且 $X_1\sim N(0,1),X_2\sim \chi^2(n)$ ，则称

$$t=\frac{X_{1}}{\sqrt{X_{2}/n } } $$

的分布为自由度为 $n$ 的 $t$ 分布，记为 $t\sim t(n)$ 。

```{admonition} Remark

- 根据增补变换法，可以推导 $t$ 的密度函数为

$$
p_t(y) = \frac{\Gamma\left(\frac{n+1}{2} \right)}{\sqrt{n\pi}\Gamma\left(\frac{n}{2}\right)} \left(1 + \frac{y^2}{n}\right)^{-\frac{n+1}{2}}, -\infty < y < \infty.
$$

- $t$ 分布的密度函数 vs 标准正态分布的密度函数。

- $t$ 分布的密度函数和标准正态分布的密度函数均为偶函数，形状类似。
- 特别当 $n$ 比较小时，尾部概率比标准正态分布的大一些。

```
