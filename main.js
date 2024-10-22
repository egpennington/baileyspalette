function clear() {
    document.getElementById("color-scheme-show").innerHTML = ""
}

document.querySelector("button").addEventListener("click", function() {
    console.log("clicked")
    clear()
    const inputColor = document.getElementById("input-color").value
    let choice = document.getElementById("choices").value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${choice}&count=6`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const colors = data.colors
            
            colors.forEach(color => {
                console.log(color.hex.value, color.image.bare)
                document.getElementById("color-scheme-show").innerHTML += `
                    <div class="color-scheme-content">
                        <img src='${color.image.bare}' alt='Color Image' class='image'>
                        <p id="color-hex-copy">${color.hex.value}</p>
                    </div>
                `
            })
        })
})


// copy hex codes
document.getElementById(`color-hex-copy-${index}`).addEventListener('click', function() {
	   navigator.clipboard.writeText(color.hex.value)
               	.then(() => {
                    alert('Hex code copied to clipboard!');
                })
		.catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });