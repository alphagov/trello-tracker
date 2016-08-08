window.URL = window.webkitURL || window.URL;

function transformCardsToRows(data) {
  var rows = [];
  $.each(data.cards, function (i, card) {

    var labels = [];
    $.each(card.labels, function (i, label) {
      if (label.name) {
        labels.push(label.name);
      } else {
        labels.push(label.color);
      }
    });

    // Need to set dates to the Date type so xlsx.js sets the right datatype
    var due = card.due || '';
    if (due !== '') {
      due = new Date(due);
    }

    var rowData = [
      card.name,
      card.desc,
      due,
      labels.toString(),
      card.idShort,
      card.shortUrl
    ];

    // Writes all closed items to the Archived tab
    if (!card.closed) {
      rows.push(rowData);
    }
  });
  return rows;
};

function createExcelExport() {
  "use strict";

  var boardExportURL = $('a.js-export-json').attr('href');
  //RegEx to extract Board ID
  var parts = /\/b\/(\w{8})\.json/.exec(boardExportURL);

  if (!parts) {
    alert("Board menu not open.");
    return;
  }

  var idBoard = parts[1];
  var apiURL  = "https://trello.com/1/boards/" + idBoard + "?lists=all&cards=all&card_attachments=cover&card_stickers=true&card_fields=badges%2Cclosed%2CdateLastActivity%2Cdesc%2CdescData%2Cdue%2CidAttachmentCover%2CidList%2CidBoard%2CidMembers%2CidShort%2Clabels%2CidLabels%2Cname%2Cpos%2CshortUrl%2CshortLink%2Csubscribed%2Curl&card_checklists=none&members=all&member_fields=fullName%2Cinitials%2CmemberType%2Cusername%2CavatarHash%2Cbio%2CbioData%2Cconfirmed%2Cproducts%2Curl%2Cstatus&membersInvited=all&membersInvited_fields=fullName%2Cinitials%2CmemberType%2Cusername%2CavatarHash%2Cbio%2CbioData%2Cconfirmed%2Cproducts%2Curl&checklists=none&organization=true&organization_fields=name%2CdisplayName%2Cdesc%2CdescData%2Curl%2Cwebsite%2Cprefs%2Cmemberships%2ClogoHash%2Cproducts&myPrefs=true&fields=name%2Cclosed%2CdateLastActivity%2CdateLastView%2CidOrganization%2Cprefs%2CshortLink%2CshortUrl%2Curl%2Cdesc%2CdescData%2Cinvitations%2Cinvited%2ClabelNames%2Cmemberships%2Cpinned%2CpowerUps%2Csubscribed";

  $.getJSON(apiURL, function (data) {

    var spreadSheet = new SpreadSheet(data.name);
    spreadSheet.addHeader(['Title', 'Description', 'Due', 'Labels', 'Card #', 'Card URL']);

    var rows = transformCardsToRows(data);
    spreadSheet.addRows(rows);

    spreadSheet.export();
    $("a.pop-over-header-close-btn")[0].click();
  });
}


// on DOM load
$(function () {
  "use strict";

  new Menu().init();
});

//var rows = transformCardsToRows(data);
//
//var spreadSheet = new SpreadSheet(data.name);
//spreadSheet.addHeader(['List', 'Title', 'Description', 'Due', 'Labels', 'Card #', 'Card URL']);
//spreadSheet.addRows(rows);
//spreadSheet.exportToFile();
//
