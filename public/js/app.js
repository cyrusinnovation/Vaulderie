Array.prototype.rotate = function( n ) {
  this.unshift.apply( this, this.splice( n, this.length ) )
  return this;
}
$(document).ready(function () {
  function charCount() {
    return parseInt($("#char-count").val(), 10);
  }

  function drawGrid(names) {
    var number = charCount(),
    grid = $("<div />"),
    gridForCurrentChar   = $("<div />").addClass("ui-grid-a"),
    gridForOtherChars   = $("<div />").addClass("ui-grid-a");

    gridForCurrentChar.append("<h3 style='text-align:center;'>Contribution</h3>");
    gridForCurrentChar.append($("#char-inputs").render({name:names[0], id: 0}));
    gridForOtherChars.append("<h3 style='text-align:center;'>Bond Rating</h3>");

    for (var i=1; i < number; i++) {
      gridForOtherChars.append($("#char-inputs").render({name:names[i], id: i}));
    }
    return grid.append(gridForCurrentChar).append(gridForOtherChars).html();
  }

  function drawFirstPage() {
    var page    = $("<div />"),
    content = "";

    page.attr({ "data-role": "page", "data-theme": "a", id: "char-1" });
    page.append("<div data-role='header'><h1>Vaulderie</h1></div>");

    content = $("<div />").attr({ "data-role":"content" }).append(drawGrid([]));
    content.append("<a href='#char-2' data-role='button'>Next</a>");
    page.append(content);
    $("#home-page").parent().append(page);
  }

  function drawRemainingPages() {
    var page,
    content,
    currentCharOrder,
    charNumber = charCount(),
    charNames = getNames(1);

    for (var i=2; i <= charNumber; i++) {
      currentCharOrder = charNames.slice(0);
      currentCharOrder.rotate(i-1);
      page = $("<div />");
      page.attr({ "data-role": "page", "data-theme": "a", id: "char-" + i });
      page.append("<div data-role='header'><h1>Vaulderie</h1></div>");

      content = $("<div />").attr({ "data-role":"content" }).append(drawGrid(currentCharOrder));
      if(i === charNumber) {
        content.append("<a href='#results-0' data-role='button'>Calculate</a>");
      } else {
        content.append("<a href='#char-" + (i+1) + "' data-role='button'>Next</a>");
      }
      page.append(content);
      $("#home-page").parent().append(page);
      $("input[type='text']").attr({"disabled": "disabled"});
    }
  }

  function getNames(charNum) {
    return $("#char-" + charNum + " input[type='text']").map(function(idx, el) {
      return $(el).val();
    }).toArray();
  }

  function calculate() {

    function getValues(charNum) {
      return $("#char-" + charNum + " select").map(function(idx, el) {
        return $(el).val();
      }).toArray();
    }

    var charNumber = charCount(),
    result = [],
    row,
    names,
    values;

    for (var i=1; i <= charNumber; i++) {
      row = {};
      names = getNames(i);
      values = getValues(i);
      row['name'] = names.shift();
      row['poolValue'] = parseInt(values.shift(), 10);
      row['ratings'] = {};
      names.forEach(function(el, idx) {
        row['ratings'][el] = parseInt(values[idx], 10);
      });

      result.push(row);
    }

    showResults(Calculate.ratings(result));
  }

  function showResults(data) {
    data.forEach(function(el, idx) {
      el['id'] = idx;
      if(idx < data.length - 1) {
        el['nextPage'] = idx + 1;
      }
    });
    $('body').append($("#char-results").render(data));
  }

  function resetApp() {
    var url = $.mobile.path.parseUrl(window.location.href);
    window.location.href = url.hrefNoHash;
  }

  function removeExistingDivs() {
    console.log("hello");
    $('div[id^="char"]').remove();
    $('div[id^="results"]').remove();
  }

  $(document).on("pagebeforechange", function (e, data) {
    if (typeof data.toPage === "string") {
      console.log(data);
      if (data.toPage.match(/#char-1$/)) {
//      if (data["options"].fromPage[0]["id"] === "home-page") {
        removeExistingDivs();
        drawFirstPage();
      } else if (data["options"].fromPage[0]["id"] === "char-1") {
        drawRemainingPages();
      } else if (data.toPage.match(/#results-0$/)) {
        calculate();
      } else if (data.toPage.match(/index.html$/)) {
        resetApp();
      }
    }
  });
});
