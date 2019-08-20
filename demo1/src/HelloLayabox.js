Laya.init(500,400,Laya.WebGL);
// var txt = new Laya.Text();
// txt.text = 'Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！';
// txt.color = '#FF0000';
// txt.fontSize = 18;
// // txt.stroke = 5;
// // txt.strokeColor = '#fff';
// txt.bold = true;
// txt.align = 'center';
// //设置文本垂直居中
// txt.valign = 'middle';
// txt.borderColor = 'yellow';
// txt.width = 200;
// txt.height = 200;
// txt.bgColor = 'greenyellow';
// txt.italic = false;
// //设置自动换行
// txt.wordWrap = true;
// txt.pos(20,20)
// Laya.stage.bgColor = '#23238E';
// Laya.stage.addChild(txt);

//设置显示文本txt.overflow
// setup();
// function setup(){
//     var t1 = createText()
//     //设置不进行任何裁剪
//     t1.overflow = Laya.Text.VISIBLE
//     t1.pos(10,10)
    
//     var t2 = createText()
//     //设置不显示文本区域外的字符像素
//     t2.overflow = Laya.Text.SCROLL
//     t2.pos(10,110)
    
//     var t3 = createText()
//     //设置不显示文本区域外的字符像素
//     t3.overflow = Laya.Text.HIDDEN
//     t3.pos(10,210)

// }
// function createText(){
//     var txt = new Laya.Text()
//     txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
//     "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
//     "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
//     txt.borderColor = '#ffff00';
//     txt.size(300,50);
//     txt.fontSize = 20;
//     txt.color = '#fff';
//     Laya.stage.addChild(txt);
//     return txt;
// }

//滚动文本
createText2()
function createText2(){
    this.txt = new Laya.Text()
    this.txt.overflow = Laya.Text.SCROLL
    this.txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！"
    this.txt.size(200,100)
    this.txt.x = Laya.stage.width - this.txt.width>>1
    this.txt.y = Laya.stage.height - this.txt.height>>1
    this.txt.color = '#fff'
    this.txt.fontSize = '20'
    this.txt.borderColor = '#ffff00'
    this.txt.wordWrap = true;
    Laya.stage.addChild(this.txt)
    this.txt.on(Laya.Event.MOUSE_DOWN,this,startScrollText)
}

//开始滚动文本
function startScrollText(){
    this.prevX = this.txt.mouseX
    this.prevY = this.txt.mouseY
    Laya.stage.on(Laya.Event.MOUSE_MOVE,this,scrollText)
    Laya.stage.on(Laya.Event.MOUSE_UP,this,finishScrollText)    
    
}

//停止滚动文本
function finishScrollText(){
    Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.scrollText)
    Laya.stage.off(Laya.Event.MOUSE_UP,this,this.finishScrollText)
    
}
//鼠标滚动文本
function scrollText(){
    var nowX = this.txt.mouseX
    var nowY = this.txt.mouseY
    this.txt.scrollX += this.prevX - nowX
    this.txt.scrollY += this.prevY - nowY
    this.prevX = nowX
    this.prevY = nowY
    
}