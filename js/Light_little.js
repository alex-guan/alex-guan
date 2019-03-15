function Light_little(owner){
    this.owner=owner;
    this.exist=false;
    this.des=false;
}
Light_little.prototype.render=function(){
    if(this.exist){
        this.owner.ctx.drawImage(this.owner.R["light_little.png"],30,30,40,40);
    }
    if(this.des){
        this.owner.logCtx.fillText("恭喜获得小光明书",0,360,300)
    }
  
}