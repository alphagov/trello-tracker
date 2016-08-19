Factcheck = function () {

  this.toSpreadSheet = function () {
    var self = this;
    Trello.getAllCards(function (cards, listName, actions) {
      var spreadSheet = self.process(cards, listName, actions);

      spreadSheet.export();
    });
  };

  this.process = function (cards, listName, actions) {
    var spreadSheet = new SpreadSheet(listName);
    spreadSheet.addHeader(['Title', 'Description', 'Card ID', 'Card URL', 'Status', 'Zendesk ID', 'Zendesk link', 'Departments/Agency', 'Status Days', 'Publishing URL']);

    var rows = this._transformRows(cards, actions);
    spreadSheet.addRows(rows);

    return spreadSheet;
  };

  this._transformRows = function (cards, actions) {
    var rows = [];
    var self = this;
    $.each(cards, function (i, card) {

      var labels = [];
      $.each(card.labels, function (i, label) {
        if (label.name) {
          labels.push(label.name);
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
        'Factcheck',
        Trello.findZendeskTicketID(card),
        Trello.findZendeskTicketURL(card),
        labels.toString(),
        Trello.findCardStatusDays(card, actions),
        Trello.findPublishingURL(card)
      ];

      // Writes all closed items to the Archived tab
      if (!card.closed) {
        rows.push(rowData);
      }
    });
    return rows;
  };

};
