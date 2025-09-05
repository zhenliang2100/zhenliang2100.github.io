#!/bin/bash

# 查找所有HTML文件并替换Font Awesome CDN引用为本地引用
find . -name "*.html" -type f -exec sed -i '' 's#<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">#<link href="css/font-awesome.min.css" rel="stylesheet">#g' {} +

# 输出修改结果
echo "已成功将所有HTML文件中的Font Awesome CDN引用替换为本地引用。"