let nomnomlTheme = determineComputedTheme();

/* Create nomnoml diagram as another node and hide the code block, appending the nomnoml node after it
    this is done to enable retrieving the code again when changing theme between light/dark */
    
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    document.querySelectorAll("pre>code.language-nomnoml").forEach((elem) => {
      const nomnomlCode = elem.textContent;
      let strokeColor = "#fill: #eee8d5; #fdf6e3\n#stroke: #33322E\n"
      if (nomnomlTheme === "dark") {
        strokeColor = "#fill: #555555; #555555\n#stroke: #eeeeee\n"
      }
      const svgCode = nomnoml.renderSvg(strokeColor+nomnomlCode);
      const backup = elem.parentElement;
      backup.classList.add("unloaded");
      /* create nomnoml node */
      let nomnomlElem = document.createElement("pre");
      nomnomlElem.classList.add("nomnoml");
      nomnomlElem.innerHTML = svgCode;
      backup.after(nomnomlElem);

      let svgElem = nomnomlElem.querySelector('svg');
      if (svgElem) {
        svgElem.setAttribute('width', '100%');
      }
    });

    /* Zoomable nomnoml diagrams */
    if (typeof d3 !== "undefined") {
      window.addEventListener("load", function () {
        var svgs = d3.selectAll(".nomnoml svg");

        svgs.each(function () {
          var svg = d3.select(this);

          // Wrap the SVG contents so only the diagram is transformed
          svg.html("<g>" + svg.html() + "</g>");

          var inner = svg.select("g");

          var zoom = d3.zoom().on("zoom", function (event) {
            inner.attr("transform", event.transform);
            updateResetButton(event.transform);
          });

          svg.call(zoom);

          // Create reset button
          var container = svg.node().parentElement;

          var resetButton = document.createElement("button");
          resetButton.textContent = "Reset zoom";
          resetButton.classList.add("nomnoml-reset-zoom");

          // Hidden until the diagram is moved
          resetButton.style.display = "none";

          // Overlay it on top of the diagram
          container.appendChild(resetButton);

          function updateResetButton(transform) {
            var isDefault =
              transform.x === 0 &&
              transform.y === 0 &&
              transform.k === 1;

            resetButton.style.display = isDefault ? "none" : "block";
          }

          resetButton.addEventListener("click", function (event) {
            // Prevent the button click from being interpreted as an SVG interaction
            event.stopPropagation();

            svg
              .transition()
              .duration(250)
              .call(zoom.transform, d3.zoomIdentity);
          });
        });
      });
    }

  }
});
