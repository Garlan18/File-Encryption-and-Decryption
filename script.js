function encryptText(text) {
    var shift = 3; 

    var encrypted = "";
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            encrypted += String.fromCharCode(
                ((charCode - 65 + shift) % 26) + 65
            );
        }
        
        else if (charCode >= 97 && charCode <= 122) {
            encrypted += String.fromCharCode(
                ((charCode - 97 + shift) % 26) + 97
            );
        }

        else {
            encrypted += text.charAt(i); 
        }
    }

    return encrypted;
}

function decryptText(encryptedText) {
    var shift = 3; 

    var decrypted = "";
    for (var i = 0; i < encryptedText.length; i++) {
        var charCode = encryptedText.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            decrypted += String.fromCharCode(
                ((charCode - 65 - shift + 26) % 26) + 65
            );
        }
       
        else if (charCode >= 97 && charCode <= 122) {
            decrypted += String.fromCharCode(
                ((charCode - 97 - shift + 26) % 26) + 97
            );
        }

        else {
            decrypted += encryptedText.charAt(i);
        }
    }

    return decrypted;
}

function downloadFile(data, fileName, mimeType) {
    var blob = new Blob([data], { type: mimeType });
    var url = window.URL.createObjectURL(blob);

    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(url);
}

function encryptFile() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        var encryptedData = encryptText(e.target.result);
        var encryptedFileName = file.name + ".enc";

        downloadFile(encryptedData, encryptedFileName, "text/plain");
        document.getElementById("encryptedFileLink").style.display = "block";
    
    };
    reader.readAsText(file);
}

function decryptFile() {
    var encryptedFileInput = document.getElementById("encryptedFileInput");
    var encryptedFile = encryptedFileInput.files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        var decryptedData = decryptText(e.target.result);
        var decryptedFileName = encryptedFile.name.replace(".enc", "");

        downloadFile(decryptedData, decryptedFileName, "text/plain");
        document.getElementById("decryptedFileLink").style.display = "block";
    };
    reader.readAsText(encryptedFile);
}