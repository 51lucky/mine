function Mine(tr, td, mineNum) {
    this.tr = tr;
    this.td = td;
    this.mineNum = mineNum;
    this.allMineSquareArray = [];
    this.allSquareArray = [];
}

Mine.prototype.createDom = function () {
    var gameBox = document.getElementsByClassName("gameBox")[0];
    var table = document.createElement("table");

    for (let i = 0; i < this.tr; i++) {
        var tr = document.createElement("tr");
        for (let j = 0; j < this.td; j++) {
            var td = document.createElement("td")
            var currentSquare = this.allSquareArray[i][j];
            if (currentSquare.type === "mine") {
                td.className = 'mineTd';
            } else {
                td.innerText = currentSquare.value;
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    gameBox.appendChild(table);
}

Mine.prototype.randomMine = function () {
    var allSquare = new Array(this.tr * this.td);
    for (let i = 0; i < allSquare.length; i++) {
        allSquare[i] = i;
    }
    allSquare.sort(function () {
        return 0.5 - Math.random();
    })
    return allSquare.slice(0, this.mineNum);
}

Mine.prototype.initMine = function (allMineSquare) {
    for (let i = 0; i < this.tr; i++) {
        var squareArray = new Array();
        for (let j = 0; j < this.td; j++) {
            var value = i * this.td + j;
            if (allMineSquare.indexOf(value) !== -1) {
                squareArray.push({ type: "mine", x: i, y: j });
                this.allMineSquareArray.push({ type: "mine", x: i, y: j });
            } else {
                squareArray.push({ type: "number", x: i, y: j, value: 0 });
            }
        }
        this.allSquareArray[i] = squareArray;
    }

    for(let i = 0; i < this.allMineSquareArray.length; i++) {
        var numSquare = this.getAround(this.allMineSquareArray[i]);
        for(let j = 0; j < numSquare.length; j++) {
            numSquare[j].value++;
        }
    }
}

Mine.prototype.getAround = function(square) {
    var x = square.x;
    var y = square.y;
    var aroundArray = [];

    for (var i = x - 1; i <= x + 1; i ++) {
        if (i < 0 || i >= this.tr) {
            continue;
        }
       
        for(var j = y -1; j <= y + 1; j++) {
            if (j < 0 || j >= this.td) {
                continue;
            }

            if (i === x && j === y) {
                continue;
            }

            var aroundSquare = this.allSquareArray[i][j]
            if (aroundSquare.type === "mine") {
                continue;
            }
            aroundArray.push(aroundSquare);
        }
    }
    return aroundArray;
}


Mine.prototype.init = function () {
    this.initMine(this.randomMine());
    this.createDom();
}

var mine = new Mine(28, 28, 90);
mine.init();