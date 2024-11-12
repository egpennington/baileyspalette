const userInputHex = document.querySelector(".user-input-hex")

userInputHex.addEventListener("input", function() {
    document.getElementById("input-color").value = `Base color: ${this.value}`
})

function clearScheme() {
    document.getElementById("color-scheme-show").innerHTML = ""
}

function renderColorScheme(colors) {
    const colorSchemeContainer = document.getElementById("color-scheme-show");
    colorSchemeContainer.innerHTML = ''

    colors.forEach(color => {
        colorSchemeContainer.innerHTML += `
            <div class="color-scheme-content">
                <img src='${color.image.bare}' alt='Color Image' class='image'>
                <p class="color-code">${color.hex.value}</p>
            </div>
        `;
    });
}

// ==== Event Listeners ====
document.getElementById("input-color").addEventListener("input", function() {
    document.getElementById("input-color") = this.value
    inputColor.style.backgroundColor = `#${inputColor}`
})

document.querySelector(".input-choice").addEventListener("submit", function(e) {
    e.preventDefault()
    
    clearScheme()
    
    const inputColor = userInputHex.value.replace('#', '')
    const choice = document.getElementById("choices").value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${choice}&count=6`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const colors = data.colors
            
            renderColorScheme(colors);
            
            // ==== Copy to clipboard on click ====
            document.querySelectorAll('.color-scheme-content').forEach(element => { 
                element.addEventListener('click', function() {
                    const hexElement = this.querySelector('.color-code')
                    const originalText = hexElement.textContent
                    
                    navigator.clipboard.writeText(originalText).then(() => {
                        hexElement.textContent = "Copied"
                        setTimeout(() => {
                            hexElement.textContent = originalText
                        }, 1000)
                    }).catch(err => {
                        console.error('Failed to copy text:', err)
                    })
                })
            })
        })
        .catch(err => console.error('Error fetching color scheme:', err))
})