Factcheck = function (data) {

  this.transformRows = function () {
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
};
