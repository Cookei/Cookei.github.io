let pointParticle = function(pos, value) {
  this.pos = pos.copy()
  this.value = value
  this.opacity = 255

  this.show = function() {
    value >= 0 ? fill(0, 255, 0, this.opacity) : fill(255, 0, 0, this.opacity)
    this.trueVal = this.value >= 0 ? `+${this.value}` : this.value
    text(this.trueVal, this.pos.x, this.pos.y)
  }

  this.act = function() {
    this.opacity -= 5
    this.pos.y -= Math.sign(this.value)
  }

  this.death = function() {
    return this.opacity <= 0
  }
}