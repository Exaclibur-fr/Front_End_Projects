const apiKey = "d49e60e710482fd3a2b6fc09bd474a5d";

function getWeather() {

    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {

            result.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>🌡 <strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p>☁ <strong>Weather:</strong> ${data.weather[0].main}</p>
                <p>💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p>🌬 <strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;

        })
        .catch(() => {
            result.innerHTML = "<p>❌ City not found!</p>";
        });
}
