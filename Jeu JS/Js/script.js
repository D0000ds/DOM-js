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

function replay(){
    document.getElementById("hr").innerHTML = "00"
    document.getElementById("min").innerHTML = "00"
    document.getElementById("sec").innerHTML = "00"
    document.getElementById("count").innerHTML = "00"

    document.getElementById("scoreNumber").innerHTML = 0

    let nbBoxsDel = document.querySelectorAll(".box")
    let board = document.querySelector('#board');

    for(let i = 1; i <=nbBoxsDel.length; i++){
       board.innerHTML = ''
    }

    start()

    buttonReplayDel = document.getElementsByClassName("Button")
    buttonReplayDel[0].remove() 

}

function victoire(){
    let nbCaseValide = document.querySelectorAll(".box-clicked").length
    
    if(nbCaseValide == nbBox){
        timer = false
        bestTime()

        let container = document.querySelector(".container")

        let buttonReplay = document.createElement("button")
        buttonReplay.classList.add("Button")
        buttonReplay.onclick = replay
        buttonReplay.innerText = "replay"
        container.appendChild(buttonReplay)

        

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
        }


        document.getElementById("hr").innerHTML = hour
        document.getElementById("min").innerHTML = minute
        document.getElementById("sec").innerHTML = seconde
        document.getElementById("count").innerHTML = count
        setTimeout(Watch, 10)
    }
}

function bestTime(){
    let bestHour = 0
    let bestMinute = 0
    let bestSeconde = 0
    let bestCount = 0

    if(hour > bestHour && minute > bestMinute && seconde > bestSeconde && count > bestCount){ 
        
        
    }
    else{
        bestHour = hour
        bestMinute = minute
        bestSeconde = seconde
        bestCount = count

        localStorage.setItem("besthour", (bestHour))
        localStorage.setItem("bestmin", (bestMinute))
        localStorage.setItem("bestsec", (bestSeconde))
        localStorage.setItem("bestcount", (bestCount))
        localStorage.setItem("nbboxs", (nbBox))

        document.getElementById("MeilleureTempsHeure").innerHTML = localStorage.getItem("besthour")
        document.getElementById("MeilleureTempsMinute").innerHTML = localStorage.getItem("bestmin")
        document.getElementById("MeilleureTempsSeconde").innerHTML =  localStorage.getItem("bestsec")
        document.getElementById("MeilleureTempsCount").innerHTML = localStorage.getItem("bestcount")
        document.getElementById("nbBoxs").innerHTML = nbBox
    }
}

function calculScoreTime(){
    if(minute==0){
        if(seconde <= 30){
            score = score + 1 * 5
        }
        else {
            score = score + 1 * 3
        }
    }
    else{
        score++
    }
}


function start(){
    globalThis.score = 0

    globalThis.hour = 0
    globalThis.minute = 0
    globalThis.seconde = 0
    globalThis.count = 0

    globalThis.timer = true

    globalThis.nbBox = prompt("Choisie un nombre de case")
    

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
                Watch()
                victoire()
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
}

start()