
// btns
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const continueBtn = document.getElementById("continue");
const resetBtn = document.getElementById("reset");

// inputs
const minInput = document.getElementById("min");
const hrsInput = document.getElementById("hr");
const secInput = document.getElementById("sec");

let countDownTimerId = 0; // need this in every events
let remainingTime = 0;

// Apply max length on input field, Simply Slice input values with given max length.
function applyMaxTwoLengthOnInputField(me) {
    me.value = me.value.slice(0, me.maxLength)
}

startBtn.addEventListener('click', (event) => {

    // If any input is blank then consider that value 0.
    let minutes = parseInt(minInput.value) || 0;
    let hrs = parseInt(hrsInput.value) || 0;
    let seconds = parseInt(secInput.value) || 0;

    // Check Input is valid or not (check for negative values)
    const isValid = validateInputs(hrs, minutes, seconds);
    if (isValid) {
        //  const transformedValues = transformValues(hrs, minutes, seconds);
        //   console.log("👉  transformedValues:", transformedValues);
        let totalSeconds = hrs * 3600 + minutes * 60 + seconds;
        if (totalSeconds > 0) {
            startTimer(totalSeconds);
        }
    }

})

// Fields are Number Field and by using Input up & down array we can enter negative values.
// So required this check.
function validateInputs(hrs, mins, secs) {
    if (hrs < 0 || mins < 0 || secs < 0) {
        alert('Negative time is not allowed')
        return false;
    }
    return true;
}


// This is extra Check (For now we don't need this. Because we are setting values into Input Field after calculating total seconds)
function transformValues(hrs, mins, secs) {
    if (secs > 60) {
        secs = secs - 60;
        mins++;
    }
    if (mins > 60) {
        mins = mins - 60;
        hrs++;
    }
    return {
        newHrs: hrs,
        newMins: mins,
        newSecs: secs
    }
}

function startTimer(totalSeconds) {
    let leftTime = totalSeconds;
    countDownTimerId = setInterval(() => {
        updateUI(leftTime);
        leftTime--; // leftTime will be decreased by 1 at every second.
        if (leftTime < 0) {
            clearInterval(countDownTimerId);   // stop the timer when there is no left time
            return;
        }
    }, 500);

}

function updateUI(leftTime) {
    console.log("👉  leftTime:", leftTime);
    remainingTime = leftTime; // store in global var.
    // now retrieve hours, minutes and seconds from leftTime
    let hours = Math.floor(leftTime / 3600);
    let minutes = Math.floor((leftTime % 3600) / 60);
    let secs = leftTime % 60;
    //console.log('left time, ', hours, minutes, secs);

    // Another way to find hours minutes and seconds from total time seconds

    /*
      let hours1 = Math.floor(leftTime / 3600);
      let remainingSeconds = leftTime - (hours1 * 3600);
      let minutes1 =  Math.floor(remainingSeconds / 60);
      let seconds1 = remainingSeconds - (minutes1 * 60);
      console.log('another way ', hours1, minutes1, seconds1);
      
    */

    // Set transformed Values into input Field
    minInput.value = minutes;
    secInput.value = secs;
    hrsInput.value = hours;

    // If we have to display timer values like 00, 01, 02, 09 etc then we can change hrs, minutes and seconds
    // values and after that set in input fields.

}

// Timer should reset to 0
resetBtn.addEventListener('click', () => {
    clearInterval(countDownTimerId); // First stop timer
    remainingTime = 0;
    minInput.value = null; // set input fields as null OR Clear input fields
    secInput.value = null;
    hrsInput.value = null;
});

// On Pause simply clear interval.
pauseBtn.addEventListener('click', () => {
    clearInterval(countDownTimerId); // stop timer
});

/*
We already saved remainingTime in global variable.
So we can call startTimer again with remainingTime.
Note: We are decreasing one value of remainingTime here. Because we will get remaining time value just before pause button.
If we do not decrease one value here then last value will print two times.
*/
continueBtn.addEventListener('click', () => {
    if (remainingTime > 0) {
        startTimer(--remainingTime);
    }
});
