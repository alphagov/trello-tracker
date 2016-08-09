describe("SpreadSheet", function () {

  describe("#addHeader", function(){
    it("Add header to the first row of the spreadsheet", function () {
      var spreadSheet = new SpreadSheet('a title');
      var header = ['value1', 'value2', 'value3'];
      spreadSheet.addHeader(header);
      expect(spreadSheet.worksheet.data[0]).toEqual(header)
    });
  });

});
