// Connecting javascript to html elements
// INPUTS
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// FORM
const ageForm = document.getElementById("ageForm");

// ERROR MESSAGES
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");

// NEW addition to DOM collection
const dayLabel = document.getElementById("dayLabel");
const monthLabel = document.getElementById("monthLabel");
const yearLabel = document.getElementById("yearLabel");

// RESULTS
const yearsResult = document.getElementById("yearsResult");
const monthsResult = document.getElementById("monthsResult");
const daysResult = document.getElementById("daysResult");

//Largely supports Mobile's submit button
const submitBtn = document.getElementById("submitBtn");


// Add event listener
ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput();

    submitBtn.blur();
});


// NEW - BOTH CLEAR ERRORS AND AUTO-LADING-ZEROS

// CLEAR ERRORS WHEN USER TYPES
dayInput.addEventListener("input", () => {
  // FINAL ADDITION - Numeric-only input handling
  dayInput.value = dayInput.value.replace(/\D/g, "");
  // REMOVES ERROR MESSAGES WHEN USER TYPES 
  dayError.textContent = "";
// ADDITION - UPDATE TO CLEAR ERROR STYLING UPON TYPING
dayInput.classList.remove("error-input");
dayLabel.classList.remove("error-label");
});

monthInput.addEventListener("input", () => {
    // FINAL ADDITION - Numeric-only input handling
  monthInput.value = monthInput.value.replace(/\D/g, "");
  // REMOVES OLD ERROR MESSAGES
  monthError.textContent = ""; 
  // ADDITION - UPDATE TO CLEAR ERROR STYLING UPON TYPING
  monthInput.classList.remove("error-input");
  monthLabel.classList.remove("error-label");
});

yearInput.addEventListener("input", () => {
  // FINAL ADDITION - Numeric-only input handling
  yearInput.value = yearInput.value.replace(/\D/g, "");
   // REMOVES OLD ERROR MESSAGES
  yearError.textContent = "";
   // ADDITION - UPDATE TO CLEAR ERROR MESSAGES UPON TYPING
  yearInput.classList.remove("error-input");
  yearLabel.classList.remove("error-label");
});


// AUTO-LEADING ZEROS
dayInput.addEventListener("blur", () => {
  if (dayInput.value.length === 1) {
    dayInput.value = dayInput.value.padStart(2, "0");
  }
});

monthInput.addEventListener("blur", () => {
  if (monthInput.value.length === 1) {
    monthInput.value = monthInput.value.padStart(2, "0");
  }
});

// validation
// function checkInput() {
// //   console.log("Validation running");
//   const dayValue = dayInput.value.trim();
//   const monthValue = monthInput.value.trim();
//   const yearValue = yearInput.value.trim();
// //   console.log(dayValue, monthValue, yearValue);
//   // Clear old errors and add text into the <p> error element
//   dayError.textContent = "";
//   monthError.textContent = "";
//   yearError.textContent = "";
// // tracks whether validation failed
//   let hasError = false;

//   // DAY
//   if (dayValue === "") {
//     dayError.textContent = "This field is required";
//     hasError = true;
//   }

//   // MONTH
//   if (monthValue === "") {
//     monthError.textContent = "This field is required";
//     hasError = true;
//   }

//   // YEAR
//   if (yearValue === "") {
//     yearError.textContent = "This field is required";
//     hasError = true;
//   }
// // Stop running if validation failed
//   if (hasError) {
//     return;
//   }

//   console.log("Validation passed");
// }


// validation -empty validation + number-only validation + digit length validation
function checkInput() {
  const dayValue = dayInput.value.trim();
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();

  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  // NW - CLEAR OLD STYLES AT START OF VALIDATION
  dayInput.classList.remove("error-input");
  monthInput.classList.remove("error-input");
  yearInput.classList.remove("error-input");

  dayLabel.classList.remove("error-label");
  monthLabel.classList.remove("error-label");
  yearLabel.classList.remove("error-label");

  let hasError = false;

  if (dayValue === "") {
    dayError.textContent = "This field is required";
    // NEW ADDITION
    dayInput.classList.add("error-input");
    dayLabel.classList.add("error-label");
    hasError = true;
  } else if (!/^\d+$/.test(dayValue)) {
    dayError.textContent = "Only numbers are allowed";
    hasError = true;
  } else if (dayValue.length !== 2) {
    dayError.textContent = "Day must be 2 digits";
    hasError = true;
  }

  if (monthValue === "") {
    monthError.textContent = "This field is required";
    // NEW ADDITION
    monthInput.classList.add("error-input");
    monthLabel.classList.add("error-label");
    hasError = true;
  } else if (!/^\d+$/.test(monthValue)) {
    monthError.textContent = "Only numbers are allowed";
    hasError = true;
  } else if (monthValue.length !== 2) {
    monthError.textContent = "Month must be 2 digits";
    hasError = true;
  }

  if (yearValue === "") {
    yearError.textContent = "This field is required";
    // NEW ADDITION
    yearInput.classList.add("error-input");
    yearLabel.classList.add("error-label");
    hasError = true;
  } else if (!/^\d+$/.test(yearValue)) {
    yearError.textContent = "Only numbers are allowed";
    hasError = true;
  } else if (yearValue.length !== 4) {
    yearError.textContent = "Year must be 4 digits";
    hasError = true;
  }

  if (hasError) {
    return;
  }

//   console.log("Digit validation passed");
const day = Number(dayValue);
const month = Number(monthValue);
const year = Number(yearValue);

if (month < 1 || month > 12) {
  monthError.textContent = "Must be a valid month";
  hasError = true;
}

if (day < 1 || day > 31) {
  dayError.textContent = "Must be a valid day";
  hasError = true;
}

if (!hasError) {
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    dayError.textContent = "Must be a valid date";
    hasError = true;
  }

  if (birthDate > today) {
    yearError.textContent = "Must be in the past";
    hasError = true;
  }
}     

if (hasError) {
  return;
}

// console.log("Real date validation passed");
calculateAge(day, month, year);
}



function calculateAge(day, month, year) {
  const today = new Date();

  let years = today.getFullYear() - year;
  let months = today.getMonth() - (month - 1);
  let days = today.getDate() - day;

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  yearsResult.textContent = years;
  monthsResult.textContent = months;
  daysResult.textContent = days;
}




