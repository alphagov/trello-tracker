var Factcheck = {};

Factcheck.toSpreadSheet = function (boardUrl) {
  Trello.setBoardURL(boardUrl)
  Trello.getAllCards($.proxy(function (cards, boardName, actions, lists) {
    var spreadSheet = this.process(cards, boardName, actions, lists);

    spreadSheet.export();
  }, this));
};

Factcheck.process = function (cards, boardName, actions, lists) {
  var spreadSheet = new SpreadSheet(boardName);
  spreadSheet.addHeader([
    'Title', 'Description', 'Card ID', 'Card URL', 'Status',
    'Zendesk ID', 'Zendesk link', 'Departments/Agency',
    'Status Days', 'Publishing URL'
  ]);
  var rows = this._doParseRows(cards, actions, lists);
  spreadSheet.addRows(rows);

  return spreadSheet;
};

Factcheck._doParseRows = function (cards, actions, lists) {
  var rows = $.map(cards, function (card) {
    return [[
      card.name,
      card.desc,
      card.id,
      card.shortUrl,
      Trello.findColumnName(card, lists),
      Trello.findZendeskTicketID(card),
      Trello.findZendeskTicketURL(card),
      Trello.findLabels(card).toString(),
      Trello.totalDaysInCurrentColumn(card, actions),
      Trello.findPublishingURL(card)
    ]];
  });

  return rows;
};
