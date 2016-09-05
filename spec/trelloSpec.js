describe("Trello", function () {

  describe("#getAllCards", function () {
    it("query the cards for a specific board", function () {
      var deferred = $.Deferred();
      deferred.resolve({});
      spyOn($, 'ajax').and.returnValue(deferred.promise());

      Trello.setBoardURL('https://trello.com/b/the_board_id/content-development');
      Trello.getAllCards(function (data) {
        //noop
      });

      var call = $.ajax.calls.first();
      expect(call.args[0]).toMatch(/the_board_id/);
    });

    it("return the board name as a callback parameter", function () {
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

    it("return the cards as a callback parameter", function () {
      var deferred = $.Deferred();
      var json = {
        name: '',
        cards: ['card1', 'card2']
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var cards;
      Trello.getAllCards(function (allCards, boardName, allActions, lists) {
        cards = allCards;
      });

      expect(cards).toEqual(['card1', 'card2']);
    });

    it("return the actions as a callback parameter", function () {
      var deferred = $.Deferred();
      var json = {
        name: '',
        cards: ['card1', 'card2'],
        actions: ['action1', 'action2']
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var actions;
      Trello.getAllCards(function (allCards, boardName, allActions, lists) {
        actions = allActions;
      });

      expect(actions).toEqual(['action1', 'action2']);
    });

    it("return the lists as a callback parameter", function () {
      var deferred = $.Deferred();
      var json = {
        name: '',
        cards: [],
        actions: [],
        lists: ['list1', 'list2']
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var lists;
      Trello.getAllCards(function (allCards, boardName, allActions, allLists) {
        lists = allLists;
      });

      expect(lists).toEqual(['list1', 'list2']);
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
    it("returns a link to the Publishing URL", function () {
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

  describe("#totalDaysInCurrentColumn", function () {
    it("return the number of days in the column", function () {
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

      var result = Trello.totalDaysInCurrentColumn(card, actions);
      expect(result).toEqual("=DATEDIF(DATE(2016,8 ,1 ), TODAY(), \"D\")");
    });
  });

  describe("#findColumnName", function () {
    it("return the column name", function () {
      card = {
        "id": "a-car-id",
        "idList": "the_list_id1"
      };
      lists = [
        {
          id: 'the_list_id1',
          name: 'List One'
        },
        {
          id: 'the_list_id_2',
          name: 'List Two'
        }
      ];
      var result = Trello.findColumnName(card, lists);

      expect(result).toEqual('List One');
    });
  });

  describe("#findLabels", function () {
    it("return the labels", function () {
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

  describe("#setBoardUrl", function () {
    it("set the Board Url", function () {
      Trello.setBoardURL('the-board-url');
      expect(Trello.getBoardUrl()).toEqual('the-board-url');
    });
  });

  describe("#getBoardId", function () {
    it("returns the board ID", function () {
      Trello.setBoardURL('https://trello.com/b/bVfnXnEc/content-development');
      expect(Trello.getBoardId()).toEqual('bVfnXnEc');
    });
  });
});
