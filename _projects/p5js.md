---
layout: page
title: P5JS Simulations
description: Simple simulations using P5JS as the rendering engine. 
img: assets/img/projects/p5js/image.webp
importance: 
category: learning
related_publications: false
---

### Fire Simulation
Give the particles a few seconds to warm up before seeing it rise up!

Technically, I'm modelling heat transfer, and the simulator is actually showing convection cycles in heat transfer. The particles are colored from black, to red to white based on how hot they are. Hotter particles feel a greater force upwards. There exists a heat source at the center bottom of the simulator. Particles slowly lose heir heat due to radiation, they cool and fall back down. As particles turn black when cooled, and the background is also black, these cold particles aren't visible on screen. However they do descend on both sides of the central rising column.

Code: [Github](https://github.com/skandabhairava/P5JS-FireSim)
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        <button class="btn btn-sm btn-outline-primary" onclick="playSketch('heat')">▶  Play</button>
        <button class="btn btn-sm btn-outline-primary" onclick="stopSketch('heat')">⏹  Stop</button>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div id="frame-container-heat">
            <div
                onclick="playSketch('heat')"
                style="
                    width: 100%;
                    aspect-ratio: 16/9;
                    background:black;
                    color:white;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    cursor:pointer;
                    margin:auto;
                    font-size:1.5rem;
                ">
                ▶ Click to Play
            </div>
        </div>
    </div>
</div>

<br>
<br>

### Sand Simulator
This is a simple physics emulator. Use your left mouse button to attract the particles, right mouse button to repel the particles.

Code: [Github](https://github.com/skandabhairava/P5JS-SandSim)
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        <button class="btn btn-sm btn-outline-primary" onclick="playSketch('sand')">▶  Play</button>
        <button class="btn btn-sm btn-outline-primary" onclick="stopSketch('sand')">⏹  Stop</button>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        <div id="frame-container-sand">
            <div
                onclick="playSketch('sand')"
                style="
                    width: 100%;
                    aspect-ratio: 16/9;
                    background:black;
                    color:white;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    cursor:pointer;
                    margin:auto;
                    font-size:1.5rem;
                ">
                ▶ Click to Play
            </div>
        </div>
    </div>
</div>


<script>
const iframeURLHeat =
    "https://editor.p5js.org/skandabhairava/full/crxegBoyA";

const iframeURLSand = "https://editor.p5js.org/skandabhairava/full/b_fiHqgUE6"

function stopSketch(idd) {
    document.getElementById(`frame-container-${idd}`).innerHTML = `
        <div
            onclick="playSketch('${idd}')"
            style="
                width: 100%;
                aspect-ratio: 16/9;
                background:black;
                color:white;
                display:flex;
                align-items:center;
                justify-content:center;
                cursor:pointer;
                margin:auto;
                font-size:1.5rem;
            ">
            ▶ Click to Play
        </div>
    `;
}

function playSketch(idd) {
    let src = ""
    if (idd === "heat") {
        src = iframeURLHeat;
    } else {
        src = iframeURLSand;
    }

    document.getElementById(`frame-container-${idd}`).innerHTML = `
        <iframe
            src="${src}"
            style="width: 100%; aspect-ratio: 16/9; border:none;">
        </iframe>
    `;
}
</script>

