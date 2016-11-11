import os
import time

# <sigh> this only works on Windows at the moment. 
BASE = os.path.dirname(__file__)
IGNORE_FILES = [
    ".gitignore",
    ".surgeignore",
    "build_manifest.py",
    "todo.txt",
    "cache.manifest",
    "README.md"
]
IGNORE_DIRS = [
    ".git",
    "tmp"
]

manifest_files = []
for dirname, subs, files in os.walk(BASE):
    subs[:] = [d for d in subs if d not in IGNORE_DIRS]
    for f in files:
        candidate = os.path.join(dirname[len(BASE):], f).replace("\\", "/")
        if not candidate in IGNORE_FILES:
            if candidate[0] != "/":
                candidate = "/" + candidate
            manifest_files.append(candidate)


with open("cache.manifest", "w") as cache_file:
    cache_file.write("CACHE MANIFEST\n")
    cache_file.write("# Revised at: " + str(time.time()) + "\n")
    for f in manifest_files:
        cache_file.write(f + "\n")
