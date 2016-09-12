var AllCards = {};

AllCards.toSpreadSheet = function (boardUrl) {
  Trello.setBoardURL(boardUrl)
  Trello.getAllCards($.proxy(function (cards, boardName, actions, lists) {
    var spreadSheet = this.process(cards, boardName, actions, lists);

    spreadSheet.export();
  }, this));
};

AllCards.process = function (cards, boardName, actions, lists) {
  var spreadSheet = new SpreadSheet(boardName);
  spreadSheet.addHeader([
    'Title', 'Description', 'Card ID', 'Card URL', 'Status',
    'Zendesk ID', 'Zendesk link', 'Departments/Agency',
    'How long?', 'Publishing URL'
  ]);
  var rows = this._doParseRows(cards, actions, lists);
  spreadSheet.addRows(rows);

  return spreadSheet;
};

AllCards._doParseRows = function (cards, actions, lists) {
  var rows = $.map(cards, function (card) {
    return [[
      card.name,
      card.desc,
      '#' + card.idShort,
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
