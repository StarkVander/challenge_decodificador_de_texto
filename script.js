document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const copyButton = document.getElementById('copyButton');
    const message = document.getElementById('message');
    const placeholderImage = document.getElementById('placeholderImage');

    const encryptionRules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const decryptionRules = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    function validateInput(text) {
        const regex = /^[a-z\s]*$/;
        return regex.test(text);
    }

    function encrypt(text) {
        return text.replace(/[eioua]/g, match => encryptionRules[match]);
    }

    function decrypt(text) {
        let decryptedText = text;
        for (const [key, value] of Object.entries(decryptionRules)) {
            const regex = new RegExp(key, 'g');
            decryptedText = decryptedText.replace(regex, value);
        }
        return decryptedText;
    }

    function showMessage(msg) {
        message.textContent = msg;
    }

    function showOutput(text) {
        if (text) {
            placeholderImage.style.display = 'none';
            outputText.style.display = 'block';
            outputText.value = text;
        } else {
            placeholderImage.style.display = 'block';
            outputText.style.display = 'none';
        }
    }

    encryptButton.addEventListener('click', () => {
        const text = inputText.value.toLowerCase(); // Ensure input is lowercase
        if (validateInput(text)) {
            const encryptedText = encrypt(text);
            showOutput(encryptedText);
            showMessage('');
        } else {
            showMessage('Entrada inválida. Use apenas letras minúsculas e espaços.');
            showOutput('');
        }
    });

    decryptButton.addEventListener('click', () => {
        const text = inputText.value.toLowerCase(); 
        if (validateInput(text)) {
            const decryptedText = decrypt(text);
            showOutput(decryptedText);
            showMessage('');
        } else {
            showMessage('Entrada inválida. Use apenas letras minúsculas e espaços.');
            showOutput('');
        }
    });

    copyButton.addEventListener('click', () => {
        outputText.select();
        document.execCommand('copy');
        showMessage('Texto copiado para a área de transferência.');
    });
});
