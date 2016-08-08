Excel = function () {

  this.export = function (file, boardTitle) {
    // We want just the base64 part of the output of xlsx.js
    // since we are not leveraging they standard transfer process.
    var byteString = window.atob(xlsx(file).base64);
    var buffer     = new ArrayBuffer(byteString.length);
    var ia         = new Uint8Array(buffer);

    // write the bytes of the string to an ArrayBuffer
    for (var i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    // create blob and save it using FileSaver.js
    var blob        = new Blob([ia], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, boardTitle + '.xlsx');
  }

};
