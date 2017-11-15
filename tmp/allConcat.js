import { HaikuChecker } from './../js/haikuchecker.js';

$(document).ready(function() {
  $("form#formOne").submit(function(event) {
    event.preventDefault();
    const haiku = [];

    let lineOne = $("input#lineOne").val();
    let lineTwo = $("input#lineTwo").val();
    let lineThree = $("input#lineThree").val();

    poem.push([lineOne, lineTwo, lineThree]);
  });

  let userHaiku = new HaikuChecker();

  let result = userHaiku.CheckAll(haiku[0], haiku[1], haiku[2]);

  if(result == true)
  {
    $("result").text("Is a Haiku");
  }
  else {
    $("result").text("Is NOT a Haiku");
  }

});
