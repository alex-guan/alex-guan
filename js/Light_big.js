function Light_big(owner){
    this.owner=owner;
}
Light_big.prototype.render=function(){
    this.owner.ctx.drawImage(this.owner.R["light_big.png"],675,30,40,40);
}
