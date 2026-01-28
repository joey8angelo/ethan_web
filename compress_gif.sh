#!/bin/bash

# Create output directory
mkdir -p compressed_gifs

# Loop through all GIF files in current directory
for input_gif in *.gif; do
    if [ -f "$input_gif" ]; then
        output_gif="${input_gif%.*}_compressed.gif"
        
        echo "Processing: $input_gif → $output_gif"
        
        ffmpeg -y -i "$input_gif" \
            -filter_complex "fps=15,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" \
            "$output_gif"
    fi
done

echo "All GIFs processed! Check 'compressed_gifs' folder."
