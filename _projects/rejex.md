---
layout: page
title: Rejex (Python)
description: Python Library to build Regex expressions
img:
importance: 
category: library
related_publications: false
---

### Introduction
This library provides functions to help build complex regex syntaxes efficiently.

### Install:
```
pip install --upgrade rejex #For windows
uv add rejex
```

### Usage:
```py
import rejex
from rejex import Rejex, Static

rejex_test = (
        Rejex()
            .zero_or_one(
                Rejex()
                    .literal("+")
                    .one_or_more(
                        Static.any_number()
                    )
                    .compile()
            )
            .zero_or_one(Static.literal(" "))
            .zero_or_one(Static.literal("("))
            .n_number_times(3, Static.any_number())
            .zero_or_one(Static.literal(")"))
            .zero_or_one(Static.literal(" "))
            .n_number_times(3, Static.any_number())
            .zero_or_one(Static.alternative(Static.literal("-"), Static.literal(" ")))
            .n_number_times(4, Static.any_number())
        .compile()
    )

rejex.test_regex(rejex_test, "+1 (123) 123 4567") #True
"""
-------------------------------
regex_pattern='(\+(\d)+)? ?(\()?(\d){3}(\))? ?(\d){3}((-| ))?(\d){4}'
string='+1 (123) 123 4567'
match=True
-------------------------------
"""
```

### Where to find:
Code: [Github](https://github.com/skandabhairava/Rejex)