Factcheck = function () {

  this.createExcelReport = function () {
    var self = this;
    new TrelloAPI().getAllCards(function (cards, listName) {

      var spreadSheet = new SpreadSheet(listName);
      spreadSheet.addHeader(['Title', 'Description', 'Due', 'Labels', 'Card #', 'Card URL']);

      var rows = self.transformRows(cards);
      spreadSheet.addRows(rows);

      spreadSheet.export();
    });
  }

  this.transformRows = function (cards) {
    var rows = [];
    $.each(cards, function (i, card) {

      var labels = [];
      $.each(card.labels, function (i, label) {
        if (label.name) {
          labels.push(label.name);
        } else {
          labels.push(label.color);
        }
      });

      // Need to set dates to the Date type so xlsx.js sets the right datatype
      var due = card.due || '';
      if (due !== '') {
        due = new Date(due);
      }

      var rowData = [
        card.name,
        card.desc,
        due,
        labels.toString(),
        card.idShort,
        card.shortUrl
      ];

      // Writes all closed items to the Archived tab
      if (!card.closed) {
        rows.push(rowData);
      }
    });
    return rows;
  };
};
