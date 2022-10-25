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
let netoCompras = 0;
let netoVentas = 0;


const categorias = ['categoria A', 'categoria B', 'categoria C', 'categoria D'];

const limites = [748380.07, 1112459.83, 1557443.75, 1934273.04, 2277684.56];

const facturacion = parseFloat(prompt("Ingrese el valor de lo facturado en el año hasta la fecha de esta consulta:"));

let margenFacturacion;

//Verifica en qué categoría estás.
if(facturacion < limites[0]){
    alert(`estás en la ${categorias[0]}`);
    margenFacturacion = calcularMargen(limites[0],facturacion);
    alert(`Te queda un margen de facturación para mantener la categoría actual de: ${margenFacturacion}`);
} else if(facturacion > limites[3] && facturacion < limites[4]){
    alert("Estás en la última categoría");
    margenFacturacion = calcularMargen(limites[4],facturacion);
    alert(`Te queda un margen de facturación para mantener la categoría actual de: ${margenFacturacion}`);
} else{
    for(let i=0; i<limites.length; i++){
        if(facturacion>=limites[i] && facturacion<limites[i+1]){
            alert(`estás en la ${categorias[i+1]}`);
            margenFacturacion = calcularMargen(limites[i+1],facturacion);
            alert(`Te queda un margen de facturación para mantener la categoría actual de: ${margenFacturacion}`);
        }
    }
}

//Calcula el margen de facturación restante para la siguiente categoría
function calcularMargen(limite,facturacion){
    let calculo = limite - facturacion;

    return calculo;
}

if(facturacion >= limites[4]){
    alert("Eres responsable inscripto o deberías pasar a ese régimen impositivo");
    netoCompras = prompt("Ingrese el importe NETO de IVA de sus compras para calcular el IVA crédito fiscal.");
    netoVentas = prompt("Ingrese el importe NETO de IVA de sus ventas para calcular el IVA débito fiscal.")
}

//Calcula el saldo técnico de la delcaración juarada de IVA
function calcularIVA(){
    let IVACompras = netoCompras*0.21;
    let IVAVentas = netoVentas*0.21;

    let resultado = IVAVentas - IVACompras;
    return resultado;
}

let saldoTecnico = calcularIVA();

if(saldoTecnico){
    alert(`Su Saldo Técnico mensual de IVA es el siguiente: ${saldoTecnico}`);
    alert("Sólo debe restarle las percepciones y retenciones correspondientes para obtener su posición mensual de IVA.");
}

