SpreadSheet = function (boardTitle) {

  this._init = function () {
    this.file = {
      worksheets: [[]],
      creator: 'Trello Tracker',
      created: new Date(),
      lastModifiedBy: 'Trello Tracker',
      modified: new Date(),
      activeWorksheet: 0
    };

    this.worksheet = this.file.worksheets[0];
    this.worksheet.name = boardTitle.substring(0, 22);  // Over 22 chars causes Excel error, don't know why
    this.worksheet.data = [];

  };

  this.addRows = function (rows) {
    var self = this;
    $.each(rows, function (i, row) {
      self._addRow(row);
    });
  };

  this.addHeader = function (header) {
    this.worksheet.data[0] = header;
  };

  this.getRows = function () {
    return this.worksheet.data;
  };

  this.getRow = function (index) {
    return this.getRows()[index];
  };

  this.export = function () {
    var byteString = window.atob(xlsx(this.file).base64);
    var buffer = new ArrayBuffer(byteString.length);
    var intArray = new Uint8Array(buffer);

    for (var i = 0; i < byteString.length; i += 1) {
      intArray[i] = byteString.charCodeAt(i);
    }

    var blob = new Blob([intArray], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, boardTitle + '.xlsx');
  };

  this._addRow = function (rowData) {
    this.worksheet.data.push(rowData);
  };

  this._init();
};
