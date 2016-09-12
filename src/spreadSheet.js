var SpreadSheet = function (boardTitle) {
  this.file = {
    worksheets: [[]], creator: 'Trello Tracker', created: new Date(),
    lastModifiedBy: 'Trello Tracker', modified: new Date(), activeWorksheet: 0
  };

  this.worksheet = this.file.worksheets[0];
  this.worksheet.name = boardTitle.substring(0, 22);
  this.worksheet.data = [];
};

SpreadSheet.prototype.addRows = function (rows) {
  $.each(rows, $.proxy(this._addRow, this));
};

SpreadSheet.prototype.addHeader = function (header) {
  this.worksheet.data[0] = header;
};

SpreadSheet.prototype.getRows = function () {
  return this.worksheet.data;
};

SpreadSheet.prototype.getRow = function (index) {
  return this.getRows()[index];
};

SpreadSheet.prototype.export = function () {
  var byteString = window.atob(xlsx(this.file).base64);
  var intArray = new Uint8Array(new ArrayBuffer(byteString.length));
  for (var i = 0; i < byteString.length; i += 1) {
    intArray[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([intArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  saveAs(blob, this.worksheet.name + '.xlsx');
};

SpreadSheet.prototype._addRow = function (i, rowData) {
  this.worksheet.data.push(rowData);
};
