function Game() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    this.log = document.getElementById("log");
    this.logCtx=log.getContext("2d")
    //日志行
    this.des_i=30;
  
    //图片加载
    var arr = [
        "1.png",
        "2.png",
        "dog.gif",
        "light_big.png",
        "light_little.png",
        "wall.png",
        "bg.png",
        "Out.png"
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
//游戏开始
Game.prototype.start = function () {
    this.dog = new Dog(this);
    this.map = new Map(this);
    this.little = new Light_little(this)
    this.big = new Light_big(this)
    this.wall = new Wall(this)
    this.layer = new Layer(this)
    this.out = new Out(this)
    var self = this;
    setInterval(function () {
        self.peng()
        self.des()
        self.ctx.clearRect(0, 0, 944, 744)
        /* self.layer.render() */

        self.dog.update()
        self.dog.render()
        self.map.render()
        self.out.render()
        self.little.render()
        self.wall.render()
        self.big.render()



        self.skill()
    }, 20)
}
//碰撞检测
Game.prototype.peng = function () {

    if (this.dog.direction == "0" && this.wall.chuanqiang[0]) {
        if (this.map.code[this.dog.row + 2][this.dog.col] !== 0 || this.map.code[this.dog.row + 2][this.dog.col + 1] !== 0) {
            this.dog.isRun = false
        }
    }
    if (this.dog.direction == "3" && this.wall.chuanqiang[3]) {
        if (this.map.code[this.dog.row - 1][this.dog.col] !== 0 || this.map.code[this.dog.row - 1][this.dog.col + 1] !== 0) {
            this.dog.isRun = false
        }
    }
    if (this.dog.direction == "1" && this.wall.chuanqiang[1]) {
        if (this.map.code[this.dog.row][this.dog.col - 1] !== 0 || this.map.code[this.dog.row + 1][this.dog.col - 1] !== 0) {
            this.dog.isRun = false
        }
    }
    if (this.dog.direction == "2" && this.wall.chuanqiang[2]) {
        if (this.map.code[this.dog.row][this.dog.col + 2] !== 0 || this.map.code[this.dog.row + 1][this.dog.col + 2] !== 0) {
            this.dog.isRun = false
        }
    }

}
//技能效果
Game.prototype.skill = function () {


    //技能现行

    if (this.dog.row == "7" && this.dog.col == "1") {
        this.big.exist = true;
    }
    if (this.dog.row == "7" && this.dog.col == "27") {
        this.little.exist = true;
    }

    //技能效果
    if (this.dog.row == "1" && this.dog.col == "28") {
        this.big.exist = false;
        this.big.des = true;
        this.canvas.style = "background:#fff";
        this.map.code[27][28] = 0   
        this.map.code[27][27] = 0
        this.out.exist = true;
    }
    if (this.dog.row == "1" && this.dog.col == "2") {
        this.little.exist = false;
        this.little.des = true;
        this.dog.little = false;


    }
    
    if (this.dog.row == "23" && this.dog.col == "28") {
        this.wall.exist = false;
        this.wall.chuanqiang[this.wall.random] = 0;
    }
    if (this.dog.row == "28" && (this.dog.col == "27"||this.dog.col == "28")) {
        this.out.exist = false;
        this.logCtx.fillText("Lucky Dog",0,450,300)
        this.dog.isRun=false;
        
    }
}
Game.prototype.des=function(){
    this.logCtx.clearRect(0, 0, 300, 744)
    this.logCtx.font='30px sans-serif';
    this.logCtx.fillStyle="#fff";
    this.logCtx.fillText("BUFF介绍",0,30,300)
    this.logCtx.font='18px sans-serif';
    this.logCtx.fillText("穿墙术：随机获得一个方向的穿墙技能",0,60,300)
    this.logCtx.fillText("小光明书：视野扩大2公分",0,90,300)
    this.logCtx.fillText("大光明书：视野全图化，出口现行",0,120,300)
    this.logCtx.font='30px sans-serif';
    this.logCtx.fillText("游戏日志",0,300,300)
    this.logCtx.font='18px sans-serif';
}