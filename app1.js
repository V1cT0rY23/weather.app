
const apiKey = " 1409a191044fa110fd667e27fdc7da00";
const cityInput =  document.getElementById("cityInput");
const getWeatherButton = document.getElementById("getWeather");
const alertsDiv = document.getElementById("alerts");

getWeatherButton.addEventListener("click", () => {
	const cityName = cityInput.value.trim();
	if (cityName === "") {
		alert("Please enter a city name.");
		return;
	}

	const completeUrl = `(link unavailable);

	fetch(completeUrl, {
		type: 'GET'
	})
	.then((response) => response.json())
	.then((data) => {
		if (data.hasOwnProperty("alert") && data.alert !== null) {
			const alertMessage = document.createElement("p");
			alertMessage.textContent = data.alert.description;
			alertsDiv.appendChild(alertMessage);
		} else {
			const noAlertsMessage = document.createElement("p");
			noAlertsMessage.textContent = "No weather alerts at this time.";
			alertsDiv.appendChild(noAlertsMessage);
			getWeatherButton.disabled = true;
			setTimeout(() => {
				getWeatherButton.disabled = false;
				alertsDiv.innerHTML = "";
			}, 10000);
		}
	})
	.catch((error) => console.error(error));
});