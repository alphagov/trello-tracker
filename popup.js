$(document).ready(function () {

  this.run = function () {
    this.initElements();
    this.bindCurrentBoardEventListener();
    this.bindAllCardsReportEventListener();
  };

  this.initElements = function () {
    this.$allCardsLink = $('li.all-cards');
  };

  this.bindCurrentBoardEventListener = function () {
    var self = this;
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, function (tabs) {
      self.currentTab = tabs[0];
    });
  };

  this.bindAllCardsReportEventListener = function () {
    this.$allCardsLink.click($.proxy(this.runAllCardsReport, this));
  };

  this.runAllCardsReport = function () {
    AllCards.toSpreadSheet(this.currentTab.url);
  };

  this.run();
});
