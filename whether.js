
import readline from "readline"
import dotenv from "dotenv"

dotenv.config({
  path: new URL(".env", import.meta.url)
});


const api_key = process.env.API_KEY
const base_url = "https://api.weatherapi.com/v1/current.json"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const AskQuestion = (question) => 
    new Promise((resolve) => rl.question(question, resolve))


const getWeather = async (city) =>{
    const url = `${base_url}?key=${api_key}&q=${city}`;

    try {
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error("City not Found Please Enter a Valid City Name");
        }
        const weatherData =await response.json();

        console.log(`Current Temperature in ${city} is ${weatherData.current.temp_c}°C`);
        console.log(`Weather Condition: ${weatherData.current.condition.text}`);
        console.log(`Humidity: ${weatherData.current.humidity}%`);
        console.log(`Wind Speed: ${weatherData.current.wind_kph}kph`);
    }catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}
    const city = await AskQuestion("Enter City Name:");
    await getWeather(city);
    rl.close();