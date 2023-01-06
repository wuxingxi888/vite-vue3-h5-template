#!/bin/bash

echo "初始化项目"

read -p "请输入项目名称：" projectName

old_name_line=$(awk -F"\"" '/name/{print NR}' package.json) # 记住行号
old_name_data=$(awk -F"\"" '/name/{print $4}' package.json)  # 获取旧数据
echo "要修改的数据行数为：$old_name_line { name: $old_name_data}"
sed -e "$old_name_line s@$old_name_data@$projectName@" -i "" package.json # 替换所在行的老数据
new_name_data=$(awk -F"\"" '/name/{print $4}' package.json)  # 获取旧数据
echo "修改成功，行数为：$old_name_line { name: $new_name_data}"

echo "还要写啥自己想.........."