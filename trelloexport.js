/*!
 * TrelloExport
 * https://github.com/llad/export-for-trello
 *
 * Credit:
 * Started from: https://github.com/Q42/TrelloScrum
 */

/*jslint browser: true, devel: false*/

// Globals
var $,
    xlsx,
    ArrayBuffer,
    Uint8Array,
    Blob,
    saveAs;


window.URL = window.webkitURL || window.URL;

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

    var file           = {
          worksheets: [[], []], // worksheets has one empty worksheet (array)
          creator: 'TrelloExport',
          created: new Date(),
          lastModifiedBy: 'TrelloExport',
          modified: new Date(),
          activeWorksheet: 0
        },

        // Setup the active list and cart worksheet
        w              = file.worksheets[0],
        wArchived      = file.worksheets[1],
        columnHeadings = ['List', 'Title', 'Description', 'Due', 'Members', 'Labels', 'Card #', 'Card URL'];

    w.name = data.name.substring(0, 22);  // Over 22 chars causes Excel error, don't know why
    w.data    = [];
    w.data.push([]);
    w.data[0] = columnHeadings;


    // Setup the archive list and cart worksheet
    wArchived.name    = 'Archived ' + data.name.substring(0, 22);
    wArchived.data    = [];
    wArchived.data.push([]);
    wArchived.data[0] = columnHeadings;

    // This iterates through each list and builds the dataset
    $.each(data.lists, function (key, list) {
      var list_id  = list.id,
          listName = list.name;

      // tag archived lists
      if (list.closed) {
        listName = '[archived] ' + listName;
      }

      // Iterate through each card and transform data as needed
      $.each(data.cards, function (i, card) {
        if (card.idList === list_id) {
          var title = card.name;

          // tag archived cards
          if (card.closed) {
            title = '[archived] ' + title;
          }

          var memberIDs      = card.idMembers;
          var memberInitials = [];
          $.each(memberIDs, function (i, memberID) {
            $.each(data.members, function (key, member) {
              if (member.id === memberID) {
                memberInitials.push(member.initials);
              }
            });
          });

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
            listName,
            title,
            card.desc,
            due,
            memberInitials.toString(),
            labels.toString(),
            card.idShort,
            card.shortUrl
          ];

          // Writes all closed items to the Archived tab
          // Note: Trello allows open cards on closed lists
          var rowNumberArch,
              rowNumber;
          if (list.closed || card.closed) {
            rowNumberArch                 = wArchived.data.push([]) - 1;
            wArchived.data[rowNumberArch] = rowData;
          } else {
            rowNumber         = w.data.push([]) - 1;
            w.data[rowNumber] = rowData;
          }
        }
      });
    });

    new Excel().export(file, data.name);
    $("a.pop-over-header-close-btn")[0].click();
  });
}


// on DOM load
$(function () {
  "use strict";

  new Menu().init();
});
