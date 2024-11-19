
const numero = document.getElementById("numero");
const checkboxes = document.querySelectorAll(".servicio");
const pago = document.getElementById("pago");
const siguiente = document.getElementById("siguiente");
const resultadoImprimir = document.getElementById("resultado")

function costoTotal () {
    let total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.getAttribute("data-precio"));
        }
    });
    return total;
}

function descuentoPrecio (){
    pago.innerHTML = "";

    const numeroPersonas = parseFloat(numero.value);
    let total = costoTotal();
    let totalPagar = 0;
    let descuento = 0;


    if (isNaN(numeroPersonas) || numeroPersonas <= 0) {
        alert("Por favor, introduce un número válido de personas.");
        return;
    }
    else if (numeroPersonas === 2){

        descuento = total * 0.5;
        totalPagar = (total - descuento) * numeroPersonas;

        const resultado = document.createElement("div");

        resultado.classList.add("total-pagar");

        resultado.innerHTML = `
        <h2>Al ir dos personas, se genera un descuento del 50% a ambas. </h2>
        <h2>Total: <label> ${totalPagar.toLocaleString('es-ES') + " pesos"} </label></h2>
        `
        pago.appendChild(resultado);
    }
    else if (numeroPersonas > 2 ){
        const resultado = document.createElement("div");
        totalPagar = costoTotal() * numeroPersonas;
        resultado.innerHTML = `
        <h2>Total: <label> ${totalPagar.toLocaleString('es-ES') + " pesos"} </label></h2>`
        pago.appendChild(resultado);
    }
    else{
        const resultado = document.createElement("div");
        totalPagar = costoTotal();
        resultado.innerHTML = `
        <h2>Total: <label> ${totalPagar.toLocaleString('es-ES') + " pesos"} </label></h2>`
        pago.appendChild(resultado);
    }

}

function formPersonas(){
    resultadoImprimir.innerHTML = "";

    const numeroPersonas = parseFloat(numero.value);

    if (isNaN(numeroPersonas) || numeroPersonas <= 0) {
        document.getElementById("resultado").textContent = "Por favor, ingresa un número válido.";
        return;
    }


}


siguiente.addEventListener("click", () => {
    descuentoPrecio();
});
