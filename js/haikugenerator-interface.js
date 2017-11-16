import {HaikuGenerator} from './../js/haikugenerator.js';

$(document).ready(function() {
  $("button#newHaiku").click(function(event) {
    event.preventDefault();
    console.log('hello you are in HaikuGenerator');

    var autoHaiku = new HaikuGenerator();
    let ipAddress = autoHaiku.GenerateIP();
    console.log(ipAddress);

    let newHaiku = autoHaiku.DecodeIP(ipAddress);
    console.log(newHaiku);
    $("#result").text(newHaiku);

  });

});
