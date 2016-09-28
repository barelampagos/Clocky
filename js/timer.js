// Initialize Global Variables for Timer + Alert Sound
var timerHours = 0;
var timerMinutes = 0;
var timerSeconds = 0;
var timerOn = false;
var alert = new Howl({
  src: ['media/alert.mp3'],
  loop: true
});

// initializeTimer(hour, minutes):
// Creates a timer given an hour & minute duration
function initializeTimer(hour, minutes) {
    timerHours = hour;
    timerMinutes = minutes;
    timerSeconds = 0;
    timerString = timerHours + ":";
    if (timerMinutes < 10) {
        timerString += "0"
    }
    timerString += timerMinutes + ":0" + timerSeconds;

    $("#timer").text(timerString);
    $("title").text("Clocky (" + timerString + ")");

    timerOn = false;
}

// toggleTimer():
// If the timer is valid (time remaining), toggle the timer start/stop
function toggleTimer() {
    if (timerHours > 0 || timerMinutes > 0 || timerSeconds > 0)
        timerOn = !timerOn;
}

// timerUpdate():
// Handles timer logic. Updates timer and timer display. Sounds
// alert when timer is finished.
function timerUpdate() {
    if (timerOn) {
        // Timer logic
        if (timerHours > 0 && timerMinutes == 0) {
            timerHours--;
            timerMinutes = 60;
        }

        if (timerSeconds == 0) {
            timerMinutes--;
            timerSeconds = 60;
        }

        timerSeconds--;

        // Formatting for timer display
        var timeString = timerHours + ":";
        if (timerMinutes < 10)
            timeString += "0"
        timeString += timerMinutes + ":";

        if (timerSeconds < 10)
            timeString += "0"
        timeString += timerSeconds;

        // Update timer display
        $("#timer").text(timeString);
        $("title").text("Clocky (" + timeString + ")");

        // Timer Ends
        if (timerHours == 0 && timerMinutes == 0 && timerSeconds == 0) {
            timerOn = false;
            alert.play();
        }
    }
}

// timerOff():
// Turns off alert sound, resets timer, title, and task text.
function timerOff() {
    alert.stop();
    $("#timer").text("");
    $("#message").text("");
    activeTask = false;
    $("title").text("Clocky");

    timerOn = false;
    timerHours = timerMinutes = timerSeconds = 0;
}
