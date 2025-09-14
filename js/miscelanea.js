class Zona{
    constructor(nombre, habitantes, superficie, descripcion){
        this.nombre = nombre;
        this.habitantes = habitantes;
        this.superficie = superficie;
        this.descripcion = descripcion;
    }

}

//Creation of Provincia (Province) class which inheritates of Zona
class Provincia extends Zona{
    constructor(nombre, habitantes, superficie, descripcion){
        super(nombre, habitantes, superficie, descripcion);
    }
    
    // Method which generates a dynamic html with inherited data from father class
    getInformacion(){
        return `
            <li class="provincia">
                <h3>${this.nombre}</h3>
                <hr/>
                <p><strong>Habitantes:</strong> ${this.habitantes}</p>
                <p><strong>Superficie:</strong> ${this.superficie}</p>
                <p><strong>Descripción:</strong> ${this.descripcion}</p>
            </li>
        `;
    }
}

//Creation of Township (Municipio) class which inheritates of Zona


var datosProvincias = [
    { nombre: "Barcelona", habitantes: 7559000, superficie: 32114, descripcion: "Región del noreste de España" },
    { nombre: "A Coruña", habitantes: 246000, superficie: 3125, descripcion: "Situada al noroeste de España" },
    { nombre: "Albacete", habitantes: 388000, superficie: 14980, descripcion: "Conocida por su queso artesanal" },
    { nombre: "Bilbao", habitantes: 345000, superficie: 41.3, descripcion: "Capital de Bizkaia" },
    { nombre: "Cádiz", habitantes: 119000, superficie: 1186, descripcion: "Famosa por su carnaval" },
    { nombre: "Castellón", habitantes: 600000, superficie: 6638, descripcion: "Con playas y montañas" },
    { nombre: "El Bierzo", habitantes: 50000, superficie: 2381, descripcion: "Región vinícola" },
    { nombre: "Girona", habitantes: 260000, superficie: 5721, descripcion: "Con un casco antiguo medieval" },
    { nombre: "Tenerife", habitantes: 1000000, superficie: 2034, descripcion: "Isla famosa por el Teide" },
    { nombre: "Madrid", habitantes: 6697000, superficie: 8028, descripcion: "Capital de España" },
    { nombre: "Málaga", habitantes: 600000, superficie: 730, descripcion: "Famosa por su Costa del Sol" },
    { nombre: "Vitoria", habitantes: 250000, superficie: 276, descripcion: "Capital del País Vasco" },
    { nombre: "Murcia", habitantes: 1500000, superficie: 8800, descripcion: "Famosa por sus huertas" },
    { nombre: "Zamora", habitantes: 60000, superficie: 10973, descripcion: "Con su famoso queso" },
    { nombre: "Almería", habitantes: 500000, superficie: 8600, descripcion: "Con desierto y playas" },
    { nombre: "Huesca", habitantes: 220000, superficie: 15000, descripcion: "Montañas y naturaleza" },
    { nombre: "Sevilla", habitantes: 8415000, superficie: 140.8, descripcion: "Famosa por su flamenco" },
    { nombre: "Vizcaya", habitantes: 1130000, superficie: 2217, descripcion: "Con una rica cultura" },
    { nombre: "Toledo", habitantes: 600000, superficie: 4000, descripcion: "Con su historia medieval" },
    { nombre: "Valencia", habitantes: 790000, superficie: 1340, descripcion: "Famosa por su paella" },
];


// Instancing provinces and townships
var provincias = datosProvincias.map(data => new Provincia(data.nombre, data.habitantes, data.superficie, data.descripcion));

// Instance and generation of HTML content
document.addEventListener("DOMContentLoaded", () => {
    var contenedorProvincias = document.querySelector("#tarjetas");

    // We iterate each province
    provincias.forEach(provincia => {
        contenedorProvincias.insertAdjacentHTML('beforeend', provincia.getInformacion());
    });

    // Track scroll position
    var lastScrollTop = 0;

    window.addEventListener("scroll", function() {
        var windowTop = window.scrollY;
        var windowHeight = window.innerHeight;

        document.querySelectorAll("section").forEach(function(section) {
            var sectionTop = section.getBoundingClientRect().top + windowTop;
            var sectionHeight = section.offsetHeight;

            // Debbug
            console.log(`Section: ${section.id}, Top: ${sectionTop}, Window Bottom: ${windowTop + windowHeight}`)

            if (windowTop + windowHeight > sectionTop && windowTop < sectionTop + sectionHeight) {
                section.classList.add("visible");
            } 
            // Hide content if the scroll moves up
            else if (windowTop + windowHeight < sectionTop && windowTop > lastScrollTop) {
                section.classList.remove("visible");
            }

            else if (windowTop < lastScrollTop) {
                section.classList.remove("visible");
            }
        });

        lastScrollTop = windowTop <= 0 ? 0 : windowTop; 

    });
    
});