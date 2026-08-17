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
          svg.html("<g>" + svg.html() + "</g>");
          var inner = svg.select("g");
          var zoom = d3.zoom().on("zoom", function (event) {
            inner.attr("transform", event.transform);
          });
          svg.call(zoom);
        });
      });
    }
  }
});
