---
layout: post
title: Path to Raytracing(Pun intended) 101
date: 2025-02-10 12:12:00
description: from “Hello World!” to “Hello 3D World!”
tags: graphics simulation multithreading
categories: explanation
thumbnail: assets/img/projects/raytracer.png
toc:
  sidebar: left
---

## Introduction

This log goes into my journey behind discovering the truth behind virtual 3D objects. Whatever I mention in this devlog might not be right(and it probably isn’t), I’m just conveying whatever I’ve understood based on my own trial and errors. If I'm wrong, please correct me and help me learn! I've always been fascinated by how games work. I know what a ‘cube’ is, but how does a game draw such a cube on my screen without much effort? Questions like these led me on a short journey to understand the basics of “rendering”, aka drawing images on screen using math.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/blender_cube.webp" class="img-fluid rounded z-depth-1" width="40%" %}
    </div>
</div>

There are many ways of rendering, one efficient and popular way is to represent the object in terms of points on screen; Then connecting these points with lines, forms triangles. When a bunch of these triangles come together, they are called a mesh. These triangles are colored based on a given texture color.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/polygon_mesh.webp" class="img-fluid rounded z-depth-1" width="40%" %}
    </div>
</div>

The information for the triangles are then sent to the GPU(Graphical Processing Unit) which can calculate the position of the points relative to your screen shape, draw them, and color in the triangles. The CPU is quite small, and is focused more on the L in ALU(Arithmetic and Logic Unit). The CPU has a lot of cache memory, and is geared to work around Arithmetic and Logical calculations. Whereas the GPU is more geared towards Arithmetic calculations only, it has less cache as well. The GPU contains multiple cores which can process multiple calculations per second, whereas the CPU only has 4-8 cores(on a modern day average PC). 

This kind of rendering is employed by many games and softwares as it is really fast, less expensive memory wise, and it's very easy on the math side too!

Most rendering math, FX, lighting, shadows, etc work on a lot of little tricks and hacks to lift up the load on processors, hence it makes images look a little bit fake-ish(nowadays, there have been many improvements which give a real-ish look to this kind of rendering, it’s all about finding the right trick to employ at what instance)

Another method of rendering is raytracing. Raytracing doesn’t break down objects into points, but instead treats the object as a whole. It’s a method which treats light rays ‘emitted’ by a light source as a real light ray(I won’t go into the question if light is a particle or wave here, that's the job of physicists to figure out, although it is really cool to think about. Here we consider light as photons, or basically the beam which the photon traces) and calculate the way in which light interacts with the objects in the scene to give it a real life-like look. All these calculations are immense, and hence it takes a lot of time for a computer to render such a scene.
RTX = Raytracing

Most games/softwares which allow ray tracing, allows one to run all the required calculations on the GPU. I, on the other hand, started learning C++ just a few months back, so I don’t really know how to send and receive data to and from the GPU in this language, and if I tried to do it, I might end up with a broken system which is even more slower than what it is already right now due to some in-efficient usage of memory. All calculations in my system work on the CPU. I have tried running the calculations parallelly/concurrently using multiple threads, but that just gives it a boost of 2-3 seconds for 1-3 spheres per frame as far as i’ve tested, which isn’t a lot at first, but it is a lot of seconds saved when I render multiple frames to record an animation. I’m probably doing something wrong and in-efficient, but I don’t know just yet.

## Basic Vector Mathematics

Before I move into vector math, let's recall what dimensions really are. When I say the word “Dimension”, many people first think about sci-fi, parallel universes. The Sci-fi definition probably pops up in your mind when I use the term “Dimension”.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/dimension.webp" class="img-fluid rounded z-depth-1" width="40%" %}
    </div>
</div>

Dimension is a mathematical term which can simply be understood as different quantities which are totally unrelated to each other. North-South, East-West, Up-Down, is a common example used for dimensions. In this particular example, we see 3 directions, which are totally unrelated to each other. If I move 5 steps North, I can’t tell how much I’ve moved in the East-West direction. 

The number of dimensions are also taken in reference to the data we have recorded, for example, a point in space can be given coordinate data of 3 Dimensions(Example, point at {0, 0, 0}), if the space is 3D in nature. Another example of Dimensions is: Distance vs Time graphs.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" url="https://media.geeksforgeeks.org/wp-content/uploads/20220624103423/dt3.jpg" class="img-fluid rounded z-depth-1" width="40%" %}
    </div>
</div>

Here, the Time(which is considered as a Dimension in “reference”(which is the keyword here), to the graph/recorded data) is plotted on the X-axis. Distance(another Dimension in reference to the graph) is plotted on the Y-axis. We draw this information spatially up-down, left-right as it is way easier for our brain to grasp and visualize spatial information rather than just numbers.

The given graph can also be written down like this

| Time     | 4:00 | 4:15 | 4:30 | 4:45 | 5:00 |
| Distance | 0 | ~15 | 30 | 30 | 50 |

<br>

| Time     | 5:15 | 5:30 | 5:45 | 6:00 | 6:15 |
| Distance | 50 | ~58 | ~25 | ~10 | 0 |

<br>

I think everyone can agree that the graph is a better way of representing data rather than a table like this. The table gives accurate data, but it’s very hard to visualize things when given in a table format.

### Vector

A Vector is an N-dimensional object. A 2D vector has 2 independent components, which one can name those components as x, y, or i, j, etc. A 3D vector, similar to a 2D vector has 3 independent components, which by math conventions are named i, j and k. The same can be said to other higher dimensional vectors.

This set of 2 to 3 numbers can easily be represented as a table of information.

Vector3D A = (0, 0, 0).
Vector3D B = (0.5, 100, -15).
Vector2D C = (1, 2), etc

This however, as confirmed previously, is a bit hard to visualize. To help us understand and make sense of these sets of numbers, we can draw them spatially. I will be using [Desmos](https://www.desmos.com/calculator) and [Geogebra](https://www.geogebra.org/graphing) to draw most of these diagrams.

### Visualizing 2D Vectors

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising.webp" class="img-fluid rounded z-depth-1" width="40%" %}
    </div>
</div>

This diagram represents a 2D vector (1, 1). We can imagine the 1st Term to be on the X-axis, the 2nd Term lies on the Y-axis. Hence the resultant vector diagram looks something like this.

Here are a few more examples of vector diagrams and their (i, j) / (x, y) representation.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(0, 1)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1, -0.5)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(-0.25, -1)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(-1, 0)$
    </div>
</div>

Hopefully these vector-illustrations have helped you understand how to imagine the given set of 2D numbers as an arrow in space. In-fact, Complex numbers in math are literally just 2D vectors. 

A vector can also be represented in another way which includes the magnitude/distance/strength of the vector, and its angle to the X-axis

Whenever next I represent an angle with a ‘°’, that represents degrees, and when I don’t use them, that will represent radians. Radians is another form of representing angles, and it is used a lot more in math than the ° notation.

All you have to know is,

$\text{deg}^\circ \times \frac{\pi}{180^\circ} = \text{rad}$

$\text{rad} \times \frac{180^\circ}{\pi} = \text{deg}^\circ$

| Degree | 0° | 90° | 180° | 270° | 360° |
| Radian | 0 | $\frac{\pi}{2}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |

Here are a few more examples of vector diagrams and their (magnitude, degrees) representation.

Jumping into calculation math territory here, don’t get freaked out by the symbols. You can feel free to [skip this part](#skip1) for now.

The magnitude/total distance of a vector is written as `|Vector|` which is equal to $\sqrt{x^2 + y^2}$, and the angle it makes with the x-axis is represented by $\text{(0° or 180°)} + \theta = \tan^{-1}(\frac{y}{x})$, where $\theta$(theta) denotes the angle.

The vector is at $0^\circ$ when it is in the configuration of $(1, 0)$, it’s at $90^\circ$ at the configuration of $(0, 1)$. Try to visualize these sets of numbers. The vector basically spins in an anti-clockwise rotation.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $(\sqrt{0^2 + 1^2}, \tan^{-1}(\frac{1}{0}))$
            <br><br>
            $\rightarrow  \frac{1}{0}$ is technically undefined, but we use the limit definition of anything /0 is $\infty$
            <br><br>
            $(1, 90^\circ)$ or $(1, \frac{\pi}{2})$
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1.118, \pi - 0.4636)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1.03, \pi + 1.325)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/visualising4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1, \pi + 0)$
    </div>
</div>

<a id="skip1"></a>
Anyways, I digress. Just wanted to dip my feet in a little bit of math to warm up. 

Remember, Vectors aren’t related to any specific position. They just hold information such as the magnitude and direction of the said vector. Math also sets down some important rules regarding calculations of vectors.

$$
\begin{aligned}
(x, y, z) + (i, j, k) &= (x + i, y + j, z + k)\\
(x, y, z) - (i, j, k) &= (x - i, y - j, z - k)\\
\alpha(x, y, z) &= (\alpha x, \alpha y, \alpha z)
\end{aligned}
$$

Multiplying a single number to a vector helps us scale up the vector linearly!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/linear1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(0.5, 0.5)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/linear2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $2 \times (0.5, 0.5) \to (1, 1)$
    </div>
</div>

Dividing a vector by a number is similar to multiplying it with (1/num).

$\lvert(x, y, z)\rvert = \sqrt{x^2 + y^2 + z^2}$

`|(x, y, z)|` denotes the magnitude of the vector. Imagine squishing all the dimensions of the vector into one “magnitude” dimension.

We can’t multiply vectors as one might think, but instead we have 2 types of products/multiplications, _dot product_ and _cross product_.

Dot product gives us a single number instead of a vector:

$(x, y, z) \cdot (i, j, k) = x \times i + y \times j + z \times k$

Cross product gives us a vector, the calculations work something like this
The resultant vector faces in a direction which is $90^\circ$ to both the input vectors.

$$
\begin{aligned}
(x,y,z)\times(i,j,k)
&=
\begin{vmatrix}
\hat{i} & \hat{j} & \hat{k} \\
x & y & z \\
i & j & k
\end{vmatrix}
\\[12pt]
&=
\hat{i}(yk-zj)
-
\hat{j}(xk-zi)
+
\hat{k}(xj-yi)
\\[12pt]
&=
(yk-zj,\; zi-xk,\; xj-yi)
\end{aligned}
$$

($\hat{i}$ is just the direction $i$ was pointing at)

<a id="dot-product"></a>
A small point to understand, the dot product of 2 vectors(say A, B) is also equal to $\lvert A \rvert \lvert B \rvert \cos(\theta)$, where $\theta$ is the angle between the vectors themselves.

Keeping in mind, the graph of $\cos(\theta)$ and $\sin(\theta)$ can help a lot while dealing with equations and understanding them.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<div class="row mt-3">
    <div class="col-sm text-center">
        <canvas id="sinChart"></canvas>
    </div>

    <div class="col-sm text-center">
        <canvas id="cosChart"></canvas>
    </div>
</div>

<script>
    new Chart(document.getElementById('sinChart'), {
        type: 'line',
        data: {
            labels: [
                "-2π","-7π/4","-3π/2","-5π/4","-π",
                "-3π/4","-π/2","-π/4","0",
                "π/4","π/2","3π/4","π",
                "5π/4","3π/2","7π/4","2π"
            ],
            datasets: [{
                label: 'sin(x)',
                data: [
                    0,0.707,1,0.707,0,
                    -0.707,-1,-0.707,0,
                    0.707,1,0.707,0,
                    -0.707,-1,-0.707,0
                ],
                borderColor: '#36A2EB',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: -1,
                    max: 1
                }
            }
        }
    });

    new Chart(document.getElementById('cosChart'), {
        type: 'line',
        data: {
            labels: [
                "-2π","-7π/4","-3π/2","-5π/4","-π",
                "-3π/4","-π/2","-π/4","0",
                "π/4","π/2","3π/4","π",
                "5π/4","3π/2","7π/4","2π"
            ],
            datasets: [{
                label: 'cos(x)',
                data: [
                    1,0.707,0,-0.707,-1,
                    -0.707,0,0.707,1,
                    0.707,0,-0.707,-1,
                    -0.707,0,0.707,1
                ],
                borderColor: '#FF6384',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: -1,
                    max: 1
                }
            }
        }
    });
</script>
<br>

$\cos(0) = 1$, therefore if the vectors are facing the same direction, the dot product of A and B, is just $A \times B$ {Think about 1D number line, $AB$ would just be $\lvert A \rvert \times \lvert B \rvert$, as the 1D vector can’t be rotated on a 2D surface}

If the vectors are $90^\circ$ apart, $\cos(90^\circ) = 0$, the dot product would just be 0

If the vectors are $180^\circ$ apart, $\cos(180^\circ) = -1$, the dot product would be $\lvert A \rvert \times \lvert B \rvert \times -1$

And so on…


Normalizing a vector is basically a way to make a given vector(of say, some magnitude $X$, and some direction $\theta$) into a unit vector, which has a magnitude of 1, and the direction remains the same($\theta$).

Normalised $\hat{x} = \frac{\vec{x}}{\lvert \vec{x} \rvert}$

From now onwards, $\vec{x}$ represents any vector, and $\hat{x}$ represents any unit vector(any vector with a magnitude of 1). All unit vectors are vectors, but not all vectors are unit vectors.

Normalizing basically gives us a multiplicative identity of the vector in that direction, so if we wanted to scale up the vector, we can just multiply the given unit vector with a single number. An example of normalizing on a 1D vector(i.e a number line) can be imagined like this.

Taking x as -5, when we try and normalize this 1D vector we get this:

$\hat{x} = \frac{\vec{-5}}{\lvert \vec{-5} \rvert} = \frac{-5}{\sqrt{(-5)^2}} = \frac{-5}{\sqrt{25}} = \frac{-5}{5} = -1$

Taking x as 10, when we try and normalize this 1D vector we get this:

$\hat{x} = \frac{\vec{10}}{\lvert \vec{10} \rvert} = \frac{10}{\sqrt{(10)^2}} = \frac{10}{\sqrt{100}} = \frac{10}{10} = 1$

As we can see, The 1D vector has been “normalized” to a unit vector of magnitude 1, but it still retains its directional information(in a 1D vector, the direction is just denoted by the +/- signs). We can now use this normalized vector to get other vectors in this general direction by multiplying any number to scale up this normalized vector($-1 * 6 = -6$; $8 * 1 = 8$).
The same can be applied to multiple dimensional vectors.

One last important piece of information, there are different ways to orient the x, y, z axis in a 3D world space, but for my project I have gone with something that looks like this. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/handedness-mine.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Imagine X value increases as one goes to the right. Y value increases as one goes forwards. Z increases as one goes upwards.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" url="https://www.oreilly.com/api/v2/epubs/urn:orm:book:9781788830409/files/assets/a465e4c5-b6ca-4006-a40e-1aa9ad2ebc5d.png" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Many systems make use of the right hand system. Many systems also take ‘Z’ as the UP vector, and ‘Y’ as the SIDE vector(which we will be following). We will be sticking with the Left hand system throughout our project.

Here’s a small test to see if you could keep up with the math,
What is $(1, 0, 0) \cdot (0, 0.826, 0)$? There are 2 formulas or one simple mathematical property which can be used to figure out the answer.

<details>
<summary>SPOILERS, Click to reveal answer</summary>

Using $(x, y, z) \cdot (i, j, k) = x \times i + y \times j + z \times k$:

$$
\begin{aligned}
(1, 0, 0) \cdot (0, 0.826, 0) &= (1 \times 0) + (0 \times 0.826) + (0 \times 0)\\
&= 0
\end{aligned}
$$

Using $\lvert A \rvert \lvert B \rvert \cos(\theta)$:

$$
\begin{aligned}
\lvert (1, 0, 0) \rvert &= \sqrt{1^2 + 0^2 + 0^2}\\
&= \sqrt{1^2}\\
&= 1\\

\lvert (0, 0.826, 0) \rvert &= \sqrt{0^2 + 0.826^2 + 0^2}\\
&= \sqrt{0.826^2}\\
&= 0.82\\\\

\theta &= 90^\circ\\\\

1 \times 0.82 \times \cos(90^\circ) &= 1 \times 0.82 \times 0\\
&= 0
\end{aligned}
$$

Using Property:
<br>
If the vectors are $90^\circ$ apart, $\cos(90^\circ) = 0$, the dot product would just be 0
<br><br>
We know, X component of A is non 0, and Y component of B is non 0, while all other components in A and B are 0. 
<br><br>
Hence we can conclude, A is pointing towards X, B is pointing towards Y. X and Y axis are $90^\circ$ apart, and hence using our property, we can just conclude that the dot product of A and B is just 0.
</details>

<br><br>

## Visualizing Vector Mathematics

Alright, let’s stop with all the ugly math and numbers for now. Let’s try to visualize what is exactly happening when I say $(0, 0.25, 5) + (7.2, 58, -87)$. 

<small><i>
Yes, i’m sorry for lying, you can’t really escape math and numbers, they might as well haunt your life, so just accept your fate
</i></small>

### Addition of vectors

Let’s take 2 example 2D vectors, $u = (1, 0)$ and $v = (0, 1)$

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1, 0)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(0, 1)$
    </div>
</div>

When I add them up together:

$$
\begin{aligned}
(x, y) + (i, j) &= (x+i, y+j)\\
(1, 0) + (0, 1) &= (1, 1)
\end{aligned}
$$

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1, 1)$
    </div>
</div>

In all my illustrations of vectors, the starting position has always been (0, 0), but as i’ve told in the previous chapter vectors aren’t “connected” to any point; We just take (0, 0) as a common point, to visualize them. 

A 2D Vector just holds 2 pieces of information:
1. Their own magnitude/strength.
2. Their direction/angle(in relation to some axis, typically the X-axis).

So, if vectors don’t have a starting point, nor an ending point, we can draw the 2 example vectors given above together, like this:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $u = (1, 0)$
            <br>
            $v = (0, 1)$
        </div>
    </div>
</div>

The resultant vector on the same graph looks something like this:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd5.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $u = (1, 0)$
            <br>
            $v = (0, 1)$
            <br>
            $w = (1, 1)$
        </div>
    </div>
</div>

This forms a triangle! 
Well, any 3 points connected together using lines forms a triangle on the plane of the 3 points. 
Take a look at the vector directions, $u + v$, where u is facing the starting position of v(again, we have just moved v’s starting position, as it doesn’t really matter), and the resultant vector starts from u’s starting position, and points at v’s ending position(ending position doesn’t matter as well).

This is the triangular law of vector addition!

Vector subtraction is similar, but the only difference is, we’ll be rotating the vector which is the subtrahend(totally didn’t search that term up, yup) $180^\circ$ across, before adding them up using the triangular law!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(1, 0)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectoradd4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $u = (1, 0)$
            <br>
            $v = (0, 1)$
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectorsub1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $u = (1, 0)$
            <br>
            $-v = -(0, 1)$
            <br>
            $-v = (0, -1)$
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectorsub2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $w = u - v = (u + (-v)) = (1, -1)$
        </div>
    </div>
</div>

We have already gone through multiplication of a 2D vector with a linear term(single number), but I will re-paste the example here.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/linear1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $(0.5, 0.5)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/linear2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $2 \times (0.5, 0.5) \to (1, 1)$
    </div>
</div>

Normalizing of a vector(i.e getting a unit vector in the same direction):

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectornorm1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $u = (0.5, 1)$
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectornorm2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            $v = \frac{u}{\lvert u \rvert}$
            <br>
            $\lvert v \rvert = 1$
            <br>
            $v = (0.4472, 0.8944)$
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vectornorm3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            u is longer than v<br>
            $u = (0.5, 1)$ <br>
            $\lvert u \rvert =  1.118$ <br><br>

            $v = (0.4472, 0.8944)$ <br>
            $\lvert v \rvert = 0.99996959… ~1$ <br><br>

            As we can see, the angle is the same
        </div>
    </div>
</div>

All these mathematical relations can be drawn for the 3rd dimension as well! I urge you to try and visualize these examples but in a 3D form, especially using your left hand to visualize the X, Y, Z axes.

A Science student in a 11th/12th grade physics exam, tends to hold their left and right hand out awkwardly, turning and twisting them to try and visualize 3D vectors! Go crazy, look at 3D objects and create a copy of it in your mind. Try imagining a box, and rotate it in your mind. Spin it around, look at it from the top, now look at it from the bottom, look at it from the backside! Do everything that helps you try and visualize 3D objects in your mind. 

<br><br>

## Visualizing and Usage of Basic Trigonometry

Percentages are very useful! 
Imagine a water tank. When I say the water tank is $50\%$ filled, you imagine the tank half filled. One can say, percentages act sort of like a Mathematical factor. If the water tank can hold $123$ liters of water, and if I were to say its $50\%$ filled, the total amount of water in said tank would be $(123 \times (50/100))$. The $50\%$ reduces to $50/100$ which works as a factor, on which after multiplying it with the ‘Total amount’, gives you the ‘Required amount’.

$50\%$ of $123$ liters is = $61.5$ liters.

Where many people use percentages, most mathematicians just scale down the percent range from $(0\% \to 100\%)$ to just between $(0 \to 1)$. To be honest, $50/%$, when reduced, becomes $50/100$, and when solved, gives us $0.5$ as the ‘factor fraction’. It’s just another way of representing percentages.

$$
\begin{aligned}
0\% &= 0.0\\
25\% &= 0.25\\
50\% &= 0.5\\
75\% &= 0.75\\
100\% &= 1\\
\end{aligned}
$$

Similarly, Trigonometric ratios are just fractions and percentages. The term ‘ratio’ in their name literally suggests that.

The basic trig functions are $\sin$, $\cos$, and $\tan$.
I won’t be going over the textbook definition, as, If I wanted to do that, I wouldn’t be writing this devlog, and I would ask the reader to just go read a textbook.

$\sin(\theta)$ basically gives the magnitude of the “Vertical” component of a unit vector which makes an angle  with the +x axis.

$\cos(\theta)$ gives the magnitude of the “Horizontal” component of a unit vector which makes an angle  with the +x axis.

Keep in mind: Vertical and Horizontal components might not always be Y-axis, and X-axis respectively. It depends on the orientation of the observer, the ‘axis’ which was taken as reference, the total angle made in relation to this reference angle, etc.

$\sin$, and $\cos$ returns back a single number which sort of works like a percentage(not exactly). $\sin$ gives the magnitude of this vector which is pointed vertically, and $\cos$ gives the magnitude of this vector is pointed horizontally. Like other percentages, $\sin(\theta) + \cos(\theta)$ adds up to 1. Does it? Well, not exactly~ Circles are sort of weird in their own ways! That’s why they aren’t exactly percentages.

By the way, rotations in math conventions are taken in an anticlockwise direction, and are measured from the +x axis.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/ratio1.webp" class="img-fluid rounded z-depth-1" width="50%" %}
    </div>
</div>

Imagine a unit circle(a circle whose radius is exactly 1 unit), and a vector on it. We know the magnitude of this vector is also 1 unit long. The vector is $\frac{\pi}{4}$ radians from the +x axis. [Recall, $\frac{\pi}{4} \text{radians} = 45^\circ$]. Therefore $\sin(\frac{\pi}{4}) = \frac{1}{\sqrt{2}}$, $\cos(\frac{\pi}{4}) = \frac{1}{\sqrt{2}}$.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/ratio2.webp" class="img-fluid rounded z-depth-1" width="50%" %}
    </div>
</div>

$\frac{1}{\sqrt{2}} ~ 0.707$, which is $70.7\%$. Therefore adding $\sin(\frac{\pi}{4}) + \cos(\frac{\pi}{4})$, we get $1.414$, which is $141\%$, which doesn’t make much sense. Hence, to get a proper percentage value which fits in between 0 and 1, we square the 2 terms, and then add them up together!

$$
\begin{aligned}
(\sin(\frac{\pi}{4}))^2 + (\cos(\frac{\pi}{4}))^2 &= \sin^2(\frac{\pi}{4}) + \cos^2(\frac{\pi}{4})\\
&= (0.707)^2 + (0.707)^2\\
&= 0.499 + 0.499\\
&= 0.998 ~1
\end{aligned}
$$

Hey, there’s a trig identity!

$\sin^2(x) + \cos^2(x) = 1$

We can imagine the trig identity in a similar fashion! Let vector `a` have an up component of $\sin(\theta_a)$, and let it have a horizontal component of $\cos(\theta_a)$. To get the total magnitude, we need to $\sqrt{x^2 + y^2}$, which in this case would be $\sqrt{\cos^2(\theta_a) + \sin^2(\theta_a)}$, and as the amplitude of $\sin$ and $\cos$ is just $1$, we don’t need to take a square root, as $\sqrt{1} = 1$.
Thus, we can also prove why $\sqrt{\cos^2(\theta_a) + \sin^2(\theta_a)} = 1$, for any angle $\theta_a$.

If my vector had a magnitude other than 1, then I would have to just scale up/down my factor(which in this case, is either $\sin$ or $\cos$ function) by the magnitude of the vector linearly.
The Vertical component of $a = (4, 2)$ is $\lvert a \rvert \times \sin(\theta_a)$, similarly, the horizontal component of a would be $\lvert a \rvert \times \cos(\theta_a)$.

If you would have seen the previous Image, then you might have figured out, you can convert these factors into a vector on the axis, and then add them up together to get the initial vector back.

Example:
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/ratio3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        <div>
            Unit Circle<br>
            $a = (4, 2)$
        </div>
    </div>
</div>

$\theta_a = 0.4636 = 26.5^\circ$

Vertical component factor(i.e VC) =>

$$
\begin{aligned}
(\lvert a \rvert \times \sin(\theta_a)) &= \lvert a \rvert \times 0.44717\\
&= 4.4721 \times 0.44717\\
&= 1.999 ~ 2
\end{aligned}
$$

This will be equal to the y component of the vector, as we are oriented in a way, y is equal to the vertical component

Horizontal component factor(i.e HC) =>

$$
\begin{aligned}
(\lvert a \rvert \times \cos(\theta_a)) &= \lvert a \rvert \times 0.8944\\
&= 4.4721 \times 0.8944\\
&= 3.999 ~ 4
\end{aligned}
$$

This will be equal to the x component of the vector for similar reasoning.

$$
\begin{aligned}

(\text{VC} \times (0, 1)) + (\text{HC} \times (1, 0)) &= a\\
(2 \times (0, 1)) + (4 \times (1, 0)) &= (0, 2) + (4, 0)\\ 
&= (4, 2)
\end{aligned}
$$

We went a full circle(trig pun unintended), and came back to the vector.

I urge you guys to visualize this! Try coming up with various other random vectors, and go full circle, and come back to the original vector. Calculator will be your friend! Also do try to use radians as much as possible.

Try to relate whatever you’ve learnt so far, and apply it to the given animation down below, and understand what is truly happening here!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" url="https://upload.wikimedia.org/wikipedia/commons/3/3b/Circle_cos_sin.gif" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Last function I will be going over is, $\tan^{-1}(x)$. 

$\tan(x)$ is defined as $\frac{\sin(x)}{\cos(x)}$. It has a bunch of really interesting use cases, but it isn’t used much here, so I won’t be going over it. $\tan^{-1}(x)$ however has an interesting use case of finding the angle of a vector, in relation to the x-axis(keep in mind, it’s in relation to the x-axis, it doesn’t have to be +x, it can also be from the -x side).

$\tan^{-1}(x)$ is defined as the inverse of $\tan(x)$, it has a domain of $(-\infty, \infty)$, and its range is $(-\frac{\pi}{2}, \frac{\pi}{2})$, or in terms of degrees $(-90^\circ, 90^\circ)$; Exclusive of both ends. 

$\tan^{-1}(x) \neq \frac{1}{\tan(x)}$

Wait, if a vector can rotate more than $90^\circ$ (we can have vectors like $(-1, 0)$ which are $180^\circ$ from the +x axis), then why does $\tan^{-1}(x)$’s range cut off at $90^\circ$? Well that’s where the “(keep in mind, it’s in relation to the x-axis, it doesn’t have to be +x, it can also be from the -x side)” comes into place.

The domain of $\tan^{-1}(x)$ sort of looks like this:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Passing both these vectors through $\tan^{-1}(x)$, gives you $\frac{\pi}{4} = 45^\circ$

This is one way of looking at $\tan^{-1}(x)$, but here’s a different approach. We’ll make use of the fact that vectors don’t have a starting point.

We can “move” a vector in our imagination from something like this.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

To something like this:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

We can then ignore everything on the left side,

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv5.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Even if the vector is pointed in the other way around, by doing this we can find the angle with respect to the +x axis, which is still $\frac{\pi}{4} = 45^\circ$

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv6.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

This is insanity! How do we mathematically obtain the angle - the vector  makes from the +x axis? Well~ technically you can’t, I will explain why in the next chapter.

So how do we get the angle? Well, now we use logic.

Let us dive deep into making sense of mathematical facts, using logic by defining our own ways of classifying vectors.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv7.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

In this scenario and orientation, the vertical component is represented by the Y-axis, and the horizontal component is represented by the X-axis. I will be using them interchangeably in this example.

Let’s take an example vector `v`, and let’s define our set of rules/protocols.

If the `y` component of `v` is +ve, and the `x` component of `v` is +ve, let’s consider the vector `v` to be in the 1st quadrant.

If the `y` component of `v` is +ve, and the `x` component of `v` is -ve, let’s consider the vector `v` to be in the 2nd quadrant.

If the `y` component of `v` is -ve, and the `x` component of `v` is -ve, let’s consider the vector `v` to be in the 3rd quadrant.

If the `y` component of `v` is -ve, and the `x` component of `v` is +ve, let’s consider the vector `v` to be in the 4rd quadrant.

Now, Let $\delta$ be some number.

Using these 4 rules, above, we can formulate a few other definitions.

If the vector is in the 1st Quadrant and 4th Quadrant, let $\delta = 0^\circ or 0\text{(in radians)}$.
If the vector is in the 2nd Quadrant and 3rd Quadrant, let $\delta = 180^\circ or \pi$.

We can now define the angle from +x axis to be $\delta + \tan^{-1}(x)$.

We can now make some deductions:

In the 1st Quadrant, the degrees will always be from $0^\circ \to 90^\circ$, as $\delta = 0^\circ$, and $\tan^{-1}(x)$ has a range of $[-90^\circ, 90^\circ]$, and in this instance, we only see $[0, 90^\circ]$

- $\delta + \tan^{-1}(x)$ has a range of $[0^\circ, 90^\circ]$ {in the 1st Quadrant}


In the 2nd Quadrant, the degrees will always be from $90^\circ \to 180^\circ$, as $\delta = 180^\circ$, and $\tan^{-1}(x)$ has a range of $[-90^\circ, 90^\circ]$, and in this instance, we only see $[-90^\circ, 0^\circ]$

- $\delta + \tan^{-1}(x)$ has a range of $[90^\circ, 180^\circ]$ {in the 2nd Quadrant}


In the 3rd Quadrant, the degrees will always be from $180^\circ \to 270^\circ$, as $\delta = 180^\circ$, and $\tan^{-1}(x)$ has a range of $[-90^\circ, 90^\circ]$, and in this instance, we only see $[0^\circ, 90^\circ]$

- $\delta + \tan^{-1}(x)$ has a range of $[180^\circ, 270^\circ]$ {in the 3rd Quadrant}


In the 4th Quadrant, the degrees will always be from $-90^\circ \to 0^\circ$, as $\delta = 0^\circ$, and $\tan^{-1}(x)$ has a range of $[-90^\circ, 90^\circ]$, and in this instance, we only see $[-90^\circ, 0^\circ]$

- $\delta + \tan^{-1}(x)$ has a range of $[-90^\circ, 0^\circ]$ {in the 4th Quadrant}


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/taninv8.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

We see a sudden shift after $270^\circ \to -90^\circ$, as $0^\circ$ can be taken as $360^\circ$, technically they both are the same. In fact we can take $\text{(any number)} \times 360^\circ = 0^\circ$. So $-90^\circ$ is literally $360^\circ - 90^\circ$, which is $= 270^\circ$

It’s just the same thing, but viewed in a different way.

<br><br>

## Absoluteness, Relativeness, Math, Philosophy

Math in its raw state doesn’t really give absolute answers. Think about it! It gives us functions like +, -, /, *, etc which work on other objects!

If you think the coordinate system we have been dealing with is absolute, well rethink again! We always talked about unit circles, unit vectors. What is a unit? Math just says, ‘unit’ is “1”. Well ‘1’ what? ‘1’ meter? ‘1’ Kilometer? It depends on what you want it to be!
Where is the $(0, 0)$ on a coordinate plane located? Is it physically in India? Is it located at the center of Earth? Is it located at the center of the universe? Nope. Is it located in your imagination? Well sort of. It’s just an imaginary relative coordinate system. If you want, the place you are standing/sitting in right now can also be taken as $(0, 0)$. Anywhere can be taken as $(0, 0)$.

That’s what math is all about! This is what I introduced in the last section of the previous chapter. Well, if math gives us relative answers, then how do we convert it to something physical? How do we make absolute sense of something that’s relative? Well that’s where logic comes into play. I gave a small hint of this in the previous chapter by defining our own set of rules, and then making sense of it.

I will give you a physical example of such an effect. In outer space, there is no UP, DOWN, SIDE, etc. Everything is in relation to some reference point. Here’s a thought experiment, imagine yourself in an empty void, there’s nothing around you, no stars in the sky, nothing. Well in that scenario, what is “UP”? What is “DOWN”?

We can define a reference point to our eyes, and say, anything that’s visible to me in the top horizon of my eyes, I will call that the “UP” direction and vice versa.
On earth, the reference point is taken as the direction of gravity. The direction of gravity dictates where “DOWN” is. “UP” is opposite of “DOWN”.

“NORTH”/”SOUTH”/”EAST”/”WEST” face a similar problem.

We as a human society have agreed upon certain protocols, such as 
“NORTH” is the direction where a magnetic compass points towards.
“EAST” is the direction where the sun rises.

Other directions like “south”/”west” can be derived from these 2 rules, we as a human society follow.

Setting such rules, and following them can help us go from a relative truth to an absolute truth.

Here’s an example of how I use this concept in my project.

The Left hand X-Y-Z axis system, where I set “Z” as the “UP” vector, “Y” as the “FORWARD” vector, and “X” as the “RIGHT” vector.

On my 2D computer screen, I can then program saying, if anything has a higher “Z” component in it, in relation to the camera’s position, draw that particular pixel on the top portion of the screen, and vice versa. This similar reasoning goes for left and right as well.

If I hadn’t set down and followed a particular set of rules, my project would have never worked.

I believe this “absoluteness” is an emergent property of following certain protocols. Similar emergent properties can be observed in nature all around us. All particles individually follow a set of laws since the birth of the universe, and here we are, a universe filled with wonder, life, cosmic beauty, and whatnot!
It’s the physicists job to figure out what this “universal law” is!

<br><br>

## Camera Projections

Finally! We are done with the basic math. There’s a bit more math, but we can do that on the way. Let’s get into the basics of ray tracing!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/camera_proj.webp" class="img-fluid rounded z-depth-1" width="60%" %}
    </div>
</div>

In the real world, the sun shines brightly in all directions. Some of its light reaches some objects, of which only some reflect off the object and reach our eyes. Now if we want a realistic looking render using the laws of physics, we can’t calculate infinite rays and bounces. Instead what we can do is, send a ray from each “pixel” and whenever that ray intersects with some object, we bounce it towards all light sources in the scene, and according to the brightness amount, we set the pixel’s color, which shot the ray, to the color of the object it has intersected * brightness_percent.

Pixels are shown as a checkered window in the given illustration.

How do we do this now?

Well, we know something about vectors, so let’s try to use those formulae. Let’s call a camera an object which has a few properties like position in 3D space, and the direction in which it points towards.

Remember, directional vectors are always normalized!

Now, for each pixel on the .png render image, we shift our camera origin by the pixel coordinate on the 2D screen, and we then cast a ray in the direction of the camera’s directional vector.

These are the types of Objects implemented in my system:

```cpp
enum ObjectType {
    Sphere_,
    PointLightning_,
    Camera_,
    NONE
}
```

This is how a general object looks in code:

```cpp
class Object3D{
public:
    int id;
    Vector origin;
    Vector normal;
    ObjectType type;
    // ...
}
```

This is how the camera looks in code. The camera inherits all properties of `Object3D`.

```cpp
class Camera : public Object3D {
public:
    unsigned int height, width;
    float max_clip, min_clip;
    // other hidden properties for now
    // ...
}
```

This works fine, until you realize the objects in the render don’t scale when you move closer to the object. “What do you mean?”, you ask. Well, here’s a simulation of what we are trying to do.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/cameraproj2.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

The top right view shows us the view of the camera we just implemented(imagine the window to be the camera). It is completely static, even if we move the object further/closer towards the window(camera).

Looking at this diagram, it sort of makes sense. The rectangular viewport remains the same size throughout the depth which the camera can view.
I.e The rectangular view doesn’t change size, the object remains the same size in relation to its surrounding (cylinders) when we move it closer/further from the camera.

After a bit of wikipedia surfing, I realized this is its own kind of projection called an “[Orthographic projection](https://en.wikipedia.org/wiki/Orthographic_projection)”. Its main property is that, the light rays are parallel to each other(which is what we made, “each pixel shoots off its own ray in the direction of the camera’s normal”), causing the distance of the object to feel as if it were at , and therefore, the size of the image of the object isn’t affected even if we move the object physically closer to the camera.

The type of projection we are looking for is called “[Perspective projection](https://en.wikipedia.org/wiki/Perspective_(graphical))”, where the objects are scaled according to their distance from the camera.

And for this, we need to make sure that the rays produced from the camera are not parallel to each other, but instead have a slight angular deviation, to sort of form a cone shaped viewport.

Here is an illustration of what that might look like.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/cameraproj3.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

However, at one end of the cone, it meets at a single point. Then what's the point of the window? Well we still need the window to see what pixel is going to be colored. The end point of the cone can be called the camera’s origin, and the distance from the origin to the pixel window can be called the focal distance.

<a id="camera_proj"></a>
Now, all we need to do is calculate the right/front/up (x/y/z) from the camera’s normal vector(if we take the normal of the camera to point “forwards”). We’ll save these 3 vectors in a variable inside the camera object itself, and call it “orthogonals”
Remember, as we only have 1 vector to figure out the orthogonals, we only have 2 degrees of rotation(i.e up/down, left/right, we can’t roll our view)

Here are the calculations for figuring out the x/y/z components in relation to the camera’s normal vector:

```cpp
// this = camera instance
this->orthogonals[0] = Vector(normal_.y, -this->normal.x, 0).normalize();
this->orthogonals[1] = normal_;
this->orthogonals[2] = (this->orthogonals[0].cross(normal_)).normalize();
```

It’s a tiny bit complicated to understand, don’t worry too much

Here’s the final version of how our camera object looks like:

```cpp
class Camera : public Object3D {
public:
    unsigned int height, width;
    float max_clip, min_clip;
    int focal_length;
    Vector orthogonals[3];
    // ...
}
```

Using these orthogonals, we can easily figure out the shift in the pixel coordinate on a 2D screen, convert those to a vector, then add it up with `focal_length * orthogonal.forward`, to get the total deviation direction from the point sized camera in terms of a vector.

```cpp
// this = camera instance
(this->orthogonals[1] * this->focal_length*2) + (this->orthogonals[0] * dx) + (this->orthogonals[2] * dz)
```

Where, dx and dz are defined as:

```cpp
for (unsigned int x = 0; x < this->width; x++)
    for (unsigned int z = 0; z < this->height; z++) {
        int dx = x - this->width/2;
        int dz = z - this->height/2;
        // ...
    }
```

dx gives the deviation in the horizontal component of our viewport(not the 3D environment) per pixel
dz gives the deviation in the vertical component of our viewport(not the 3D environment) per pixel

We can now easily calculate interactions with objects using this mathematical ‘Light ray’.

<br><br>

## Shooting Light Rays

Just a single vector cannot help us detect if we have intersected with an object. That’s because vectors are not physically connected to any points. They just convey magnitude(i.e some number), and direction. If we need to shoot “rays” from each pixel, we need to set its starting point at the camera’s origin, but as we just confirmed, vectors aren’t enough for that.

What if I create an object which contains a “starting point”(which can be represented by a vector), and then also make it contain the “directional vector”?? So we can imagine a ray which starts from the starting position, and then shoots off, into the direction which is parallel to the directional vector.

12th Grade NCERT Textbook gives us a really good theory backend for that kind of an object.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/mathtxtbook.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

As we can see, mathematicians are already far more ahead of us. It’s alright, we can use their work to build our systems. That's literally what engineers do!

Given in the extract, we see the way to represent a line in 3D geometry is using the mathematical notation of $\vec{r} = \vec{a} + >>\vec{b}$, where `a` is a point vector, and `b` is the directional vector. 

Directional vectors are only used to specify the direction, and are hence normalized when initializing them, although it isn’t necessary, we just normalize it for the convention. 

In that equation, `a` term and `b` term, cannot be added just like that, they represent 2 different quantities, and hence in code we can write something like this

```cpp
class Line{
public:
    Vector origin;
    Vector dir;
    // ...
}
```

We represent any point’s position on the line using this notation: $r = a + \lambda b$, where `r` is the point vector to a ‘general point’ on the line, `a` is the ‘starting position’, `λ` is any number(when a number is substituted for $\lambda$, it gives us a point on the line), and `b` is the ‘direction vector’.

On a 2D line, we can define the same formula in terms of $y = mx + c$, where (`y` ~ `r`), (`m` ~ `b`), (`x` ~ `λ`), (`c` ~ `a`) respectively, but those points are 1 dimensional.
$r = a + \lambda b$, the general point on a line formula, looks something like this if we take `a` as $(0, 0, 1)$, and `b` to be $(0, 1, 0)$, and if we animate `λ` to go from -5 to +5.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line1.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Recalling 6th and 7th grade geometry class, we know Line is not a Ray. The main difference is, “Line” extends in both directions to infinity, whereas Ray has a starting point, and only extends in one direction.
Then how can I call the ‘starting point’ in my code, the ‘origin point’? What even is ‘origin’, on an infinite line?

Well, I can trick the computer to ignore all calculations which are “behind” the origin point, i.e in the direction of -camera.direction (remember, -ve of a vector turns it 180°), and so we technically get a ray, by just using lines.

<br><br>

## Impact

Now that we can shoot a Ray from a camera position, how do we find out about the ray hitting an object?

To start off, let’s take the simplest 3D shape, a Sphere. It’s a simple shape as it has the same distance from the center/origin on the sphere to any point on the given sphere. And also rotation of a sphere doesn’t really change anything about the sphere model itself, and I don’t really want to deal with rotation of other complex 3D objects.

We can define 3 Cases of what happens when a ray intersects a 3D sphere. Here, I will just draw out the 3 scenarios on a 2D plane, please try and visualize this on a 3D scale. The camera is assumed to be at $(0, 0)$

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/3cases.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

1. Case 1(Blue line):
    The line doesn’t intersect the object.

2. Case 2(Black line):
    The line is tangential to the sphere. I.e It only intersects the sphere at a single point. (Very rare)

3. Case 3(Red line):
    The line intersects with the sphere at 2 points.

In this devlog, we will ignore the alpha channel of color. We won’t be considering transparency as that makes color combinations unnecessarily complex.

We can imagine the intersection to work something like this on a 2D plane:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line2.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Deriving a function which shows when a ‘Ray’ intersects a Sphere, gives a few equation.

12th grade NCERT textbook also gives us this set of rules.
<small><i>
I couldn’t find this anywhere in my math textbook, but I do remember my math teacher teaching us this topic
</i></small>

Solving these equations manually and converting them to code, gives us this:

```cpp
// this => sphere instance
double mu = pow(line.dir.x 2) + pow(line.dir.y, 2) + pow(line.dir.z, 2);

std::vector<ResultIntersection> ret_list;
if (mu == 0) return ret_list; // handle edge case

double lambda = -(
    line.dir.x * (line.origin.x - this->origin.x) + 
    line.dir.y * (line.origin.y - this->origin.y) + 
    line.dir.z * (line.origin.z - this->origin.z)
)/mu;

// point on line where the ray is closest to the sphere(from world origin)
Vector point = Vector(
    line.origin.x + line.dir.x*lambda,
    line.origin.y + line.dir.y*lambda,
    line.origin.z + line.dir.z*lambda
);
double dist = (point - this->origin).magnitude(); // dist b/w point on line to the center of sphere 
```

As seen from the code, we are going to calculate the distance between a point on the line, and the center of our sphere. The said point on the line is closest to the sphere’s origin point, and as such, it draws a perpendicular line from the line, to the center of the sphere, always.

When we draw this out, we see something like this:
There are 2 Cases: (The drawing is in 2D, but imagine it in 3D instead)

1. Case 1, Line doesn’t intersect the sphere

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line3.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

2. Case 2, The line intersects the sphere:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line4.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

When we draw it out, we see some relation between the (distance between the center point on the sphere and the closest point on the line) and (if the line intersects the sphere or not)

If the distance is lesser than or equal to the radius of the sphere, we can say that the line is intersecting with the sphere(as in Case2, and vice versa).

This little derivation I found out, was probably the one which boosted my way into learning more about ray-tracing, as until this point this was just another “Hobby project” of mine.

Before we get too much into the theory, let’s analyze the Sphere Object in code.

```cpp
class Sphere : public Object3D {
public:
    Color color;
    double radius;
    // ...
}
```

The sphere too derives components from “Object3D”, similar to the “Camera” Object, and hence it holds members which dictates its position, and its rotation.
Let’s forget rotation for now, as rotating a single colored sphere has no meaning.

Now, when a ray intersects with the sphere, we can return back the color of the sphere. Otherwise, let the function essentially return a “false”, which represents it hasn’t intersected with any object. Then the camera can just fill those pixels with the color of the background

<small><i>
whatever color you want! Or If you want, you can create a variable for that too, and expose it to the end user.
</i></small>

We run this “intersection” function from each ray, for all the visible 3D objects in the scene

<small><i>
We are omitting cameras, and pointlights, we’ll consider those objects to be invisible.
</i></small>

Hence this function gets called at least (`num-of-rays * total-spheres`) times. This is how that looks if the color was set to `R255 G255 B255`

<small><i>
RGB/Red Green Blue is 3 Bytes long, one byte is 0-255 in length, lesser the number(i.e towards 0), more darker is the color, higher the number(i.e towards 255), more lighter is the color. Hence RGB of 255, 255, 255 is plain white.
</i></small>

Setting up an example scene takes a few seconds to visualize the camera, sphere, and other objects in a 3D environment. If it may be hard to visualize, try out the [Geogebra 3D calculator](https://www.geogebra.org/3d) to map out the locations of components in your scene. This part is also mostly about trial and error, choosing the right coordinates, the right radius, etc. Take your time, and re-roll your numbers!

By the end, we end up with something that looks like this.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/sphere1.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Voila! We have a sphere! Well it looks more like a 2D circle than a 3D sphere. That’s because we haven’t implemented Lighting yet. Lighting does most of the heavy lifting for us, and gives objects dark spots, shadows, and really helps bring out the shape of the object.

<br><br>

## Drawing On Screen

Before we move on to shading, let’s talk about how we see the images captured.
There are multiple file types which store information about each pixel and an Image viewer app can go through this ordered list of pixels, and can draw them on screen.

Some of the multiple file types are, .png, .jpg, etc. These file types are just protocols to store a grid of pixels. Each file type has a specific protocol it follows. PNG, JPG, etc are complicated file types for us. We want to focus more on the ray tracing itself, than writing a PNG file saver. Instead, there are file type protocols, like the .ppm file type which helps us do our job way easier.

A simple ppm file layout/protocol looks like this, according to the [ppm/pam protocol](https://netpbm.sourceforge.net/doc/ppm.html):
```
P(VERSION)
(WIDTH) (HEIGHT)
(MAX VALUE)
(DATA)
```

We’ll be following version 3(Which says, There are 3 components in the data, i.e R, G, B). Our width and height is going to be stored inside the camera. The max value, as discussed earlier, is one unsigned byte, or 255 in terms of an integer. (An unsigned byte ranges [0, 255], whereas a signed byte ranges [-128, 127])

Let’s take an example .ppm file

```ppm
P3
2 3
255
0 0 0 255 0 0
0 255 0 0 0 255
128 128 128 255 255 255
```

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/ppmexample1.webp" class="img-fluid rounded z-depth-1" width="20%" %}
    </div>
</div>

As you can see, we take 3 sets of numbers together to form one color.

```
WIDTH = 2
HEIGHT = 3
0 0 0 = BLACK
255 0 0 = RED
0 255 0 = GREEN
0 0 255 = BLUE
128 128 128 = GRAY
255 255 255 = WHITE
```

There is a program called ‘[ffmpeg](https://ffmpeg.org/)’ which can be downloaded online. It allows me to convert a .ppm file to a .png file which a normal picture viewer can read and display. These modern viewers cannot view a .ppm file. I’ll let you surf the web and figure out how to use ffmpeg. 

Also remember, the normal picture viewer apps try to blend in the color when there are less pixels, and when you zoom in.
For example, the previous .ppm when converted to a .png file looks like this using my default png viewer.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/ppmexample2.webp" class="img-fluid rounded z-depth-1" width="20%" %}
    </div>
</div>

I use vscode’s inbuilt png viewer to view small png files, as that doesn’t blend pixels together when I zoom in.

To depict a 2D Grid of pixels- wait it can’t be 2D. We have 3 color channels per pixel. 2 Dimensions of size. So this entire grid is actually 3D. 2 Dimensions of size, and 1 Dimension of color.

Now, to depict this, we can make use of a 3D Matrix. Many languages allow us to make use of Matrices. I however had a few things in mind(such as parallelism, and I didn’t know how race cases worked in Cpp, If you haven’t heard of these, it’s fine), and didn’t really know what to do. I went with a very complicated approach.

I flattened out the fixed 3 Dimensional grid, onto a 1 Dimensional array, and then sequentially wrote it down in an image form.

In mental representation:

| <span style="color: white; background-color: #000000;">(0, 0, 0)</span> | <span style="color: white; background-color: #ff0000;">(255, 0, 0)</span> |
| <span style="color: white; background-color: #00ff00;">(0, 255, 0)</span> | <span style="color: white; background-color: #0000ff;">(0, 0, 255)</span> |
| <span style="color: black; background-color: #808080;">(128, 128, 128)</span> | <span style="color: black; background-color: #ffffff;">(255, 255, 255)</span> |

passing the above representation through a coordinate function, gives us a linear layout which can be stored in memory

| <span style="color: white; background-color: #000000;">(0, 0, 0)</span> | <span style="color: white; background-color: #ff0000;">(255, 0, 0)</span> | <span style="color: white; background-color: #00ff00;">(0, 255, 0)</span> | <span style="color: white; background-color: #0000ff;">(0, 0, 255)</span> | <span style="color: black; background-color: #808080;">(128, 128, 128)</span> | <span style="color: black; background-color: #ffffff;">(255, 255, 255)</span> |

And then write it down to a ppm file,

```ppm
P3
2 3
255
0 0 0 255 0 0 0 255 0 0 0 255 128 128 128 255 255 255
```

The file format doesn’t care about new lines. It knows when to start a new row of pixels due to the WIDTH, and HEIGHT option defined before 255(MAX VALUE).

Which then gets converted to a .png using ffmpeg, to this:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/ppmexample1.webp" class="img-fluid rounded z-depth-1" width="20%" %}
    </div>
</div>

The function which unwraps a 2D coordinate into a 1D array looks like this:

<small><i>
As the 3rd dimension is just color(for the most part, we can say we’ll be storing 3 colors, my project sometimes stores 4, 3, 1 colors for various different use cases), we can just skip 3 pieces of memory for every ‘pixel’.
</i></small>

```cpp
// this => Image
inline unsigned char* get_pixel(int y, int x) const {
    return (this->pixel) + (y)*(this->width)*this->filetype + (x)*this->filetype;
};
```

`this->pixels` refers to the pointer to the 1st index of the 3D grid of pixels.
`this->filetype` can be assumed to just be 3(R, G, B) for our devlog use case.

Therefore the function just looks like this:
```cpp
// this => Image
inline unsigned char* get_pixel(int y, int x) const {
    return (this->pixel) + (y)*(this->width)*3 + (x)*3;
};
```

The pointer after this function will point to the 1st byte/color of the pixel. We can then iterate 3 times over to the next byte to get the next color of 3 bytes long.

Here’s an example,
- Let `this->width` be 2.
- Let `this->pixels` be the memory address of the first pixel(the top left one)

- get_pixel(y, x)
- get_pixel(0, 0) = (first id) +   0 * 2 * 3 + 0 * 3    = (first id, 1st byte i.e <span style="color: white; background-color: #000000;">0</span>)
- get_pixel(0, 1) = (first id) +   0 * 2 * 3 + 1 * 3 = (first id + 3, 4th byte i.e <span style="color: white; background-color: #ff0000;">255</span>)
- get_pixel(1, 0) = (first id) +   1 * 2 * 3 + 0 * 3 = (first id + 6, 7th byte i.e <span style="color: white; background-color: #00ff00;">0</span>)
- get_pixel(1, 1) = (first id) +   1 * 2 * 3 + 1 * 3 = (first id + 9, 10th byte i.e <span style="color: white; background-color: #0000ff;">0</span>)
- get_pixel(2, 0) =(first id)+ 2 * 2 * 3 + 0 * 3 = (first id + 12, 13th byte i.e <span style="color: black; background-color: #808080;">128</span>)
- get_pixel(2, 1) =(first id)+ 2 * 2 * 3 + 1 * 3 = (first id + 15, 16th byte i.e <span style="color: black; background-color: #ffffff;">255</span>)

2D representation

| <span style="color: white; background-color: #000000;">(0, 0, 0)</span> | <span style="color: white; background-color: #ff0000;">(255, 0, 0)</span> |
| <span style="color: white; background-color: #00ff00;">(0, 255, 0)</span> | <span style="color: white; background-color: #0000ff;">(0, 0, 255)</span> |
| <span style="color: black; background-color: #808080;">(128, 128, 128)</span> | <span style="color: black; background-color: #ffffff;">(255, 255, 255)</span> |

1D memory

| <span style="color: white; background-color: #000000;">(0, 0, 0)</span> | <span style="color: white; background-color: #ff0000;">(255, 0, 0)</span> | <span style="color: white; background-color: #00ff00;">(0, 255, 0)</span> | <span style="color: white; background-color: #0000ff;">(0, 0, 255)</span> | <span style="color: black; background-color: #808080;">(128, 128, 128)</span> | <span style="color: black; background-color: #ffffff;">(255, 255, 255)</span> |

<br>
`get_pixel(y, x)` returns the memory address of the 1st color of the pixel coordinate entered. It doesn’t return the color. So, we can either write into this memory address to store a new color. Or read from the memory address to read a particular color(where we have to index 3 bytes at a time, to match with R,G,B values)

We can see this function works really well to “flatten” out a 3D grid to a 1D line.

Using these functions, we can write a class/object called `Image`, which connects over to the camera’s render function to write down the pixel color data in memory. Then we can call `Image.compile()` which writes down the 1D array of data into a `.ppm` file, which we can then later convert into a `.png` file for our viewing using ffmpeg.

<br><br>

## Shading

Let’s do a bit of theory before jumping right into the code.
We are following a shading model called “The Phong model”, in which there are 3 types of shading: Diffuse, Specular, and Ambient.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" url="https://upload.wikimedia.org/wikipedia/commons/6/6b/Phong_components_version_4.png" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

The Ambient lighting is just a constant number which just gives a small ‘glow’ overall equally. It’s literally ambient lighting from the surroundings.

Let’s create a variable called `TotalBrightness` in the intersection function, which is a percentage of brightness of each pixel(between 0.0 and 1.0), and let it originally be set to 0. Before returning back the color of the intersected pixel, we’ll multiply the pixel’s color with this `TotalBrightness` variable to get the final pixel color and brightness.

After everytime we modify the `TotalBrightness` value, we must make sure we clip it between 0.0 and 1.0, we don’t want colors which are > 255, nor do we want negative numbers.

If `TotalBrightness` is 0, then the `pixel_color_with_brightness = actual_pixel_color * 0.0`, which is color (0, 0, 0) = black

If `TotalBrightness` is 1, then `the pixel_color_with_brightness = actual_pixel_color * 1.0`, which is nothing but the actual pixel color itself!

To implement Ambient lighting, we’ll just set the default `TotalBrightness` to the Ambient Brightness term. In my project, I have a special class called `Scene` which holds the reference to all objects in the scene as a list, and it also has special information such as the background color, and ambient lighting of the entire scene.

The Ambient lighting is usually very low (in between 0.0 and 0.1, inclusive of both. If we set it to any higher value, we’ll lose our shading look, and we’ll go back to looking 2D)

The Diffuse lighting is what gives the object a 3D look, and the Specular gives an Illusion of reflections.

I didn’t build reflections as it is a bit more resource intensive in my implementation(as stated previously, my implementation definitely has some in-efficient math/algorithms involved, as I derived most of them myself).

Before we break down diffuse shading, let’s actually try and get the vector component for the main intersection point on the sphere.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line5.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

We can draw a line from the center of the sphere to the intersection, where the line meets the sphere.

Although, keep in mind, when doing this using actual math, there are 2 intersection points, but both of them are symmetric, so we can ‘ignore’ the one which is furthest away from the camera.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line6.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Using Pythagoras’s theorem, we can find the length of the purple line’s edge(As AP and PB are symmetrical, we’ll just find for the AP side), for the triangle APC, with P being $90^\circ$.

$$
\begin{aligned}
AP^2 + PC^2 &= AC^2 \text{(Pythagoras Theorem)}\\
AP^2 &= AC^2 - PC^2\\
AP &= \sqrt{AC^2 - PC^2}
\end{aligned}
$$

We know, $AC$ is just the radius of the sphere, $PC$ is the distance to the point on the line, we found in the previous tutorial.

Using these, we can find the distance of $AP$. This however doesn’t give us anything in particular. What we can do is, get the direction vector of the camera vector(which is normalized, i.e has a magnitude of 1), and then multiply it with $AP$, to get a vector in the direction of $AP$(as shown in the figure), and as large as $AP$.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Normalising the camera direction.
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line7.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Multiplying the directional vector by $AP$.
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line8.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

We know vectors don’t have a starting position, but in this relative scenario, we’ll be taking the camera point as the starting point. 

To find $\text{Camera} \to A$ vector, all we have to do is, find the $\text{Camera} \to P$ on the coordinate board(which we already have previously in the intersection chapter), we can then subtract $AP$ from the said vector.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line9.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Pay attention to the color of the vectors(to differentiate between them) and their direction.

Therefore:
Let $(text{Camera} \to P)$ vector be $C’P$
Let $(\text{Origin}(0, 0, 0) \to \text{Camera})$ vector be $C$

$C’A = C’P - AP$

If we had added $AP$ to $C’P$, we would have gotten the point which exists on the other side of the sphere, which we want to ignore.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/line10.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

We have our $\text{Camera} \to \text{Intersection}$ vector finally!

Do not shift this to $(0, 0)$ just yet! We’ll be making use of the fact that this vector emerges from the camera, which helps a lot in shading!

We can now ignore point $P$, but do not get rid of vector $CA$ (Center to point A) just yet! That vector is called the normal vector defined at that point, as it is exactly $90^\circ$ to the surface of the sphere at that point. It basically tells what direction that intersection point on the sphere is pointing at. This also helps a lot in shading!

Before we go ahead, let’s define what a “Point Light” is.

```cpp
class PointLighting : public Object3D {
public:
    double strength;
    // ...
}
```

We just have one field called strength, which is a number between 0 and 1. 
We want this field to be a percentage value, so we can multiply the brightness of a pixel by this percent value. 

This Point Lighting also derives from “Object3D”, and hence holds values such as Position, and Normal. The normal vector for a point source light doesn’t make much sense like the normal vector for spheres, so we will just ignore it!

Let’s also draw a vector from the intersection point to a light source(Try it out on paper using vector-math! Let’s take a closer look at the sphere, with only its normal vector, and the vector from its intersection point to a point source light.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/light1.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Here we have 3 intersection points just for an example. We need to try and figure out which points are colored brightly, and which points are a bit darker based on the given set of info.

Before we move on, let’s quickly implement shadows. When we find the direction of $(\text{intersection_point} \to \text{light})$, we can ‘summon’ another camera at that position, and run a ray interaction function towards the light. If the ray ‘hits’ any object, we can then conclude by not calculating the brightness factors.

<small><i>
We’ll still need ambient though, that should always be counted no matter what.
</i></small>

If there is an object, we can check the distance to the object, and then compare it to the distance to the point sourced light the camera/ray is pointed at, and then if the distance from the intersection point to the light source is lesser than the distance to the object, we can go ahead with the calculations.
This simple logic gives us shadows, almost for free, with no additional calculations.

To calculate brightness(take a look at the previous diagram once more).

We can guess the point which the Blue Normal line(The middle normal line from the center of the sphere) touches should be lit the most bright as it is directly below the light source/That part of the sphere is directly facing the light source.

We can see the angle between the normal and the vector point to light is somehow related to the brightness amount. With an angle of 0°, we see the brightest amount, and we can extrapolate, and imagine if the surface of the sphere is 90°+, the brightness should go to just 0.

This given set of logical info resembles a cos graph. (degrees in X axis, brightness value in Y axis)

<div class="row mt-3">
    <div class="col-sm text-center">
        <canvas id="cosChart2"></canvas>
    </div>
</div>

<script>
    new Chart(document.getElementById('cosChart2'), {
        type: 'line',
        data: {
            labels: [
                "0",
                "π/4","π/2","3π/4","π",
                "5π/4","3π/2","7π/4","2π"
            ],
            datasets: [{
                label: 'cos(x)',
                data: [
                    1,
                    0.707,0,-0.707,-1,
                    -0.707,0,0.707,1
                ],
                borderColor: '#FF6384',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: -1,
                    max: 1
                }
            }
        }
    });
</script>
<br>

At $0^\circ$, we have a factor of 1, with $90^\circ+$, we have a factor of < 0. We can just clamp this factor to just 0, so it doesn’t reach the negative scale. We can also ignore $270^\circ$ to $360^\circ$, as that is just angle $0^\circ$ to $-90^\circ$, i.e it's the angle the other way around from the reference point, which is totally fine!

<div class="row mt-3">
    <div class="col-sm text-center">
        <canvas id="cosChart_clamped"></canvas>
        $\cos(\theta)$ with Y axis clamped between 0 and 1
    </div>
</div>

<script>
    new Chart(document.getElementById('cosChart_clamped'), {
        type: 'line',
        data: {
            labels: [
                "0",
                "π/4","π/2","3π/4","π",
                "5π/4","3π/2","7π/4","2π"
            ],
            datasets: [{
                label: 'max(cos(x), 0)',
                data: [
                    1,
                    0.707,0,0,0,
                    0,0,0.707,1
                ],
                borderColor: '#FF6384',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: -0.2,
                    max: 1.2
                }
            }
        }
    });
</script>
<br>

To find $\cos(\theta)$ we first need to find the angle between the normal and the (intersection to light) vector. Instead of doing all those, we know a vector function which also implicitly works around the $\cos(\theta)$ of both those vectors.

We can now use [dot product](#dot-product)!

Dot product is defined in 2 ways:
1. $(x, y, z) \cdot (i, j, k) = x \times i + y \times j + z \times k$
2. $\lvert A \rvert \lvert B \rvert \cos(\theta)$ {where $\theta$ is the angle between the 2 vectors}

The 2nd definition doesn’t exactly give $\cos(\theta)$, it gives $\cos(\theta) \times \lvert A \rvert \times \lvert B \rvert$.

To ignore the other components/magnitudes of the vector, we can just turn them to ‘1’ by normalizing both the vectors before calculating the dot product.

We can then calculate the dot product using the 1st definition, and Voila! We now have $\cos(\theta)$ of both the vectors, we are left with a “diffuse brightness” factor.

We can now multiply this brightness factor to the strength of the light, and store it in a `TotalDiffuseBrightness` variable.

All we need to do is, do this for all point lightings that exist in the scene, and keep adding up to the `TotalDiffuseBrightness` variable until it reaches a max of value “1”. We don’t want any ‘factor’/’percentage’ to be greater than 1.

Once we have all of this, we can then add the `TotalDiffuseBrightness` to the `TotalBrightness`, which includes the ambient lighting factor as well. Remember to clamp it between 0.0 and 1.0!

Trying to render this, we end up with something like this.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/sphere2.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

We end up with a 3D looking sphere!!
We can move around the light’s 3D position, and see how it changes the final render.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/sphere3.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Is this the end? Of Course no! We have a lot more to implement!
We’ve done most of the heavy lifting. We just have to tweak it to implement certain other details.

Reminder to organize and rearrange your code from time to time after you make edits. Each edit might just make your code worse unless you intervene every now and then to clean up your mess.

Alright, Diffuse shading at most gives us a very matte look. To get better shading, we’ll need to add specular shading as well.

Specular shading works somewhat similar to diffuse shading, so we can run those calculations right next to diffuse shading code, for each light source from each pixel. 

This kind of shading however calculates the reflected ray direction, and takes $\cos(\theta)$ of the angle between this reflected ray and the direction from the intersection point to the camera. 
This basically allows us to make the pixel look brighter if the reflection ray is directly pointed towards the camera, else we’ll just scale it down.

We can calculate the reflected ray using this algorithm(again, try to visualize it. Draw the vector diagrams on a paper and solve it by hand to really understand what is going on)

```cpp
Vector reflected_ray = (res.normal * 
    (2*res.normal.dot(light_direction))
) - light_direction;
Vector view_vec = (Vector)ray.origin - res.intersection_point;
```

`view_vec` is the vector from the intersection_point to the camera.

1. Case 1, The reflected ray is directly pointed at the camera:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular1.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

The $\theta$ is just 0 here, hence taking a dot product of those 2 vectors(normalized) gives us $\cos(\theta)$ will inturn just gives us a specular factor of 1.0

2. Case 2, The reflected ray is pointed a bit away from the camera:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular2.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

The $\theta$ is > 0 here, hence taking a dot product of those 2 vectors(normalized) gives us $\cos(\theta)$ will inturn just gives us a specular factor of < 1.0

Before adding this factor to TotalBrightness, let’s scale Diffuse down a little bit, we don’t want to overshoot TotalBrightness of 1.

We have now have our Total brightness which looks like this(Scaling down Diffuse to 80%, and Specular to 20%, as Ambient is very small, we can ignore it, as, if the total value does go above 1, our clamp function will take care of it):

`TotalBrightness = Clamp(Ambient + (Diffuse * 0.8) + (Specular * 0.2))`

Let’s render, and see our results:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular3.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

I notice a couple of problems here. We somehow lose our dark borders at the edges. Let’s retry rending, but this time let’s move the light to one side, so we can see the darker areas clearly.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular4.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

We have definitely lost the “matte” -ish look, but we have also lost the dark edges. To get that back, we can just clamp the specular factor to between 0 and 1, as, if we recall, the dot product in the specular component can be negative.

`TotalBrightness = Clamp(Ambient + (Diffuse * 0.8) + (Clamp(Specular) * 0.2 * Diffuse))`

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular5.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

What if we could control how much “light the sphere reflected”, i.e how reflective that sphere is? If something is more reflective, then we see a stronger in brightness/smaller in size specular lighting. To imitate this, we can use the power function.

This is how your normal $y=x$ graph looks like. This is what happens if we take x to the power of some number. We’ll be ignoring every point except the points inside $0 < x < 1$, and $0 < y < 1$.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = x$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/power1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = x^2$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/power2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = x^3$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/power3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = x^4$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/power4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

As we can see, the line looks more squished downwards(points taken between $0<x<1$, and $0<y<1$) when we take the input to a stronger power.

We want to tighten the specular “reflection” to a smaller point as the distance increases from the center of the reflection point.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        From this,
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular_demo1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        To this,
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular_demo2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

We’ll apply similar powers to a $\cos(\theta)$ function, and let's see what results we end up with!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = \cos^1{x}$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/cos_power1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = \cos^2{x}$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/cos_power2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = \cos^3{x}$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/cos_power3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        $y = \cos^4{x}$
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/cos_power4.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

We can see the cos graph being squished. For our project, this isn’t enough! We’ll need to take cos to the power of (powers of 2) to get a good looking shade. We can take power numbers like (2, 8, 16, 32, 128, 256). We can call this number ‘roughness’(although I'm not sure if this is what the mainstream industry calls ‘roughness’. I’m just calling it roughness for the sake of my project)  I’ve set 32 as the maximum roughness amount in my project. I use the term “rough” and “specular” almost interchangeably in this document, even if they might have very different real life meanings attached to them.

To structure this in code, we can expose the roughness amount to the user, by making it a member of the sphere. When the user at the frontend sets up all the components, scene, etc, they can configure the color and the roughness of the sphere.

The Total Brightness factor looks something like this now:

`TotalBrightness = Clamp(Ambient + (Diffuse * 0.8) + (Clamp(Specular)^(roughness) * 0.2 * Diffuse))`

We can simplify it using more than one line.

`SpecularFactor = Clamp(Specular)^roughness`

`TotalBrightness = Clamp(Ambient + (Diffuse * 0.8) + (SpecularFactor * 0.2 * Diffuse))`

Remember, Diffuse and Specular is first found by sending out rays to each light source which exists in the scene, and checking if it can reach the light, then calculating the brightness amount provided by that light source. We add all the brightness factors by all light sources, and we end up with `Diffuse` and `Specular` variables. This formula above helps us combine these brightness values together, while looping through all the given light sources.

This is how it looks when we render now!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Roughness = 16
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular_sphere1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Roughness = 4
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/specular_sphere2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Also feel free to tweak certain numbers, edit the equations, multiplying/dividing some factor to ur implementation if you think you need it!

<br><br>

## Texturing

Before we dive into texturing a sphere, Let’s talk about UVs. No, I’m not talking about the spectrum of light after the visible range, I’m talking about converting a set of points(Usually in 3D) from one reference frame to another(usually in 2D). 

The 3D axes are named X, Y and Z, and therefore when converted into a 2D representation, the axes are named U and V, and hence we end up with a term called UV mapping.

Here are some examples and animations to make sense of UV mapping complex shapes.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/uv1.webp" class="img-fluid rounded z-depth-1" width="60%" %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/uv2.webp" class="img-fluid rounded z-depth-1" width="60%" %}
    </div>
</div>

You can think of it as a way to unfold an origami model into a sheet of paper. Then you can easily color the faces along the folds and creases, and then re-fold the paper back to a model to get a fully colored origami model.

Instead of coloring faces(how normal games and renderers do), as we are working with Ray-Tracing, we are working with points/pixels on screen directly and not faces. We’ll be coloring multiple points along the given face.

Here’s an animation clip from the [video](https://www.youtube.com/watch?v=sLqXFF8mlEU) by Sebastian Lague(An Amazing youtuber one must checkout) which does the same thing as mentioned above.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/sebastian.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

As you can see from the animation, we first unfold a sphere into multiple points onto a rectangle, where we can then use an image input to map it along the unfolded points, then we can fold back the points onto our sphere.

We have to now achieve this mathematically.

The UV image is the rectangular image you see in the animation, it's the image we’ll be mapping over the sphere. The main thing to remember with the UV representation is, both its height and width is a number between 0 and 1. How can an image have a width of 0.5? You might ask. Well, this is where we can multiply the said width factor(= 0.5), with the width of the input image(let’s say = 1920px), to get the final width of 960px, which is exactly in the middle of our input image. We can then query this pixel from our input image, and then pass it on as the color of the point.

From now onwards, as rectangles have weird dimensions, I'll just be using squares with equal dimensions in my project, as they are simple to work with, and they give little to none noise towards the end.

For this to work, we must squash our input rectangle into a square:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        From this
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth.webp" class="img-fluid rounded z-depth-1" width="60%" %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        To this
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

Let’s try to understand how to uncurl a sphere into a square.

In a UV plane, each point has 2 properties, namely the height and width which is unique for that point, and also defines its location on the UV grid. We need to find 2 properties for points on a sphere which denote its location from a reference point. One way we can do that is using angles from the “front of the sphere”.

Think of it this way. Let’s define the front of the sphere to be some vector pointing from the center to a certain point on the sphere. You will need to visualize your own “front” for this sphere. I went ahead such that the `Normal` member of `Object3D` defines the front of the sphere at vector position $(0, 1, 0)$, similar to how the camera calls $(0, 1, 0)$ “front” in my system.

Now we can project the given point on our sphere(Point B in the visualization) onto a horizontal plane which goes through the center of the sphere and the normal/front of the sphere(Point D). We can now calculate the angle between this new projected vector and our normal.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/horzplane.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

We do the same, but now for a vertical plane instead.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/vertplane.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

We know, these angles go from $0^\circ$ to $360^\circ$(that’s how angles work), we know UV coordinates run from 0 to 1. All we need to do is, map the angles to the UV coordinates. 

WAIT! Before we do that, we want a few things first. We want the normal to point at the middle of the UV texture, and not the start $(0, 0)$ of it. I want it to point to $(0.5, 0.5)$ on the UV texture. To do that, I’ll need to shift over the range of the angles from $0^\circ \to 360^\circ$($0$ to $2\pi$ in reality/radians), to something like $-180^\circ \to 180^\circ$($-\pi \to \pi$), where 0(which is in the middle) can map over to a value like 0.5.

This is all about math functional range manipulation, which is not that hard. If we know what our input is, all we need to do is, multiply/divide/add/subtract a few constants in a particular order, to get a different range towards the end.

Before I continue, I want to give a disclaimer. This is absolutely how one would not calculate UV’s in a real engine. This is just one way I figured out would work for my use case. This only has one degree of rotation, that is over the horizontal plane. I can rotate my normal around the vector $(0, 0, 1)$, on my horizontal plane, but when I try to tilt the normal up or down, the UV mapping breaks apart. To make something that works, most game engines make use of Quaternions, which are 4 Dimensional Unit Spheres to keep track of rotation, which is way too complex for my little brain at this point. Quaternions are really interesting, and I would honestly suggest [3Blue1Brown](https://www.youtube.com/@3blue1brown)’s video on the topic. ([Part 1](https://www.youtube.com/watch?v=d4EgbgTm0Bg)) ([Part 2](https://www.youtube.com/watch?v=zjMuIxRvygQ))

The interesting part now, is to get the angle from the projected vector to the sphere object’s normal vector.

When the ray intersects the object, we find the normal vector from the center of the sphere. This ‘normal’ vector is normalized, and can be sent to a function to figure out the angle between the point on the sphere to the sphere’s “front”/`Object3D.normal` vector.

To get the angle along the horizontal plane, all we need to do is a simple $\tan^{-1}(y/x)$. 

Cpp/C’s math library has a function called `atan2(y, x)` which does the same as inverse $\tan$, but it’s range is $[-\pi \to +\pi]$, unlike $\tan^{-1}(y/x)$, whose range is $[-\frac{\pi}{2} \to +\frac{\pi}{2}]$. `atan2` internally figures out which quadrant the vector lies in, and factors it in, and gives us a wider and more accurate range to work with. It also helps when x is 0, $\tan^{-1}(y/x)$, mathematically should give 2, but as you might have noticed, when x turns 0, the computer just throws a `Division By Zero` error, even before you send it through the $\tan^{-1}$ function. `atan2(y, x)` function has the edge cases built in.

<small><i>
Keep in mind, when Y is imagined to be up, and X is imagined to be right, as on a 2D grid, the angle between the vector can be found out using this method of `atan2(y, x)`.
</i></small>

To get the angle along the vertical plane, we need to ‘squish’ the 3 dimensions into just 2 dimensions, as we are now dealing with not just X, Y but also the Z(up) coordinates. We can ‘squish’ the X and Y into one plane, and then atan2 similarly with Z, to get our angle. I will explain how this works more later onwards. This ‘squishing’ on dimensions onto just one dimension can be achieved using taking square, adding' em up, and taking a square-root of the entire term. I’m basically just taking the magnitude, but one can image it to be ‘squishing’ X and Y dimensions into just a single vertical plane.

In this use case, we don’t even need to take square roots as these points are from our normal vector, and hence the magnitude will just be one even if we square it!

Therefore, the final angle is now found using `atan2(z, x2+y2)`.
Here, in our reference world, we imagine ‘z’ to be up, and the right side is the ‘squished’/’projected’ vector, and hence the vertical angle is found.

As stated before, we are only squishing for one angle, we can’t really do the same for the other angle. I believe this inconsistency is why I’m locked to just one degree of rotation.

Why can’t we squish while working from the other angle?
Well, let’s take a look at our projection image. This is called an equirectangular projection.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth.webp" class="img-fluid rounded z-depth-1" width="70%" %}
    </div>
</div>

I want you to imagine that you are looking at a 3D spherical model of the earth from the lat-long $0^\circ$, $0^\circ$. As you move right on the map, your angle on the imaginary globe starts increasing! Once you reach the edge on the map, you reach lat-long $0^\circ$, $180^\circ$, and you taper back to the other side of the map(left side), and you continue till you reach the center once again!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth_proj1.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Looking at our 3D earth model from a top-down view(from north pole), can help us visualize this relation from angle to UV. Assuming Greenwich to be $0^\circ$

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth_proj2.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

As the angle increases till $180^\circ$(vector sweeping across asia!) we can move to the right of the UV image(to cover Asia on the UV image). We can go back to $0^\circ$, and imagine as the angle decreases till $-180^\circ$ (vector sweeping across the Americas), we can move to the left of the UV image(to cover America on the UV image). 

We know `atan2` in C gives us a range of $-180^\circ \to 180^\circ$. So we can move on with this. 

The mappings can be summarized as the following:
Remember, the sign convention doesn’t really matter here, we can adjust them to our liking while working on the code. In this particular example, i’ve taken the vector lying on asia(as seen in the previous image), to be $+90^\circ$, and the other side of the globe to be $-90^\circ$.

| Degree/Radians | Point where the vector is pointing on earth |
| :----------- | :-----------: |
| $0^\circ$ / $0$ | Greenwich |
| $+90^\circ$ / $+\frac{\pi}{2}$ | Russia |
| $\pm180^\circ$ / $\pm\pi$ | International Date Line |
| $-90^\circ$ / $-\frac{\pi}{2}$ | East Coast of US |
| $360^\circ$ / $2\pi$ | Same as $0^\circ$ / $0$ |


Now that the horizontal angle is covered, can we do the same for the vertical angle? Take a look at the equirectangular image, and think for a while!

I ask you to reimagine looking at the globe from lat-long 0, 0; Now start moving north! You can imagine going through Europe, North pole, International Date Line, Pacific Ocean, South Pole, South African countries, and finally reaching lat-long 0, 0.

Plotting this same route on an equirectangular map, gives us this weird looking route!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth_proj3.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

This is a property of the equirectangular projection. This is why as you move North or South on the map, the area of the countries gets stretched even more!

The mapping for this one would be a little bit hard to imagine. Here’s an image of a globe (side view)

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/earth_proj4.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

As I turn upwards, I want to go towards $90^\circ$(i.e top of the UV image), and then (move aside to the left side of the UV). Then I want to move down the image again, back to 0 lat$.(+90^\circ \to 0^\circ)$. Then moving from $0^\circ \to -90^\circ$, moves directly downwards on the image, i.e the southpole. Then to move back to the center 0, 0, we move from $-90^\circ to 0^\circ$!
The mappings can be imagined as follows:

| Degree/Radians | Point where the vector is pointing on earth |
| :----------- | :-----------: |
| $0^\circ$ / $0$ | Greenwich |
| $+90^\circ$ / $+\frac{\pi}{2}$ | North Pole |
| $\pm180^\circ$ / $\pm\pi$ | Doesn't exist, as we only increase to $90^\circ$, and go back to $0^\circ$ |
| $-90^\circ$ / $-\frac{\pi}{2}$ | South Pole |
| $360^\circ$ / $2\pi$ | Same as $0^\circ$ / $0$ |

We can achieve both squishing of the dimensions as mentioned earlier, and the mirroring of the vertical(left/right) side on the other side by just squaring and adding up the normal’s `x` and `y` value, and taking inverse $\tan$ of `z` divided by the squared added term gives us our formula!

`atan2(z, (x^2 + y^2))` is our formula! We don’t need to take the square root of the 2nd argument as the vector’s magnitude is still 1.

Talking about square roots, here’s a fun fact about square root and the game development industry~ Division by square root is something that is very common in video games. We usually do that while normalizing vectors. Even if computers are really fast at solving math problems like addition, subtraction, etc, square roots are a bit hard to calculate, and on earlier versions it used to take ages to calculate a square root of a number. Similar to that, even division takes a bit of time to calculate unlike multiplication, etc.

To figure out a solution to the inverse square root operation, a game developer who worked for Quake III came up with a genius solution which included very low level manipulation of bits in such a way to get a very good approximation of an inverse square operation, really quick!
The game industry at the time suddenly boomed up thanks to them!

Do check out that case study on [youtube](https://www.youtube.com/watch?v=p8u_k2LIZyo)!

Nowadays, your computers and your compiler optimize each line, and computers are generally faster, so one doesn’t really require this algorithm! Our computers can now perform calculations faster than this algorithm. This case study mainly highlights the fact that, developers with a goal in mind, can literally achieve anything they want. We literally have the power to twist and turn the bytes on our CPUs to our will! We have knowledge about mathematical logic and ways to approximate complex calculations to our advantage! All we need to do is to combine these 2 together!

Here’s my implementation of the UV function:
`DD` is just a struct which holds 2 Double values in its members `a` and `b`.

```cpp
DD Sphere::get_uv(const Vector& point) {
    // point should be normalized before passing to this function

    DD sphere_angle_relatively = get_angle_static_ref(this->normal); // relative to static ref
    DD point_angle_relatively = get_angle_static_ref(point); // relative to static ref

    DD lat_long = point_angle_relatively - sphere_angle_relatively;
    
    // lat => [-pi/2, pi/2]
    // lon => [-3pi/2, pi/2]

    lat_long.a = 1 - ((lat_long.a + PI/2.0) / PI);

    lat_long.b = decimal_only(((lat_long.b + 3.0*PI/2.0) / (2.0 * PI)) + 0.75);
    // [-3PI/2, PI/2] -> [0, 1] linear
    // {0 > -pi/2 > -pi > -3pi/2 ^ pi/2 > 0} -> {0.5 > 0.25 > 0 ^ 1 ^ 0.75 > 0.5}

    return {
        lat_long.a, // phi / latitude
        latlong.b // lambda / longitude
    }
}
```

```cpp
DD get_angle_static_ref(const Vector& point) {
    // static reference is taken as (0, 1, 0)

    return {
        atan2(point.z, point.x*point.x + point.y*point.y), // phi/v -> latitude
        atan2(point.y, point.x) //lambda/theta/u -> longitude
    }
}
```

I can then use the latitude, and longitude (squashed to 0 to 1) returned by the get_uv function, which I can then multiply as a factor component with the UV image’s height and width to get the exact coordinate of the pixel color I would need to sample!

```cpp
Color Material::get_pixel_from_uv(const DD& uv, const Image& img) {
    ASSERT(uv.a >= 0.0 && uv.b >= 0.0);
    // a = latitude
    // b = longitude
    int x = min((int)(uv.a * img.width), img.width);
    int y = min((int)(uv.b * img.width), img.width);

    unsigned char* color = img.get_pixel(y, x);
    return Color(color[0], color[1], color[2], color[3] / 255.0);
}
```

<small><i>
The `color[3]` is the alpha channel, which isn't really required for our devlog, so you can just ignore it for now!
</i></small>

In ray-sphere intersection code:

```cpp
DD UV = this->get_uv(normal_intersection);
Color color = Material::get_pixel_from_uv(UV, *(this->material.get_image()));
```

I can now send this color back to the camera, and then display it instead of returning the sphere’s default color.

In camera’s ray-shoot function:

```cpp
Color base = objects_intersecting[objects_intersecting.size() - 1].color_of_intersection * 
    objects_intersecting[objects_intersecting.size() - 1].brightness;
```

You would need to handle a lot of matheatical and programming hidden cases, that im not covering here.

I’m basically getting the topmost/first object hit by the light beam, from the camera, and I'm multiplying with its brightness factor, which then later gets noted down in memory.

In main render function:

```cpp
Line ray1 = Line(this->origin, (this->orthogonals[1] * this->focal_length) + 
    (this->orthogonals[0] * dx) + 
    (this->orthogonals[2] * dz)
);

ResultIntersection intersection1 = this->ray_intersect_nearest_obj(
    scene, ray1, 1, -1, -1);
// color data is stored inside this ^^ variable

// using 3 as I don't want heap allocation. 
// Renderer only works on RGB, so statis 3 is enough.
unsigned char channels[3] = {
    (intersection1.color_of_intersection.r),
    (intersection1.color_of_intersection.g),
    (intersection1.color_of_intersection.b),
};

render->set_pixel((this->height - z), x, channels);
// ...
```

<br><br>

## Final Touches

We are mostly done with our implementation, and project for now. Lets add a few touches, such as making roughness value a 2D map instead of just a single value, using the same UV method to sample a grayscale image to get a roughness value for a particular pixel!

In the camera’s ray-shoot function:

```cpp
double dot = max(
    0., 
    reflected_ray
        .normalize()
        .dot(view_vec.normalize()));
double roughness = (7.5 / 255.0) *
    Material::get_pixel_from_uv(
        res.UV, 
        *(object_s->material.get_roughness())
    ).r - 2;
double specular = pow(
    max(0., dot), 
    pow(2, roughness)
);

double specular_factor = (0.55 / 4) * roughness + 0.33333;
res.brightness = (
    res.brightness + 
    (diffuse * 0.8) + 
    (specular * specular_factor)
);
/*If dealing with alpha, multiply with 
min(
    max(
        sin(res.color_of_intersection.a * PI * 0.5) +
        pow(res.color_of_intersection.a, 0.5) /2,

        0.0
    ),
    1.0
)
*/
```

We can also implement a normal map, which can help give our sphere a 3D-ish look, but I shall leave you to figure that one out! 

Hint: Go through the internet to figure out how normal maps work. We also [reuse a concept directly from the camera’s code](#camera_proj) to get relative deviation of a vector. It basically slightly changes the normal vector at each point based on a 2D map, which then leads to a different shade of that particular pixel, which gives it a 3D-ish look.

Using Normal maps, we can go from something that looks like this

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/final1.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

To something like this(take a look at Laos, Eastern Coast of the Arabian Peninsula, Western Coast of Australia, etc to notice the shading difference),

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/final2.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Using a normal map that looks like this:

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/normal_map.webp" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>

Normal calculation Code in the camera’s ray-shoot function:

```cpp
Vector normal_orthogonal[3];
normal_orthogonal[0] = Vector(res.normal.y, -res.normal.x, 0).normalize();
normal_orthogonal[1] = res.normal;
normal_orthogonal[2] = (normal_orthogonal[0].cross(res.normal)).normalize();

// new normal =
Color d_normal = Material::get_pixel_from_uv(
    res.UV, 
    *(object_s->material.get_normal())
);
Vector d_normal_v = Vector(
    (double)d_normal.r, 
    (double)d_normal.g, 
    (double)d_normal.b
); 
// exchangng b and g due to 
// industrial standards of 'Z' in normal maps
d_normal_v = ((d_normal_v / 255.0) * 2.0) -1.0;

res.normal = (
    (normal_orthogonal[0] * d_normal_v.x) +
    (normal_orthogonal[1] * d_normal_v.y) +
    (normal_orthogonal[2] * d_normal_v.z)
).normalize();
// ...
```

We can then later use `res.normal` to calculate specularness/roughness, diffuse shading, etc!

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/sphere1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
        Basic Rendering
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/sphere3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
        Adding Shading
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/base_earth.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
        Texturing the Sphere
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/final3.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
        Adding a Skybox/Background Image
        <br>
        <small>Just a big sphere from the cam's origin as center</small>
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/final1.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
        Adding Specular Highlights
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/final2.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
        Adding Normals
    </div>
</div>

<br>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Simple Animation by stacking multiple renders/frames.
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/water_molecule.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

<br>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Transparency
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/transparent.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>

<br>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 d-flex align-items-center justify-content-center">
        Moon
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/moon.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
</div>

<br><br>

## Small Note

For anyone who’s trying to, or atleast wants to build something similar to this, here are a few pointers(Cpp Pun unintended?) to keep in mind!

- It doesn’t matter what language you program this in. I started off by directly implementing this in python, as that was the only language I knew best! I learnt Cpp recently, and as it allows me to manipulate pointers and as such, I shifted my project to Cpp. I am probably not even using the full potential that Cpp gives me, but It doesn’t really matter as far as I’m working on the project.
- Use desmos, geogebra, physical papers to solve equations, and visualize the math going behind the theory. Play around with numbers in your program. Tweak constants, and see what happens!
- Experiment with a bunch of math formulas. Add, subtract, divide and multiply numbers here and there to figure out what’s going on in each equation.
- Most of the references I have used to build my project have sadly been taken down, but there are a lot more university notes available on the internet for free if you want to actually learn the theory behind these calculations!
- Before actually starting the project, I suggest you go through youtube videos explaining how ray tracing works in general.
- Youtube, Reddit, Stackoverflow, are your best friends. Use them as much as you can! Try asking other people for help if you feel stuck.
- The ray-tracer slows down a lot later, especially after adding specular shading if you haven’t parallelized it yet. Until then, you can just focus on adding basic diffuse shading.
- There are various other parts to this project that I didn’t even touch in this devlog, such as parallelizing/multithreading calculations of ray-intersections(the main reason why I shifted to Cpp, and the reason I'm using raw pointers). I don’t exactly know how to implement multithreading in Cpp, which is why I’m using a library called [BS_ThreadPool](https://github.com/bshoshany/thread-pool). There is also an Image class which I have written myself which helps me read and write images to disk. It stores the entire image data in one long array, which is easier for me to visualize than a huge matrix while trying to parallelize the calculations. This image class is also responsible for reading images in, such as texture maps. It has 3 modes: RGBA, RGB, Grayscale, to save as much memory as possible.

```cpp
enum FileType {
    GrayScale = 1,
    RGB = 3,
    RGBA = 4,
};

class Image {
public:
    unsigned char* pixels;
    int height, width;
    FileType filetype;

    Image(
        unsigned int width, 
        unsigned int height, 
        FileType filetype
    );
    Image(const Color& single_color);
    Image(std::string filename, FileType filetype);
    ~Image();

    void compile(const std::string& filename, bool png = true);
    inline unsigned char* get_pixel(int y, int x) const {
        return (this->pixels) + 
            y*(this->width)*(this->filetype) +
            x*(this->filetype);
    };

    void set_pixel(unsigned int y, unsigned int x, unsigned char* channel);
    // ...
}
```

I also try to imitate anti-aliasing, which is basically a way to make jagged edges more smooth, and I achieve this by taking 4 ray-shoot samples per pixel(in their own directions with a slight deviation), and then averaging out their color values! 

The Image now takes even longer to render as you are rendering them at double resolution(in each direction, width and height), and averaging out the pixels!

```cpp
BS::thread_pool pool;

pool.detach_loop<unsigned int>(0, this->width * this->height,
    [&render, this, scene](unsigned int i)
    {
        // [(i//h, i%h) for i in l] where l is width * height
        int x = 2 * (i / this->height);
        int z = 2 * (i % this->height);

        int dx = x - this->width;
        int dz = z - this->height;

        Line ray1 = Line(this->origin, 
            (this->orthogonals[1] * this->focal_length) + 
            (this->orthogonals[0] * dx) + 
            (this->orthogonals[2] * dz)
        );
        Line ray2 = Line(this->origin, 
            (this->orthogonals[1] * this->focal_length) + 
            (this->orthogonals[0] * dx + 1) + 
            (this->orthogonals[2] * dz)
        );
        Line ray3 = Line(this->origin, 
            (this->orthogonals[1] * this->focal_length) + 
            (this->orthogonals[0] * dx) + 
            (this->orthogonals[2] * dz + 1)
        );
        Line ray4 = Line(this->origin, 
            (this->orthogonals[1] * this->focal_length) + 
            (this->orthogonals[0] * dx + 1) + 
            (this->orthogonals[2] * dz + 1)
        );

        ResultIntersection intersection1 = this->ray_intersect_nearest_obj(
            scene, ray1, 1, -1, -1);
        ResultIntersection intersection2 = this->ray_intersect_nearest_obj(
            scene, ray1, 1, -1, -1);
        ResultIntersection intersection3 = this->ray_intersect_nearest_obj(
            scene, ray1, 1, -1, -1);
        ResultIntersection intersection4 = this->ray_intersect_nearest_obj(
            scene, ray1, 1, -1, -1);
        // color data is stored inside this ^^ variable

        // using 3 as I don't want heap allocation. 
        // Renderer only works on RGB, so statis 3 is enough.
        unsigned char channels[3] = {
            (
                intersection1.color_of_intersection.r + 
                intersection2.color_of_intersection.r +
                intersection3.color_of_intersection.r + 
                intersection4.color_of_intersection.r
            ) / 4,
            (
                intersection1.color_of_intersection.g + 
                intersection2.color_of_intersection.g +
                intersection3.color_of_intersection.g + 
                intersection4.color_of_intersection.g
            ) / 4,
            (
                intersection1.color_of_intersection.b + 
                intersection2.color_of_intersection.b +
                intersection3.color_of_intersection.b + 
                intersection4.color_of_intersection.b
            ) / 4,
        };

        render->set_pixel((this->height - z), x, channels);
    },
    4
);

pool.wait();
```

Then there’s also the frontend part where I have to arrange the spheres and the lights in a good way so I can present them. I also need math, (especially sin and cos functions) if I want to animate them in a certain way.

I’m really proud of the fact that I could figure most of the concepts using basic derived logic and very simple math formulas from my 11th and 12th grade classes. I only ever used other references only if I was seriously stuck.


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/raytracing/anim.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
</div>

<br><br>

## References
- [https://cal.cs.umbc.edu/Courses/CMSC435-F15/Slides/raytrace.pdf](https://cal.cs.umbc.edu/Courses/CMSC435-F15/Slides/raytrace.pdf)
- [https://www.youtube.com/watch?v=gfW1Fhd9u9Q&list=PLlrATfBNZ98edc5GshdBtREv5asFW3yXl](https://www.youtube.com/watch?v=gfW1Fhd9u9Q&list=PLlrATfBNZ98edc5GshdBtREv5asFW3yXl)
- [https://www.youtube.com/watch?v=Qz0KTGYJtUk](https://www.youtube.com/watch?v=Qz0KTGYJtUk)
- [https://en.wikipedia.org/wiki/Ray_tracing_(graphics)](https://en.wikipedia.org/wiki/Ray_tracing_(graphics))
