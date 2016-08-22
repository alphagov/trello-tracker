$(document).ready(function () {

  this.run = function () {
    this.initElements();
    this.bindCurrentBoardEventListener();
    this.bindFactcheckReportEventListener();
  };

  this.initElements = function () {
    this.$factcheckLink = $('li.factcheck');
  };

  this.bindCurrentBoardEventListener = function () {
    var self = this;
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, function (tabs) {
      self.currentTab = tabs[0];
    });
  };

  this.bindFactcheckReportEventListener = function () {
    this.$factcheckLink.click($.proxy(this.runFactcheckReport, this));
  };

  this.runFactcheckReport = function () {
    Factcheck.toSpreadSheet(this.currentTab.url);
  };

  this.run();
});
