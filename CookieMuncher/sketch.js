let easyButton, mediumButton, hardButton

let restartButton

let cookieButton, cookieRadius
let cookieCounter
let Particles = []
let crumbleIMG, cookieMonsterIMG, cookieMonsterHeadIMG, cookieMonsterHeadAngryIMG
let COOKIE_CRUNCH, BGM

let upgrade1, upgrade3, upgrade4
let timeRemaining, endTime, millis1
let cpsUpgradePresent = false
let numCpsUpgrades = 0
let cpsInterval = 1000
let cpsTimer = 2000

let cpsCost = 15
let smallerBitesCost = 50
let numSmallerBites = 0
let slowerBitesCost = 30
let numSlowerBites = 0

let state
let monsterY, monsterX
let nomTimer
let nibbleValue
let chompValue
let nomInterval

const angryTime = 15
let angrySwitch

let scores = []


function draw() {
  if (state == "MENU") {
    background("#f7e9da")
    monsterY = Math.sin(millis() / 400) * 10 + height / 2 - 30
    image(cookieMonsterHeadIMG, monsterX, monsterY)
    image(cookieMonsterBodyIMG, width / 2, height / 2)
    image(cookieMonsterBodyIMG, width / 2, height / 3)

    textAlign(CENTER)
    textSize(70)
    fill("#c97c49")
    text("Cookie\nMuncher", width / 2, 2.5 * height / 4)
  }
  else if (state == "IN_GAME") {
    background("#f7e9da")
    if (timeRemaining > angryTime) {
      fill("black")
      monsterY = Math.sin(millis() / 100) * 10 + height / 2 - 30
      image(cookieMonsterHeadIMG, monsterX, monsterY)
    }
    else {
      fill("blue")
      monsterY = Math.sin(millis() / 25) * 10 + height / 2 - 30
      image(cookieMonsterHeadAngryIMG, monsterX, monsterY)
    }
    text(timeRemaining, width - textWidth(timeRemaining) - 10, textAscent(timeRemaining))
    image(cookieMonsterBodyIMG, width / 2, height / 2)
    image(cookieMonsterBodyIMG, width / 2, height / 3)

    noStroke()
    
    //For loop that triggers all the partcles in the particle array
    for (let i = Particles.length - 1; i >= 0; i--) {
      Particles[i].show()
      Particles[i].act()
      //deletes particle from array when it reaches its death condition
      if (Particles[i].death()) Particles.splice(i, 1)
    }
    
    stroke(0)
    fill(50)
    //cookie number counter
    textSize(40)
    textAlign(CENTER)
    text(cookieCounter, width / 2, height - 60)

    // Cps IN LOOP
    if (millis() >= cpsTimer) {
      cpsTimer = millis() + cpsInterval
      plusCookie(numCpsUpgrades, cpsUpgradePresent)
    }
    //timer
    if (timeRemaining <= 0) {
      state = cookieCounter >= 0 ? "WIN" : "LOSE"
      scores = highScore(cookieCounter, scores)
      cookieButton.hide()
      upgrade1.hide()
      upgrade3.hide()
      upgrade4.hide()
      restartButton.show()
    }
    if (millis() >= millis1) {
      millis1 = millis() + 1000
      timeRemaining--
    }
    if (timeRemaining > angryTime && timeRemaining < 45) {
      if (millis() >= nomTimer) {
        nomTimer = millis() + range(3000, 5000)
        spawnNomParticles()
        let nomNum = chompValue
        cookieCounter += nomNum
        COOKIE_CRUNCH.play()
        Particles.push(new pointParticle(createVector(range(textWidth(nomNum), width - textWidth(nomNum)), range(textAscent(nomNum), height / 3)), nomNum))
      }
    }
    else if (timeRemaining <= angryTime) {
      if (angrySwitch == false) {
        angrySwitch = true
        nomTimer = millis() + nomInterval
      }
      if (millis() >= nomTimer) {
        nomTimer = millis() + nomInterval
        spawnNomParticles()
        let nomNum = nibbleValue
        cookieCounter += nomNum
        COOKIE_CRUNCH.play()
        Particles.push(new pointParticle(createVector(range(textWidth(nomNum), width - textWidth(nomNum)), range(textAscent(nomNum), height / 3)), nomNum))
      }
    }
  }
  else if (state == "WIN") {
    background(50, 50, 255)
    fill(255)
    let msg = "You defeated\nthe\nCookie Muncher"
    textAlign(CENTER)
    text(msg, width / 2, (height / 3) - 90)
    let topThree = "Top3\n"
    for (let i = 0; i < 3; i++) {
      if (scores[i] != undefined) topThree += `${scores[i]}\n`
    }
    text(cookieCounter + " cookies", width / 2, 3 * height / 4 - 110)
    text(topThree, width / 2, 3 * height / 4 - 10)
  }
  else if (state == "LOSE") {
    background(50, 50, 255)
    fill(255)
    textAlign(CENTER)
    let msg = "You have been\nMUNCHED"
    text(msg, width / 2, height / 3 - 90)

    let topThree = "Top3\n"
    for (let i = 0; i < 3; i++) {
      if (scores[i] != undefined) topThree += `${scores[i]}\n`
    }
    text(cookieCounter + " cookies", width / 2, 3 * height / 4 - 110)
    text(topThree, width / 2, 3 * height / 4 - 10)
  }
}

let temp = false
function keyPressed() {
  if (state != "IN_GAME") return
  // Upgrade 1 pressed
  if ((keyCode == "49" || keyCode == "97") && temp == false) {
    addCps()
    upgrade1.addClass("active")
    temp = true
  }
  // Upgrade 3 pressed
  if ((keyCode == "50" || keyCode == "98") && temp == false) {
    smallerBites()
    upgrade3.addClass("active")
    temp = true
  }
  // Upgrade 4 pressed
  if ((keyCode == "51" || keyCode == "99") && temp == false) {
    slowerBites()
    upgrade4.addClass("active")
    temp = true
  }
  // Cookie button pressed
  if (keyCode == "32" && temp == false) {
    cookieClick()
    cookieButton.addClass("active")
    temp = true
  }
  return false
}

function keyReleased() {
  if (state != "IN_GAME") return
  // Upgrade 1 release
  if (keyCode == "49" || keyCode == "97") {
    temp = false
    upgrade1.removeClass("active")
  }
  // Upgrade 3 release
  if (keyCode == "50" || keyCode == "98") {
    temp = false
    upgrade3.removeClass("active")
  }
  // Upgrade 4 release
  if (keyCode == "51" || keyCode == "99") {
    temp = false
    upgrade4.removeClass("active")
  }
  // Cookie release
  if (keyCode == "32") {
    temp = false
    cookieButton.removeClass("active")
  }
}

// function triggers partcles and adds to the cooke counter when cookie is clicked
function cookieClick() {
  let addNum = 1
  cookieCounter += addNum
  spawnCookieParticles()
  //Point particle spawning
  Particles.push(new pointParticle(createVector(range(textWidth(addNum), width - textWidth(addNum)), range(textAscent(addNum), height - textAscent(addNum))), addNum))
}
// Upgrade Functions
//Adds Cookies Per Second
function addCps() {
  if (cookieCounter - cpsCost < 0) return
  numCpsUpgrades++
  upgrade1.html(`Cookies Per Second (${cpsCost}) [${numCpsUpgrades}]`)
  cpsUpgradePresent = true
  cookieCounter -= cpsCost
  Particles.push(new pointParticle(createVector(width - textWidth(cpsCost), upgrade1.position().y + textAscent(cpsCost)), -cpsCost))
}

function plusCookie(numCpsUpgrades, cpsUpgradePresent) {
  if (cpsUpgradePresent) {
    for (let index = 0; index < numCpsUpgrades; index++) {
      cookieCounter++
    }
  }
}


//Makes the bites the muncher does smalller
function smallerBites() {
  if (cookieCounter - smallerBitesCost < 0) return
  if (nibbleValue >= -1 && chompValue >= -5) return
  if (nibbleValue < -1) nibbleValue += 1
  if (chompValue < -5) chompValue += 5
  numSmallerBites++
  upgrade3.html(`Smaller Bites (${smallerBitesCost}) [${numSmallerBites}]`)
  cookieCounter -= smallerBitesCost
  Particles.push(new pointParticle(createVector(width - textWidth(smallerBitesCost), upgrade3.position().y + textAscent(smallerBitesCost)), -smallerBitesCost))
}
//Makes the Muncher bite slower
function slowerBites() {
  if (cookieCounter - slowerBitesCost < 0) return
  nomInterval += 100
  numSlowerBites++
  upgrade4.html(`Slower Bites (${slowerBitesCost}) [${numSlowerBites}]`)
  cookieCounter -= slowerBitesCost
  Particles.push(new pointParticle(createVector(width - textWidth(slowerBitesCost), upgrade4.position().y + textAscent(slowerBitesCost)), -slowerBitesCost))
}
//random number inclusive - exclusive
function range(min, max) {
  return Math.random() * (max - min) + min
}
// Takes in a score adds it to an array a sorted array from highest to least
function highScore(score, scoreList) {
  for (let i = 0; i < scoreList.length; i++) {
    if (scoreList[i] < score) {
      scoreList.splice(i, 0, score)
      return scoreList
    }
  }
  scoreList.push(score)
  return scoreList
}