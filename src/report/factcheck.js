var Factcheck = {};

Factcheck.toSpreadSheet = function () {
  Trello.getAllCards($.proxy(function (cards, boardName, actions) {
    var spreadSheet = this.process(cards, boardName, actions);

    spreadSheet.export();
  }, this));
};

Factcheck.process = function (cards, boardName, actions) {
  var spreadSheet = new SpreadSheet(boardName);
  spreadSheet.addHeader([
    'Title', 'Description', 'Card ID', 'Card URL', 'Status',
    'Zendesk ID', 'Zendesk link', 'Departments/Agency',
    'Status Days', 'Publishing URL'
  ]);

  var rows = this._doParseRows(cards, actions);
  spreadSheet.addRows(rows);

  return spreadSheet;
};

Factcheck._doParseRows = function (cards, actions) {
  var rows = $.map(cards, function (card) {
    return [[
      card.name,
      card.desc,
      card.id,
      card.shortUrl,
      'Factcheck',
      Trello.findZendeskTicketID(card),
      Trello.findZendeskTicketURL(card),
      Trello.findLabels(card).toString(),
      Trello.totalDaysInCurrentColumn(card, actions),
      Trello.findPublishingURL(card)
    ]];
  });

  return rows;
};
