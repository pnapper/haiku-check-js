import {HaikuGenerator} from './../js/haikugenerator.js';

$(document).ready(function() {
  $("button#newHaiku").click(function(event) {
    event.preventDefault();
  
    var autoHaiku = new HaikuGenerator();
    let ipAddress = autoHaiku.GenerateIP();
    console.log(ipAddress);

    let newHaiku = autoHaiku.DecodeIP(ipAddress);
    const haikuArray = newHaiku.split("\n");
    console.log(haikuArray);
    for (var i = 0; i < 3; i++) {
      $("#result").append(haikuArray[i] + "<br>");
    }

  });

});
