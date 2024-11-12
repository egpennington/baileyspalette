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
    clearScheme();    
    const choice = document.getElementById("choices").value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${choice}&count=6`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors
            
            // Clear any existing content before appending new colors
            document.getElementById("color-scheme-show").innerHTML = ''
            
            colors.forEach(color => {
                document.getElementById("color-scheme-show").innerHTML += `
                    <div class="color-scheme-content">
                        <img src='${color.image.bare}' alt='Color Image' class='image'>
                        <p class="color-code">${color.hex.value}</p>
                    </div>
                `           
            })
            
            // copy the color code
            document.querySelectorAll('.color-code').forEach(element => {
                element.addEventListener('click', function() {
                    const originalText = this.textContent; // Save the original hex value
                    navigator.clipboard.writeText(originalText).then(() => {
                        this.textContent = "Copied"; // Change text to "Copied"
            
                        // Revert back to the original hex value after 1 second
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 1000);
                    }).catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
                });
            });
            
        })
        .catch(err => console.error('Error fetching color scheme:', err))
})

