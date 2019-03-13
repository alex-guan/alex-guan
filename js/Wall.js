function Wall(owner){
    this.owner=owner;
}
Wall.prototype.render=function(){
    this.owner.ctx.drawImage(this.owner.R["wall.png"],160,605,40,40);
}
Wall.prototype.update=function(){
   
}