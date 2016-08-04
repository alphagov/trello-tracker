Menu = function () {

  this.init = function () {
    this._bindMenuOpenedListener();
  }

  this._bindMenuOpenedListener = function () {
    var printAndExportSelector = ".js-share";
    var self = this;
    $(document).on('mouseup', printAndExportSelector, function () {
      self._addInterval = setInterval(self._addExcelExportLink.bind(self), 500);
    });
  };

  this._addExcelExportLink = function () {
    var $exportJSONLink = $('a.js-export-json');

    if (this._optionAlreadyExist()) {
      clearInterval(this._addInterval);
      return;
    }

    // The new link/button
    if ($exportJSONLink.length) {
      var $excel_btn = $('<a>')
          .attr({
            'class': 'js-export-excel',
            'href': '#',
            'target': '_blank',
            'title': 'Open downloaded file with Excel8'
          });
      $excel_btn.text('Export Excel')
          .click(createExcelExport)
          .insertAfter($exportJSONLink.parent())
          .wrap(document.createElement("li"));
    }
  }

  this._optionAlreadyExist = function () {
    return $('.pop-over-list').find('.js-export-excel').length;
  };

};
