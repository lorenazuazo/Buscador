//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
//contenedor de los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;



const datosBusqueda = {
    marca: '',
    year: '',
    min: '',
    max: '',
    puertas: '',
    transmision: '',
    color: '',
    
}


//eventos
document.addEventListener('DOMContentLoaded',() =>{
    mostrarAutos(autos); //este autos esta en el objeto global como un archivo .js

    //llena select de años
    llenaSelect();

});

//eventListener para los select
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', e =>{
    //tiene el signo + para convertir el string en numero
    datosBusqueda.year = +e.target.value;
    filtrarAuto();
});
minimo.addEventListener('change', e =>{
    datosBusqueda.min = +e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', e =>{
    datosBusqueda.max = +e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = +e.target.value;
    filtrarAuto();
});
transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    //console.log(datosBusqueda)
});



//funciones
function mostrarAutos(autos){
    limpiarHtml();

    autos.forEach(autos => {
        const { marca,modelo,year,precio,puertas,color,transmision } = autos;
        const autoHtml = document.createElement('p');
        autoHtml.textContent = `${marca}-${modelo}-${year}-${precio}-${puertas}-${color}-${transmision}`;
        
        resultado.appendChild(autoHtml);
    });

};

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    };
};

function llenaSelect(){

    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
};

function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo)
        .filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision)
        .filter(filtrarColor);

        console.log(resultado)
    if(resultado.length > 0){
        mostrarAutos(resultado);
        
    }else{
        noResultado();
    }
};

function noResultado(){
    limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error')
    noResultado.textContent = "No hay resutados, intenta con otros terminos de busqueda";
    resultado.appendChild(noResultado)

}

function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if(marca){
        return marca === auto.marca
    }
    return auto;
};

function filtrarYear(auto){
    const { year } = datosBusqueda;
    if(year){
        return year === auto.year
    }
    return auto;
};

function filtrarMinimo(auto){
    const { min } = datosBusqueda;
    if(min){
        return min <= auto.precio
    }
    return auto;
};

function filtrarMaximo(auto){
    const { max } = datosBusqueda;
    if(max){
        return max >= auto.precio
    }
    return auto;
};

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if(puertas){
        return puertas === auto.puertas
    }
    return auto;
};

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if(transmision){
        return transmision === auto.transmision
    }
    return auto;
};

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if(color){
        return color === auto.color
    }
    return auto;
};
