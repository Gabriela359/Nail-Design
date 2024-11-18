const numero = document.getElementById("numero");
const siguiente = document.getElementById("siguiente");
const resultado = document.getElementById("resultado");
const checkboxes = document.querySelectorAll(".servicio");
const precio_total = document.getElementById("total"); 
const descuento_total = document.getElementById("totalDescuento"); 

// Funciones de validación
function validarNombre(nombre) {
    // Validar que el nombre no sea un número
    if (nombre.value.trim() === '') {
        return 'El nombre es obligatorio.';
    } else if (!/^[A-Za-z\s]+$/.test(nombre.value.trim())) {
        return 'El nombre no puede contener números.';
    } else {
        return '';
    }
}

function validarEmail(email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email.value)) {
        return 'Ingresa un correo electrónico válido.';
    } else {
        return '';
    }
}

function descuentoPrecio () {
    let totalDescuento = 0;
    let descuentoAplicado = 0;
    let total = costoTotal();

    descuento_total.innerHTML = "";

    const numeroPersonas = parseFloat(numero.value);

    if (numeroPersonas === 2 && total > 0) {
        descuentoAplicado = total * 0.5;
        totalDescuento = total - descuentoAplicado;
        
        descuento_total.textContent = totalDescuento.toLocaleString('es-ES') + " pesos";
    } else {
        descuento_total.textContent = totalDescuento.toLocaleString('es-ES') + " pesos";
    }
}

function costoTotal () {
    let total = 0;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseFloat(checkbox.getAttribute("data-precio"));
        }
    });

    precio_total.textContent = total.toLocaleString('es-ES') + " pesos";
    return total;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        costoTotal(); // Actualizar total cuando cambian los checkboxes
        descuentoPrecio(); // Recalcular el descuento
    });
});

siguiente.addEventListener("click", () => {
    resultado.innerHTML = "";

    const numeroPersonas = parseFloat(numero.value);

    if (isNaN(numeroPersonas) || numeroPersonas <= 0) {
        document.getElementById("resultado").textContent = "Por favor, ingresa un número válido.";
        return;
    }

    // Crear los campos para cada persona
    for (let i = 1; i <= numeroPersonas; i++) {
        const personas = document.createElement("div");
        personas.classList.add("grupo-personas");

        personas.innerHTML = `
            <h3>Persona ${i}:</h3> 
            <label for="nombre${i}">Nombre: <input type="text" class="nombre" id="nombre${i}" name="nombre" required></label> <br>
            <span class="error" id="errorNombre${i}"></span>
            <br>
            <label for="celular${i}">Número de Celular: <input type="tel" id="celular${i}" required></label> <br>
            <br>
            <label for="email${i}">Email: <input type="email" class="email" id="email${i}" name="email" required></label> <br>
            <span class="error" id="errorEmail${i}"></span> <br>
        `;

        resultado.appendChild(personas);

        const nombrePersona = personas.querySelector(`#nombre${i}`);
        const emailPersona = personas.querySelector(`#email${i}`);
        const errorNombrePersona = personas.querySelector(`#errorNombre${i}`);
        const errorEmailPersona = personas.querySelector(`#errorEmail${i}`);

        // Validar inputs
        nombrePersona.addEventListener('input', function() {
            const error = validarNombre(nombrePersona);
            errorNombrePersona.textContent = error;
        });

        emailPersona.addEventListener('input', function() {
            const error = validarEmail(emailPersona);
            errorEmailPersona.textContent = error;
        });
    }

    costoTotal();
    descuentoPrecio();
});

document.getElementById("formulario").addEventListener('submit', function(event) {
    let valid = true;
    
    // Validar todos los inputs generados
    const nombres = document.querySelectorAll('.nombre');
    const emails = document.querySelectorAll('.email');

    // Recorrer cada campo para validarlo
    nombres.forEach((nombre, index) => {
        const error = validarNombre(nombre);
        const errorNombre = document.querySelector(`#errorNombre${index + 1}`);
        errorNombre.textContent = error;
        if (error) valid = false;
    });

    emails.forEach((email, index) => {
        const error = validarEmail(email);
        const errorEmail = document.querySelector(`#errorEmail${index + 1}`);
        errorEmail.textContent = error;
        if (error) valid = false;
    });

    if (errorNombre.textContent || errorEmail.textContent) {
        event.preventDefault();  // Evitar el envío del formulario
        alert('Por favor, corrige los errores en el formulario.');
    } else {
        alert('Formulario enviado con éxito.');
    }
});
