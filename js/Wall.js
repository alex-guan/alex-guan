function Wall(owner){
    this.owner=owner;
    this.exist=true;
    this.random=parseInt(Math.random()*4);
    this.chuanqiang=[1,1,1,1]
}
Wall.prototype.render=function(){
    if(this.exist){
        this.owner.ctx.drawImage(this.owner.R["wall.png"],160,605,40,40);
        
    }
}
