---
layout: page
title: MCWorldGen
description: Custom World Generation engine built from scratch using perlin noise. Uses minecraft as the main world building interface.
img: assets/img/projects/mcworldgen/pics4.webp
importance: 
category: learning
related_publications: false
---

### Introduction
This project is a Custom World Generation engine built from scratch using perlin noise. It uses minecraft as the main world building interface.

### Features
- Terrain carver
- Vegetation(trees, sugarcane, flowers, bushes)
- Lakes, Lakebeds (water/lava)
- Caves (3d Perlin Noise)
- Ore blobs

### Gallery:
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/mcworldgen/pics1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/mcworldgen/pics4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/mcworldgen/pics2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/mcworldgen/pics3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

### How to run:
*Uses uv for handling python venv.

1. Clone the project and cd into it.
```
git clone https://github.com/skandabhairava/MCWorldGen
cd MCWorldGen
```

2. Use uv* to sync up dependencies. Activate venv.
```
uv sync
source .venv/bin/activate #on linux
```

3. Run the program.
```
uv run src/main.py
```

4. Copy paste the `TEST` folder inside your mniecraft saves folder.

### Where to find:
Code: [Github](https://github.com/skandabhairava/MCWorldGen)