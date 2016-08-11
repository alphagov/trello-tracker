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

  describe("#process", function() {
    it("returns a spreadsheet with a row per card", function(){
      var factcheck = new Factcheck()
      var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name');

      expect(spreadSheet.getRows().length).toEqual(3);
    });
    it("returns a spreadsheet with a a header", function(){
      var factcheck = new Factcheck()
      var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name');

      var header = spreadSheet.getRows()[0];
      expect(header).toBeDefined();
    });

  });
});
