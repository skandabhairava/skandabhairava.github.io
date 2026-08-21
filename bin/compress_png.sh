#!/usr/bin/env bash

# compression level 1-9

magick $1 -strip -define png:compression-level=$2 -define png:compression-filter=5 -define png:compression-strategy=1 $1_compressed.png