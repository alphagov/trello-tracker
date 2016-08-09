window.URL = window.webkitURL || window.URL;

$(function () {
  "use strict";

  var config = {
    option1: new Factcheck()
  };
  new Menu(config).init();
});
