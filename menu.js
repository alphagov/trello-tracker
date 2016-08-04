Menu = function () {

  this.init = function () {
    // Look for clicks on the .js-share class, which is
    // the "Share, Print, Export..." link on the board header option list
    $(document).on('mouseup', ".js-share", function () {
      this.addInterval = setInterval(_addExportLink, 500);
    });
  }

  // Add a Export Excel button to the DOM and trigger export if clicked
  function _addExportLink() {
    "use strict";
    //alert('add');

    var $js_btn = $('a.js-export-json'); // Export JSON link

    // See if our Export Excel is already there
    if ($('.pop-over-list').find('.js-export-excel').length) {
      clearInterval(this.addInterval);
      return;
    }

    // The new link/button
    if ($js_btn.length) {
      var $excel_btn = $('<a>')
          .attr({
            'class': 'js-export-excel',
            'href': '#',
            'target': '_blank',
            'title': 'Open downloaded file with Excel8'
          });
      $excel_btn.text('Export Excel')
          .click(createExcelExport)
          .insertAfter($js_btn.parent())
          .wrap(document.createElement("li"));
    }
  }


};
