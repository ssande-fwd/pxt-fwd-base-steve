#!/bin/bash

# Function to process a single directory
process_directory() {
  local dirname="$1"

  # Skip the 'common' directory
  if [ "$dirname" = "common" ]; then
    echo "Skipping 'common' directory."
    return 0 # Exit the function, not the script
  fi

  echo "Processing directory: $dirname"

  # Change into the directory
  cd "$dirname" || {
    echo "Error: Could not change directory to $dirname"
    return 1 # Indicate an error
  }

  # Run mkc init
  echo "Running mkc init..."
  mkc init

  # Delete .github folder (if it exists)
  if [ -d ".github" ]; then
    echo "Deleting .github folder..."
    rm -rf ".github"
  else
    echo ".github folder not found."
  fi

  # Delete .prettierrc file (if it exists)
  if [ -f ".prettierrc" ]; then
    echo "Deleting .prettierrc file..."
    rm ".prettierrc"
  else
    echo ".prettierrc file not found."
  fi

  # Delete mkc.json file (if it exists)
  if [ -f "mkc.json" ]; then
    echo "Deleting mkc.json file..."
    rm "mkc.json"
  else
    echo "mkc.json file not found."
  fi

  # Go back to the parent directory
  cd ..
  echo "Finished processing directory: $dirname"
}

# Check if a directory argument is provided
if [ -z "$1" ]; then
  # No argument provided, ask for confirmation to run for all
  read -p "No directory specified. Confirm you want to init all modules? (y/N): " confirm

  if [[ "$confirm" =~ ^[Yy]$ ]]; then
    echo "Running for all subdirectories..."
    # Loop through all directories in the current directory
    for dir in */; do
      dirname="${dir%/}" # Extract the directory name
      process_directory "$dirname"
    done
  else
    echo "Operation cancelled."
    exit 0
  fi
else
  # Argument provided, process only the specified directory
  target_dir="$1"

  # Check if the target directory exists
  if [ ! -d "$target_dir" ]; then
    echo "Error: Directory '$target_dir' not found."
    exit 1
  fi

  process_directory "$target_dir"
fi

echo "Script finished."
