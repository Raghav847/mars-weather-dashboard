const API_KEY  = import.meta.env.VITE_NASA_API_KEY
const BASE_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;


export async function fetchMarsWeather() {
    try {
        const res = await fetch(BASE_URL)
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Failed to fetch data: ", err)
        return null;
    }
}