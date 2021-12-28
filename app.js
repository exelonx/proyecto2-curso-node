require('dotenv').config()


const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() =>{
    const busquedas = new Busquedas();
    let opt
     
    do{
        opt = await inquirerMenu();     //Carga Menú
        
        switch (opt) {
            case 1:
                //Mostrar mensaje
                let lugar = await leerInput('Ciudad: ');
                        
                //Buscar los lugares
                const lugares = await busquedas.ciudad(lugar);
                
                //Seleccionar el lugar
                const id = await listarLugares(lugares)
                const lugarSeleccionado = lugares.find(l => l.id === id);
                let { nombre, lng, lat } = lugarSeleccionado;
                
                //Clima

                const climaLugar = await busquedas.getClima(lat, lng);
                let { min, max, temp, desc, hum } = climaLugar;
                //Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', nombre.green);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:',temp,'°C');
                console.log('Mínima:', min,'°C');
                console.log('Máxima:', max,'°C');
                console.log('Humedad:', hum);
                console.log('Como está el clima:', desc.green);
                break;

        }

        if(opt !== 0) await pausa();    //Hace pausa si se elige no salir
    }while(opt!==0);



}

main();