Trello = {
  getAllCards: function (callback) {
    var boardId = this._getBoardId()
    var apiURL = "https://trello.com/1/boards/" + boardId + "?lists=open&cards=open&card_attachments=true&actions_limit=1000&actions=updateCard:idList&desc%2Cdue%2Clabels%2Cname%2CshortUrl%2CshortLink&desc%2CdescData%2Curl&fields=name%2CshortLink%2CshortUrl%2Curl%2Cdesc";

    $.ajax(apiURL).done(function (data) {
      callback(data.cards, data.name, data.actions);
    });
  },

  _getBoardId: function () {
    return this.currentBrowserLocation().split('/')[2];
  },

  currentBrowserLocation: function () {
    return window.location.pathname;
  },

  findZendeskTicketID: function (card) {
    if (card.attachments.length > 0) {
      for (var i = 0; i < card.attachments.length; i++) {
        var attachment = card.attachments[i];
        var match = attachment.url.match(/govuk.zendesk.com\/agent\/#\/tickets\/(.+)/);
        if (match)
          return match[1];
      }
    }
    return '-';
  },

  findZendeskTicketURL: function (card) {
    if (card.attachments.length > 0) {
      for (var i = 0; i < card.attachments.length; i++) {
        var attachment = card.attachments[i];
        if (attachment.url.match(/govuk.zendesk.com/))
          return attachment.url;
      }
    }
    return '-';
  }

};
