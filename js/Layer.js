function Layer(owner){
    this.owner=owner;
}
Layer.prototype.render=function(){
    this.owner.ctx.fillStyle="black"
    this.owner.ctx.fillRect(0,0,744,744)
}