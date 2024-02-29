const openRulesModalBtn = document.querySelector("button#open-rules-modal")
const closeRulesModalBtn = document.querySelector("button#close-rules-modal")
const modalElement = document.getElementById("rules-modal-div")

const btnRock = document.querySelector("button#btn-rock")
const btnPaper = document.querySelector("button#btn-paper")
const btnScissors = document.querySelector("button#btn-scissors")

const playBtn = document.querySelector("button#play-btn")
const scoreBoard = document.querySelector("p#score-board")

const btnsContainer = document.querySelector("div#btns-container")
const resultContainer = document.querySelector("div#result-container")
const playAgainBtn = document.querySelector("button#play-again-btn")
const diplayTextWinner = document.querySelector("p#text-winner")

class ModalControls {
    constructor(openRulesModalBtn, closeRulesModalBtn, modalElement) {
        this.openBtn = openRulesModalBtn
        this.closeBtn = closeRulesModalBtn
        this.modal = modalElement
        this.openBtn.addEventListener("click", () => this.changeModalState())
        this.closeBtn.addEventListener("click", () => this.changeModalState())
    }

    changeModalState() {
        this.modal.classList.toggle("rules-container-on")
    }
}

class GameControls {
    constructor(btnRock, btnPaper, btnScissors, playBtn, scoreBoard, playAgainBtn, resultContainer, btnsContainer, diplayTextWinner) {
        this.moveSelected = null
        this.btnRock = btnRock
        this.btnPaper = btnPaper
        this.btnScissors = btnScissors
        this.playBtn = playBtn
        this.scoreBoard = scoreBoard
        this.playAgainBtn = playAgainBtn
        this.resultContainer = resultContainer
        this.btnsContainer = btnsContainer
        this.diplayTextWinner = diplayTextWinner

        this.btnRock.addEventListener("click", () => this.selectedMove("btn-rock"))
        this.btnPaper.addEventListener("click", () => this.selectedMove("btn-paper"))
        this.btnScissors.addEventListener("click", () => this.selectedMove("btn-scissors"))
        this.playBtn.addEventListener("click", () => this.play(this.moveSelected))
        this.playAgainBtn.addEventListener("click", () => this.playAgain())
    }

    selectedMove(move) {
        this.moveSelected = move
        document.querySelectorAll(".selected-button").forEach((element) => {
            element.classList.remove("selected-button")
        })

        this.playBtn.classList.add("play-btn-on")
        document.querySelector(`#${move}`).classList.add("selected-button")
    }

    play(move) {
        let moveChosen
        let sortedNumber = Math.floor(Math.random() * 3)
        this.btnsContainer.classList.add("btns-container-animation")
        
       
        document.querySelectorAll(".play-btn-on").forEach((element) => {
            element.classList.remove("play-btn-on")
        })

        switch (move) {
            case "btn-rock":
                moveChosen = 0
                break;
            case "btn-paper":
                moveChosen = 1
                break;
            case "btn-scissors":
                moveChosen = 2
                break;
            default:
                break;
        }
        let result = this.verifyWinner(moveChosen, sortedNumber)
        setTimeout(() => {
            this.showWinner(result)
            this.btnsContainer.classList.remove("btns-container-animation")
        }, 1500);
    }

    verifyWinner(move1, move2){
        if(move1 == move2) {
            return "Empatou"
        }

        if ( (move1 === 0 && move2 === 2) || (move1 === 1 && move2 === 0) || (move1 === 2 && move2 === 1) ) {
            return "Você Ganhou"
        } else {
            return "Você Perdeu"
        }
    }

    alterScore(boolean) {
        let value = parseInt(this.scoreBoard.textContent)
        if (boolean) {
            this.scoreBoard.textContent = value + 10
        } else {
            this.scoreBoard.textContent = Math.max(0, value - 10)
        }
    }

    showWinner(winner){
        this.btnsContainer.style.display = "none"
        this.resultContainer.style.display = "block"
        this.diplayTextWinner.innerText = winner

        if (winner == "Você Ganhou") {
            this.alterScore(true)
        } else if (winner == "Você Perdeu") {
            this.alterScore(false)
        }
    }

    playAgain() {
        this.btnsContainer.style.display = "block"
        this.resultContainer.style.display = "none"
    }
}

const gameControlsInstance = new GameControls(btnRock, btnPaper, btnScissors, playBtn, scoreBoard, playAgainBtn, resultContainer, btnsContainer, diplayTextWinner)
const modalControlsInstance = new ModalControls(openRulesModalBtn, closeRulesModalBtn, modalElement)
