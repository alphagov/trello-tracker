window.URL = window.webkitURL || window.URL;

function createExcelExport() {
  "use strict";

  new TrelloAPI().getAllCards(function (data, listName) {

    var spreadSheet = new SpreadSheet(listName);
    spreadSheet.addHeader(['Title', 'Description', 'Due', 'Labels', 'Card #', 'Card URL']);

    var rows = new Factcheck(data).transformRows();
    spreadSheet.addRows(rows);

    spreadSheet.export();
    $("a.pop-over-header-close-btn")[0].click();
  });

}


// on DOM load
$(function () {
  "use strict";

  new Menu().init();
});
