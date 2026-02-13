const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const noBtn = document.querySelector(".No");

let scale = 1;

function NoBtn() {
    scale -= 0.2; // shrink amount

    if (scale <= 0) {
        scale = 0;
        noBtn.style.pointerEvents = "none"; // disable clicks
    }

    noBtn.style.transform = `scale(${scale})`;
    noBtn.textContent = "You sure ?"

    result.classList.add("active");
    resultText.textContent = "Stop messing with me and say yes 🔪";
}

function YesBtn() {
    result.classList.add("active");
    resultText.textContent = "Good choice 🌸💖";
}
