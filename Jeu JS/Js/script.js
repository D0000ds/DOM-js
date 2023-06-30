function shuffleChildren(parent){
    let children = parent.children
    // permet de melanger les boxs
    let i = board.children.length, k, temp
    while (--i > 0) {
        k = Math.floor(Math.random() * (i+1))
        temp = board.children[k]
        board.children[k] = board.children[i]
        board.appendChild(temp)
    }
}

function showReaction(type, clickedBox){
    clickedBox.classList.add(type)
    if (type !== "success"){
        setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 800)
    }
}

function victoire(){
    let nbCaseValide = document.querySelectorAll(".box-clicked").length
    
    if(nbCaseValide == nbBox){
        timer = false
        bestTime()

        hour = 0;
        minute = 0;
        seconde = 0;
        count = 0

        document.getElementById("hr").innerHTML = "00";
        document.getElementById("min").innerHTML = "00";
        document.getElementById("sec").innerHTML = "00";
        document.getElementById("count").innerHTML = "00";
    }
}

function Watch(){
    if(timer == true){
        count++
        if(count == 100){
            seconde++
            count = 0
        }
        if(seconde == 60){
            minute++
            seconde = 0
        }
        if(minute == 60){
            hour++
            minute = 0
            seconde = 0
        }20


        document.getElementById("hr").innerHTML = hour
        document.getElementById("min").innerHTML = minute
        document.getElementById("sec").innerHTML = seconde
        document.getElementById("count").innerHTML = count
        setTimeout(Watch, 10)
    }
}


function bestTime(){
    let bestHour = 100
    let bestMinute = 100
    let bestSeconde = 100
    let bestCount = 100

    if(hour < bestHour){
        if(minute < bestMinute){
            if(seconde < bestSeconde){
                if(count < bestCount){
                    bestHour = hour
                    bestMinute = minute
                    bestSeconde = seconde
                    bestCount = count

                    localStorage.setItem(bestHour, bestMinute, bestSeconde, bestCount)

                    let bestHourStorage = localStorage.getItem(bestHour)
                    let bestMinStorage = localStorage.getItem(bestMinute)
                    let bestSecStorage = localStorage.getItem(bestSeconde)
                    let bestCountStorage = localStorage.getItem(bestCount)


                    document.getElementById("MeilleureTempsHeure").innerHTML = bestHourStorage
                    document.getElementById("MeilleureTempsMinute").innerHTML = bestMinStorage
                    document.getElementById("MeilleureTempsSeconde").innerHTML =  bestSecStorage
                    document.getElementById("MeilleureTempsCount").innerHTML = bestCountStorage
                }
            }
        }
    }
}

function calculScoreTime(){
    if(minute==0){
        if(seconde <= 30){
            score = score + 1 * 5
        }
        else {
            score = score + 1 * 3
            console.log(score)
        }
    }
    else{
        score++
    }
}

let nbBox = prompt("Choisie un nombre de case")
document.getElementById("nbBoxs").innerHTML = nbBox


let hour = 00
let minute = 00
let seconde = 00
let count = 00

let score = 0

let timer = true

const box = document.createElement("div")
box.classList.add("box")

const board = document.querySelector("#board")

let nb = 1

// permet d'afficher les boxs
for(let i = 1; i <=nbBox; i++){
    let newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(newbox)

    newbox.addEventListener("click", function(){
        if(i == nb){
            newbox.classList.add("box-clicked")
            if(nb == board.children.length){
                showReaction("success", box)
            }
            
            shuffleChildren(board)
            nb++
            calculScoreTime()
            document.getElementById("scoreNumber").innerHTML = score
            victoire()
            Watch()
        }
        else if(i > nb){
            showReaction("error", newbox)
            nb = 1
            board.querySelectorAll(".box-clicked").forEach(function(validBox){ 
                validBox.classList.remove("box-clicked")
            })
            
            shuffleChildren(board)
            score--
            document.getElementById("scoreNumber").innerHTML = score
        }
        else{
            showReaction("notice", newbox)
        }
    })
}

shuffleChildren(board)