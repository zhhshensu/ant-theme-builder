#!/bin/bash 

mkdir -p public/theme

# 复制dist下以theme-开头的目录到docs/public/theme目录下
cp -r ../dist/theme-* public/theme/
