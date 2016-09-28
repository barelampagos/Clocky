// Initialize task list + current task ID
var tasks = [];
var taskID = 0;

// addTask(hour, min):
// Creates new task from the form value and time duration (hour, min). Assigns a
// task ID, pushes new task to tasks queue & #taskList.
function addTask(hour, min) {
    var input = $('#task-input').val();
    $('#task-input').val("");
    console.log(input);

    if (input != "") {
        var newTask = {
            task: input,
            hours: hour,
            minutes: min,
            id: taskID
        };

        tasks.push(newTask);
        taskID++;

        var taskString = "<p id='" + newTask.id + "'>" + newTask.task + " - " + newTask.hours + ":";
        if (newTask.minutes < 10) {
            taskString += "0"
        }
        taskString += newTask.minutes + ":00</p>";

        $('#taskList').append(taskString);
    }
    taskTitleDisplay();
}

// startTask():
// Dequeues from tasks, initializes #currentTask & timer for task.
// If no valid tasks, displays proper message.
function startTask() {
    timerOff();
    var currentTask = tasks.shift();
    console.log(currentTask);

    if (currentTask != undefined) {
        activeTask = true;
        $('p#' + currentTask.id).remove();
        $("#message").text(currentTask.task);
        initializeTimer(currentTask.hours, currentTask.minutes);
        toggleTimer();
    } else {
        activeTask = false;
        $("#currentTask").text("No tasks.");
        timerOn = false;
    }

    console.log(tasks.length)
    taskTitleDisplay();
}

// taskTitleDisplay():
// Updates display title depending on length of tasks queue.
function taskTitleDisplay() {
    if (tasks.length > 0) {
        // Display "Tasks:"
        $("#taskTitle").text("To-Do:");
    } else {
        // Display ""
        $("#taskTitle").text("");
    }
}
