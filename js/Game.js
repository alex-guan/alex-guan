function Game() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    var arr = [
        "1.png",
        "2.png",
        "dog.gif",
        "light_big.png",
        "light_little.png",
        "wall.png"
    ]
    this.R = {}
    var self = this;
    var f = 0;
    for (var i = 0; i < arr.length; i++) {
        (function (i) {
            var img = new Image();
            img.src = "images/" + arr[i];
            self.R[arr[i]] = img;
            f++;
            img.onload = function () {
                if (f == arr.length) {
                    self.start()
                }
            }
        })(i)

    }

}
Game.prototype.start = function () {
    this.dog = new Dog(this);
    this.map = new Map(this);
    this.little=new Light_little(this)
    this.big=new Light_big(this)
    this.wall=new Wall(this)
    var self = this;
    setInterval(function () {
        self.peng()
        self.ctx.clearRect(0, 0, 944, 744)
        self.dog.render()
        self.dog.update()
        self.map.render()
        self.little.render()
        self.wall.render()
        self.big.render()
        self.skill()
    }, 20)
}
//碰撞检测
Game.prototype.peng = function () {

    if (this.dog.direction == "0") {
        if (this.map.code[this.dog.row + 2][this.dog.col] !== 0 || this.map.code[this.dog.row + 2][this.dog.col + 1] !== 0) {
            this.dog.isRun = false
        }
    }
    if (this.dog.direction == "3") {
        if (this.map.code[this.dog.row - 1][this.dog.col] !== 0 || this.map.code[this.dog.row - 1][this.dog.col + 1] !== 0) {
            this.dog.isRun = false
        }
    }
    if (this.dog.direction == "1") {
        if (this.map.code[this.dog.row][this.dog.col - 1] !== 0 || this.map.code[this.dog.row + 1][this.dog.col - 1] !== 0) {
            this.dog.isRun = false
        }
    }
    if (this.dog.direction == "2") {
        if (this.map.code[this.dog.row][this.dog.col + 2] !== 0 || this.map.code[this.dog.row + 1][this.dog.col + 2] !== 0) {
            this.dog.isRun = false
        }
    }

}
Game.prototype.skill=function(){
    if (this.dog.row=="1"&&this.dog.col=="28" ){
        this.big=null
        this.canvas.style="background:#fff"
    }
}
