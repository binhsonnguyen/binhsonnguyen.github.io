#!/usr/bin/env bash

ruby -v
if [ $? -ne 0 ]; then
    echo 'ruby not installed'
    exit 1
fi

gem -v
if [ $? -ne 0 ]; then
    echo 'gem not installed'
    exit 1
fi

gcc -v
if [ $? -ne 0 ]; then
    echo 'gcc not installed'
    exit 1
fi

g++ -v
if [ $? -ne 0 ]; then
    echo 'g++ not installed'
    exit 1
fi

make -v
if [ $? -ne 0 ]; then
    echo 'make not installed'
    exit 1
fi

jekyll --version
if [ $? -ne 0 ]; then
    echo 'jekyll not installed'
    exit 1
fi

echo 'all dependences are installed'
exit 0
