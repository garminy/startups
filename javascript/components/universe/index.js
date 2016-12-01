//材质
function getMat(color) {
}

var Colors = {
    red: 0xf85051,
    orange: 0xea8962,
    yellow: 0xdacf75,
    beige: 0xccc58f,
    grey: 0xbab7a1,
    blue: 0x4379a8,
    ocean: 0x4993a8,
    green: 0x24a99b
};

var colorsLength = Object.keys(Colors).length;   //ES6 ["red", "orange", "yellow", "beige", "grey", "blue", "ocean", "green"]

//生成范围内随机整数
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//随机选取数值
function getRandomColor() {
    var colIndex = Math.floor(Math.random() * colorsLength);
    var colorStr = Object.keys(Colors)[colIndex];
    return Colors[colorStr];
}

//
function shiftPosition(pos, radius) {
    if (Math.abs(pos) >= radius) {
        return pos;
    }
    return (pos >= 0) ? (pos + radius) : (pos - radius);
}

/**
 * default params
 * @type {{minRadius: number, maxRadius: number, minSpeed: number, maxSpeed: number, particles: number, minSize: number, maxSize: number}}
 *
 * threejs need scene, renderer, camera, light, mesh
 */
var parameters = {
    minRadius: 30,
    maxRadius: 50,
    minSpeed: .015,
    maxSpeed: .025,
    particles: 500,
    minSize: .1,
    maxSize: 2
};
var scene, renderer, camera, light;
var stars = [];
var nbPlanetsMax = 4;
var planets = [];
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function initWorld() {
    scene = new THREE.Scene();
    camera = new THREE.Camera(75, WIDTH / HEIGHT, .1, 2000);
    camera.position.z = 100;

    //renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.getElementById('universe').appendChild(renderer.domElement);

    //Light
    ambientLight = new THREE.AmbientLight(0x663344, 2);
    scene.add(ambientLight);

    light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(200, 100, 200);
    light.castShadow = true;
    light.shadow.camera.left = -400;
    light.shadow.camera.right = 400;
    light.shadow.camera.top = 400;
    light.shadow.camera.bottom = -400;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    scene.add(light);

    window.addEventListener('resize', handleWindowResize, false);
    for (var i = 0; i < nbPlanetsMax; i++) {
        planets.push(new Planet(-2000 / nbPlanetsMax * i - 500));
    }
    addStarts();
    loop();
}

function animateStars(z) {
    for (var i = 0; i < stars.length; i++) {
        star = stars[i];
        if (star.position.z > z) {
            star.position.z -= 2000;
        }
    }
}

function addStarts() {

}

var Planet = function (z) {
    var s = 1;
    var geom;
    var random = Math.random();

    if (random < .25) {
        geom = new THREE.BoxGeometry(s, s, s);
    } else if (random < .5) {
        geom = new THREE.CylinderGeometry(0, s, s * 2, 4, 1);
    } else if (random < .75) {
        geom = new THREE.TetrahedronGeometry(s, 2);
    } else {
        geom = new THREE.BoxGeometry(s / 6, s, s);
    }

    var color = getRandomColor();
    var mat = getMat(color);

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.userData.po = this;
};

Planet.prototype.updateParticlesRotation = function () {
    for (var i = 0; i < this.nParticles; i++) {
        var m = this.ring.children[i];
        m.userData.angle += m.userData.angularSpeed;

        var posX = Math.cos(m.userData.angle) * m.userData.distance;
        var posZ = Math.sin(m.userData.angle) * m.userData.distance;
        m.position.x = posX;
        m.position.z = posZ;

        m.rotation.x += Math.random() * .05;
        m.rotation.y += Math.random() * .05;
    }
}

function handleWindowResize() {

}


initWorld();

