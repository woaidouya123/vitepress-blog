# [使用Grid布局制作拼图小游戏](https://blog.csdn.net/woaidouya123/article/details/103606940)
*2019-12-19 00:02:35*

---
<p>在学习grid布局时突发奇想利用这个布局的特性做一个拼图小游戏</p> 
<p>先简单实现了一个demo,后期再优化，效果如下图：</p> 
<p><img alt="效果图" class="has" height="220" src="https://img-blog.csdnimg.cn/20191218235345617.gif" width="410"></p> 
<p>先上一下主要的css样式</p> 

```css
.container {
        display: inline-grid;
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        grid-gap: 1px 1px;
        grid-template-areas:
            'a b c'
            'd e f'
            'g h i';
        place-items: center center;
        place-content: center center;
    }
    .container>div {
        width: 100px;
        height: 100px;
        text-align: center;
        padding: 50px 0;
        box-sizing: border-box;
        counter-increment: section1;
        background-image: url(../images/nkss2.png);
        background-size: 300% 300%;
    }
``` 
<p>方块的切换是利用的grid布局的grid-area切换实现，简单快捷，至于确定，就是grid-area不支持动画属性，所以没法实现漂亮的滑动效果，主要JS如下：</p> 

```javascript
var AlphaBeta = "abcdefghi";
    var divs = document.getElementById("content").children;
    var emptyNode = divs[8];
    var emptyFlag = 'i';
    var IsGameOver = false;
    var startTime = new Date();
    for (var i = 0; i < divs.length; i++) {
        divs[i].style["grid-area"] = AlphaBeta[i];
        divs[i].style["background-position"] = -1 * (i % 3) * 100 + "% " + -1 * Math.floor(i / 3) * 100 + "%";
        divs[i].addEventListener("click", function(event) {
            if (getMovePos(emptyFlag).indexOf(this.style.gridRowStart) > -1) {
                emptyNode.style["grid-area"] = this.style["grid-area"];
                this.style["grid-area"] = emptyFlag;
                emptyFlag = emptyNode.style.gridRowStart;
                if (checkFinished()) {
                    IsGameOver = true;
                    successAnimation();
                }
            }
        })
    }
``` 
<p>另外还有初始时的打乱方法：</p> 

```javascript
// 打乱方法
    function randomLayut(step) {
        var pos, ran, node, preNodeFlag;
        while (step > 0) {
            pos = getMovePos(emptyFlag);
            ran = Math.floor((Math.random() * pos.length));
            while (pos[ran] == undefined || pos[ran] == preNodeFlag) {
                ran = Math.floor((Math.random() * pos.length));
            }
            console.log(pos[ran]);
            node = [...divs].filter(function(item) {
                return item.style.gridRowStart == pos[ran];
            })
            emptyNode.style["grid-area"] = node[0].style["grid-area"];
            node[0].style["grid-area"] = emptyFlag;
            preNodeFlag = emptyFlag;
            emptyFlag = emptyNode.style.gridRowStart;
            step--;
        }
    }
``` 
<p>获取可移动位置的方法：</p> 

```javascript
// 计算可移动的方块位置
    function getMovePos(empty) {
        var pos = AlphaBeta.indexOf(empty);
        if (pos % 3 == 0) {
            return [AlphaBeta[pos + 1],AlphaBeta[pos + 3],undefined,AlphaBeta[pos - 3]];
        } else if (pos % 3 == 1) {
            return [AlphaBeta[pos + 1],AlphaBeta[pos + 3],  AlphaBeta[pos - 1], AlphaBeta[pos - 3]];
        } else {
            return [undefined, AlphaBeta[pos + 3], AlphaBeta[pos - 1], AlphaBeta[pos - 3]];
        }
    }
``` 
<p>以及使用键盘移动的监听方法：</p> 

```javascript
document.onkeydown = function(e){
        if(IsGameOver)return;
        var code = e.keyCode || e.which, 
            pos = getMovePos(emptyFlag),
            node;
        if (pos[code-37] != undefined) {
                node = [...divs].filter(function(item) {
                        return item.style.gridRowStart == pos[code-37];
                    })
                emptyNode.style["grid-area"] = node[0].style["grid-area"];
                node[0].style["grid-area"] = emptyFlag;
                emptyFlag = emptyNode.style.gridRowStart;
                if (checkFinished()) {
                    IsGameOver = true;
                    successAnimation();
                }
            }
    }
``` 
<p>完整代码持续更新地址：<a href="https://github.com/woaidouya123/cssLib/blob/master/src/layout/gridTest.html">github地址</a></p>
