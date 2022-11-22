/* Estos son los límites de las categorías. Por ahora he puesto únicamente 5 en el array de límites.

const limiteA = 748380.07;
const limiteB = 1112459.83;
const limiteC = 1557443.75;
const limiteD = 1934273.04;
const limiteE = 2277684.56;
const limiteF = 2847105.70;
const limiteG = 3416526.83;
const limiteH = 4229985.60;
const limiteI = 4734330.03;
const limiteJ = 5425770;
const limiteK = 6019594.89;
*/

class Categoria{
    constructor(tipo, limite){
        this.tipo = tipo;
        this.limite = limite;
    }
}

const categoriaA = new Categoria("Categoria A", 748380.07);
const categoriaB = new Categoria("Categoria B", 1112459.83);
const categoriaC = new Categoria("Categoria C", 1557443.75);
const categoriaD = new Categoria("Categoria D", 1934273.04);
const categoriaE = new Categoria("Categoria E", 2277684.56);

const categorias = [categoriaA, categoriaB, categoriaC, categoriaD, categoriaE];

const nombresCategorias = categorias.map((cat) => cat.tipo);
const limitesCategorias = categorias.map((lim) => lim.limite);

let netoCompras = 0;
let netoVentas = 0;

//const nombre = prompt("Ingrese su nombre");

//const condicionFiscal = prompt("Ingrese su condición fiscal (monotributista o responsable inscripto)");

//const facturacion = parseFloat(prompt("Ingrese el valor de lo facturado en el año hasta la fecha de esta consulta:"));

//HTML
const divDevolucion = document.getElementById("devolucion");
const informacionCateogiraCliente = document.createElement("p");
const informacionFacturacionCliente = document.createElement("p");
const noRI = document.createElement("p");

const h3Storage = document.getElementById("storage");
const infoStorage = document.createElement("h3");

//HTML RI
const formularioRI = document.createElement("form");

const labelComprasRI = document.createElement("label");
const inputComprasRI = document.createElement("input");

const labelVentasRI = document.createElement("label");
const inputVentasRI = document.createElement("input");

const inputSubmit = document.createElement("input");

const saldoTecnico = document.createElement("p");

let margenFacturacion;

class Cliente{
    constructor(nombre, condicionFiscal, facturacion){
        this.nombre = nombre;
        this.condicionFiscal = condicionFiscal;
        this.facturacion = facturacion;
    }

    calcularMargen(limite, facturacion){
        let calculo = limite - facturacion;

        return calculo;
    }
    
    verificarCategoría(){
        if(this.facturacion < categoriaA.limite){
            informacionCateogiraCliente.innerText = `Estás en la ${nombresCategorias[0]}`;
            divDevolucion.append(informacionCateogiraCliente);
            let margenFacturacion = Math.trunc(this.calcularMargen(limitesCategorias[0],this.facturacion));
            informacionFacturacionCliente.innerText = `Te queda un margen de facturación para matener la categoría actual de: ${margenFacturacion}`;
            divDevolucion.append(informacionFacturacionCliente)
        } else if(this.facturacion > limitesCategorias[3] && this.facturacion < limitesCategorias[4]){
            informacionCateogiraCliente.innerText = "Estás en la última categoría";
            divDevolucion.append(informacionCateogiraCliente);
            let margenFacturacion = Math.trunc(this.calcularMargen(limitesCategorias[4],this.facturacion));
            informacionFacturacionCliente.innerText = `Te queda un margen de facturación para matener la categoría actual de: ${margenFacturacion}`;
            divDevolucion.append(informacionFacturacionCliente)
        } else{
            for(let i=0; i<nombresCategorias.length; i++){
                if(this.facturacion>=limitesCategorias[i] && this.facturacion<limitesCategorias[i+1]){
                    informacionCateogiraCliente.innerText = `Estás en la ${nombresCategorias[i+1]}`;
                    divDevolucion.append(informacionCateogiraCliente);
                    let margenFacturacion = Math.trunc(this.calcularMargen(limitesCategorias[i+1],this.facturacion));
                    informacionFacturacionCliente.innerText = `Te queda un margen de facturación para matener la categoría actual de: ${margenFacturacion}`;
                    divDevolucion.append(informacionFacturacionCliente)
                }
            }
        }
    }

    verificarRI(){
        if(this.facturacion >= limitesCategorias[4]){
            informacionFacturacionCliente.innerText = "Eres responsable inscripto o deberías pasar a ese régimen impositivo.";
            divDevolucion.append(informacionFacturacionCliente)
        } else{
            noRI.innerText = "No eres responsable inscripto.";
            divDevolucion.append(noRI);
        }
    }

    calcularIVA(){
        divDevolucion.append(formularioRI);
        
        labelComprasRI.innerText = "Ingrese el importe NETO de IVA de sus comprar para calcular el IVA crédito fiscal:";
        //IVA COMPRAS
        formularioRI.append(labelComprasRI);
        inputComprasRI.type = "number";
        formularioRI.append(inputComprasRI);

        //IVA VENTAS
        labelVentasRI.innerText = "Ingrese el importe NETO de IVA de sus ventas para calcular el IVA débito fiscal:"
        formularioRI.append(labelVentasRI);
        inputVentasRI.type = "number";
        formularioRI.append(inputVentasRI);
        inputSubmit.type = "submit";
        inputSubmit.classList.add("btn", "btn-primary", "btn-css");
        formularioRI.append(inputSubmit);

        formularioRI.onsubmit = (e) => {
            e.preventDefault();

            saldoTecnico.innerText = `Su Saldo Técnico mensual de IVA es el siguiente: $${(inputComprasRI.value * 0.21) - (inputVentasRI.value * 0.21)}`;

            divDevolucion.append(saldoTecnico);

            inputComprasRI.value = "";
            inputVentasRI.value = "";
        }
    }
    
}

/*
const cliente1 = new Cliente(nombre, condicionFiscal, facturacion);

cliente1.verificarCategoría();
cliente1.verificarRI();
if(cliente1.condicionFiscal.toUpperCase() === "RESPONSABLE INSCRIPTO" && cliente1.facturacion >= limites[4]){
    cliente1.calcularIVA();
}
*/
//Eventos

//Datos formulario
const formularioCliente = document.getElementById("form");
const nombreForm = document.getElementById("nombre");
const condicionFiscalForm = document.getElementById("condicion-fiscal");
const facturacionForm = document.getElementById("facturacion");
const botonEnviar = document.getElementById("botonEnviar");

//Objeto con datos del cliente
const datosCliente = {};

console.log(datosCliente);
console.log(condicionFiscalForm.options[condicionFiscalForm.selectedIndex].value);

//Evento submit
formularioCliente.onsubmit = (e) => {
    e.preventDefault();
    if(nombreForm.value && condicionFiscalForm.value && facturacionForm.value){
        datosCliente.nombre = nombreForm.value;
        datosCliente.condicionFiscal = condicionFiscalForm.options[condicionFiscalForm.selectedIndex].value;
        datosCliente.facturacion = facturacionForm.value;

        nombreForm.value = "";
        facturacionForm.value = "";

        console.log(datosCliente);

        const cliente1 = new Cliente(datosCliente.nombre, datosCliente.condicionFiscal, datosCliente.facturacion);
        cliente1.verificarCategoría();
        cliente1.verificarRI();
        
        if(cliente1.condicionFiscal === "responsable-inscripto" && cliente1.facturacion >= limitesCategorias[4]){
            cliente1.calcularIVA();
        } else if(cliente1.condicionFiscal === "monotributo" && cliente1.facturacion >= limitesCategorias[4]){
            cliente1.condicionFiscal = "responsable-inscripto";
            cliente1.calcularIVA();
        }

        localStorage.setItem("datosCliente",JSON.stringify(datosCliente));
    }

}

const datosClienteStorage = JSON.parse(localStorage.getItem("datosCliente"));

if(datosClienteStorage.nombre !== "" || datosClienteStorage.facturacion !== ""){
    infoStorage.innerText = `Bienvenido de nuevo ${datosClienteStorage.nombre}`;
    h3Storage.append(infoStorage);
    console.log(datosClienteStorage);
}