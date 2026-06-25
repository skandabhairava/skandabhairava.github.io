#!/usr/bin/env bash

set -euo pipefail

# Usage:
#   ./convert-webp.sh [input_folder] [compression_level]
#
# Examples:
#   ./convert-webp.sh
#   ./convert-webp.sh images
#   ./convert-webp.sh images 50

INPUT_DIR="${1:-.}"
LEVEL="${2:-20}"

if [[ ! -d "$INPUT_DIR" ]]; then
    echo "Error: '$INPUT_DIR' is not a directory"
    exit 1
fi

if ! [[ "$LEVEL" =~ ^[0-9]+$ ]] || (( LEVEL < 0 || LEVEL > 100 )); then
    echo "Usage: $0 [input_folder] [compression_level(0-100)]"
    exit 1
fi

# Map compression level to ImageMagick quality:
# 0   -> quality 100 (lossless)
# 100 -> quality 0
QUALITY=$((100 - LEVEL))

shopt -s nullglob

for img in "$INPUT_DIR"/*.{jpg,jpeg,png,bmp,tif,tiff,gif,JPG,JPEG,PNG,BMP,TIF,TIFF,GIF}; do
    [[ -f "$img" ]] || continue

    output="${img%.*}.webp"

    echo "Converting: $img -> $output"

    if (( LEVEL == 0 )); then
        magick "$img" \
            -define webp:lossless=true \
            "$output"
    else
        magick "$img" \
            -quality "$QUALITY" \
            "$output"
    fi
done

echo "Done."