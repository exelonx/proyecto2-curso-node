const axios = require('axios');

class Busquedas{
    historial = ['Tegucigalpa', 'Madrid', 'San José'];
    constructor(){
        //Leer DB si existe
    }

    get paramsMapbox(){
        return {
            'limit': 5,
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsOpenWeather(){
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar){
        try {
            //Petición HTTP
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await intance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); 
        } catch (error) {
            return [];
        }
    }

    async getClima(lat, lng){
        try {
            //Petición http
            const instancia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}`,
                params: this.paramsOpenWeather
            })

            const respuesta = await instancia.get();
            
            return {
                desc: respuesta.data.weather[0].description,
                min: respuesta.data.main.temp_min,
                max: respuesta.data.main.temp_max,
                temp: respuesta.data.main.temp,
                hum: respuesta.data.main.humidity
            };
        } catch (error) {
            return error.toString();
        }
    }
}

module.exports = Busquedas;