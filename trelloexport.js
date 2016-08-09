window.URL = window.webkitURL || window.URL;

function createExcelExport() {
  "use strict";
  new Factcheck().createExport();
}


// on DOM load
$(function () {
  "use strict";

  new Menu().init();
});
