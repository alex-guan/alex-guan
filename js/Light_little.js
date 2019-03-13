function Light_little(owner){
    this.owner=owner;
    this.exist=true;
}
Light_little.prototype.render=function(){
    if(this.exist){
        this.owner.ctx.drawImage(this.owner.R["light_little.png"],30,30,40,40);
    }
  
}