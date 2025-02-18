let computerNum = 0;
let playButton = document.getElementById("play.button")
let userInput = document.getElementById("user.input")
let resultText = document.getElementById("result.text")
let resultImg = document.querySelector(".result-img")
let resetButton = document.getElementById("reset.button")
let chanceArea = document.getElementById("chance.area")
let chances = 5
let gameOver = false
let history = []
let historyArea = document.getElementById("history.area")

playButton.addEventListener("click",play)
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){
    userInput.value=""})

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답:",computerNum)
}

function play(){
    let userValue = userInput.value

    if(userValue < 1 || userValue > 100){
        resultText.textContent="1~100사이 값을 입력해 주세요"
        return;
    }

    if(history.includes(userValue)){
        resultText.textContent="다른 숫자를 입력해 주세요"
        return;
    }

    chances --
    chanceArea.textContent=`남은 기회: ${chances}번`

    if(computerNum < userValue){
        resultText.textContent="DOWN!"
        resultImg.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv1ndLdZLZQo-P1lZryt_nDYw5LkyDCx09xQ&s"
    } else if(computerNum > userValue){
        resultText.textContent="Up!"
        resultImg.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlLvCjKdvvLqboIcjtUjvrC-BG4GLGK2Fyg&s"
    } else{
        resultText.textContent="Great Job!"
        resultImg.src="https://cdn.vectorstock.com/i/500p/13/35/great-job-badge-high-quality-vector-42891335.jpg"
        gameOver = true
        playButton.disabled=true
    }

    history.push(userValue)
    historyArea.textContent = `입력한 숫자 : ${history}`
    console.log(history)

    if(chances < 1 && computerNum == userValue){
        resultText.textContent="Great Job!"
        resultImg.src="https://cdn.vectorstock.com/i/500p/13/35/great-job-badge-high-quality-vector-42891335.jpg"
        gameOver = true
        playButton.disabled=true
    } else if(chances < 1 && computerNum != userValue){
        gameOver = true
        resultText.textContent=`정답: ${computerNum}`
        resultImg.src="https://media.istockphoto.com/id/1325433246/video/game-over-text-animation-with-alpha-channel-4k.jpg?s=640x640&k=20&c=aZM_cNmjuXVVkLm12evzXTU0qFhAu3Vh2_2W_h-eq3c="
    }

    if(gameOver == true){
        playButton.disabled = true
    }

}

function reset(){
    userInput.value =""
    pickRandomNum()
    chances = 5
    chanceArea.textContent=`남은 기회: ${chances}번`
    resultText.textContent="GUESS NUMBER"
    resultImg.src="https://play-lh.googleusercontent.com/a5o-1XpGKXZxUCDtpKmLA8rVzobdF9BcNKpZI1ij4nOjqLVnIx_QFd_4mbF__NuOAS2Y"
    history.splice(0,5)
    gameOver=false
    playButton.disabled = false
    historyArea.textContent="입력한 숫자"
}

pickRandomNum()