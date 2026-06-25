---
layout: page
title: GravBall
description: Fun Game based on Gravity Simulation
img: assets/img/projects/gravball/gravball_1.webp
importance: 
category: personal
related_publications: false
---

### Introduction
This is a simple game which mimics basketball, but uses gravitational mechanism to attract the ball. Your goal is to bring the ball to your court. Use WASD or arrow keys to move your character.

### Features
- Color Customization
- Various Interesting Powerups
- Split Screen
- Shaders
- Timed Matches

### Why?
Python isn't meant for building fast paced programs. Its known globaly as an adhoc language, its known to be slow. I wanted to challenge this notion of python, and build a fast paced game from scratch by optimizing it as much as I can. The project only uses `pygame` for input handling, and drawing to screen, and `moderngl` to compile shaders. The game runs smoothly around 120fps on my system.

### Gallery:
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/gravball/gravball_1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/gravball/gravball_2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/gravball/gravball_3.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/gravball/gravball_4.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/projects/gravball/gravball_5.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
</div>

### How to run:
*Uses uv for handling python venv.

1. Clone the project and cd into it.
```
git clone https://github.com/skandabhairava/GravBall
cd GravBall
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

4. Optionally edit the `player_config.json` to edit game configurations.

### Where to find:
Code: [Github](https://github.com/skandabhairava/GravBall)