---
layout: page
title: Raytracer
description: A Custom raytracing engine in C++ developed from scratch, with little to no references.
img: assets/img/projects/raytracer.png
importance: 
category: personal
related_publications: false
---

### Introduction
I built a Raytracer from scratch in C++, utilising a custom designed multi-thread architecture. I hand derived all the ray-tracing formulas using nothing but high-school level math.

### Coordinate System:
- X is front/back
- Y is sideways
- Z is up/down

### Objects implemented (Position X/Y/Z):
- Sphere (Rotation on Z axis, Radius, Texture map, Normal map, Specular map)
- Point Lighting (Brightness)
- Camera (Focal Length, Camera Width, Camera Height)

### Image:
- 1 Channel (for Grayscale, specular map)
- 3 Channel (for Texture map, Normal map)
- 4 Channel (for Texture map)

### Input/Output:
- .ppm

### Gallery:
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/water_molecule.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/transparent.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/moon.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/anim.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

### Where to find:
Code: [Github](https://github.com/skandabhairava/CustomRaytracer)

Explanation: [Blog](/blog/2025/raytracing/)