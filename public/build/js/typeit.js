document.addEventListener("DOMContentLoaded", function() {
    new TypeIt("#title", { 
        strings: ["{ Hello World }", "I'm Brainer 👋"],
        speed: 100,
        waitUntilVisible: true,
      }).go();
    })