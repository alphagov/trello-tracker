TrelloAPI = {
  getAllCards: function (callback) {
    var boardId = this._getBoardId()
    var apiURL = "https://trello.com/1/boards/" + boardId + "?lists=open&cards=open&card_attachments=true&actions=updateCard&desc%2Cdue%2Clabels%2Cname%2CshortUrl%2CshortLink&desc%2CdescData%2Curl&fields=name%2CshortLink%2CshortUrl%2Curl%2Cdesc";

    $.ajax(apiURL).done(function (data) {
      callback(data.cards, data.name, data.actions);
    });
  },

  _getBoardId: function () {
    return this.currentBrowserLocation().split('/')[2];
  },

  currentBrowserLocation: function () {
    return window.location.pathname;
  }
};
