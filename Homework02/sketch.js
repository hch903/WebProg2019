// var cvs = document.getElementById("canvas");
// var ctx = cvs.getContext("2d");

let cvsWrapper = null;
let x, y;
let vy;
let rotate_ang;
let gravity;
let seed;

// image variable
let bg_day, bg_night;
let baseImg;
let start_text;
let asset;
let pipe;
let gameover;

let bg_img;
let bird_img;
let pipe_upper_img, pipe_lower_img;

// audio variable
let wing_aud;
let die_aud;
let hit_aud;
let point_aud;


let org_bg_x = 0;
let bgScale, baseScale;

// array for store bird, number and pipes
let bird = [];
let number = [];
let pipes = [];

let cnt = 0;

// for counting score
let index;

// some boolean variable
let game_start = false;
let reset = false;
let play = true;

// speed variable
let up_speed;
let background_speed;

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets

function preload() {
    bg_day = loadImage("assets/sprites/background-day.png");
    bg_night = loadImage("assets/sprites/background-night.png");
    baseImg = loadImage("assets/sprites/base.png");
    start_text = loadImage("assets/sprites/message.png");
    gameover = loadImage("assets/sprites/gameover.png");

    asset = ["blue", "red", "yellow"].map(
        color => ["upflap", "midflap", "downflap"].map(
            flap => loadImage(`assets/sprites/${color}bird-${flap}.png`)
        )
    );
    
    pipe = ["green", "red"].map(
        color => ["upper", "lower"].map(
            pos => loadImage(`assets/sprites/pipe-${color}-${pos}.png`)
        )
    );

    for(i = 0; i < 10; i++)
        number[i] = loadImage("assets/sprites/" + i + ".png");

    wing_aud = loadSound("assets/audio/wing.wav");
    die_aud = loadSound("assets/audio/die.wav");
    hit_aud = loadSound("assets/audio/hit.wav");
    point_aud = loadSound("assets/audio/point.wav");

}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");

    bird = [];
    // setup code below
    if(seed < 0.3){
        bird[0] = asset[0][0];
        bird[1] = asset[0][1];
        bird[2] = asset[0][2];
    }
    else if(seed >= 0.3 && seed < 0.7){
        bird[0] = asset[1][0];
        bird[1] = asset[1][1];
        bird[2] = asset[1][2];
    }
    else{
        bird[0] = asset[2][0];
        bird[1] = asset[2][1];
        bird[2] = asset[2][2];
    }
    if(Math.floor(seed*2) % 2 === 0){
        bg_img = bg_day;
        pipe_upper_img = pipe[0][0];
        pipe_lower_img = pipe[0][1];
    }
    else{
        bg_img = bg_night;
        pipe_upper_img = pipe[1][0];
        pipe_lower_img = pipe[1][1];
    }

    cnt = 0;
    bird_img = bird[cnt];
    cnt += 1;
    setInterval(function changeImage(){
        bird_img = bird[cnt];
        if(cnt === 2)
            cnt = 0;
        else
            cnt += 1;
    } , 150);

    pipes = [];

    x = width / 2 - bird_img.width * 3/4;
    y = height / 2 + 45;
    vy = 0;
    gravity = 10;
    rotate_ang = 0; 
    bgScale = width / bg_img.width;
    baseScale = width / baseImg.width;

    up_speed = -5;
    background_speed = -2;
    game_start = false;
    reset = false;
    play = true;

    seed = Math.random();
    index = 0;
    score = new Score();
};

function draw() {
    // Render function (called per frame.)
    background(0);
    // draw background
    if(org_bg_x < -bg_img.width * bgScale) 
        org_bg_x += width;
    image(bg_img, org_bg_x, 0, bg_img.width * bgScale, height);
    image(bg_img, org_bg_x + bg_img.width * bgScale, 0, bg_img.width * bgScale, height);
    image(baseImg, org_bg_x, height - baseImg.height, bg_img.width * bgScale, baseImg.height);
    image(baseImg, org_bg_x + bg_img.width * bgScale, height - baseImg.height, bg_img.width * bgScale, baseImg.height);

    org_bg_x += background_speed;
    
    // draw start message
    image(start_text, width / 2 - start_text.width * 3/4, height / 2 - start_text.height * 3/4, start_text.width * 3/2, start_text.height * 3/2);

    // draw flappy bird
    image(bird_img, width / 2 - bird_img.width * 3/4 , height / 2 + 45, bird_img.width * 3/2 , bird_img.height * 3/2);
    
    if(game_start === true){
        // redraw background
        if(org_bg_x < -bg_img.width * bgScale) 
            org_bg_x += width;
        image(bg_img, org_bg_x, 0, bg_img.width * bgScale, height);
        image(bg_img, org_bg_x + bg_img.width * bgScale, 0, bg_img.width * bgScale, height);
        image(baseImg, org_bg_x, height - baseImg.height, bg_img.width * bgScale, baseImg.height);
        image(baseImg, org_bg_x + bg_img.width * bgScale, height - baseImg.height, bg_img.width * bgScale, baseImg.height);

        // generate pipes
        if(frameCount % 75 == 0)
            pipes.push(new Pipe());
        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].display();
            pipes[i].update();
            if (pipes[i].collide(0)) {
                reset = true;
                background_speed = 0;
                if(play === true)
                {
                    hit_aud.play();
                    die_aud.play();
                    play = false;
                }
            }
            if (y >= height - baseImg.height - 25)
                pipes[i].collide(1);

            if (pipes[i].get_score())
                score.display(index);

            if (pipes[i].clear())
                pipes.splice(i, 1);
        }
        
        score.display(index);
        
        // bird touch the ground
        if(y >= height - baseImg.height - 25){
            vy = 0;
            gravity = 0;
            background_speed = 0;
            reset = true;
            image(gameover, width/2 - gameover.width * 3/4, height / 2 - gameover.height * 3/4, gameover.width * 3/2, gameover.height * 3/2);
        }
        else if(y <= bird_img.height + 5){
            vy = 0;
        }
        else
            org_bg_x += background_speed;
        
        // translate origin to x, y
        translate(x, y);
        rotate(rotate_ang);

        // draw flappy bird
        image(bird_img, 0, -30, bird_img.width * 3/2 , bird_img.height * 3/2);
	    vy += gravity * 0.02;
        y += vy;
        if(rotate_ang > PI / 2)
            rotate_ang = PI / 2;
        else
            rotate_ang += 0.04;
    }
};

function keyPressed() {
    if (keyCode === 32 && reset === false){
        game_start = true;
        wing_aud.play();
        vy = -5;
        rotate_ang = -PI / 4;
    }
    else if(keyCode === 32 && reset === true){
        setup();
    }
};


function Pipe() {
    this.x = width;
    this.speed = background_speed * 2;
    this.gap = 150;
    this.width = 60;
    this.upper_y = random(-pipe_upper_img.height + 50, 0);
    this.bottomY = this.upper_y + pipe_upper_img.height + this.gap;
    this.play = true;

    this.display = function () {
        image(pipe_upper_img, this.x, this.upper_y, pipe_upper_img.width, pipe_upper_img.height);
        image(pipe_lower_img, this.x, this.bottomY, pipe_lower_img.width, height - baseImg.height - this.bottomY);
    }

    
    this.update = function() {
        this.x += this.speed;
    }

    this.collide = function(flag) {
        if(flag === 1)
            this.speed = 0;
        else{
            if(y <= this.upper_y + pipe_upper_img.height + 25 || y >= this.bottomY){
                if (x >= this.x - 30 && x <= this.x + this.width) {
                    this.speed = 0;
                    return true;
                }
            }
            return false;
        }
    }
    
    this.get_score = function() {
        if(y >= this.upper_y + pipe_upper_img.height + 25 || y <= this.bottomY + 5){
            if (x >= this.x && x <= this.x + this.width) {
                if(this.play === true){
                    point_aud.play();
                    index += 1;
                    this.play = false;
                }
                return true;
            }
        }
        return false;
    }

    this.fall = function() {
        if(reset === true)
            this.speed = 0;
    }

    this.clear = function() {
        if (this.x < -this.width) 
            return true;
        return false;
    }
}

function Score() {
    this.x = width / 2 - number[0].width / 2;
    this.y = 100;
    this.ten_digit = 0;
    this.digit = 0;
    
    this.display = function(index) {
        if(index < 10)
            image(number[index], this.x, this.y, number[0].width, number[0].height);
        else{
            this.digit = index % 10;
            this.ten_digit = (index - this.digit) / 10;
            image(number[this.ten_digit], width/2 - number[0].width, this.y, number[0].width, number[0].height);
            image(number[this.digit], width/2, this.y, number[0].width, number[0].height);
        }
    }
}