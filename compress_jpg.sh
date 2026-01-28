for file in *.jpg; do magick "$file" -resize 960 "${file%.*}_compressed.jpg"; done
