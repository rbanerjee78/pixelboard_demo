document.addEventListener("DOMContentLoaded", function () {
    const pixelBoard = document.getElementById("pixel-board");
    const resetButton = document.getElementById("reset-button");

    function createPixelBoard(rows, cols) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const pixel = document.createElement("div");
                pixel.classList.add("pixel");
                pixel.dataset.x = i;
                pixel.dataset.y = j;
                pixel.addEventListener("click", handlePixelClick);
                pixelBoard.appendChild(pixel);
            }
        }
    }

    function handlePixelClick(event) {
        const pixel = event.target;
        const x = pixel.dataset.x;
        const y = pixel.dataset.y;
        const newColor = pixel.style.backgroundColor === "black" ? "white" : "black";
        console.log(`Pixel clicked: (${x}, ${y}), Color: ${newColor}`); // Debug line
        pixel.style.backgroundColor = newColor;
    
        fetch("update_pixel.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `x=${x}&y=${y}&color=${encodeURIComponent(newColor)}`
        }).then(response => response.text())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
    }
    

    resetButton.addEventListener("click", function () {
        fetch("reset_board.php", {
            method: "POST"
        }).then(() => {
            const pixels = document.querySelectorAll(".pixel");
            pixels.forEach(pixel => {
                pixel.style.backgroundColor = "transparent";
            });
        });
    });

    function fetchBoardState() {
        fetch("get_board_state.php")
            .then(response => response.json())
            .then(data => {
                data.forEach(pixel => {
                    const pixelElement = document.querySelector(`.pixel[data-x="${pixel.x}"][data-y="${pixel.y}"]`);
                    if (pixelElement) {
                        pixelElement.style.backgroundColor = pixel.color;
                    }
                });
            });
    }

    createPixelBoard(12, 12);
    fetchBoardState();

    setInterval(fetchBoardState, 3000); // Poll every 3 seconds for updates
});
