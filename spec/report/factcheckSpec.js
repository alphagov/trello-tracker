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

      var header = spreadSheet.getRow(0);
      expect(header).toBeDefined();
    });

    describe("row content", function(){
      it("has a name", function(){
        var factcheck = new Factcheck()
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name');

        var header = spreadSheet.getRow(0);
        expect(header[0]).toEqual('Title');

        var row = spreadSheet.getRow(1);
        expect(row[0]).toEqual('Card One');
      });

      it("has a description", function(){
        var factcheck = new Factcheck()
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name');

        var header = spreadSheet.getRow(0);
        expect(header[1]).toEqual('Description');

        var row = spreadSheet.getRow(1);
        expect(row[1]).toEqual('Card One Description');
      });

      it("has a card id", function(){
        var factcheck = new Factcheck()
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name');

        var header = spreadSheet.getRow(0);
        expect(header[2]).toEqual('Card ID');

        var row = spreadSheet.getRow(1);
        expect(row[2]).toEqual('card_one_id');
      });
    });
  });
});
