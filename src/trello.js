var Trello = {};

Trello.getAllCards = function (callback) {
  var boardId = this._getBoardId();
  var apiURL = "https://trello.com/1/boards/" + boardId + "?lists=open&cards=open&card_attachments=true&actions_limit=1000&actions=updateCard:idList&desc%2Cdue%2Clabels%2Cname%2CshortUrl%2CshortLink&desc%2CdescData%2Curl&fields=name%2CshortLink%2CshortUrl%2Curl%2Cdesc";

  $.ajax(apiURL).done(function (data) {
    callback(data.cards, data.name, data.actions);
  });
};

Trello._getBoardId = function () {
  return this.currentBrowserLocation().split('/')[2];
};

Trello.currentBrowserLocation = function () {
  return window.location.pathname;
};

Trello.findZendeskTicketID = function (card) {
  for (var i = 0; i < card.attachments.length; i++) {
    var attachment = card.attachments[i];
    var match = attachment.url.match(/govuk.zendesk.com\/agent\/#\/tickets\/(.+)/);
    if (match)
      return match[1];
  }

  return '-';
};

Trello.findZendeskTicketURL = function (card) {
  for (var i = 0; i < card.attachments.length; i++) {
    var attachment = card.attachments[i];
    if (attachment.url.match(/govuk.zendesk.com/))
      return attachment.url;
  }

  return '-';
};

Trello.findPublishingURL = function (card) {
  for (var i = 0; i < card.attachments.length; i++) {
    var attachment = card.attachments[i];
    if (attachment.url.match(/publishing.service.gov.uk/))
      return attachment.url;
  }

  return '-';
};

Trello.totalDaysInCurrentColumn = function (card, actions) {
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i],
        actionCardId = action.data.card.id;
    if (actionCardId === card.id) {
      if (action.data.listAfter) {
        var today = moment();
        var statusDate = moment(action.date);

        return today.diff(statusDate, "days");
      }
    }
  }

  return '-';
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
