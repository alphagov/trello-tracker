describe("SpreadSheet", function () {

  describe("#getRows", function () {
    it("Gets all the rows in a worksheet, including the header", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1', 'header2']);
      var rows = [
        ['1', '2'],
        ['3', '4']
      ];
      spreadSheet.addRows(rows);
      expect(spreadSheet.getRows().length).toEqual(3)
    })
  });

  describe("#addHeader", function () {
    it("Add header to the first row of the spreadsheet", function () {
      var spreadSheet = new SpreadSheet('a title');
      var header = ['value1', 'value2', 'value3'];
      spreadSheet.addHeader(header);
      expect(spreadSheet.getRows()[0]).toEqual(header)
    });
  });

  describe("#addRows", function () {
    it("Add rows to the worksheet", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1', 'header2']);
      var rows = [
        ['1', '2'],
        ['3', '4']
      ];
      spreadSheet.addRows(rows);
      expect(spreadSheet.getRows()[1]).toEqual(['1', '2']);
      expect(spreadSheet.getRows()[2]).toEqual(['3', '4']);
    });
  });


  describe("#export", function () {
    it("Saves a new file", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1']);
      spreadSheet.addRows(['row1']);

      spyOn(window, "saveAs");
      spreadSheet.export();

      expect(window.saveAs).toHaveBeenCalled();
    });

    it("Saves a file with the board title as the file name", function () {
      var spreadSheet = new SpreadSheet("A board title");
      spreadSheet.addHeader(['header1']);
      spreadSheet.addRows(['row1']);

      spyOn(window, "saveAs");
      spreadSheet.export();

      expect(window.saveAs.calls.first().args[1]).toMatch("A board title.xlsx");
    });

    it("Saves a file with the contents of the rows", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1']);
      spreadSheet.addRows(['row1']);

      spyOn(window, "saveAs");
      spreadSheet.export();

      var content = window.saveAs.calls.first().args[0];
      expect(content.size).toBeGreaterThan(1);
      expect(content.type).toMatch("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    })
  });
});
