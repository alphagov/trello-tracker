describe("TrelloAPI", function () {

  describe("#getAllCards", function () {
    it("requests cards for the current Trello board", function () {
      var trelloAPI = new TrelloAPI();

      spyOn($, 'getJSON');
      spyOn(trelloAPI, 'currentBrowserLocation').and.returnValue('/b/the_board_id/the_board_name');

      trelloAPI.getAllCards(function (data) {
        //noop
      });

      var call = $.getJSON.calls.first();
      expect(call.args[0]).toMatch(/the_board_id/);
    });
  });
});
