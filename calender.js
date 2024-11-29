// Public holidays array
const publicHolidays = ["2024-01-01", "2024-07-04", "2024-12-25"]; // Example holidays

// Format time to AM/PM
function formatTime(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${adjustedHour}:00 ${suffix}`;
}

// Generate slots for a specific day based on slot duration
function generateDaySlots(day) {
  const hourDuration = parseInt(
    document.getElementById(`${day}Duration`).value,
    10,
  );
  const slotList = document.getElementById(`${day}Slots`);
  slotList.innerHTML = ""; // Clear previous slots

  const startTime = 8; // Start time: 8 AM
  const endTime = 18; // End time: 6 PM
  const today = new Date();
  const weekStartDate = getWeekStart(today); // Get the start of the current week
  const dayIndex = getDayIndex(day); // Get the day's index in the week

  // Calculate the specific date for this weekday
  const currentDayDate = new Date(weekStartDate);
  currentDayDate.setDate(weekStartDate.getDate() + dayIndex);

  // Check if the day is a public holiday
  const isHoliday = publicHolidays.some(
    (holiday) =>
      new Date(holiday).toDateString() === currentDayDate.toDateString(),
  );

  if (isHoliday) {
    alert(
      `${day} (${currentDayDate.toDateString()}) is a public holiday. Slots will not be generated.`,
    );
    slotList.innerHTML = `<li style="color: red;">Public Holiday: ${currentDayDate.toDateString()}</li>`;
    return;
  }

  // Generate time slots
  for (let hour = startTime; hour < endTime; hour += hourDuration) {
    const slotStart = formatTime(hour);
    const slotEnd = formatTime(hour + hourDuration);

    const listItem = document.createElement("li");
    listItem.innerText = `${slotStart} - ${slotEnd}`;
    listItem.setAttribute("data-date", currentDayDate.toDateString());
    slotList.appendChild(listItem);
  }

  alert(
    `Slots for ${day} (${currentDayDate.toDateString()}) generated successfully.`,
  );
}

// Load public holidays into the holiday calendar
function loadHolidays() {
  const holidayCalendar = document.getElementById("holidayCalendar");
  publicHolidays.forEach((holiday) => {
    const holidayDate = new Date(holiday).toDateString();

    const holidayItem = document.createElement("div");
    holidayItem.innerText = `Holiday: ${holidayDate}`;
    holidayItem.style.color = "#d9534f";
    holidayCalendar.appendChild(holidayItem);
  });
}

// Get the start of the week (Monday)
function getWeekStart(date) {
  const currentDay = date.getDay();
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - (currentDay === 0 ? 6 : currentDay - 1)); // Monday is the first day
  return weekStart;
}

// Map weekday name to its index
function getDayIndex(day) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days.indexOf(day);
}

// Validate form submission
function validateForm() {
  const service = document.getElementById("service").value;
  if (!service) {
    alert("Please select a service before submitting.");
    return false;
  }

  const recurring = document.getElementById("recurring").checked;
  alert(`Service: ${service}\nRecurring: ${recurring ? "Yes" : "No"}`);
  return true;
}

// Initialize the weekly schedule
document.addEventListener("DOMContentLoaded", () => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  loadHolidays();

  // Generate default slots for all days
  weekdays.forEach((day) => generateDaySlots(day));

  // Add form submission handler
  document.getElementById("scheduleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Schedule saved successfully!");
    }
  });
});
