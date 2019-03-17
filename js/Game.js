function Game() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext('2d');
    //游戏log
    this.log = document.getElementById("log");
    this.logCtx=log.getContext("2d")
    //更换地图颜色
    this.black=document.getElementById("btns_1")
    this.white =document.getElementById("btns_2")
    //图片加载
    var arr = [
        "1.png",
        "2.png",
        "dog.gif",
        "light_big.png",
        "light_little.png",
        "wall.png",
        "bg.png",
        "Out.png",
        "Trap.png"
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
    this.traps=[];
    var f=0
    var self = this;
    setInterval(function () {
        f++
        self.peng()
        self.des()
        self.ctx.clearRect(0, 0, 944, 744)
        /* self.layer.render() */
       
        self.dog.update()
        self.dog.render()
        self.out.render()
        self.little.render()
        self.wall.render()
        self.big.render()
        self.map.render()
        self.map.update()
        self.skill()
        self.changeBg()
        self.debuff()

        if(f%200==0&&f%300==0){
             new Trap(self,self.dog.x,self.dog.y)
        } 
        for(var i=0;i<self.traps.length;i++){
            self.traps[i].render()
        }
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


    //触发Buff

    if (this.dog.row == "7" && this.dog.col == "1") {
        this.big.exist = true;
    }
    if (this.dog.row == "7" && this.dog.col == "27") {
        this.little.exist = true;
    }
    if (this.dog.row == "28" && this.dog.col == "27") {
        this.out.exist = true;
    }
    

    //技能效果
    if (this.dog.row == "1" && this.dog.col == "28") {
        this.big.exist = false;
        this.big.des = true;
        this.map.code[27][28] = 0   
        this.map.code[27][27] = 0
    }
    if (this.dog.row == "1" && this.dog.col == "2") {
        this.little.exist = false;
        this.little.des = true;
        this.dog.little = false;


    }
    
    if (this.dog.row == "16" && this.dog.col == "4") {
        this.wall.exist = false;
        this.wall.chuanqiang[this.wall.random] = 0;
    }
    if (this.dog.row == "28" && (this.dog.col == "27"||this.dog.col == "28")) {
        this.out.exist = true;
        this.logCtx.font='45px sans-serif';
        this.logCtx.fillText("Lucky Dog",0,500,300)
        this.dog.speed=0;
        
    }
}
//游戏介绍
Game.prototype.des=function(){
    this.logCtx.clearRect(0, 0, 300, 744)
    this.logCtx.font='30px sans-serif';
    this.logCtx.fillStyle="#fff";
    this.logCtx.fillText("BUFF介绍",0,30,300)
    this.logCtx.font='18px sans-serif';
    this.logCtx.fillText("穿墙术：随机获得一个方向的穿墙技能",0,60,300)
    this.logCtx.fillText("小光明术：视野扩大2公分",0,90,300)
    this.logCtx.fillText("光明书：出口通道开放",0,120,300)
    this.logCtx.font='30px sans-serif';

    this.logCtx.fillStyle="#fff";
    this.logCtx.fillText("DEBUFF介绍",0,170,300)
    this.logCtx.font='18px sans-serif';
    this.logCtx.fillText("随机生成炸弹区域",0,200,300)
    this.logCtx.fillText("炸弹爆炸时，狗会被炸死",0,230,300)
    this.logCtx.fillText("炸弹爆炸后的区域，1秒内不可通过",0,260,300)
    this.logCtx.font='30px sans-serif';
    this.logCtx.fillText("游戏日志",0,300,300)
    this.logCtx.font='18px sans-serif';
}
//更换地图
Game.prototype.changeBg=function(){
    var self=this;
    this.black.onclick=function(){
        self.canvas.style="background:black"
        self.map.color=false;
    }
    this.white.onclick=function(){
        self.canvas.style="background:url(images/bg.png)";
        self.map.color=true;
    }
}
Game.prototype.debuff=function(){
    for(var i=0;i<this.traps.length;i++){
        if(this.traps[i].row<31&&this.traps[i].col<31){
            if( this.map.code[this.traps[i].row][this.traps[i].col]==0){
                this.map.code[this.traps[i].row][this.traps[i].col]=3
            } 
            if( this.map.code[this.dog.row][this.dog.col]==3||this.map.code[this.dog.row+1][this.dog.col+1]==3||this.map.code[this.dog.row+1][this.dog.col]==3||this.map.code[this.dog.row][this.dog.col+1]==3||this.map.code[this.dog.row][this.dog.col+2]==3){
                this.dog.speed=0;
                this.dog.true=false;
            }
        }
            

        /* this.map.code[this.traps.row][this.traps.col]=3; */
    }
}