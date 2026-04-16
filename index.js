const stateInput = document.getElementById('state-input');
const fetchBtn = document.getElementById('fetch-alerts');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

function fetchWeatherAlerts(state) {
  const url = `https://api.weather.gov/alerts/active?area=${state}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid state code or network error.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayAlerts(data, state);
      resetUI();
    })
    .catch((errorObject) => {
      showError(errorObject.message);
    });
}

function displayAlerts(data, state) {
  alertsDisplay.innerHTML = "";
  errorMessage.classList.add("hidden");

  const features = data.features;
  
  const summary = document.createElement("p");
  summary.textContent = `Weather Alerts: ${features.length}`;
  alertsDisplay.appendChild(summary);

  const alertList = document.createElement("ul");
  features.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    alertList.appendChild(li);
  });
  
  alertsDisplay.appendChild(alertList);
}

function resetUI() {
  stateInput.value = "";
}

function showError(message) {
  alertsDisplay.innerHTML = ""; 
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

fetchBtn.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();
  
  if (state.length === 2) {
    fetchWeatherAlerts(state);
  } else {
    showError("Please enter a valid 2-letter state abbreviation.");
  }
});
addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchBtn.click();
  }
});