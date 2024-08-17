#!/bin/bash

# Set the path to the Norded directory
wallpapersDir="$HOME/Pictures/newpc/miku/Norded/"

# Get a list of all image files in the Norded directory
wallpapers=("$wallpapersDir"/*)

# Function to change the wallpaper
change_wallpaper() {
    # Check if the wallpapers array is empty
    if [ ${#wallpapers[@]} -eq 0 ]; then
        # Refill the array if empty
        wallpapers=("$wallpapersDir"/*)
    fi

    # Select a random wallpaper from the array
    wallpaperIndex=$(( RANDOM % ${#wallpapers[@]} ))
    selectedWallpaper="${wallpapers[$wallpaperIndex]}"

    # Attempt to center the wallpaper (assuming swww centers by default)
    # Apply the wallpaper
    swww img --transition-type grow --transition-pos 0.854,0.977 --transition-step 90 "$selectedWallpaper"

    # Note: Circular transition effect and border color adjustments are conceptual and may require external tools or desktop environment features.
}

# Function to handle the skip signal
skip_wallpaper() {
    pkill -USR1 -f "$0"
}

# Trap the USR1 signal to skip the wallpaper
trap skip_wallpaper SIGUSR1

# Infinite loop to change wallpaper every 5 minutes
while true; do
    change_wallpaper
    sleep 4m &
    wait $!
done

