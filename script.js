// Disponemos en la caja del siguiente dinero distribuido de la siguiente manera: 234,27 € (información que se debe cargar en un array)
// - Billetes de 500€: 0
// - Billetes de 200€: 0
// - Billetes de 100€: 0
// - Billetes de 50€: 1 
// - Billetes de 20€: 4
// - Billetes de 10€: 8
// - Billetes de 5€: 2
// - Monedas de 2€: 5
// - Monedas de 1€: 4
// - Monedas de 0.50€: 0
// - Monedas de 0.20€: 0
// - Monedas de 0.10€: 1
// - Monedas de 0.05€: 2
// - Monedas de 0.02€: 3
// - Monedas de 0.01€: 1

// El programa obtiene un precio de artículo y un importe pagado desglosado (se deben conocer las cantidades entregadas de todos los billetes y monedas) y responderá si no hay cambio, si está justo o si se devuelve cambio, de nuevo con el desglose que debe ser lo más óptimo (es decir, si puedo devolver un billete de 20, no devuelvo 2 de 10, por ejemplo).

// Debemos mostrar al final el desglose del cambio y el nuevo estado de la caja.

let caja = [
    { valor: 500, cantidad: 0 },
    { valor: 200, cantidad: 0 },
    { valor: 100, cantidad: 0 },
    { valor: 50, cantidad: 1 },
    { valor: 20, cantidad: 4 },
    { valor: 10, cantidad: 8 },
    { valor: 5, cantidad: 2 },
    { valor: 2, cantidad: 5 },
    { valor: 1, cantidad: 4 },
    { valor: 0.50, cantidad: 0 },
    { valor: 0.20, cantidad: 0 },
    { valor: 0.10, cantidad: 1 },
    { valor: 0.05, cantidad: 2 },
    { valor: 0.02, cantidad: 3 },
    { valor: 0.01, cantidad: 1 }
];

// Sumar el dinero de la caja para ver si se puede devolver
function sumarDineroCaja(caja) {
    return caja.map(tipoBillete => tipoBillete.valor * tipoBillete.cantidad).reduce((acc, curr) => acc + curr, 0).toFixed(2);
}

// Revisar pago para calcular la diferencia
function diferenciaPago(pago) {
    let precioArticulo = pago.precioArticulo;
    let arrayDesglose = pago.desglose;
    // Calcular cantidad pagada
    let cantidadPagada = arrayDesglose.map(tipoBillete => tipoBillete.valor * tipoBillete.cantidad).reduce((acc, curr) => acc + curr, 0);

    let diferencia = (cantidadPagada - precioArticulo).toFixed(2);
    return diferencia;
}


function comprobarCambioCaja(caja, pago) {

    let diferencia = parseFloat(diferenciaPago(pago)); // Dinero a devolver de la caja

    if (diferencia < 0) {
        return "Falta dinero por pagar"
    } else if (diferencia === 0) {
        return "Se ha pagado exacto. Sin vueltas a realizar."
    }

    let dineroCaja = parseFloat(sumarDineroCaja(caja)); // Dinero disponible en caja

    if (dineroCaja < diferencia) {
        return "No queda suficiente dinero en la caja para dar la vuelta"
    }

    let cambioCaja = []; // Array de billetes y monedas que se darán en el cambio
    // Dividir antes del punto y después
    let puntoDecimal = diferencia.toString().indexOf("."); // 17,98
    let entero = Number(diferencia.toString().substring(0, puntoDecimal)); // 17
    let decimal = Number("0." + diferencia.toString().substring(puntoDecimal + 1)); // 98

    // Ejemplo: 17.98€
    // Tratar primero los enteros (x.ej. 17€)
    // Recorrer array de objetos de la caja hasta que demos con el billete/moneda exacto o en su defecto el siguiente más bajo.
    caja.forEach(efectivo => { // Recorrer el array de Caja
        if (efectivo.cantidad > 0 && efectivo.valor <= entero) { // 17 === 17 || 10 < 17
            cambioCaja.push(efectivo.valor); // Pushear al array de vueltas
            entero -= efectivo.valor; // Restar del entero (x.ej. si son 17€ y encontramos 10, se queda en 7€)
            efectivo.cantidad-- // Restar de la caja
            console.log("En caja quedan " + efectivo.cantidad + " billetes de " + efectivo.valor)
        }

        if (efectivo.cantidad > 0 && entero === 0 && efectivo.valor <= decimal) { // 0.98 === 0.98 || 0.50 < 0.98
            cambioCaja.push(efectivo.valor); // Pushear al array de vueltas
            decimal -= efectivo.valor; // Restar del entero (x.ej. si son 17€ y encontramos 10, se queda en 7€)
            decimal = decimal.toFixed(2);
            efectivo.cantidad-- // Restar de la caja
            console.log("En caja quedan " + efectivo.cantidad + " monedas de " + efectivo.valor)
        }

    })



    return decimal != 0 ? "Hay dinero suficiente en caja, pero no hay billetes o monedas para dar las vueltas." : `Hay cambio suficiente: ${cambioCaja}`

}


// PAGOS DE PRUEBA

let pago0 = {
    precioArticulo: 32.02,
    desglose: [
        { valor: 50, cantidad: 1 },  // 50
    ]  //17,98€ a devolver desde caja
}

let pago1 = {
    precioArticulo: 42.08,
    desglose: [
        { valor: 20, cantidad: 1 }, // 20
        { valor: 10, cantidad: 2 }, // 40
        { valor: 5, cantidad: 1 } // 45
    ]
}

let pago2 = {
    precioArticulo: 234.47,
    desglose: [
        { valor: 100, cantidad: 2 }, // 200
        { valor: 20, cantidad: 1 }, // 220
        { valor: 10, cantidad: 1 }, // 230
        { valor: 5, cantidad: 1 }, // 235
        { valor: 1, cantidad: 1 }  // 236
    ]
}

let pago3 = {
    precioArticulo: 5,
    desglose: [
        { valor: 10, cantidad: 1 }     // 5
    ]
}

let pago4 = {
    precioArticulo: 276.85,
    desglose: [
        { valor: 100, cantidad: 2 },  // 200
        { valor: 50, cantidad: 2 }, // 300
    ]  //23,15€ a devolver desde caja
}
console.log("-------------")
console.log(`El cliente necesita cambio de ${diferenciaPago(pago3)}€`);
console.log(comprobarCambioCaja(caja, pago3))
console.log(`EL CLIENTE NECESITA CAMBIO DE ${diferenciaPago(pago0)}€`);
console.log(comprobarCambioCaja(caja, pago0))
console.log("-------------")
console.log(`El cliente necesita cambio de ${diferenciaPago(pago1)}€`);
console.log(comprobarCambioCaja(caja, pago1))
console.log("-------------")
console.log(`El cliente necesita cambio de ${diferenciaPago(pago2)}€`);
console.log(comprobarCambioCaja(caja, pago2))
console.log("-------------")
console.log(`El cliente necesita cambio de ${diferenciaPago(pago4)}€`);
console.log(comprobarCambioCaja(caja, pago4))


