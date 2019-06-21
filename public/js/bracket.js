/* eslint-disable indent */
/* eslint-disable prettier/prettier */
var saveData = {
  teams: [
      ["",""]
    ],
  results: [
    [
      []
    ]
  ]
};

function saveFn(data, userData) {
  var json = jQuery.toJSON(data);
  $("#saveOutput").text("POST " + userData + " " + json);
}

$(function() {
  var container = $("div#save .demo");
  container.bracket({
    init: saveData,
    save: saveFn,
    userData: ""
  });

  var data = container.bracket("data");
  $("#dataOutput").text(jQuery.toJSON(data));
});
