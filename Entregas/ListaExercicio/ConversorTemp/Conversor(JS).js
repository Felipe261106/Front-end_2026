const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");

celsius.addEventListener("input", () => {
    let c = parseFloat(celsius.value);

    if (!isNaN(c)) {
        let f = (c * 9/5) + 32;
        fahrenheit.value = f.toFixed(2);
    } else {
        fahrenheit.value = "";
    }
});

fahrenheit.addEventListener("input", () => {
    let f = parseFloat(fahrenheit.value);

    if (!isNaN(f)) {
        let c = (f - 32) * 5/9;
        celsius.value = c.toFixed(2);
    } else {
        celsius.value = "";
    }
});