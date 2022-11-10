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

const nombre = prompt("Ingrese su nombre");

const condicionFiscal = prompt("Ingrese su condición fiscal (monotributista o responsable inscripto)");

const facturacion = parseFloat(prompt("Ingrese el valor de lo facturado en el año hasta la fecha de esta consulta:"));


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
            alert(`estás en la ${nombresCategorias[0]}`);
            let margenFacturacion = Math.trunc(this.calcularMargen(limitesCategorias[0],this.facturacion));
            alert(`Te queda un margen de facturación para mantener la categoría actual de: ${margenFacturacion}`);
        } else if(this.facturacion > limitesCategorias[3] && this.facturacion < limitesCategorias[4]){
            alert("Estás en la última categoría");
            let margenFacturacion = Math.trunc(this.calcularMargen(limitesCategorias[4],this.facturacion));
            alert(`Te queda un margen de facturación para mantener la categoría actual de: ${margenFacturacion}`);
        } else{
            for(let i=0; i<nombresCategorias.length; i++){
                if(this.facturacion>=limitesCategorias[i] && this.facturacion<limitesCategorias[i+1]){
                    alert(`estás en la ${nombresCategorias[i+1]}`);
                    let margenFacturacion = Math.trunc(this.calcularMargen(limitesCategorias[i+1],this.facturacion));
                    alert(`Te queda un margen de facturación para mantener la categoría actual de: ${margenFacturacion}`);
                }
            }
        }
    }

    verificarRI(){
        if(this.facturacion >= limitesCategorias[4]){
            alert("Eres responsable inscripto o deberías pasar a ese régimen impositivo");
            netoCompras = prompt("Ingrese el importe NETO de IVA de sus compras para calcular el IVA crédito fiscal.");
            netoVentas = prompt("Ingrese el importe NETO de IVA de sus ventas para calcular el IVA débito fiscal.");
        } else{
            alert("No eres responsable inscripto");
        }
    }

    calcularIVA(){
        let IVACompras = netoCompras*0.21;
        let IVAVentas = netoVentas*0.21;
    
        let saldoTecnico = IVAVentas - IVACompras;
        
        alert(`Su Saldo Técnico mensual de IVA es el siguiente: ${saldoTecnico}`);
        alert("Sólo debe restarle las percepciones y retenciones correspondientes para obtener su posición mensual de IVA.");
    }
    
}

const cliente1 = new Cliente(nombre, condicionFiscal, facturacion);

cliente1.verificarCategoría();
cliente1.verificarRI();
if(cliente1.condicionFiscal.toUpperCase() === "RESPONSABLE INSCRIPTO" && cliente1.facturacion >= limites[4]){
    cliente1.calcularIVA();
}