/*Author: Sergey N.*/


//основной цикл
window.onload = function(){
    game_cycle();//отрисовка графики
    setInterval(world_time_step, 60000); //скорость течения времени
    setInterval(player_hudsay, 100);//определение потребностей
    //draw_map();
}   

//Параметры экрана
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;

//задаем настройки canvas

let canvas_config = {
    canvas_height: screen_height,
    canvas_width: screen_width,
    canvas_background: 'background.jpg'
}
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let viewer = document.getElementById('viewer');

//Настройки меню


let game_menu = document.getElementById('game_menu');
let game_menu_1 = document.getElementById('menu_pkt_1');
let game_menu_2 = document.getElementById('menu_pkt_2');
let game_settings = document.getElementById('game_settings');
let settings_width;
let settings_height;
let settings_ok = document.getElementById('set_ok');
let game_menu_3 = document.getElementById('menu_pkt_3');


game_menu_1.onclick = function() {
    game_menu.style.display = "none";
    game_menu_down = false;
};
game_menu_2.onclick = function(){
    game_menu.style.display = "none";
    game_menu_down = false;
    game_settings.style.display = "block";
};
settings_ok.onclick = function(){
    game_menu.style.display = "block";
    game_menu_down = false;
    game_settings.style.display = "none";
    maintheme.play();

};

let game_menu_width = 230;
let game_menu_height = 250;
geme_menu_centr(screen_width, screen_height, game_menu_width, game_menu_height); //центровка меню
function find_settings_size(){
    game_settings.style.display = "block";
    settings_width = game_settings.clientWidth;
    settings_height = game_settings.clientHeight;
    game_settings.style.display = "none";
    return;
}
find_settings_size();
geme_setting_centr(screen_width, screen_height, settings_width, settings_height); //Центровка Окна настроек
function geme_menu_centr(sw,sh,mw,mh){
    game_menu.style.top = ~~sh/2-mh/2+'px';
    game_menu.style.left = ~~sw/2-mw/2+'px';

}
function geme_setting_centr(sw,sh,setw,seth){
    game_settings.style.top = ~~sh/2-seth/2+'px';
    game_settings.style.left = ~~sw/2-setw/2+'px';

}

game_menu.style.width = game_menu_width+'px';
game_menu.style.height = game_menu_height+'px';

//Звуки
let maintheme = new Audio('sound/maintheme.ogg');
maintheme.loop = true;
maintheme.volume = 0.02;

//global
canvas.width = canvas_config.canvas_width;
canvas.height = canvas_config.canvas_height;
viewer.style.width = canvas.width+'px';
viewer.style.height = canvas.height+'px';
function getRandomInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

//параметры мира
let world_time = 1;
let world_day = 1;
let world_year = 0;
let world_season;
let food_x;
let food_y;
let food_list = [157,1];
let eatsayid;
let drinksayid;
function world_time_step(){ //подсчет времени мира
    world_time +=  1;
    if(world_time == 25){
        world_time = 1;
        world_day += 1;
    }
    if(world_day == 365){
        world_day = 1;
        world_year += 1;
    }
    if(1 <= world_day && world_day <= 91){
        world_season = 'Весна';
    }
    if(world_season == 'Весна' && 92 <= world_day && world_day <= 184){
        world_season = 'Лето';
    }
    if(world_season == 'Лето' && 185 <= world_day && world_day <= 276){
        world_season = 'Осень';
    }
    if(world_season == 'Осень' && 277 <= world_day && world_day <= 365){
        world_season = 'Зима';
    }
    player.eatlevel -= 3;
}

//Тайловая карта
let tile_bank = new Image;
tile_bank.src = 'tile_bank.png';
const tile_size = 32;
let tiles = [
    [0*tile_size, 0*tile_size, tile_size, tile_size, true], //Трава
    [11*tile_size, 0*tile_size, tile_size, tile_size, true], //Островок земли
    [0, 0, tile_size, tile_size, true],
    [0, 0, tile_size, tile_size, true],
    [0, 0, tile_size, tile_size, true] 
];
let tile_map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];
let w=-32;
let h=-32;
function draw_map(){
    
    for(tmh=0;tmh<=tile_map.length-1;tmh++){//
        w=-32;
        h+=tile_size;
        for(tmw=0;tmw<=tile_map[tmh].length-1;tmw++){//
            w+=tile_size;
            ;
        }
        if(h==tile_size*(tile_map.length-1)){
            h=-32;
        }
    }
}
//Ирви
function player_hudsay(){ //определение потребностей
    if (player.eatlevel >= 1 && player.eatlevel <= 30){
        eatsayid = 5;}
    if (player.eatlevel >= 31 && player.eatlevel <= 40){
         eatsayid = 4;}
    if (player.eatlevel >= 41 && player.eatlevel <= 50){
         eatsayid = 3;}
    if (player.eatlevel >= 51 && player.eatlevel <= 70){
         eatsayid = 2;}
    if (player.eatlevel >= 71 && player.eatlevel <= 90){
         eatsayid = 1;}
    if (player.eatlevel >= 91 && player.eatlevel <= 100){
         eatsayid = 0;}
    if (player.drinklevel >= 1 && player.drinklevel <= 30){
        drinksayid = 5;}
    if (player.eatlevel >= 31 && player.drinklevel <= 40){
         drinksayid = 4;}
    if (player.drinklevel >= 41 && player.drinklevel <= 50){
         drinksayid = 3;}
    if (player.drinklevel >= 51 && player.drinklevel <= 70){
         drinksayid = 2;}
    if (player.drinklevel >= 71 && player.drinklevel <= 90){
         drinksayid = 1;}
    if (player.drinklevel >= 91 && player.drinklevel <= 100){
        drinksayid = 0;}
    //if (food_list.length >= 11){
    //    food_list.pop();}
}
//объекты
let background = new Image();
background.src = canvas_config.canvas_background;
background.x = 0;
background.y = 0;
background.heignt = 500;
background.width = 500;

let bg = new Image();
bg.src = 'bg2.png';
//+++ИГРОК
let player = new Image();
player.src = 'human.png';
player.pos_x = 247;
player.pos_y = 247;
player.dx = 0;
player.dy = 0;
player.eatlevel_max = 100;
player.eatlevel = 60;
player.eatsay = [
    "Переедание",
    "Сыт",
    "Легкий голод",
    "Проголодался",
    "Голоден",
    "Недомогание"
];
player.drinklevel_max = 100;
player.drinklevel = 90;
player.drinksay = [
    "Зря столько выпил",
    "Не хочу пить",
    "Сухость во рту",
    "Хочу пить",
    "Безумно хочется пить",
    "Обезвоживание"
];
let npc_name='';
let npc_name_x = 0;
let npc_name_y = 0;

//+++КИРА
let npc_kira = new Image();
npc_kira.src = 'npc_kira.png';
npc_kira.pos_x = 143;
npc_kira.pos_y = 436;

//+++МАРКУС
let npc_marcus = new Image();
npc_marcus.src = 'npc_marcus.png';
npc_marcus.pos_x = 303;
npc_marcus.pos_y = 36;

//Еда
let pewpewmtrfcr = 0; //начальное кол-во съеденной еды
let food = new Image(); 
food1 = 'food2.png';//мясо
food2 = 'food3.png';//Яблоко
food3 = 'food4.png'; //Рыба
let food_pos_x = 0;
let food_pos_y = 0;
function newFood() { 
    setTimeout(spawn,1000)
    function spawn(){
    food_rnd_ind = getRandomInt(1, 3);
    food.src = 'food'+food_rnd_ind+'.png';
    food_pos_x = getRandomInt(0, 220);
    food_pos_y = getRandomInt(0, 220);
    }
}
newFood();
function eatFood(){
    food_pos_x = -100;
    food_pos_y = -100;
    player.eatlevel += 10;
    newFood();
}
let dialog_window = document.getElementById('dialog_window');

 //Считываем клавиши
let moveRight = false;
let moveLeft = false;
let moveDown = false;
let moveUp = false;
let use;
let game_menu_down = false;

function controle(e){
    if(e.keyCode == 69){
        use = true;
    }
    if(e.keyCode == 27){
        if(game_menu_down == false){
            game_menu_down = true;
        }
        else{
            game_menu_down = false;
        }
    }
}
function moveplayer(e){ // 87-вверх, 68-право, 83-вниз, 65-влево
    if(e.keyCode == 68){
        moveRight = true;
    }
    
    if(e.keyCode == 65){
        moveLeft = true;
    }
    if(e.keyCode == 83){
        moveDown = true;
    }
    if(e.keyCode == 87){
        moveUp = true;
    }
    
}

function stopplayer(e){ 
    if(e.keyCode == 68){
        moveRight = false;
    }
    else if(e.keyCode == 65){
        moveLeft = false;
    }
    else if(e.keyCode == 83){
        moveDown = false;
    }
    else if(e.keyCode == 87){
        moveUp = false;
    }
}

    

    function game(){
        update();
        render();
    }
    function update(){
//Меню
if(game_menu_down == true){
    game_menu.style.display = "block";
}
else{
    game_menu.style.display = "none";
}

//*********** Управление
player.pos_x=player.pos_x+player.dx;
player.pos_y=player.pos_y+player.dy;

if(player.pos_x>=canvas_config.canvas_width-20){
  player.pos_x=canvas_config.canvas_width-20;
}
if(player.pos_x<=0){
  player.pos_x=0;
}
if(player.pos_y>=canvas_config.canvas_height-20){
  player.pos_y=canvas_config.canvas_height-20;
}
if(player.pos_y<=0){
  player.pos_y=0;
}

document.addEventListener("keydown", controle, false);
document.addEventListener("keydown", moveplayer, false);
document.addEventListener("keyup", stopplayer, false);

if(moveRight == true){
   player.dx += 1;//Вправо
}
if(moveLeft == true){
    player.dx -= 1;//Влево
}
if(moveUp == true){
    player.dy -= 1; //Вверх
}
if(moveDown == true){ 
    player.dy += 1;//Вниз
}
if(moveRight == false && moveLeft == false){
    player.dx=0;
}
if(moveUp == false && moveDown == false){
    player.dy=0;
}


//else {
//    player.dx=0;
//    player.dy=0;
//}
//Ограничение скорости движения
if(player.dx >= 2){
    player.dx = 2;
}
if(player.dx<=-2){
    player.dx=-2;
}
if(player.dy>=2){
    player.dy=2;
}
if(player.dy<=-2){
    player.dy=-2;
}
//*********Съедаем еду
if(player.pos_x+20 >= food_pos_x && player.pos_x <= food_pos_x+20 && player.pos_y+20 >= food_pos_y && player.pos_y <= food_pos_y+20){
    eatFood();
    pewpewmtrfcr += 1;
}
//Взаимодействие с Кирой
document.getElementById('dialog_window').innerHTML = '';
npc_name=''
if(player.pos_x+20+20 >= npc_kira.pos_x && player.pos_x-20 <= npc_kira.pos_x+20 && player.pos_y+20+20 >= npc_kira.pos_y && player.pos_y-20 <= npc_kira.pos_y+20){
    
    npc_name = 'Кира';
    npc_name_x = 137;
    npc_name_y = 426;
    
    dialog_window.innerHTML = 'Нажмите E для взаимодествия.';
    if(use==true){
        dialog_window.innerHTML = 'Значит так, говорю в первый и последний раз, ни о каких артефактах мне ничего не известно. Старый дурак Маркус считает меня какой то богиней воительницей, котора должна отправлять героев на подвиг, что бы в итоге получить какой то вымышленный артефакт. Не ты первй, не ты последний. Я живу в реальности.';
    }
}
//Взаимодействие с Маркусом
//document.getElementById('dialog_window').innerHTML = '';
//npc_name=''
else if(player.pos_x+20+20 >= npc_marcus.pos_x && player.pos_x-20 <= npc_marcus.pos_x+20 && player.pos_y+20+20 >= npc_marcus.pos_y && player.pos_y-20 <= npc_marcus.pos_y+20){
    
    npc_name = 'Маркус';
    npc_name_x = npc_marcus.pos_x-10;
    npc_name_y = npc_marcus.pos_y-10;
    
    dialog_window.innerHTML = 'Нажмите E для взаимодествия.';
    if(use==true){
        dialog_window.innerHTML = 'Слушай, отстань от меня, сходи к Кире, ей больше известно об этом артефакте!';
    }


}
else {
    use = false;
    dialog_window.innerHTML = '';
}

}

function render(){
    ctx.font = "15px Arial";
    //ctx.drawImage(background, background.x, background.y, background.height, background.width);
    //ctx.drawImage(bg_map, 0, 0);
    //draw_map();
    ctx.drawImage(bg, 0, 0);
    document.getElementById('world_time').innerHTML = world_time;
    document.getElementById('world_day').innerHTML = world_day;
    document.getElementById('world_year').innerHTML = world_year;
    document.getElementById('world_season').innerHTML = world_season;
    document.getElementById('player_eat').innerHTML = player.eatsay[eatsayid]+'|'+player.eatlevel ;
    document.getElementById('player_drink').innerHTML = player.drinksay[drinksayid]+'|'+player.drinklevel ;
    document.getElementById('player_temp').innerHTML = pewpewmtrfcr;

    document.getElementById('player_pos').innerHTML = 'X='+player.pos_x+' Y='+player.pos_y;

    ctx.drawImage(food, food_pos_x, food_pos_y);

    ctx.drawImage(npc_kira, npc_kira.pos_x, npc_kira.pos_y);
    ctx.drawImage(npc_marcus, npc_marcus.pos_x, npc_marcus.pos_y);
    

    ctx.drawImage(player, player.pos_x, player.pos_y, player.height, player.width);
    
    ctx.fillText(npc_name, npc_name_x, npc_name_y);

    //******************Спавним массив с едой
    //
    //for (let food_list_index = 0; food_list_index <= food_list.length; food_list_index++) {
    //    ctx.drawImage(food, food_list[food_list_index][0], food_list[food_list_index][1]);
    //}
}


function game_cycle(){
    setInterval(game, 1000/30);
}