function Light_big(owner){
    this.owner=owner;
    this.exist=true;
}
Light_big.prototype.render=function(){
    if(this.exist){
        this.owner.ctx.drawImage(this.owner.R["light_big.png"],675,30,40,40);
    }
   
}
