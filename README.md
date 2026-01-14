# Probability Theory and Mathematical Statistics Web-book

## 在线阅读与代码运行

您可以访问 [电子书主页面](https://lyuni-ecnu.github.io/pr-webbook/intro.html) 阅读电子书。

> [!TIP]
> 在有代码的页面，点击右上角 **Live Code** 按钮启动 Python Binder 内核，静待启动完成即可执行代码。

## 版权说明

本项目及其所有相关内容，包括但不限于文本、代码、图像及构建的网站，其版权均归作者所有。

如果您希望使用、复制、修改或分发本项目的任何部分，请务必事先通过电子邮件联系 [lni@dase.ecnu.edu.cn](mailto:lni@dase.ecnu.edu.cn) 以获取授权。

未经许可，任何个人或组织不得将本项目用于商业目的或进行未经授权的传播。

Copyright © 2024 [倪葎]. All rights reserved.

## 环境配置

本项目使用 [uv](https://github.com/astral-sh/uv) 进行包管理，项目基于 Windows 平台构建，若未安装 [uv](https://github.com/astral-sh/uv)，可以使用以下命令一键安装：

```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

请在根目录下执行以下命令同步环境：

```bash
uv sync
```

## Build

本项目基于 Jupyter-book V1.0.4 进行构建。

```bash
uv run jupyter-book build docs # 增量构建
uv run jupyter-book build docs --all # 强制重新构建
```

要托管至 Github 平台，请使用以下命令：

```bash
uv run ghp-import -n -p -f docs/_build/html 
```

