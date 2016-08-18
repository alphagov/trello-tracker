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
    })

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
    })
  });
});
