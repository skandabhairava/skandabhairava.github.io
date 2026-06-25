---
layout: page
title: Custom URI Scheme (Golang)
description: Golang Library to build executables which can startup by visiting a custom URL
img:
importance: 
category: library
related_publications: false
---

### Introduction
This library allows you to define your GO program as an App, which helps you to setup a custom URI scheme/protocol to start the app from browsers, etc.

### OSs Implemented:
- Windows
- Linux

### Install:
```
go get github.com/skandabhairava/CustomUriScheme
go mod tidy
```

### Usage:
```go
package main

import (
	"fmt"
	"os"

	customurlscheme "github.com/skandabhairava/CustomUriScheme"
)

func main() {
	exe, err := os.Executable()
	if err != nil {
		panic(err)
	}

	app := customurlscheme.App{         
		BundleID: "com.acmecorp.test",   // Bundle ID
		Vendor:   "AcmeCorp",            // Name of the Vendor
		Name:     "Acme",              // Name of the App
		Exec:     exe,                  // path to the executable file
	}

    // Check if App is already installed, if not Install the URI Scheme
	if !app.IsInstalled() {
		err := app.Install([]string{"acme"})
		if err != nil {
			panic(err)
		}
	}

    // Calling through URI Scheme starts app with the 1st command-line argument as the URI used to start the app
	fmt.Println(os.Args)
    // ["/home/user/Desktop/Adcme", "acme://test"]


    // running the app with `Acme uninstall` uninstalls the app from OS registeries.
    if slices.Contains(os.Args, "uninstall") {
        fmt.Println("Uninstalling app!")
        myApp.Uninstall()
    }
}
```

### Where to find:
Code: [Github](https://github.com/skandabhairava/CustomUriScheme)