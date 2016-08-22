$(document).ready(function () {

  this.run = function () {
    this.bindCurrentBoardEventListener();
    this.bindFactcheckReportEventListener();
  };

  this.bindCurrentBoardEventListener = function () {
    var self = this;
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, function (tabs) {
      self.currentTab = tabs[0];
    });
  };

  this.bindFactcheckReportEventListener = function () {
    $('li.factcheck').click($.proxy(this.runFactcheckReport, this));
  };

  this.runFactcheckReport = function () {
    Factcheck.toSpreadSheet(this.currentTab.url);
  };

  this.run();
});
