describe("Factcheck", function () {

  describe("#toSpreadSheet", function () {
    it("request all cards from Trello", function () {
      spyOn(Trello, 'getAllCards');

      new Factcheck().toSpreadSheet();
      expect(Trello.getAllCards).toHaveBeenCalled();
    });

    xit("process and export", function () {

    });
  });

  describe("#process", function () {
    it("returns a spreadsheet with a row per card", function () {
      var factcheck = new Factcheck();
      var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

      expect(spreadSheet.getRows().length).toEqual(3);
    });
    it("returns a spreadsheet with a a header", function () {
      var factcheck = new Factcheck();
      var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

      var header = spreadSheet.getRow(0);
      expect(header).toBeDefined();
    });

    describe("row content", function () {
      it("has a name", function () {
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[0]).toEqual('Title');

        var row = spreadSheet.getRow(1);
        expect(row[0]).toEqual('Card One');
      });

      it("has a description", function () {
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[1]).toEqual('Description');

        var row = spreadSheet.getRow(1);
        expect(row[1]).toEqual('Card One Description');
      });

      it("has a card id", function () {
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[2]).toEqual('Card ID');

        var row = spreadSheet.getRow(1);
        expect(row[2]).toEqual('card_one_id');
      });

      it("has a link to the card", function () {
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[3]).toEqual('Card URL');

        var row = spreadSheet.getRow(1);
        expect(row[3]).toEqual("https://card.url");
      });

      it("has a  status", function () {
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[4]).toEqual('Status');

        var row = spreadSheet.getRow(1);
        expect(row[4]).toEqual("Factcheck");
      });

      it("has a zendesk id", function () {
        spyOn(Trello, 'findZendeskTicketID').and.returnValue('expected-id');

        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[5]).toEqual('Zendesk ID');

        var row = spreadSheet.getRow(1);
        expect(row[5]).toEqual("expected-id");
      });

      it("has a link to the zendesk ticket", function () {
        spyOn(Trello, 'findZendeskTicketURL').and.returnValue('expected-url');
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[6]).toEqual('Zendesk link');

        var row = spreadSheet.getRow(1);
        expect(row[6]).toEqual("expected-url");
      });

      it("display the card labels", function () {
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[7]).toEqual('Departments/Agency');

        var row = spreadSheet.getRow(1);
        expect(row[7]).toEqual("temp-label-1,temp-label-2");
      });

      it("shows how long the card has had it's current status", function () {
        spyOn(Trello, 'findCardStatusDays').and.returnValue(99);

        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', FIXTURE_ONE_LIST_TWO_CARDS.actions);


        var header = spreadSheet.getRow(0);
        expect(header[8]).toEqual('Status Days');

        var row = spreadSheet.getRow(2);
        expect(row[8]).toEqual(99);
      });

      it("has a link to the publisher preview link", function () {
        spyOn(Trello, 'findPublishingURL').and.returnValue('expected-url');
        var factcheck = new Factcheck();
        var spreadSheet = factcheck.process(FIXTURE_ONE_LIST_TWO_CARDS.cards, 'List Name', []);

        var header = spreadSheet.getRow(0);
        expect(header[9]).toEqual('Publishing URL');

        var row = spreadSheet.getRow(1);
        expect(row[9]).toEqual("expected-url");
      });
    });
  });
});
