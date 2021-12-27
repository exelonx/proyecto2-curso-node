const axios = require('axios');

class Busquedas{
    historial = ['Tegucigalpa', 'Madrid', 'San José'];
    constructor(){
        //Leer DB si existe
    }

    async ciudad(lugar){
        try {
            //Petición HTTP
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/tegucigalpa.json?limit=5&language=es&access_token=pk.eyJ1IjoiZXhlbG9uIiwiYSI6ImNreG94MTlheTQ4aGoydG1mdnc0NHRhdnUifQ.yjTvO5O4zOf6IYw9bL-KWg')
            console.log(resp.data);

            return []
            
        } catch (error) {
            return [];
        }

        return []; //Retornar los lugares que coincidan
    }
}

module.exports = Busquedas;