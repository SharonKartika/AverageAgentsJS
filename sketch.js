// @ts-nocheck

let PI = 3.14159265358979323846;
let M = [];
let N = 200;
let W, H, w2, h2;
let r = 10.;
let r2;
let eta;
let vabs = 1.;

class MOVER {
    constructor() {
        this.pos = createVector(random(-width / 2, width / 2),
            random(-height / 2, height / 2));
        this.vel = createVector();
        this.theta = random(-PI, PI);
    }
    update() {
        this.vel.x = vabs * cos(this.theta);
        this.vel.y = vabs * sin(this.theta);

        this.pos.add(this.vel);
    }
    display() {
        let x, y;
        x = this.pos.x - W * round(this.pos.x / W);
        y = this.pos.y - H * round(this.pos.y / H);
        ellipse(cartx(x), carty(y), 5);
    }
}

function calcthetas() {
    let ninr = 0;
    let avtheta, ssin, scos, dx, dy, d2;
    for (let i = 0; i < N; i++) {
        ninr = 0;
        avtheta = 0.;
        ssin = 0.;
        scos = 0.;
        for (let j = 0; j < N; j++) {
            dx = M[j].pos.x - M[i].pos.x;
            dy = M[j].pos.y - M[i].pos.y;

            dx = dx - W * round(dx / W);
            dy = dy - H * round(dy / H);
            d2 = dx ** 2 + dy ** 2;
            if (d2 < r2) {
                ninr++;
                ssin += sin(M[j].theta);
                scos += cos(M[j].theta);
            }
        }
        ssin /= ninr;
        scos /= ninr;
        avtheta = atan2(ssin, scos);
        M[i].theta = avtheta + random(-eta, eta);
    }
}

function makeSliders() {
    etaslider = createSlider(0, 2 * 3.14, eta, 0.1);
    rslider = createSlider(0.001, 100, r, 3);
    vabsslider = createSlider(0.01, 10, vabs, 0.05);
    Nslider = createSlider(10, 500, N, 5);

    etaslider.position(0, 0);
    rslider.position(0, etaslider.position().y + 40);
    vabsslider.position(0, rslider.position().y + 40);
    Nslider.position(0, vabsslider.position().y + 40);

    etaslider.input(() => {
        eta = etaslider.value();
        print("eta=" + eta);
        etaText.elt.innerText = "eta=" + eta;
    });
    rslider.input(() => {
        r = rslider.value();
        r2 = r ** 2;
        print("r=" + r);
        rText.elt.innerText = "r=" + r;
    });
    vabsslider.input(() => {
        vabs = vabsslider.value();
        print("vabs=" + vabs);
        vabsText.elt.innerText = "vabs=" + vabs;

    });
    Nslider.input(() => {
        N = Nslider.value();
        M = [];
        background(0);
        initializeM();
        // setup();
        print("N=" + N);
        NText.elt.innerText = "N=" + N;

    });

    etaslider.style('border-radius', '50%');

    let etaText = createP();
    etaText.style('font-size', '10px');
    etaText.elt.innerText = "eta=" + round(eta, 3);
    etaText.position(etaslider.position().x, etaslider.position().y + 10);

    let rText = createP();
    rText.style('font-size', '10px');
    rText.elt.innerText = "r=" + r;
    rText.position(rslider.position().x, rslider.position().y + 10);

    let vabsText = createP();
    vabsText.style('font-size', '10px');
    vabsText.elt.innerText = "vabs=" + vabs;
    vabsText.position(vabsslider.position().x, vabsslider.position().y + 10);

    let NText = createP();
    NText.style('font-size', '10px');
    NText.elt.innerText = "N=" + N;
    NText.position(Nslider.position().x, Nslider.position().y + 10);

}

function cartx(x) {
    return x + width / 2;
}

function carty(y) {
    return height / 2 - y;
}

function initializeM() {
    for (let i = 0; i < N; i++) {
        M[i] = new MOVER();
    }
}

function setup() {
    createCanvas(400, 400);
    background(0);
    noStroke();
    W = width;
    H = height;
    w2 = W / 2;
    h2 = H / 2;
    r2 = r ** 2;
    eta = PI / 8;

    makeSliders();
    initializeM();
}

function draw() {
    background(0, 20);
    calcthetas();
    for (let i = 0; i < N; i++) {
        M[i].update();
        M[i].display();
    }
}