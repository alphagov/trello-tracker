var Trello = {
  EMPTY_VALUE: '-'
};

Trello.setBoardURL = function (url) {
  this.boardUrl = url;
};

Trello.getBoardUrl = function () {
  return this.boardUrl;
};

Trello.getAllCards = function (callback) {
  var boardId = this.getBoardId();
  var apiURL = "https://trello.com/1/boards/" + boardId + "?lists=open&cards=open&card_attachments=true&actions_limit=1000&actions=updateCard:idList&desc%2Cdue%2Clabels%2Cname%2CshortUrl%2CshortLink&desc%2CdescData%2Curl&fields=name%2CshortLink%2CshortUrl%2Curl%2Cdesc";

  $.ajax(apiURL).done(function (data) {
    callback(data.cards, data.name, data.actions, data.lists);
  });
};

Trello.getBoardId = function () {
  return this.boardUrl.split('/')[4];
};

Trello.findZendeskTicketID = function (card) {
  for (var i = 0; i < card.attachments.length; i++) {
    var attachment = card.attachments[i];
    var match = attachment.url.match(/govuk.zendesk.com\/agent\/#\/tickets\/(.+)/);
    if (match)
      return match[1];
  }
  return this.EMPTY_VALUE;
};

Trello.findZendeskTicketURL = function (card) {
  for (var i = 0; i < card.attachments.length; i++) {
    var attachment = card.attachments[i];
    if (attachment.url.match(/govuk.zendesk.com/))
      return attachment.url;
  }
  return this.EMPTY_VALUE;
};

Trello.findPublishingURL = function (card) {
  for (var i = 0; i < card.attachments.length; i++) {
    var attachment = card.attachments[i];
    if (attachment.url.match(/publishing.service.gov.uk/))
      return attachment.url;
  }
  return this.EMPTY_VALUE;
};

Trello.findColumnName = function (card, lists) {
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
    if (card.idList === list.id) {
      return list.name;
    }
  }
  return this.EMPTY_VALUE;
};

Trello.totalDaysInCurrentColumn = function (card, actions) {
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i],
        actionCardId = action.data.card.id;
    if (actionCardId === card.id) {
      if (action.data.listAfter) {
        var date = new Date(Date.parse(action.date));
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        return "=DATEDIF(DATE(" + year + "," + month + " ," + day + " ), TODAY(), \"D\")"
      }
    }
  }
  return this.EMPTY_VALUE;
};

Trello.findLabels = function (card) {
  var labels = [];
  $.each(card.labels, function (i, label) {
    if (label.name) {
      labels.push(label.name);
    }
  });
  return labels;
};
