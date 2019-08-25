//Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-129664743-1");

//Template
require("./assets/css/main.css");
require("./assets/css/custom.css");
require("./assets/css/noscript.css");
require("./images/avatar.png");

if ("addEventListener" in window) {
  window.addEventListener("load", function() {
    document.body.className = document.body.className.replace(/\bis-preload\b/, "");
  });
  document.body.className += navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? " is-ie" : "";
}

var theActualDate = new Date();
document.getElementById("span_Year").innerHTML = theActualDate.getFullYear();
