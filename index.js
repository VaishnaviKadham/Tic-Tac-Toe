let btnRef = document.querySelectorAll(".btn-opt");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let audioWin = new Audio('successSound.mp3');  // Replace 'win.mp3' with the actual path to your win sound file
let audioDraw = new Audio('clicksound.mp3');  // Replace 'draw.mp3' with the actual path to your draw sound file
let audioClick = new Audio('clicksound.mp3');  // Replace 'click.mp3' with the actual path to your click sound file

let msgRef = document.getElementById("message");
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));

    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    audioWin.play();  // Play the win sound
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins ";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins ";
    }
};

const drawFunction = () => {
    disableButtons();
    audioDraw.play();  // Play the draw sound
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winCheck = () => {
    for (let pattern of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText,
        ];
        if (element1 !== "" && element2 !== "" && element3 !== "") {
            if (element1 === element2 && element2 === element3) {
                winFunction(element1);
            }
        }
    }
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        audioClick.play();  // Play the click sound
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
        }

        count += 1;
        if (count === 9) {
            drawFunction();
        }
        winCheck();
    });
});

window.onload = enableButtons;
