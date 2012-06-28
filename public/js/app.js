$(document).ready(function () {
  function drawGrid() {
    var number  = parseInt($("#char-count").val(), 10),
        grid = $("<div />").addClass("ui-grid-a").attr({ "id": "bar" });

    for (var i=0; i < number; i++) {
      grid.append($("#char-inputs").render({ id: i }));
    }
    return grid;
  }

  function drawFirstPage() {
    var page    = $("<div />"),
        content = "";

    page.attr({ "data-role": "page", id: "char-1" });
    page.append("<div data-role='header'><h1>Vaulderie</h1></div>");

    content = $("<div />").attr({ "data-role":"content" }).append(drawGrid());
    content.append("<a href='#char-2'>Next</a>");
    page.append(content);
    $("#home-page").parent().append(page);
  };

  function drawRemainingPages() {
    var page,
        content,
        adjustedNumber = parseInt($("#char-count").val(), 10) ;
    
    for (var i=2; i <= adjustedNumber; i++) {
      page = $("<div />");
      page.attr({ "data-role": "page", id: "char-" + i });
      page.append("<div data-role='header'><h1>Vaulderie</h1></div>");

      content = $("<div />").attr({ "data-role":"content" }).append(drawGrid());
      if(i === adjustedNumber) {
        content.append("<a href='#calculate'>Calculate</a>");
      } else {
        content.append("<a href='#char-" + (i+1) + "'>Next</a>");
      }
      page.append(content);
      $("#home-page").parent().append(page);
    }
  };

  function calculate() {
    chars = $('#char-');
  };

  $(document).on("pagebeforechange", function (e, data) {
    if (typeof data.toPage === "string") {
      if (data["options"].fromPage[0]["id"] === "home-page") {
        drawFirstPage();
      } else if (data["options"].fromPage[0]["id"] === "char-1") {
        drawRemainingPages();
      }
    }
  });
});
