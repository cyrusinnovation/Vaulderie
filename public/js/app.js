$(document).ready(function () {
  $(document).on("pagebeforechange", function (e, data) {
    var number = parseInt($("#char-count").val(), 10);

    if (typeof data.toPage === "string") {
      if (data["options"].fromPage[0]["id"] === "home-page") {

        for (var i=1; i < number; i++) {
          var data = { id: i, nextId: i + 1};
          $("#home-page").parent().append($("#page-markup").render(data));
        }

        $("#home-page").parent().append($("#page-markup").render({ id: number }));
      }
    }
  });
});
