function View(owner, x, y) {
    this.x = x;
    this.y = y;
    this.owner = owner;
    this.speed = 2;
    this.little = false;
    this.isRun=false
    this.bind();
}
View.prototype.render = function () {
    this.owner.ctx.fillStyle = "#fff";
    if (this.little) {
        this.owner.ctx.fillRect(this.x - 80, this.y - 80, 240, 240)
        }
        else {
            this.owner.ctx.fillRect(this.x - 40, this.y - 40, 120, 120)
    }
}

View.prototype.bind = function () {
    var self = this;
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                self.isRun = true;
                break;
            case 38:
                self.isRun = true;
                break;
            case 39:
                self.isRun = true;
                break;
            case 40:
                self.isRun = true;
                break;
        }
    }
    document.onkeyup = function () {
        self.isRun = false;
    }
}
//位置修正
Dog.prototype.check=function(){
    if(this.direction=="1"||this.direction=="2"){
        this.y=Math.round(this.y/24)*24;
    }
    if(this.direction=="0"||this.direction=="3"){
        this.x=Math.round(this.x/24)*24;
    }
}
