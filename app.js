require('dotenv').config()


const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() =>{
    const busquedas = new Busquedas();
    busquedas.leerDB();
    //busquedas.historialCapitalizado;
    await pausa();
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
                if(id === '0') continue;
                const lugarSeleccionado = lugares.find(l => l.id === id);
                let { nombre, lng, lat } = lugarSeleccionado;
                
                //Guardar en DB
                busquedas.agregarHistorial(nombre)
                
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
            
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) =>{
                    let idx = (i+1)+'.';
                    console.log(`${idx.green} ${lugar}`);
                })
                break

        }

        if(opt !== 0) await pausa();    //Hace pausa si se elige no salir
    }while(opt!==0);



}

main();