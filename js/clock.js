var numBackgrounds = 7;
var activeTask = false;

// clockUpdate() :
// Called every second. Updates clock display & time of day message.
function clockUpdate() {
    var date = new Date();
    $("#time").text(getHours(date) + ":" + getMinutes(date));
}

// getHours():
// Generates current hour. Adjusts 24 hour -> 12 hour time.
function getHours(date) {
    var clockHours = date.getHours();

    if (!activeTask)
      updateMessage(clockHours);

    if (clockHours > 12) {
        clockHours -= 12;
    } else if (clockHours === 0) {
       clockHours = 12;
    }

    return clockHours;
}

// getMinutes():
// Generates current minute. Fixes minutes < 10 to have a 0
// in front of it. e.g. "0" + 6 = ':06'
function getMinutes(date) {
    var clockMinutes = date.getMinutes();

    if (clockMinutes < 10) {
       clockMinutes = "0" + clockMinutes;
    }

    return clockMinutes;
}

// updateMessage(clockHours):
// Given current hour of the day, generates proper greeting
// message based on time of day.
function updateMessage(clockHours) {
    console.log(clockHours);
    var message = "";

    switch(clockHours) {
        // 12 am - 11 am
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          message = "Good morning."
          break;
        // 12 pm - 4 pm
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
          message = "Good afternoon."
          break;
        // 5 pm - 11 pm
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
          message = "Good evening."
          break;
        default:
          message = ""
          break;
    }
    $("#message").text(message);
}


// Starts clock, sets background-image to a random background, initializes tooltips
$(document).ready(function() {
      clockUpdate();
      $('body').css({'background-image': 'url(media/img/bg' + Math.floor(Math.random() * numBackgrounds) + '.jpg)'});
      $('[data-toggle="tooltip"]').tooltip();
});

// Update clock and timer every second
window.setInterval(function(){
      clockUpdate();
      timerUpdate();
}, 1000);
