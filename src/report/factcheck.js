Factcheck = function () {

  this.toSpreadSheet = function () {
    var self = this;
    TrelloAPI.getAllCards(function (cards, listName) {
      var spreadSheet = self.process(cards, listName);

      spreadSheet.export();
    });
  };

  this.process = function (cards, listName) {
    var spreadSheet = new SpreadSheet(listName);
    spreadSheet.addHeader(['Title', 'Description', 'Card ID', 'Card URL', 'Due', 'Labels' ]);

    var rows = this._transformRows(cards);
    spreadSheet.addRows(rows);

    return spreadSheet;
  };

  this._transformRows = function (cards) {
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
        card.id,
        card.shortUrl,
        due,
        labels.toString()
      ];

      // Writes all closed items to the Archived tab
      if (!card.closed) {
        rows.push(rowData);
      }
    });
    return rows;
  };
};
