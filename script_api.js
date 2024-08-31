// script_api.js

document.addEventListener('DOMContentLoaded', async function () {
    // Function to fetch weather data based on the city
    const fetchWeatherData = async function (cityName) {
        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3ed6f734cbmsh584a0e02f470944p1a0438jsnd4143cd26322',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);

            // Update HTML elements with weather information
            document.getElementById('temp').innerText = result.temp;
            document.getElementById('max_temp').innerText = result.max_temp;
            document.getElementById('cityName').innerText = cityName; // Update with user-input city name
			document.getElementById('wind_speed').innerText = result.wind_speed;
        } catch (error) {
            console.error(error);
        }
    };

    // Initial city name
    let cityName = localStorage.getItem('searchedCity') || 'Lahore';

    // Initial fetch for default city (Lahore) or the last searched city
    await fetchWeatherData(cityName);

    // Event listener for the search icon
    document.querySelector('.search-icon').addEventListener('click', async function () {
        // Get the entered city from the input box
        const newCityName = document.querySelector('.search-box').value.trim();

        // Update the city name and fetch new weather data
        if (newCityName !== '') {
            cityName = newCityName;
            localStorage.setItem('searchedCity', cityName); // Save searched city to localStorage
            await fetchWeatherData(cityName); // Wait for the weather data to be fetched
        }
    });
});
