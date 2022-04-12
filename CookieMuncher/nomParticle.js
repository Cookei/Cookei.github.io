let nomParticle = function(pos, vel, radius) {
  this.pos = pos.copy()
  this.vel = vel.copy()
  this.acc = createVector(0, 1)
  this.radius = radius

  this.show = function() {
    image(crumbleIMG, this.pos.x, this.pos.y, this.radius, this.radius)
  }

  this.act = function() {
    this.pos = pos.add(this.vel)
    this.vel = vel.add(this.acc)
    this.radius -= 1
  }

  this.death = function() {
    return this.radius <= 0
  }
}

function spawnNomParticles() {
  for (let i = 0; i < 50; i++) {
    let vel = new p5.Vector.fromAngle(range(260, 300), -range(5, 20))
    let pos = createVector(monsterX - 70, monsterY - 100)
    Particles.push(new nomParticle(pos, vel, range(20, 30)))
  }
}