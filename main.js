var c = document.getElementById("playground");
var ctx = c.getContext("2d");

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.tail = [];
    this.tail.push([this.x, this.y]);
    this.status = 3;
    let foodX;
    let foodY;
    this.show = function() {
        this.tail.push([this.x, this.y]);
        ctx.fillRect(this.x, this.y, 10, 10);
    }
    this.update = function() {
        if (this.x % 10 == 0 && this.y % 10 == 0) {
            switch (this.status) {
            case 1: //left
                this.xspeed = -1;
                this.yspeed = 0;
                break;
            case 2:  //up
                this.xspeed = 0;
                this.yspeed = -1;
                break;
            case 3: //right
                this.xspeed = 1;
                this.yspeed = 0;
                break; 
            case 4: //down
                this.xspeed = 0;
                this.yspeed = 1;
                break;
            }
        }
        let tail1 = this.tail.shift();
        ctx.clearRect(tail1[0] , tail1[1], 10, 10);
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
    this.dir = function(code) {
        switch (code) { 
            case 100:
            case 37: //left
                if (this.status == 3) break;
                this.status = 1;
                break;
            case 104:
            case 38:  //up
                if (this.status == 4) break;
                this.status = 2;
                break;
            case 102:
            case 39: //right
                if (this.status == 1) break;
                this.status = 3;
                break; 
            case 101:
            case 40: //down
                if (this.status == 2) break;
                this.status = 4;
                break;
        }
    }
    this.makeFood = function() {  // 0 -> 490
        foodX = Math.floor(Math.random() * 49) * 10;
        foodY = Math.floor(Math.random() * 49) * 10;
        ctx.fillRect(foodX, foodY, 10, 10);
        console.log(foodX + ' ' + foodY);
    }
    this.isEat = function() {
        if ( this.x == foodX && this.y == foodY )
            {
                ctx.clearRect(foodX, foodY, 10, 10);
                return true;
            }
        return false;
    }
    this.growUp = function () {
        let tail1 = this.tail.shift();
        for (let i = 0; i <= 1000; i++) {
            this.tail.unshift(tail1);
        }
    }
    this.isLose = function() {
        if (this.x < 0 || this.y < 0 || this.x > 500 || this.y > 500)
            return true;
        for (let i = 0; i < this.tail.length - 1; i++) {
            if (this.x == this.tail[i][0] && this.y == this.tail[i][1]) 
                return true;
        }
        return false;
    }
}

function game() {
    let mySnake = new Snake();
    document.onkeydown = function(e) {
        mySnake.dir(e.keyCode);
    }
    ctx.clearRect(0, 0, 500, 500);
    mySnake.makeFood();

    var run = setInterval(() => {
        mySnake.update();
        mySnake.show();
        if (mySnake.isEat()) {
            mySnake.makeFood();
            mySnake.growUp();
        } else if (mySnake.isLose()) {
                btn.style.display = 'block';
                clearInterval(run);
            }
     }, 0.2 );
     
 }

let btn = document.getElementById('button');
btn.onclick = function(e) {
    btn.style.display = 'none';
    game();
}

document.onkeydown = function (e) {
    console.log(e.keyCode);
}