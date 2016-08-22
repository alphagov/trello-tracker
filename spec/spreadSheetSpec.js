describe("SpreadSheet", function () {

  describe("#getRows", function () {
    it("return all the rows in a worksheet, including the header", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1', 'header2']);
      var rows = [
        ['1', '2'],
        ['3', '4']
      ];
      spreadSheet.addRows(rows);

      expect(spreadSheet.getRows()).toEqual([
        ['header1', 'header2'],
        ['1', '2'],
        ['3', '4']
      ]);
    });
  });

  describe("#getRow", function () {
    it("return a row provided its index", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1', 'header2']);
      var rows = [
        ['1', '2'],
        ['3', '4']
      ];
      spreadSheet.addRows(rows);

      expect(spreadSheet.getRow(2)).toEqual(['3', '4']);
    });
  });

  describe("#addHeader", function () {
    it("add a header", function () {
      var spreadSheet = new SpreadSheet('a title');
      var header = ['value1', 'value2', 'value3'];
      spreadSheet.addHeader(header);

      expect(spreadSheet.getRow(0)).toEqual(header);
    });
  });

  describe("#addRows", function () {
    it("add rows to the spread sheet", function () {
      var spreadSheet = new SpreadSheet('a title');
      spreadSheet.addHeader(['header1', 'header2']);
      var rows = [
        ['1', '2'],
        ['3', '4']
      ];
      spreadSheet.addRows(rows);

      expect(spreadSheet.getRow(1)).toEqual(['1', '2']);
      expect(spreadSheet.getRow(2)).toEqual(['3', '4']);
    });
  });


  describe("#export", function () {
    it("saves a file with the board title as the file name", function () {
      var spreadSheet = new SpreadSheet("A board title");
      spreadSheet.addHeader(['header1']);
      spreadSheet.addRows(['row1']);

      spyOn(window, "saveAs");
      spreadSheet.export();

      expect(window.saveAs).toHaveBeenCalled();
      expect(window.saveAs.calls.first().args[1]).toMatch("A board title.xlsx");
    });

    it("saves a file with the contents of the rows", function () {
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
