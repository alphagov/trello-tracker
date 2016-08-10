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

  describe("#export", function() {
    it("Saves a new file", function() {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1']);
      spreadSheet.addRows(['row1']);

      spyOn(window, "saveAs");
      spreadSheet.export();

      expect(window.saveAs).toHaveBeenCalled();
    })

    it("Saves a file with the board title as the file name", function() {
      var spreadSheet = new SpreadSheet("A board title");
      spreadSheet.addHeader(['header1']);
      spreadSheet.addRows(['row1']);

      spyOn(window, "saveAs");
      spreadSheet.export();

      expect(window.saveAs.calls.first().args[1]).toMatch("A board title.xlsx");
    })
  })
});
