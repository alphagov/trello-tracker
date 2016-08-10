describe("TrelloAPI", function () {

  describe("#getAllCards", function () {
    it("requests cards for the current Trello board", function () {
      var trelloAPI = new TrelloAPI();

      var deferred = $.Deferred();
      deferred.resolve({});

      spyOn($, 'ajax').and.returnValue(deferred.promise());
      spyOn(trelloAPI, 'currentBrowserLocation').and.returnValue('/b/the_board_id/the_board_name');

      trelloAPI.getAllCards(function (data) {
        //noop
      });

      var call = $.ajax.calls.first();
      expect(call.args[0]).toMatch(/the_board_id/);
    });

    it("the callback is being passed the board name", function () {
      var trelloAPI = new TrelloAPI();

      var deferred = $.Deferred();
      var json = {
        name: 'the board name',
        cards: []
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var name;
      trelloAPI.getAllCards(function (cards, boardName) {
        name = boardName;
      });

      expect(name).toEqual('the board name');
    })

    it("the callback is being passed all the cards", function () {
      var trelloAPI = new TrelloAPI();

      var deferred = $.Deferred();
      var json = {
        name: '',
        cards: ['card1', 'card2']
      };
      spyOn($, 'ajax').and.returnValue(deferred.promise());
      deferred.resolve(json);

      var cards;
      trelloAPI.getAllCards(function (allCards, boardName) {
        cards = allCards;
      });

      expect(cards).toEqual(['card1', 'card2']);
    })
  });
});
