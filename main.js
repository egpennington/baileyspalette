let inputColor = ""
const userInputHex = document.querySelector(".user-input-hex")

document.getElementById("user-input-hex").addEventListener("input", function() {
    const inputColor = this.value
    document.getElementById("input-color").value = inputColor
})

function clearScheme() {
    document.getElementById("color-scheme-show").innerHTML = ""
}

document.getElementById("input-color").addEventListener("input", function() {
    inputColor = this.value
    inputColor.style.backgroundColor = `#${inputColor}`
})

document.querySelector("button").addEventListener("click", function() {
    clearScheme() 
    
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
                `         
            })
            
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