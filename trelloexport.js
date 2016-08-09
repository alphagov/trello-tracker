window.URL = window.webkitURL || window.URL;

function createExcelExport() {
  "use strict";
  new Factcheck().createExport();
  $("a.pop-over-header-close-btn")[0].click();
}


// on DOM load
$(function () {
  "use strict";

  new Menu().init();
});
