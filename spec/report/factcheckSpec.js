describe("Factcheck", function () {

  describe("#toSpreadSheet", function () {
    it("request all cards from Trello", function () {
      spyOn(TrelloAPI, 'getAllCards');

      new Factcheck().toSpreadSheet();
      expect(TrelloAPI.getAllCards).toHaveBeenCalled();
    });

    xit("process and export", function () {

    });
  });

});
