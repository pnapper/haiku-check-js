import {HaikuChecker} from './../js/haikuchecker.js';

$(document).ready(function() {
  $("form#formOne").submit(function(event) {
    event.preventDefault();
    // const haiku = [];

    let title = $("input#title").val();
    let lineOne = $("input#lineOne").val();
    let lineTwo = $("input#lineTwo").val();
    let lineThree = $("input#lineThree").val();

    // haiku.push([lineOne, lineTwo, lineThree]);
    let userHaiku = new HaikuChecker(lineOne, lineTwo, lineThree);
    let resultLine = userHaiku.CheckLines();
    let resultSyllables = userHaiku.CheckSyllables();

    if(resultLine == true && resultSyllables == true )
    {
      $("#result").text(title + " is a Haiku");
    }
    else {
      $("#result").text(title + " is NOT a Haiku");
    }
  });



});
