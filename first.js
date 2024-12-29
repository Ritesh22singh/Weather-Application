// Weather App

// Selecting form and input elements from the DOM for user interaction
const weatherForm = document.querySelector(".weatherForm"); // The weather form element
const cityInput = document.querySelector(".cityInput"); // Input box for entering the city name
const card = document.querySelector(".card"); // The card element where weather details will be displayed

// Your API key for accessing the OpenWeatherMap API
const apiKey = "234f35a1a1f28a562fcda1e31f591240";

// Event listener for form submission
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default behavior of form submission (page reload)

  const city = cityInput.value.trim(); // Get and trim the user input (remove extra spaces)

  if (city) {
    // If the city name is not empty
    try {
      const weatherData = await getWeatherData(city); // Fetch weather data for the entered city
      displayWeatherInfo(weatherData); // Display the fetched data on the UI
    } catch (error) {
      console.error(error); // Log any errors in the console for debugging
      displayError("City not found. Please try again."); // Show an error message to the user
    }
  } else {
    displayError("Please enter a city name."); // Handle case where no city is entered
  }
});

// Function to fetch weather data from the OpenWeatherMap API
async function getWeatherData(city) {
  // Construct the API URL with the city name and API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Fetch data from the API
  const response = await fetch(apiUrl);

  if (!response.ok) {
    // If the response status is not OK (e.g., 404)
    throw new Error("Failed to fetch weather data"); // Throw an error to handle it in the calling function
  }

  return await response.json(); // Parse and return the JSON data from the response
}

// Function to display weather information on the card
function displayWeatherInfo(data) {
  // Selecting elements inside the card to update their content
  const cityDisplay = document.querySelector(".cityDisplay"); // City name display
  const tempDisplay = document.querySelector(".tempDisplay"); // Temperature display
  const humidityDisplay = document.querySelector(".humidityDisplay"); // Humidity display
  const descDisplay = document.querySelector(".descDisplay"); // Weather description display
  const weatherDisplay = document.querySelector(".weatherDisplay"); // Weather icon display
  const errorDisplay = document.querySelector(".errorDisplay"); // Error message display

  // Destructuring the data object for easier access
  const {
    name: city, // City name
    main: { temp, humidity }, // Temperature and humidity
    weather: [{ description, id }], // Weather description and ID for icon
  } = data;

  // Updating the card with weather details
  cityDisplay.textContent = city; // Set the city name
  tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`; // Convert temperature from Kelvin to Celsius and display
  humidityDisplay.textContent = `Humidity: ${humidity}%`; // Display humidity percentage
  descDisplay.textContent =
    description.charAt(0).toUpperCase() + description.slice(1); // Capitalize first letter of description
  weatherDisplay.textContent = weatherEmoji(id); // Get weather emoji based on ID

  // Hide any previous error message and make the card visible
  errorDisplay.style.display = "none";
  card.style.display = "block";
}

// Function to map weather ID to an appropriate emoji
function weatherEmoji(weatherId) {
  // Match the weather ID with the corresponding weather condition
  switch (true) {
    case weatherId >= 200 && weatherId < 300: // Thunderstorm
      return "⛈️";
    case weatherId >= 300 && weatherId < 400: // Drizzle
      return "🌦️";
    case weatherId >= 500 && weatherId < 600: // Rain
      return "🌧️";
    case weatherId >= 600 && weatherId < 700: // Snow
      return "❄️";
    case weatherId >= 700 && weatherId < 800: // Atmosphere (e.g., fog, mist)
      return "🌫️";
    case weatherId === 800: // Clear sky
      return "☀️";
    case weatherId > 800: // Cloudy weather
      return "☁️";
    default: // Unknown weather condition
      return "❓";
  }
}

// Function to display an error message on the card
function displayError(message) {
  const errorDisplay = document.querySelector(".errorDisplay"); // Select the error message display element
  errorDisplay.textContent = message; // Set the error message text
  errorDisplay.style.display = "block"; // Make the error message visible
  card.style.display = "none"; // Hide the weather card
}

// getWeatherData:
// Fetches weather data for a given city using the OpenWeatherMap API.
// Handles errors if the city is invalid or there's a network issue.

// displayWeatherInfo:
// Extracts and formats the weather data.
// Updates the DOM elements with the relevant details (e.g., city, temperature, humidity).

// weatherEmoji:
// Matches the weather ID to a relevant emoji based on its range.
// Helps visually represent the weather condition.

// displayError:
// Shows an error message when something goes wrong (e.g., invalid city or empty input).
// Hides the weather card when an error occurs.
