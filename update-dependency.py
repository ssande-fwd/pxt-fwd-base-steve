import json
import os
import sys
from typing import Dict, Any

def find_and_update_pxt_files(
    dependency_name: str, new_version: str
) -> None:
    """
    Finds all pxt.json files in the current directory and its subdirectories
    and updates the specified dependency.
    """
    start_directory = "." # Always start from the current directory
    print(f"Searching for pxt.json files in '{start_directory}' and its subdirectories...")
    found_files = False
    for root, _, files in os.walk(start_directory):
        for file in files:
            if file == "pxt.json":
                found_files = True
                file_path = os.path.join(root, file)
                print(f"\nProcessing: {file_path}")
                
                try:
                    with open(file_path, "r+") as f:
                        content: Dict[str, Any] = json.load(f)

                        if "dependencies" in content and dependency_name in content["dependencies"]:
                            current_dependency_url: str = content["dependencies"][dependency_name]
                            
                            # Check if the dependency URL starts with "github:"
                            if not current_dependency_url.startswith("github:"):
                                print(f"  Skipping '{dependency_name}' in '{file_path}': Not a GitHub dependency URL.")
                                continue # Move to the next file

                            # Split the URL by '#' to get the base URL and the current version/commit
                            parts = current_dependency_url.split("#")
                            if len(parts) > 1:
                                base_url = parts[0]
                                updated_dependency_url = f"{base_url}#{new_version}"
                            else:
                                # If there's no '#' (e.g., "github:repo/name"), just append the new_version
                                updated_dependency_url = f"{current_dependency_url}#{new_version}"

                            if updated_dependency_url != current_dependency_url:
                                content["dependencies"][dependency_name] = updated_dependency_url
                                f.seek(0)  # Rewind to the beginning of the file
                                json.dump(content, f, indent=4)
                                f.truncate()  # Truncate any remaining old content
                                print(
                                    f"  Updated '{dependency_name}' in '{file_path}' to '{new_version}'"
                                )
                            else:
                                print(
                                    f"  '{dependency_name}' in '{file_path}' is already at '{new_version}'"
                                )
                        else:
                            print(
                                f"  '{dependency_name}' dependency not found in '{file_path}'"
                            )

                except FileNotFoundError:
                    print(f"Error: File not found at {file_path}")
                except json.JSONDecodeError:
                    print(f"Error: Could not decode JSON from {file_path}. Is it a valid JSON file?")
                except Exception as e:
                    print(f"An unexpected error occurred while processing {file_path}: {e}")

    if not found_files:
        print(f"No 'pxt.json' files found in '{start_directory}' or its subdirectories.")


if __name__ == "__main__":
    # Check for the correct number of arguments
    if len(sys.argv) != 3:
        print("Usage: python update-dependency.py <dependency_name> <new_version>")
        print("Example: python update-dependency.py fwd-base 37aa25801aa454e0cba2ce78cf6cad0c3652b7ea")
        sys.exit(1) # Exit with an error code

    # Get arguments from the command line
    DEPENDENCY_TO_UPDATE = sys.argv[1]
    NEW_DEPENDENCY_VERSION = sys.argv[2]

    find_and_update_pxt_files(DEPENDENCY_TO_UPDATE, NEW_DEPENDENCY_VERSION)

    print("\nScript finished.")
