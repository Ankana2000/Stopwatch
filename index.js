window.addEventListener('load', function() {
    // Variables
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var display = document.getElementById('timer');
    var startButton = document.getElementById('strtbtn');
    var stopButton = document.getElementById('stopbtn');
    var resetButton = document.getElementById('reset');
    var lapButton = document.getElementById('lapbtn');
    var interval;
    var lapTimes = [];
    var lapTimesDisplay = document.getElementById('lapTimesDisplay'); // Reference to the display element for lap times

    // Event listeners
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener("click", laptimer);

    // Timer functions
    function startTimer() {
        interval = setInterval(incrementTimer, 1000);
        startButton.disabled = true;
    }

    function stopTimer() {
        clearInterval(interval);
        startButton.disabled = false;
    }

    function resetTimer() {
        clearInterval(interval);
        hours = 0;
        minutes = 0;
        seconds = 0;
        display.textContent = formatTime(hours, minutes, seconds);
        startButton.disabled = false;
        lapTimes = []; // Reset the lap times array
        lapTimesDisplay.textContent = ""; // Clear the lap times display
    }

    function incrementTimer() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        display.textContent = formatTime(hours, minutes, seconds);
    }

    function laptimer() {
        const currentTime = display.textContent;
        lapTimes.push(currentTime);
        console.log("Lap time: " + currentTime);
        updateLapTimesDisplay();
    }

    function updateLapTimesDisplay() {
        lapTimesDisplay.textContent = ""; // Clear the existing lap times display
        for (let i = 0; i < lapTimes.length; i++) {
            const lapTime = lapTimes[i];
            const lapItem = document.createElement("li");
            lapItem.textContent = "Lap " + (i + 1) + ": " + lapTime;
            lapTimesDisplay.appendChild(lapItem);
        }
    }

    function formatTime(hours, minutes, seconds) {
        return (
            (hours < 10 ? '0' + hours : hours) +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds)
        );
    }

});
