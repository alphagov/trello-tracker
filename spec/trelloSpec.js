describe("Trello", function () {

  describe("#getAllCards", function () {
    it("requests cards for the current Trello board", function () {
      var deferred = $.Deferred();
      deferred.resolve({});

      spyOn($, 'ajax').and.returnValue(deferred.promise());
      spyOn(Trello, 'currentBrowserLocation').and.returnValue('/b/the_board_id/the_board_name');

      Trello.getAllCards(function (data) {
        //noop
      });

      var call = $.ajax.calls.first();
      expect(call.args[0]).toMatch(/the_board_id/);
    });

    it("the callback is being passed the board name", function () {
      var deferred = $.Deferred();
      var json = {
        name: 'the board name',
        cards: []
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var name;
      Trello.getAllCards(function (cards, boardName) {
        name = boardName;
      });

      expect(name).toEqual('the board name');
    });

    it("the callback is being passed all the cards", function () {
      var deferred = $.Deferred();
      var json = {
        name: '',
        cards: ['card1', 'card2']
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var cards;
      Trello.getAllCards(function (allCards, boardName) {
        cards = allCards;
      });

      expect(cards).toEqual(['card1', 'card2']);
    });
  });

  describe("#findZendeskTicketID", function () {
    it("returns the zendesk id for a Card", function () {
      card = {
        "id": "the id",
        "attachments": [{
          "url": "https://govuk.zendesk.com/agent/#/tickets/1292650",
          "id": "the attachment id1"
        }, {
          "url": "https://www.google.co.uk",
          "id": "the attachment id2"
        }]
      };
      var result = Trello.findZendeskTicketID(card);
      expect(result).toEqual("1292650");
    });
  });

  describe("#findZendeskTicketURL", function () {
    it("has a link to the zendesk ticket", function () {
      card = {
        "id": "the id",
        "attachments": [{
          "url": "https://govuk.zendesk.com/agent/#/tickets/1292650",
          "id": "the attachment id1"
        }, {
          "url": "https://www.google.co.uk",
          "id": "the attachment id2"
        }]
      };
      var result = Trello.findZendeskTicketURL(card);
      expect(result).toEqual("https://govuk.zendesk.com/agent/#/tickets/1292650");
    });
  });

  describe("#findPublishingURL", function () {
    it("has a link to the Publishing URL", function () {
      card = {
        "id": "the id",
        "attachments": [{
          "url": "https://publisher.publishing.service.gov.uk/something",
          "id": "the attachment id1"
        }, {
          "url": "https://www.google.co.uk",
          "id": "the attachment id2"
        }]
      };
      var result = Trello.findPublishingURL(card);
      expect(result).toEqual("https://publisher.publishing.service.gov.uk/something");
    });
  });

  describe("#findPublishingURL", function () {
    it("shows how long the card has had it's current status", function () {
      card = {
        "id": "the id"
      };

      actions = [
        {
          "data": {
            "listAfter": {
              "name": "List One",
              "id": "57ab3d0f17e5767d77da48bc"
            },
            "card": {
              "id": "the id"
            }
          },
          "date": "2016-08-01T09:33:30.800Z"
        }
      ];

      var today = moment('2016-08-13').toDate();
      jasmine.clock().mockDate(today);

      var result = Trello.findCardStatusDays(card, actions);
      expect(result).toEqual(11);
    });
  });

  describe("#findLabels", function () {
    it("shows how long the card has had it's current status", function () {
      card = {
        id: 'just-an-id',
        labels: [{
          name: 'name1'
        }, {
          name: 'name2'
        }]
      };

      var result = Trello.findLabels(card);
      expect(result).toEqual(['name1', 'name2']);
    });
  });
});
