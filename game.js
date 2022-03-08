const gamezone = document.querySelector(".gamezone");
const hangar = document.querySelector(".hangar");
let k = 0;
let fps = 1000 / 60;
let direction;

let ints = {
  run: false,
  bullet: false,
};

function init() {
  let div = document.createElement("div");
  div.className = "gamer";
  div.style.display = "block";
  div.style.left = `${player.x}px`;
  div.style.top = `${player.y}px`;
  div.style.backgroundImage = player.top;
  div.style.height = "77px";
  div.style.width = "77px";
  gamezone.append(div);
  player.el = document.querySelector(".gamer");
}
function controllers() {
  document.addEventListener("keydown", (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 87: //top
        player.run = true;
        player.el.style.backgroundImage = player.top;
        player.side = 1;
        direction = "top";
        break;
      case 68: //right
        player.run = true;
        player.el.style.backgroundImage = player.rigth;
        player.side = 2;
        direction = "right";
        break;
      case 83: //bottom
        player.run = true;
        player.el.style.backgroundImage = player.bottom;
        player.side = 3;
        direction = "bottom";
        break;
      case 65: //left
        player.run = true;
        player.el.style.backgroundImage = player.left;
        player.side = 4;
        direction = "left";
        break;
      case 16:
        if (player.side === 1) {
          addbullet(player.width / 2, 0);
        } else if (player.side === 2) {
          addbullet(player.width, player.height / 2);
        } else if (player.side === 3) {
          addbullet(player.width / 2, player.height);
        } else if (player.side === 4) {
          addbullet(0, player.height / 2);
        }
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 87: //top
        player.run = false;
        break;
      case 68: //right
        player.run = false;
        break;
      case 83: //bottom
        player.run = false;
        break;
      case 65: //left
        player.run = false;
        break;
    }
  });
}

function intervalls() {
  ints.run = setInterval(() => {
    if (player.run) {
      switch (player.side) {
        case 1: //top
          if (player.y > 0) {
            player.y -= player.speed;
            player.el.style.top = `${player.y}px`;
          }

          break;
        case 2: //right
          if (
            player.x <
            gamezone.getBoundingClientRect().right - player.width * 3
          ) {
            player.x += player.speed;
            player.el.style.left = `${player.x}px`;
          }

          break;
        case 3: //bottom
          if (
            player.y <
            gamezone.getBoundingClientRect().bottom - player.height * 2
          ) {
            player.y += player.speed;
            player.el.style.top = `${player.y}px`;
          }

          break;
        case 4: //left
          if (player.x > 0) {
            player.x -= player.speed;
            player.el.style.left = `${player.x}px`;
          }
          break;
      }
    }
  }, fps);
  ints.bullet = setInterval(() => {
    let bullets = document.querySelectorAll(".bullet");
    bullets.forEach((bullet) => {
      let direction = bullet.getAttribute("direction");
      if (direction === "top") {
        if (
          bullet.getBoundingClientRect().top >
          gamezone.getBoundingClientRect().top
        ) {
          bullet.style.top = `${
            parseInt(bullet.style.top.replace("px", ""), 10) -
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      } else if (direction === "bottom") {
        if (
          bullet.getBoundingClientRect().bottom <=
          gamezone.getBoundingClientRect().height + player.height
        ) {
          bullet.style.top = `${
            parseInt(bullet.style.top.replace("px", ""), 10) +
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      } else if (direction === "left") {
        if (
          bullet.getBoundingClientRect().left >
          gamezone.getBoundingClientRect().left
        ) {
          bullet.style.left = `${
            parseInt(bullet.style.left.replace("px", ""), 10) -
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      } else if (direction === "right") {
        if (
          bullet.getBoundingClientRect().left <=
          gamezone.getBoundingClientRect().right
        ) {
          bullet.style.left = `${
            parseInt(bullet.style.left.replace("px", ""), 10) +
            player.bulletspeed
          }px`;
        } else {
          bullet.parentNode.removeChild(bullet);
        }
      }
    });
  }, fps);
}

function addbullet(x, y) {
  if (player.fire === true) {
    gamezone.innerHTML += `<div class="bullet" direction = ${direction} style = "left: ${
      player.x + x
    }px; top: ${player.y + y}px; width:${player.bulletwidth}px; height:${
      player.bulletheight
    }px"></div>`;
    player.el = document.querySelector(".gamer");
    player.fire = false;
    setTimeout(() => (player.fire = true), player.bullettime);
  }
}

function game() {
  init();
  controllers();
  intervalls();
  k++;
}

let player = {
  el: false,
  x: 320,
  y: 300,
  hp: 1000,
  damage: 400,
  bulletspeed: 5,
  bullettime: 2000,
  bulletwidth: 16,
  bulletheight: 16,
  speed: 10,
  top: "url(player-top.png)",
  left: "url(player-left.png)",
  rigth: "url(player-right.png)",
  bottom: "url(player-bottom.png)",
  width: 77,
  height: 77,
  run: false,
  side: 0, //1-top, 2-right, 3- bottom, 4-left  0 это положение в котором игра стоит
  fire: true,
};

const btr = {
  speed: 20,
  hp: 500,
  damage: 100,
  top: "url(btr-top.png)",
  left: "url(btr-left.png)",
  rigth: "url(btr-right.png)",
  bottom: "url(btr-bottom.png)",
  width: 77,
  height: 77,
  bulletspeed: 20,
  bullettime: 100,
  bulletwidth: 8,
  bulletheight: 8,
};

const choose = (obj) => {
  if (k === 0) {
    player.speed = obj.speed;
    player.top = obj.top;
    player.bottom = obj.bottom;
    player.left = obj.left;
    player.rigth = obj.rigth;
    player.damage = obj.damage;
    player.hp = obj.hp;
    player.time = obj.time;
    player.width = obj.width;
    player.height = obj.height;
    player.bulletspeed = obj.bulletspeed;
    player.bullettime = obj.bullettime;
    player.bulletwidth = obj.bulletwidth;
    player.bulletheight = obj.bulletheight;
    game();
  }
};
