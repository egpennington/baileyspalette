let inputColor = ""

document.getElementById("user-input-hex").addEventListener("input", function() {
    const inputColor = this.value; // Get the selected hex color
    document.getElementById("input-color").value = inputColor; // Display it in the text input field
})

const userInputHex = document.querySelector(".user-input-hex")

function clearScheme() {
    document.getElementById("color-scheme-show").innerHTML = ""
}

document.getElementById("input-color").addEventListener("input", function() {
    inputColor = this.value
    inputColor.style.backgroundColor = `#${inputColor}`
});

document.querySelector("button").addEventListener("click", function() {
    clearScheme();    
    
    const inputColor = document.getElementById("user-input-hex").value.replace('#', '')
    const choice = document.getElementById("choices").value
    

    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${choice}&count=6`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors
            document.getElementById("color-scheme-show").innerHTML = ''
            
            colors.forEach(color => {
                document.getElementById("color-scheme-show").innerHTML += `
                    <div class="color-scheme-content">
                        <img src='${color.image.bare}' alt='Color Image' class='image'>
                        <p class="color-code">${color.hex.value}</p>
                    </div>
                `;          
            })
            
    // ==== copy to clip board ====
            document.querySelectorAll('.color-code').forEach(element => {
                element.addEventListener('click', function() {
                    const originalText = this.textContent
                    navigator.clipboard.writeText(originalText).then(() => {
                        this.textContent = "Copied"
                        setTimeout(() => {
                            this.textContent = originalText
                        }, 1000)
                    }).catch(err => {
                        console.error('Failed to copy text: ', err)
                    })
                })
            })          
        })
        .catch(err => console.error('Error fetching color scheme:', err))
})




