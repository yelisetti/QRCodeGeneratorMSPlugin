window.onload=function(){
    document.getElementById("genQRCode").addEventListener("click", generateQRCode);
    document.getElementById("saveToClipboard").addEventListener("click", saveToClipboard);
    document.getElementById("downloadQRCode").addEventListener("click", downloadQRCode);
    document.getElementById("shortenURL").addEventListener("click", shortenURL);
    document.getElementById("saveToClipboard2").addEventListener("click", copy2Clipboard);
}

function generateQRCode() {
    var text = document.getElementById("text").value;
    var qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, text);
}

function saveToClipboard() {
    // copy content in id="qrcode" to clipboard
    var qrcodeContainer = document.getElementById("qrcode");
    var range = document.createRange();
    range.selectNode(qrcodeContainer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("QR Code copied to clipboard!");
}

function downloadQRCode() {
    // download QR Code as image
    var qrcodeContainer = document.getElementById("qrcode");
    var qrcode = qrcodeContainer.querySelector("img");
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = qrcode.width;
    canvas.height = qrcode.height;
    context.drawImage(qrcode, 0, 0);
    var link = document.createElement("a");
    link.download = "QRCode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function shortenURL() {
    const longURL = document.getElementById('urlinput').value;
    fetch(`https://api.tinyurl.com/create?url=${encodeURIComponent(longURL)}`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer voNFP7j367N0yqu0D69iN452MyO2EObpf9Y5ExTz3UiKSfCGBjMQZoIoQsfP',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            const shortURL = data.data.tiny_url;
            document.getElementById('shortenedURL').innerText = `Shortened URL: ${shortURL}`;
            document.getElementById('saveToClipboard2').style.display = 'inline';
            document.getElementById('saveToClipboard2').setAttribute('data-url', shortURL);
        }).catch(error => console.error('Error:', error));
}

function copy2Clipboard() {
    // copy content in id="shortenedURL" to clipboard
    const shortURL = document.getElementById('shortenedURL').innerText;
    const url = shortURL.split(' ')[2];
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
}
