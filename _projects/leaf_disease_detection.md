---
layout: page
title: Leaf Disease Detection
description: Wrote my own CNN in Pytorch
img: assets/img/projects/leafdd/leaf.webp
importance: 
category: learning
related_publications: false
---

### Introduction
Learnt how to work with Pytorch by writing my own CNN to detect type of leaf disease in Tomato leaves.

### Dataset
[Kaggle - Tomato leaf disease detection](https://www.kaggle.com/datasets/kaustubhb999/tomatoleaf)

### Notebook

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/projects/leafdd/leaf_learn.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/projects/leafdd/leaf_learn.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}


<br>
<br>

### Results
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid  path="assets/img/projects/leafdd/final_accuracy.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid  path="assets/img/projects/leafdd/train_acc.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid  path="assets/img/projects/leafdd/metrics.webp" class="img-fluid rounded z-depth-1" width="80%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid  path="assets/img/projects/leafdd/time2train.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid  path="assets/img/projects/leafdd/no_params.webp" class="img-fluid rounded z-depth-1" width="60%" zoomable=true %}
    </div>
</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 text-center">
        {% include figure.liquid  path="assets/img/projects/leafdd/confusion.webp" class="img-fluid rounded z-depth-1" width="20%" zoomable=true %}
    </div>
</div>


### Where to find:
Code: [Github](https://github.com/skandabhairava/LeafDiseaseDetection)