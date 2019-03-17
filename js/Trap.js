function Trap(owner, x, y) {
    this.owner = owner
    this.random1 = (parseInt(Math.random() * 7) - 3) * 48;
    this.random2 = (parseInt(Math.random() * 7) - 3) * 48;
    this.x = Math.round((x + this.random1) / 24) * 24;
    this.y = Math.round((y + this.random2) / 24) * 24;
    this.f = 0;
    this.status = "A";
    this.step = 0;
    this.owner.traps.push(this)
    this.row = 0;
    this.col = 0;
    this.true=true
}
Trap.prototype.render = function () {
    this.f++;
    if (this.status == "A") {

        if (this.f % 50 == 0) {

            this.step++
        }
        if (this.step > 8) {
            this.step = 0;
        }
        this.owner.ctx.drawImage(this.owner.R["Trap.png"], 32 * this.step, 27, 32, 32, this.x, this.y, 32, 32)
        if (this.f == 400) {
            this.status = "B"
            this.f = 0;
        }
    }
    if (this.status == "B") {
        if ((this.x / 24) < 31) {
            this.col = parseInt(this.x / 24) + 1;
        }
        if (((this.y - 32) / 24) < 31) {
            this.row = parseInt((this.y - 32) / 24) + 2
        }
        if (this.f % 100 == 0) {

            this.step++
        }
        if (this.step > 5) {
            this.step = 0;
        }
        this.owner.ctx.drawImage(this.owner.R["Trap.png"], 32 * (this.step + 9), 0, 48, 64, this.x, this.y - 32, 32, 64)
        if (this.f == 500) {
            this.row = 0;
            this.col = 0;
            this.status = null
            // 删除这个炸弹
            for (var i = 0; i < this.owner.traps.length; i++) {
                if (this.owner.traps[i] == this) {
                    this.owner.traps.splice(i, 1);
                }
            }
            this.f = 0;
        }
    }


}
Trap.prototype.update = function () {
   
}