function Wall(owner) {
    this.owner = owner;
    this.exist = true;
    this.random = parseInt(Math.random() * 4);
    this.chuanqiang = [1, 1, 1, 1]
}
Wall.prototype.render = function () {
    if (this.exist) {
        this.owner.ctx.drawImage(this.owner.R["wall.png"], 675, 535, 40, 40);
    } else {
        //0下、1左、2右、3上
        if (this.random == 0) {
            this.owner.logCtx.fillText("恭喜获得下穿墙术", 0, 330, 300)
        } else if (this.random == 1) {

            this.owner.logCtx.fillText("恭喜获得左穿墙术", 0, 330, 300)
        } else if (this.random == 2) {

            this.owner.logCtx.fillText("恭喜获得右穿墙术", 0, 330, 300)
        } else if (this.random == 3) {

            this.owner.logCtx.fillText("恭喜获得上穿墙术", 0, 330, 300)
        }
    }
}