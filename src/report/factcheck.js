Factcheck = function () {

  this.toSpreadSheet = function () {
    var self = this;
    TrelloAPI.getAllCards(function (cards, listName, actions) {
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
        self._findZendeskTicketID(card),
        self._findZendeskTicketURL(card),
        labels.toString(),
        self._findCardStatusDays(card.id, actions),
        self._findPublishingURL(card)
      ];

      // Writes all closed items to the Archived tab
      if (!card.closed) {
        rows.push(rowData);
      }
    });
    return rows;
  };

  this._findCardStatusDays = function (cardID, actions){
    var self = this;
    if (actions.length > 0) {
      for (var i = 0; i < actions.length; i++){
        var action = actions[i];
        if (action.data.card.id === cardID) {
          if (action.data.listAfter) {
            var today = moment();
            var statusDate = moment(action.date);

            return today.diff(statusDate, "days");
          }
        }
      }
    }
    return '-';
  };

  this._findZendeskTicketURL = function (card) {
    if (card.attachments.length > 0) {
      for (var i = 0; i < card.attachments.length; i++) {
        var attachment = card.attachments[i];
        if (attachment.url.match(/govuk.zendesk.com/))
          return attachment.url;
      }
    }
    return '-';
  };

  this._findPublishingURL = function (card) {
    if (card.attachments.length > 0) {
      for (var i = 0; i < card.attachments.length; i++) {
        var attachment = card.attachments[i];
        if (attachment.url.match(/publishing.service.gov.uk/))
          return attachment.url;
      }
    }
    return '-';
  };

  this._findZendeskTicketID = function (card) {
    if (card.attachments.length > 0) {
      for (var i = 0; i < card.attachments.length; i++) {
        var attachment = card.attachments[i];
        var match = attachment.url.match(/govuk.zendesk.com\/agent\/#\/tickets\/(.+)/);
        if (match)
          return match[1];
      }
    }
    return '-';
  };
};
