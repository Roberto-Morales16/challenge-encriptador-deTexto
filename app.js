// Selección de elementos del DOM
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const imagenEncriptado = document.getElementById('imagen-encriptado');

// Variables de estado
let selectedAction = null;
let isProcessed = false;

// Función para seleccionar la acción de encriptar
encryptBtn.addEventListener('click', () => {
    selectedAction = 'encrypt';
    processText();
});

// Función para seleccionar la acción de desencriptar
decryptBtn.addEventListener('click', () => {
    selectedAction = 'decrypt';
    processText();
});

// Función para procesar el texto según la acción seleccionada
function processText() {
    const text = inputText.value.trim();

    if (text === '') {
        swal("Texto vacío", "Por favor, ingresa el texto que deseas procesar.", "warning");
        return;
    }

    if (!/^[a-z\s]+$/.test(text) && selectedAction === 'encrypt') {
        swal("Formato incorrecto", "El texto solo debe contener letras minúsculas y sin acentos.", "error");
        return;
    }

    if (isProcessed) {
        swal("Acción no permitida", "Por favor, copia el resultado antes de procesar otro texto.", "error");
        return;
    }

    let result = '';
    const isEncryptedText = text.includes('enter') || text.includes('imes') || text.includes('ai') || text.includes('ober') || text.includes('ufat');

    if (selectedAction === 'encrypt') {
        if (isEncryptedText) {
            swal("Texto ya encriptado", "El texto parece ya estar encriptado.", "warning");
            return;
        }
        result = encryptText(text);
        imagenEncriptado.style.display = 'none'; // Esconder la imagen al encriptar
    } else if (selectedAction === 'decrypt') {
        if (!isEncryptedText) {
            swal("Texto no encriptado", "El texto parece no estar encriptado.", "warning");
            return;
        }
        result = decryptText(text);
        imagenEncriptado.style.display = 'block'; // Mostrar la imagen al desencriptar
    }

    outputText.value = result;
    inputText.value = ""; // Limpiar el campo de entrada
    isProcessed = true;
    copyBtn.disabled = false; // Habilitar el botón de copiar
}

// Función para encriptar el texto
function encryptText(text) {
    return text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

// Función para desencriptar el texto
function decryptText(text) {
    return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

// Función para copiar el texto resultante al portapapeles
copyBtn.addEventListener('click', () => {
    const result = outputText.value;

    if (result === '') {
        swal("Sin resultado", "No hay ningún texto para copiar.", "warning");
        return;
    }

    navigator.clipboard.writeText(result)
        .then(() => {
            swal("Texto copiado", "El texto ha sido copiado al portapapeles.", "success");
            inputText.value = result; // Establecer el texto copiado en el primer textarea
            resetState();
        })
        .catch(() => {
            swal("Error", "No se pudo copiar el texto al portapapeles.", "error");
        });
});

// Función para resetear el estado después de copiar
function resetState() {
    outputText.value = ''; // Limpiar el campo de salida
    isProcessed = false;
    selectedAction = null;
    copyBtn.disabled = true; // Deshabilitar el botón de copiar
    encryptBtn.classList.remove('active');
    decryptBtn.classList.remove('active');
}

