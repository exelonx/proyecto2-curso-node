const inquirer = require('inquirer');
require('colors');

const menuOpt = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: '2.'.green+' Historial'
            },
            {
                value: 0,
                name: '0.'.green+' Salir'
            }
        ]
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(menuOpt);
    return opcion;
}

const pausa = async() =>{
    const Enter = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar\n`
        }]

    console.log('\n');
    await inquirer.prompt(Enter);
}

const leerInput = async(message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareaBorrar = async(tareas = []) =>{
    const choices = tareas.map((tarea, i) => {
        let idx = `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ];
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(mensaje) =>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) =>{
    const choices = tareas.map((tarea, i) => {
        let idx = `${i+1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoCheckList
}