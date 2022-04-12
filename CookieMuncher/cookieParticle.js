let cookieParticle = function(radius, pos, vel) {
  //base cookie particle variables
  this.pos = pos.copy()
  this.vel = vel.copy()
  this.radius = radius
  this.decayRate = Math.random() * 2 + 1
  //color using HSL with slightly random offset values for S and L
  this.c = color(`hsla(26, ${Math.round(range(24, 44))}%, ${Math.round(range(58, 68))}%, 1)`)

  //visuals function
  this.show = function() {
    image(crumbleIMG, this.pos.x, this.pos.y, this.radius, this.radius)
  }

  //behavior function
  this.act = function() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.radius -= this.decayRate
  }

  //death condition function
  this.death = function() {
    return this.radius <= 0
  }
}

//center cookie particle spawn function
function spawnCookieParticles() {
  for (let i = 0; i < 360; i += 10) {
    let vel = new p5.Vector.fromAngle(range(i - 1, i + 1), range(0.5, 2.5))
    let pos = createVector(cookieButton.position().x + cookieRadius + Math.cos(i) * cookieRadius, cookieButton.position().y + cookieRadius + Math.sin(i) * cookieRadius)
    Particles.push(new cookieParticle(range(20, 30), pos, vel))
  }
}