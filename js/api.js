function obtenerPrediccionMunicipal(codigoPostal, callback) {

    var resultado = { 
        lugar : "",
        provincia : "",
        prevision : []
    };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/"+codigoPostal+"/?api_key="+APIKEY,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var segundaUrl = response.datos; // segun el API de la AEMET aqui tenemos otra URL con los datos que queremos

        // volvemos a pedir los datos al servidor
        settings.url = segundaUrl;
        $.getJSON(segundaUrl, function (response) {
            // ahora si, deberiamos de tener los datos de la prediccion
            var datos = response[0]; // en la casilla 0 del array que devuelve tenemos los datos

            // obtenemos provicina y nombre
            resultado.lugar = datos.nombre;
            resultado.provincia = datos.provincia;

            // en datos.prediccion.dia tenemos un array con 7 elementos uno para cada dia de la semana
            // (es una prediccion a 7 dias)
            var semana = datos.prediccion.dia;
            // console.log(semana);

            for (var i=0; i<semana.length; i++) {
                var dia = semana[i];
                var fecha = new Date(dia.fecha);
                var mes = ((fecha.getMonth()+1) + "").padStart(2, "0");
                datosDelDia = { fecha: fecha.getDate() + "/" + mes + "/" + fecha.getFullYear() }

                // precipitacion                        
                var probabilidades = dia.probPrecipitacion.map(item => item.value);
                datosDelDia.probabilidadMaxima = Math.max(...probabilidades);
                
                // temperatura                        
                datosDelDia.temperaturaMin = dia.temperatura.minima;
                datosDelDia.temperaturaMax = dia.temperatura.maxima;

                // humedad
                datosDelDia.humendadMin = dia.humedadRelativa.minima;
                datosDelDia.humendadMax = dia.humedadRelativa.maxima;

                // viento
                var velocidadesViento = dia.viento.map(item => item.velocidad);
                datosDelDia.velocidadVientoMax = Math.max(...velocidadesViento);
                datosDelDia.velocidadVientoMin = Math.min(...velocidadesViento);

                // radiacion máxima
                datosDelDia.radiacionMaxima = dia.uvMax ? dia.uvMax : '?';

                // añadimos al resultado
                resultado.prevision.push(datosDelDia);
            }

            callback(resultado);
        
        });
    }); 

}