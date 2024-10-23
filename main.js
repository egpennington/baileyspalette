let inputColor = document.getElementById("input-color").value
const userInputHex = document.querySelector(".user-input-hex")

function clearScheme() {
    document.getElementById("color-scheme-show").innerHTML = ""

}

document.getElementById("input-color").addEventListener("input", function() {
    inputColor = this.value
    userInputHex.style.backgroundColor = `#${inputColor}`
});

document.querySelector("button").addEventListener("click", function() {
    clearScheme()    
    const choice = document.getElementById("choices").value; 
        
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${choice}&count=6`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors
            
            colors.forEach(color => {
                document.getElementById("color-scheme-show").innerHTML += `
                    <div class="color-scheme-content">
                        <img src='${color.image.bare}' alt='Color Image' class='image'>
                        <p id="color-hex-copy" style="color: ${color.hex.value}">${color.hex.value}</p>
                    </div>
                `            
            })
        })
})