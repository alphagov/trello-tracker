describe("SpreadSheet", function () {

  describe("#addHeader", function(){
    it("Add header to the first row of the spreadsheet", function () {
      var spreadSheet = new SpreadSheet('a title');
      var header = ['value1', 'value2', 'value3'];
      spreadSheet.addHeader(header);
      expect(spreadSheet.worksheet.data[0]).toEqual(header)
    });
  });

  describe("#addRows", function() {
    it("Add rows to the worksheet", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1', 'header2']);
      var rows = [
          ['1', '2'],
          ['3', '4']
      ];
      spreadSheet.addRows(rows);
      expect(spreadSheet.worksheet.data[1]).toEqual(['1','2']);
      expect(spreadSheet.worksheet.data[2]).toEqual(['3','4']);
    })
  })
});
