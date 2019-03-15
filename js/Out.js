function Out(owner){
    this.owner=owner;
    this.exist=false;
}
Out.prototype.render=function(){
    if(this.exist){
        this.owner.ctx.drawImage(this.owner.R["Out.png"],675,675,40,40);
    }
}