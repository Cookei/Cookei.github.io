/// <reference path="p5.global-mode.d.ts" />
let divMain, divWidth, divHeight, canvasW, canvasH, canvas, minuteRecK, state, font, onCanvas, timer, millis1, sec, shuffledArray, arrayCounter, type
let state2 = "STANDBY"
let txt = []
let sixty = 60
let pickedLibrary

let katakanaLibrary = {
    "ア": ["a"],
    "カ": ["ka"],
    "サ": ["sa"],
    "タ": ["ta"],
    "ナ": ["na"],
    "ハ": ["ha"],
    "マ": ["ma"],
    "ヤ": ["ya"],
    "ラ": ["ra"],
    "ワ": ["wa"],
    "ン": ["n"],
    "イ": ["i"],
    "キ": ["ki"],
    "シ": ["shi"],
    "チ": ["chi"],
    "ニ": ["ni"],
    "ヒ": ["hi"],
    "ミ": ["mi"],
    "リ": ["ri"],
    "ウ": ["u"],
    "ク": ["ku"],
    "ス": ["su"],
    "ツ": ["tsu"],
    "ヌ": ["nu"],
    "フ": ["fu", "hu"],
    "ム": ["mu"],
    "ユ": ["yu"],
    "ル": ["ru"],
    "エ": ["e"],
    "ケ": ["ke"],
    "セ": ["se"],
    "テ": ["te"],
    "ネ": ["ne"],
    "ヘ": ["he"],
    "メ": ["me"],
    "レ": ["re"],
    "オ": ["o"],
    "コ": ["ko"],
    "ソ": ["so"],
    "ト": ["to"],
    "ノ": ["no"],
    "ホ": ["ho"],
    "モ": ["mo"],
    "ヨ": ["yo"],
    "ロ": ["ro"],
    "ヲ": ["wo"]
}

let hiraganaLibrary = {
    "あ": ["a"],
    "か": ["ka"],
    "さ": ["sa"],
    "た": ["ta"],
    "な": ["na"],
    "は": ["ha"],
    "ま": ["ma"],
    "や": ["ya"],
    "ら": ["ra"],
    "わ": ["wa"],
    "ん": ["n"],
    "い": ["i"],
    "き": ["ki"],
    "し": ["shi"],
    "ち": ["chi"],
    "に": ["ni"],
    "ひ": ["hi"],
    "み": ["mi"],
    "り": ["ri"],
    "う": ["u"],
    "く": ["ku"],
    "す": ["su"],
    "つ": ["tsu"],
    "ぬ": ["nu"],
    "ふ": ["fu", "hu"],
    "む": ["mu"],
    "ゆ": ["yu"],
    "る": ["ru"],
    "え": ["e"],
    "け": ["ke"],
    "せ": ["se"],
    "て": ["te"],
    "ね": ["ne"],
    "へ": ["he"],
    "め": ["me"],
    "れ": ["re"],
    "お": ["o"],
    "こ": ["ko"],
    "そ": ["so"],
    "と": ["to"],
    "の": ["no"],
    "ほ": ["ho"],
    "も": ["mo"],
    "よ": ["yo"],
    "ろ": ["ro"],
    "を": ["wo"]
}

function setup() {
    state = "STARTUP"
    rectMode(CENTER)
    textFont("Noto Sans JP");

    divMain = document.getElementById("divMain")
    divWidth = divMain.clientWidth
    divHeight = divMain.clientHeight
    canvasW = divWidth * 0.8; //1536
    canvasH = divHeight * 0.7; //975 * 0.7 = 682.5
    //0.4443
    canvas = createCanvas(canvasW, canvasH)
    canvas.position(divWidth/2 - canvasW/2, divHeight/2 - canvasH/2)
    
    minuteRecK = createButton("60 Second Memory Katakana")
    minuteRecK.position(divWidth/2 - canvasW/2, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    minuteRecK.size(canvasW/7, canvasH/12)
    minuteRecK.mouseClicked(minuteRecButtonK)
    
    minuteRecH = createButton("60 Second Memory Hiragana")
    minuteRecH.position(divWidth/2 - canvasW/2 + canvasW/7 + canvasW/38.4, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    minuteRecH.size(canvasW/7, canvasH/12)
    minuteRecH.mouseClicked(minuteRecButtonH)
}

function minuteRecButtonH() {
    if (state == "60SEC") {
        state2 = "STANDBY"
    }
    state = "60SEC"
    type = "HIRAGANA"
}

function minuteRecButtonK() {
    if (state == "60SEC") {
        state2 = "STANDBY"
    }
    state = "60SEC"
    type = "KATAKANA"
}

function draw() {
    if (mouseX > 0 && mouseX < canvasW && mouseY > 0 && mouseY < canvasH) {
        onCanvas = true
    }
    else {
        onCanvas = false
    }


    if (state == "STARTUP") {
        textAlign(CENTER)
        background(47)
        textSize(canvasW/4.3885)
        fill("#fffaff")
        text("日本語", canvasW/2, canvasH/2 + canvasH/15)
        textSize(canvasW/30.72)
        text("れんしゅう", canvasW/2, canvasH/2 + canvasH/5)
    }
    else if (state == "60SEC") {
        if (state2 == "STANDBY") {
            background("#faf0fc")
            textSize(canvasW/6.4)
            if (onCanvas) {
                fill("#2e292e")
                background("#efe1f0")
                text("スタート", canvasW/2, canvasH/2 + canvasH/11)
            }
            else {
                fill("#453752")
                text("スタート", canvasW/2, canvasH/2 + canvasH/11)
            }
        }
        else if (state2 == "INGAME") {
            background("#faf0fc")
            if (millis() >= millis1) {
                millis1 = millis() + 1000
                sec++
            }
            fill("#2e292e")
            textSize(canvasW/38.4)
            text(sec, canvasW - canvasW/38.4, canvasH/14)

            fill("#f3e4f5")
            textSize(canvasW/2.4)
            text(txt.toString().replace(/,/g, ""), canvasW/2, canvasH/2 + canvasH/3.6)

            fill("#2e292e")
            textSize(canvasW/6.4)
            text(shuffledArray[arrayCounter], canvasW/2, canvasH/2 + canvasH/10)

            if (type == "KATAKANA") {
                pickedLibrary = katakanaLibrary
            }
            else if (type == "HIRAGANA") {
                pickedLibrary = hiraganaLibrary
            }

            for (let char in pickedLibrary) {
                if (char == shuffledArray[arrayCounter]) {
                    if (pickedLibrary[char].includes(txt.toString().replace(/,/g, ""))) {
                        txt = []
                        arrayCounter++
                    }
                }
            }

            if (txt) {
                txt.toString().replace(/,/g, "")
            }

            if (arrayCounter >= shuffledArray.length) {
                state2 = "WIN"
            }

            if (millis() >= timer) {
                state2 = "FAIL"
            }
        }
        else if (state2 == "WIN") {
            background("#faf0fc")
            fill("#2e292e")
            textSize(canvasW/6.4)
            text("You Win", canvasW/2, canvasH/2)
            textSize(canvasW/15)
            text(sixty - sec, canvasW/2, canvasH/2 + canvasH/5)
            textSize(canvasW/50)
            if (sixty - sec == 1) {
                text("second remaining", canvasW/2, canvasH/2 + canvasH/5 + canvasH/13)
            }
            else {
                text("seconds remaining", canvasW/2, canvasH/2 + canvasH/5 + canvasH/13)
            }
            type = ""
        }
        else if (state2 == "FAIL") {
            background("#faf0fc")
            fill("#2e292e")
            textSize(canvasW/6.4)
            text("You Lose", canvasW/2, canvasH/2)
            textSize(canvasW/15)
            text(shuffledArray.length - arrayCounter, canvasW/2, canvasH/2 + canvasH/5)
            textSize(canvasW/50)
            if (shuffledArray.length - arrayCounter == 1) {
                text("character remaining", canvasW/2, canvasH/2 + canvasH/5 + canvasH/13)
            }
            else {
                text("characters remaining", canvasW/2, canvasH/2 + canvasH/5 + canvasH/13)
            }
            type = ""
        }
    }
    //13872
}

function keyTyped() {
    if (key != " ") {
        txt.push(key.toLowerCase())
    }
}

function keyPressed() {
    if (txt.length != 0) {
        if (keyCode == BACKSPACE) {
            txt.pop()
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function mouseClicked() {
    if (state == "60SEC" && state2 == "STANDBY" && onCanvas) {
        state2 = "INGAME"
        timer = millis() + (sixty * 1000)
        millis1 = millis() + 1000
        sec = 0;
        let keyA = []
        if (type == "KATAKANA") {
            for (let char in katakanaLibrary) {
                keyA.push(char)
            }
        }
        else if (type == "HIRAGANA") {
            for (let char in hiraganaLibrary) {
                keyA.push(char)
            }
        }
        shuffledArray = shuffleArray(keyA)
        arrayCounter = 0
        txt = []
    }
}

function windowResized() {
    divMain = document.getElementById("divMain")
    divWidth = divMain.clientWidth
    divHeight = divMain.clientHeight
    canvasW = divWidth * 0.8;
    canvasH = divHeight * 0.7;
    resizeCanvas(canvasW, canvasH)
    canvas.position(divWidth/2 - canvasW/2, divHeight/2 - canvasH/2)

    minuteRecK.position(divWidth/2 - canvasW/2, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    minuteRecK.size(canvasW/7, canvasH/12)

    minuteRecH.position(divWidth/2 - canvasW/2 + canvasW/7 + canvasW/38.4, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    minuteRecH.size(canvasW/7, canvasH/12)
}