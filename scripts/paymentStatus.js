document.addEventListener("DOMContentLoaded", function () {
    fetchPaymentStatus();
});

async function fetchPaymentStatus() {
    let proyectName = 'ioSonoCiudadanias';

    try {
        let url = 'http://localhost:4200/getStatus/' + proyectName;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching API call");
        }
        const data = await response.json();
        await contentBlocker(data);
    } catch (error) {
    }
}

async function contentBlocker(data) {
    if (data.status === "block") {
        window.location.replace("notfound/notfound.html ");
    }
}