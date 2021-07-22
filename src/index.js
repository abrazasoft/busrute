const express = require('express'); 
const path = require('path');
const formidable = require('express-form-data');
const bodyParser = require('body-parser');
//const xlsx = require("xlsx");
const fs = require('fs-extra');
const { stringify } = require('querystring');
var strtotime = require('strtotime');
var moment = require('moment-timezone');
var moment = require('moment'); 
//const {createConnection, getConnection} = require('./database');

const app = express();
const arrayFindIndex = require('array-find-index');
const { time } = require('console');

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(formidable.parse({ keepExtensions: true }))


app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname+'/vistas/index.html'));
});


app.post('/busqueda',   async (req, res) => {

  const { origen, destino } = req.body;
  //res.sendFile(path.join(__dirname+'/vistas/index.html'));

  //  origen = "elm";

  //  destino = "cbx";

   fecha = moment(req.body.fecha).format("YYYY/MM/DD");

   //console.log(fecha);
 
 const ruta = [

   {
    estaciones: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ],
    corridas: [{
    direccion: "s",
    fecha: "2021/12/02",
    hora_inicial: "08:00",
    corrida: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ]
   },
   {
    direccion: "s",
    fecha: "2021/12/02",
    hora_inicial: "10:00",
    corrida: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ]
   },
   {
    direccion: "s",
    fecha: "2021/12/02",
    hora_inicial: "12:00",
    corrida: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ]
   },
   {
    direccion: "s",
    fecha: "2021/12/02",
    hora_inicial: "14:00",
    corrida: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ]
   },
   {
    direccion: "s",
    fecha: "2021/12/04",
    hora_inicial: "08:00",
    corrida: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ]
   },  {
    direccion: "s",
    fecha: "2021/12/04",
    hora_inicial: "10:00",
    corrida: [
      {"name": "elm", "minutes": "0"},
      {"name": "bpk", "minutes": "15"},
      {"name": "pma", "minutes": "35"},
      {"name": "ont", "minutes": "45"},
      {"name": "rvs", "minutes": "70"},
      {"name": "crn", "minutes": "80"},
      {"name": "lel", "minutes": "100"},
      {"name": "tmc", "minutes": "130"},
      {"name": "esc", "minutes": "155"},
      {"name": "sys", "minutes": "180"},
      {"name": "cbx", "minutes": "210"},
      {'name': "apt", "minutes": "240"}
    ]
   }


    ]}
   
  ]


 
  var estaciones = ruta[0].estaciones;


  //console.log(estaciones);

   function indexestacion(estancion){

    var index = estaciones.findIndex(obj => obj.name == estancion);

    return index;
    
   }
  
  
  indexorginen = indexestacion(origen);
  indexdestino = indexestacion(destino);

  if(indexorginen < indexdestino){
     // console.log("corrida hacia el sur");
      calcular(indexorginen, indexdestino, "s");
  }else if (indexorginen > indexdestino) {
      // console.log("corrida hacia el norte");
      calcular(indexorginen, indexdestino, "n");
  }else{
      console.log('error')
  }
  

  

  function calcular(indexo, indexd, direccion){
    hora = ruta[0].hora_inicial;
    fecha_corrida = strtotime(fecha+' '+hora);

  

    corridas = filter(ruta[0].corridas, direccion , 'direccion' );

    
    corridasfecha = filter(ruta[0].corridas, fecha , 'fecha' );


    calcularcorridas(indexo, indexd, corridasfecha);
    

    


  }


   // este codigo es para convertir los minutos en horas y mostrar el tiempo de viaje en un mejor formato
  function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }



  //usaremos este codigo para filtrar tanto las corridas como las fechas de cada corrida
  function filter(array, value, key) {
    return array.filter(key
        ? a => a[key] === value
        : a => Object.keys(a).some(k => a[k] === value)
    );
}


  function calcularcorridas(indexo, indexd, corridas){
    mino = ruta[0].estaciones[indexo].minutes*60;
    mind = ruta[0].estaciones[indexd].minutes*60;
    

    arreglocorridas = [];

    
    corridas.forEach(element => {
      
        fecha_corrida = strtotime(element.fecha+' '+element.hora_inicial);
        fechahoraorigen = moment( new Date((fecha_corrida+mino)*1000)).format('LLL');
        fechallegada = moment( new Date((fecha_corrida+mind)*1000)).format('LLL');
        tiempoviaje = moment(mind-mino);
          

             my_obj = corridas.reduce(function(obj, elem) {
              obj["origen"] = origen;
              obj["destino"] = destino;
              obj["fechasalida"] = fechahoraorigen;
              obj["fechallegada"] = fechallegada;
              obj["tiempoviaje"] = secondsToString(tiempoviaje);
              return obj;
            }, {});

            

            
          arreglocorridas.push(my_obj);
           
    });
    
    
    
      res.send(JSON.stringify(arreglocorridas))

    


  }




});


app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
    //console.log(path.join(__dirname))
  });
 