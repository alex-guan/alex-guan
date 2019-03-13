function Light_little(owner){
    this.owner=owner;
}
Light_little.prototype.render=function(){
    this.owner.ctx.drawImage(this.owner.R["light_little.png"],30,30,40,40);
}