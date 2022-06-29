const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

//console.log(gameArea);


startScreen.addEventListener("click", start);

let player = {
    speed: 10,
    score: 0
};

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", KeyUp);

//key press function
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    //console.log(e.key);
    //console.log(keys);

}
//key release function
function KeyUp(e) {
    e.preventDefault();
    keys[e.key] = false; //only one key is true at a time.
    //console.log(e.key);

}

//checking collision of cars
function collides(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}

function moveLines() {
    let lines = document.querySelectorAll(".lines");

    lines.forEach(function(item) {

        if (item.y >= 800) {
            //console.log(item.y);
            item.y -= 780;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endgame() {
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML = "Game Over <br> Your Score is : " + (player.score + 1) + "<br> Click Here to Restart..!!";

}

function moveEnemy(car) {
    let enemy = document.querySelectorAll(".enemy");

    enemy.forEach(function(item) {
        if (collides(car, item)) {
            console.log("Hit..!");
            endgame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    //console.log("hey u clicked");
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    //console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > road.top + 100) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < road.bottom - 110) { player.y += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < road.width - 65) { player.x += player.speed; }

        car.style.top = player.y + "px";
        car.style.bottom = player.y + "px";
        car.style.left = player.x + "px";
        car.style.right = player.y + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;

        score.innerText = "Score : " + player.score;

    }

}
//road size-->
// bottom: 711.2000122070312
// height: 711.2000122070312
// left: 141.60000610351562
// right: 541.6000061035156
// top: 0
// width: 400
// x: 141.60000610351562
// y: 0

function start() {
    //gameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    gameArea.innerText = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement("div");
        roadLine.setAttribute("class", "lines");
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);


    }

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    //car.innerText = "Hey Car";

    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    //console.log("from top: " + car.offsetTop);
    //console.log("from left: " + car.offsetLeft);

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute("class", "enemy");
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        // enemyCar.style.backgroundImage="";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    // function randomImages() {
    //     let randomImage = new Array();
    //     randomImage = ["car1.jpg", "car2.jpg", "car3.jpg"];
    //     let number = Math.floor(Math.random() * randomImage.length);

    //     return document.getElementsByClassName(".enemy").backgroundImage = '<img src="' + randomImage[number] + '" />';
    // }


}