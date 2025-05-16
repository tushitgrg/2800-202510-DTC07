export async function fetchUserWeather() {
  const position = await new Promise((resolve, reject) => {
    // Reject right away if the browser doesn’t implement the Geolocation API
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation not supported for browser"));
    }

    // Parameter to use high accuracy tracking (GPS)
    const gpsSetting = {
      enableHighAccuracy: true,
      timeout: 20000, // 20 seconds before giving up
      maximumAge: 0, // Don’t use a cached position
    };

    // If successful, resolve returns the native Position object, else reject with Error
    navigator.geolocation.getCurrentPosition(
      resolve,
      () => reject(new Error("Unable to retrieve user location")),
      gpsSetting,
    );
  });

  // Get latitude and longitude from Position object
  const { latitude, longitude } = position.coords;

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
  if (!apiKey) throw new Error("Missing Weather API key");

  const endpoint = "https://api.openweathermap.org/data/2.5/weather";

  // Query string for URL params to filter for user weather data
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    appid: apiKey,
    units: "metric",
  });

  // Fetch from weather API with user location data
  const res = await fetch(`${endpoint}?${params}`);
  if (!res.ok) throw new Error(`Weather API error: ${res.statusText}`);

  const data = await res.json();
  // Generate object with relevant data
  const userWeather = {
    weather: getSimpleWeather(data.weather[0].main),
    temp: data.main.temp,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    country: data.sys.country,
    city: data.name,
  };

  return userWeather;
}

function getSimpleWeather(condition) {
  const normalized = condition.toLowerCase();

  if (["snow"].includes(normalized)) {
    return "snowy";
  }

  if (
    ["clouds", "mist", "haze", "fog", "smoke", "dust", "sand", "ash"].includes(
      normalized,
    )
  ) {
    return "cloudy";
  }

  if (
    ["rain", "drizzle", "thunderstorm", "squall", "tornado"].includes(
      normalized,
    )
  ) {
    return "rainy";
  }

  return "sunny";
}
