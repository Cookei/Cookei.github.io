/// <reference path="p5.global-mode.d.ts" />
let divMain, divWidth, divHeight, canvasW, canvasH, canvas, minuteRecK, state, font, onCanvas, timer, millis1, sec, shuffledArray, arrayCounter, type, instructions, tentenMaru
let state2 = "STANDBY"
let txt = []
let sixty = 60
let pickedLibrary
let scrollLoc
let helpText = "あ　 い　 う　 え　 お\n"
helpText += "か　 き　 く　 け　 こ\n"
helpText += "さ　 し　 す　 せ　 そ\n"
helpText += "た　 ち　 つ　 て　 と\n"
helpText += "な　 に　 ぬ　 ね　 の\n"
helpText += "は　 ひ　 ふ　 へ　 ほ\n"
helpText += "ま　 み　 む　 め　 も\n"
helpText += "や　 　　 ゆ　 　　 よ\n"
helpText += "ら　 り　 る　 れ　 ろ\n"
helpText += "わ　 　　 　　 　　 を\n"
helpText += "ん    \n"
helpText += "    \n"
helpText += "・　 ・　 ・　 ・　 ・\n"
helpText += "ア　 イ　 ウ　 エ　 オ\n"
helpText += "カ　 キ　 ク　 ケ　 コ\n"
helpText += "サ　 シ　 ス　 セ　 ソ\n"
helpText += "タ　 チ　 ツ　 テ　 ト\n"
helpText += "ナ　 ニ　 ヌ　 ネ　 ノ\n"
helpText += "ハ　 ヒ　 フ　 ヘ　 ホ\n"
helpText += "マ　 ミ　 ム　 メ　 モ\n"
helpText += "ヤ　 　　 ユ　 　　 ヨ\n"
helpText += "ラ　 リ　 ル　 レ　 ロ\n"
helpText += "ワ　 　　 　　 　　 ヲ\n"
helpText += "ン    "

let helpTextA = "a\nka\nsa\nta\nna\nha\nma\nya\nra\nwa\nn\n\n\na\nka\nsa\nta\nna\nha\nma\nya\nra\nwa\nn"
let helpTextI = "i\nki\nshi\nchi\nni\nhi\nmi\n\nri\n\n\n\n\ni\nki\nshi\nchi\nni\nhi\nmi\n\nri"
let helpTextU = "u\nku\nshu\nchu\nnu\nhu/fu\nmu\nyu\nru\n\n\n\n\nu\nku\nshu\nchu\nnu\nhu/fu\nmu\nyu\nru"
let helpTextE = "e\nke\nshe\nche\nne\nhe\nme\n\nre\n\n\n\n\ne\nke\nshe\nche\nne\nhe\nme\n\nre"
let helpTextO = "o\nko\nso\nto\nno\nho\nmo\nyo\nro\nwo\n\n\n\no\nko\nso\nto\nno\nho\nmo\nyo\nro\nwo\n"

let howToPlay = "Type the romaji that corrosponds \nto the Japanese characters in the \ngiven amount of time"

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

let tentenMaruLibrary = {
    "が": ["ga"],
    "ぎ": ["gi"],
    "ぐ": ["gu"],
    "げ": ["ge"],
    "ご": ["go"],
    "ざ": ["za"],
    "じ": ["ji"],
    "ず": ["zu"],
    "ぜ": ["ze"],
    "ぞ": ["zo"],
    "だ": ["da"],
    "ぢ": ["ji"],
    "づ": ["zu"],
    "で": ["de"],
    "ど": ["do"],
    "ば": ["ba"],
    "び": ["bi"],
    "ぶ": ["bu"],
    "べ": ["be"],
    "ぼ": ["bo"],
    "ぱ": ["pa"],
    "ぴ": ["pi"],
    "ぷ": ["pu"],
    "ぺ": ["pe"],
    "ぽ": ["po"],
    "ガ": ["ga"],
    "ギ": ["gi"],
    "グ": ["gu"],
    "ゲ": ["ge"],
    "ゴ": ["go"],
    "ザ": ["za"],
    "ジ": ["ji"],
    "ズ": ["zu"],
    "ゼ": ["ze"],
    "ゾ": ["zo"],
    "ダ": ["da"],
    "ヂ": ["ji"],
    "ヅ": ["zu"],
    "デ": ["de"],
    "ド": ["do"],
    "バ": ["ba"],
    "ビ": ["bi"],
    "ブ": ["bu"],
    "ベ": ["be"],
    "ボ": ["bo"],
    "パ": ["pa"],
    "ピ": ["pi"],
    "プ": ["pu"],
    "ペ": ["pe"],
    "ポ": ["po"]
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

    instructions = createButton("Reference")
    instructions.position(divWidth/2 + canvasW/2 - canvasW/7, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    instructions.size(canvasW/7, canvasH/12)
    instructions.mouseClicked(helpButton)

    tentenMaru = createButton("120s Ten Ten and Maru ALL")
    tentenMaru.position(divWidth/2 - canvasW/2 + canvasW/7 * 2 + canvasW/38.4 * 2, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    tentenMaru.size(canvasW/7, canvasH/12)
    tentenMaru.mouseClicked(tentenMaruButton)

    textAlign(CENTER)
    textLeading(30)
}

function tentenMaruButton() {
    if (state == "TIMEDSEC") {
        state2 = "STANDBY"
    }
    state2 = "STANDBY"
    state = "TIMEDSEC"
    type = "TENTENMARU"
    sixty = 120
}

function helpButton() {
    if (state != "HELP") {
        state = "HELP"
        state2 = ""
        scrollLoc = canvasH/11.375
    }
}

function minuteRecButtonH() {
    if (state == "TIMEDSEC") {
        state2 = "STANDBY"
    }
    state2 = "STANDBY"
    state = "TIMEDSEC"
    type = "HIRAGANA"
    sixty = 60
}

function minuteRecButtonK() {
    if (state == "TIMEDSEC") {
        state2 = "STANDBY"
    }
    state2 = "STANDBY"
    state = "TIMEDSEC"
    type = "KATAKANA"
    sixty = 60
}

function draw() {
    if (mouseX > 0 && mouseX < canvasW && mouseY > 0 && mouseY < canvasH) {
        onCanvas = true
    }
    else {
        onCanvas = false
    }


    if (state == "STARTUP") {
        background(47)
        textSize(canvasW/4.3885)
        fill("#fffaff")
        text("日本語", canvasW/2, canvasH/2 + canvasH/15)
        textSize(canvasW/30.72)
        text("れんしゅう", canvasW/2, canvasH/2 + canvasH/5)
    }
    else if (state == "TIMEDSEC") {
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
            else if (type == "TENTENMARU") {
                pickedLibrary = tentenMaruLibrary
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
            text("Try Again", canvasW/2, canvasH/2)
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
    else if (state == "HELP") {
        background("#faf0fc")
        fill("#2e292e")
        textSize(canvasH/13.65)
        textAlign(LEFT)
        text(helpText, canvasW/51.2, scrollLoc)

        fill("#5e4b5a")
        textSize(canvasH/30)
        textLeading(canvasH/10.92)
        text(helpTextA, canvasW/51.2 + canvasW/26, scrollLoc)

        textLeading(canvasH/10.92)
        text(helpTextI, canvasW/51.2 + canvasW/26 + canvasW/13.5, scrollLoc)

        textLeading(canvasH/10.92)
        text(helpTextU, canvasW/51.2 + canvasW/26 + ((canvasW/13.5) * 2) - canvasW/160, scrollLoc)

        textLeading(canvasH/10.92)
        text(helpTextE, canvasW/51.2 + canvasW/26 + ((canvasW/13.5) * 3) - canvasW/160, scrollLoc)

        textLeading(canvasH/10.92)
        text(helpTextO, canvasW/51.2 + canvasW/26 + ((canvasW/13.5) * 4) - canvasW/160, scrollLoc)

        textLeading(canvasH/10.92)
        text(howToPlay, canvasW/51.2 + canvasW/26 + ((canvasW/13.5) * 8.5), scrollLoc)
        textAlign(CENTER)

        if (keyIsDown(DOWN_ARROW)) {
            scrollLoc -= canvasH/136.5
        }
        if (keyIsDown(UP_ARROW)) {
            scrollLoc += canvasH/136.5
        }
        rectMode(CORNER)
        noStroke()
        fill("#d0b1e0")
        rect(canvasW - canvasW/80, canvasH/100, canvasW/150, map(scrollLoc, canvasH/11.375, -canvasH/0.85, canvasH/95, canvasH - canvasH/50, true), 1.5)
        rectMode(CENTER)

        scrollLoc = constrain(scrollLoc, -canvasH/0.85, canvasH/11.375)

    }
}

function mouseWheel() {
    if (state == "HELP") {
        if (event.deltaY > 0) {
            scrollLoc -= canvasH/15
            scrollLoc = constrain(scrollLoc, -canvasH/0.85, canvasH/11.375)
        }
        else if (event.deltaY < 0) {
            scrollLoc += canvasH/15
            scrollLoc = constrain(scrollLoc, -canvasH/0.85, canvasH/11.375)
        }
    }
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
    if (state == "TIMEDSEC" && state2 == "STANDBY" && onCanvas) {
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
        else if (type == "TENTENMARU") {
            for (let char in tentenMaruLibrary) {
                keyA.push(char)
            }
        }
        shuffledArray = shuffleArray(keyA)
        arrayCounter = 0
        txt = []
    }
}

function windowResized() {
    let r = scrollLoc/(canvasH/11.375 + canvasH/0.85)
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
    
    instructions.position(divWidth/2 + canvasW/2 - canvasW/7, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    instructions.size(canvasW/7, canvasH/12)

    tentenMaru.position(divWidth/2 - canvasW/2 + canvasW/7 * 2 + canvasW/38.4 * 2, (divHeight/2 - canvasH/2) - (canvasH/12 * 1.5))
    tentenMaru.size(canvasW/7, canvasH/12)

    scrollLoc = (canvasH/11.375 + canvasH/0.85) * r
}