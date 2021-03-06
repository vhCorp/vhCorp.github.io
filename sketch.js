var tick = 0;
var cCount;
var eggCount;
var tickspeed = 100;
var running = false;
var p;
var chickens;
var fChickens;
var lastMS = 0;
var avg = 0;
var c = 0;
var first;

function setup() {
    cSlide = createSlider(1, 500);
    b = createButton("Start");
    b.mousePressed(toggle);
    reset();
    createCanvas(800, 600);
}

function reset() {
    tick = 0;
    eggCount = 0;
    tFood = 0;
    chickens = [];
    fChickens = [];
    first = true;
    for (var i = 0; i < cCount; i++) {
        chickens.push(floor(random(0, 6000)))
    }
}

function toggle() {
    if (running) {
        running = false;

        b.elt.innerHTML = "Start";

    } else {
        running = true;
        reset();
        b.elt.innerHTML = "Stop";

    }
}

function stop() {
    running = false;
    b.elt.innerHTML = "Start";
}

function draw() {
    c++;
    var deltaTime = millis() - lastMS;
    lastMS = millis()
    var deltaTicks = 50 / deltaTime * tickspeed;
    avg += round(deltaTicks)
    cCount = cSlide.value();
    background(255);
    if (running) {
        fill(0, 255, 0);
    } else {
        fill(255, 0, 0);
    }
    ellipse(10, 10, 20, 20);
    textSize(20);
    fill(0);
    hud = "Seeding Chickens: " + cSlide.value();
    hud += "\nEggs per second: " + (cCount / 400);
    hud += "\nTicks until next egg: " + min(chickens);
    hud += "\nTotal eggs: " + eggCount;
    hud += "\nFood Chickens: " + fChickens.length;
    hud += "\nCooked food produced: " + tFood;
    hud += "\nFood per second: " + tFood / (tick / 20);
    hud += "\nRunning " + round(avg / c) + " times faster than Minecraft.";
    text(hud, 30, 50);
    if (p != cSlide.value()) stop();
    p = cSlide.value();
    if (running) {
        tick += tickspeed;
        for (var i = 0; i < cCount; i++) {
            chickens[i] -= tickspeed;
            if (chickens[i] <= 0) {
                eggCount++;
                a = floor(random(1, 256))
                if (a == 256) {
                    fChickens.push(0);
                    fChickens.push(0);
                    fChickens.push(0);
                    fChickens.push(0);
                } else if (a > 224) {
                    fChickens.push(0);
                }
                chickens[i] = floor(random(6000, 12000))
            }
        }
        var toSplice = []
        for (i = 0; i < fChickens.length; i++) {
            fChickens[i] += tickspeed;
            if (fChickens[i] >= 24000) {
                if (first) {
                    first = false
                    tick = 0
                }
                fChickens.splice(i, 1);
                tFood++;
            }
        }
    }
}
