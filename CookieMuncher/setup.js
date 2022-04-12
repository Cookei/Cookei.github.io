function preload() {
  crumbleIMG = new Image()
  crumbleIMG.src = "/assets/Cookie Crumble.png"

  cookieMonsterBodyIMG = new Image()
  cookieMonsterBodyIMG.src = "/assets/cookie munster hand.png"

  cookieMonsterHeadIMG = new Image()
  cookieMonsterHeadIMG.src = "/assets/cookie munster face.png"

  cookieMonsterHeadAngryIMG = new Image()
  cookieMonsterHeadAngryIMG.src = "/assets/cookie munster head angry.png"
  soundFormats('mp3');
  //Sound from Zapsplat.com
  COOKIE_CRUNCH = loadSound("/assets/cookie crunch.mp3")
}

function setup() {
  let canvas = createCanvas(700, 700)
  canvas.parent("sketchParent")
  rectMode(CENTER)
  imageMode(CENTER)
  
  state = "MENU"
  
  cookieMonsterBodyIMG.resize(width, height)
  cookieMonsterHeadIMG.resize(width, height)
  cookieMonsterHeadAngryIMG.resize(width, height)
  monsterX = width/2 + 50

  let restartHalfWidth = width / 10
  let restartHalfHeight = width / 18
  restartButton = createButton("Restart").parent("sketchParent").size(restartHalfWidth * 2, restartHalfHeight * 2).position(width / 2 - restartHalfWidth, height / 2 - restartHalfHeight - 40).class("upgradeButton").mouseClicked(restart).hide()
  
  //The center cookie button code
  cookieRadius = width / 5
  cookieButton = createButton("")
  cookieButton.size(cookieRadius * 2, cookieRadius * 2)
  cookieButton.parent("sketchParent")
  cookieButton.class("cookie")
  cookieButton.position(width/2 - cookieRadius, height/2 - cookieRadius)
  cookieButton.mousePressed(cookieClick)
  cookieButton.hide()

  easyButton = createButton("Easy").parent("upgradeBar").mouseClicked(() => chooseDifficulty("EASY")).class("upgradeButton")
  mediumButton = createButton("Medium").parent("upgradeBar").mouseClicked(() => chooseDifficulty("MEDIUM")).class("upgradeButton")
  hardButton = createButton("Hard").parent("upgradeBar").mouseClicked(() => chooseDifficulty("HARD")).class("upgradeButton")

  upgrade1 = createButton(`Cookies Per Second (${cpsCost}) [${numCpsUpgrades}]`)
  upgrade1.parent("upgradeBar")
  upgrade1.class("upgradeButton")
  upgrade1.hide()
  upgrade1.mouseClicked(addCps)
  
  
  upgrade3 = createButton(`Smaller Bites (${smallerBitesCost}) [${numSmallerBites}]`)
  upgrade3.parent("upgradeBar")
  upgrade3.class("upgradeButton")
  upgrade3.hide()
  upgrade3.mouseClicked(smallerBites)

  upgrade4 = createButton(`Slower Bites (${slowerBitesCost}) [${numSlowerBites}]`)
  upgrade4.parent("upgradeBar")
  upgrade4.class("upgradeButton")
  upgrade4.hide()
  upgrade4.mouseClicked(slowerBites)
  
  timeRemaining = 50
  endTime = millis() + timeRemaining * 1000
  millis1 = millis() + 1000
  nomTimer = millis() + 3000
  angrySwitch = false

  textFont("Nunito")
}

function chooseDifficulty(difficulty) {
  state = "IN_GAME"
  if (difficulty == "EASY") {
    cookieCounter = 50
    nibbleValue = -5
    chompValue = -15
    nomInterval = 500
  }
  else if (difficulty == "MEDIUM") {
    cookieCounter = 30
    nibbleValue = -7
    chompValue = -20
    nomInterval = 333
  }
  else if (difficulty == "HARD") {
    cookieCounter = 10
    nibbleValue = -10
    chompValue = -20
    nomInterval = 333
  }
  
  easyButton.hide()
  mediumButton.hide()
  hardButton.hide()
  cookieButton.show()
  upgrade1.show()
  upgrade3.show()
  upgrade4.show()
  
}

function restart() {
  state = "MENU"
  timeRemaining = 50
  endTime = millis() + timeRemaining * 1000
  millis1 = millis() + 1000
  nomTimer = millis() + 3000
  angrySwitch = false
  restartButton.hide()
  easyButton.show()
  mediumButton.show()
  hardButton.show()
  numSlowerBites = 0
  numSmallerBites = 0
  numCpsUpgrades = 0
  cpsUpgradePresent = false
}