const fs = require('fs');

const axios = require('axios');
const path = require('path');

class Busquedas{
    historial = [];
    dbPath = './db/database.json'

    constructor(){
        //Leer DB si existe
    }

    get historialCapitalizado(){
        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase()+p.substring(1).toLowerCase());

            return palabras.join(' ')
        })
        //return this.historial
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

    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLowerCase())){
            return
        }

        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLowerCase());

        //grabar en DB
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){
        //debe de existir
        if(fs.existsSync(this.dbPath)){
            const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
            if(info){   //Si existe informacion en el json
                const data = JSON.parse(info);  //Parsear a json
                this.historial = data.historial;    //Transferir la información
            }
        }
    }
}

module.exports = Busquedas;