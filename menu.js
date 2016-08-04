Menu = function () {

  this.init = function () {
    this._bindMenuOpenedListener();
  };

  this._bindMenuOpenedListener = function () {
    var printAndExportSelector = ".js-share";
    var self = this;
    $(document).on('mouseup', printAndExportSelector, function () {
      self._addInterval = setInterval(self._addExcelExportLink.bind(self), 500);
    });
  };

  this._addExcelExportLink = function () {
    if (this._optionAlreadyExist()) {
      clearInterval(this._addInterval);
      return;
    }

    if (this._overlayMenuIsOpened()) {
      this._addExportToExcelOption($exportJSONLink);
    }
  }

  this._addExportToExcelOption = function ($exportJSONLink) {
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
  };

  this._overlayMenuIsOpened = function () {
    var $exportJSONLink = $('a.js-export-json');
    return $exportJSONLink.length;
  };

  this._optionAlreadyExist = function () {
    return $('.pop-over-list').find('.js-export-excel').length;
  };

};
