# $F$ 分布

 $F$ 分布
: 设随机变量 $X_{1}\sim \chi^{2}(m),X_{2}\sim \chi^{2}(n)$ ，且 $X_{1}$ 与 $X_{2}$ 独立，则称

$$F=\frac{X_{1} /m }{X_{2}/n}$$

的分布是自由度为 $m$ 与 $n$ 的 $F$ 分布，记为 $F(m,n)$ 。其中， $m$ 为分子自由度， $n$ 为分母自由度。

```{admonition} Remark

- 根据增补变换法，可以推导 $F$ 的密度函数为

$$
p_F(y) = \frac{\Gamma\left(\frac{m+n}{2}\right) \left(\frac{m}{n}\right)^{\frac{m}{2}} }{\Gamma\left(\frac{m}{2}\right) \Gamma\left(\frac{n}{2}\right)} y^{\frac{m}{2}-1} \left(1+\frac{m}{n}y\right)^{-\frac{m+n}{2}}, y>0.
$$

- 通过图像绘制， $F$ 分布是一个偏态分布。
- 易证：若 $F \sim F(m,n)$ ，则 $1/F \sim F(n,m)$ ；
- $F$ 分布分布数的性质。若 $F_{\alpha}(m,n)$ 为自由度为 $m$ 和 $n$ 的 $F$ 分布分位数。于是，若存在一个随机变量 $F \sim F(m,n)$ ，则 $1/F$ 也是一个 $F$ 分布随机变量，其自由度分别为 $n$ 和 $m$ 。所以，

$$
\alpha = P\left(\frac{1}{F}\leq F_{\alpha}(n,m)\right)
= P\left(F \geq \frac{1}{F_{\alpha}(n,m)}\right),
$$

从而

$$
P\left( F \leq \frac{1}{F_{\alpha}(n,m)}\right) =1-\alpha.
$$

因此，

$$
F_{1-\alpha} (m,n) = \frac{1}{F_{\alpha}(n,m)}.
$$

```
