function existingCharacters(charCount) {

  var charname_array = [];
  for(var i=0; i < charCount; i++){
    var charname_value = $("#charnamefield"+i).val();
    charname_array.push(charname_value);
  }
  return charname_array;
}

function reinstoreExistingValues(charCount, charNames) {

  //set value back to each field
  for(var i=0; i < charCount; i++){
    $("#charnamefield"+i).val(charNames[i]);//send values back to fields
  }
}

function superAddCharacter() {
  var charCount = $('.charfield').length;
  var charNames = existingCharacters(charCount);

  var newname = $('#vamp').val();
  $char_input_html = $("#charinput").html();
  $char_input_html += newname + '<br/>';
  //$char_input_html += 'Character '+(i+1)+ ': <input id="charnamefield'+numItems+'" class="charfield" name="charnames[]" value="" />';
  $("#charinput").html($char_input_html);//get new field

  reinstoreExistingValues(charCount, charNames);
}

function bindNewCharNameButton() {
  $("#newcharname").click(superAddCharacter);
}

