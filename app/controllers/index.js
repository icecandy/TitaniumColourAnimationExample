// @author        Simon Buckingham
// @date          18 October 2017
// @description   Example Titanium project to show how to animate colour using the Chroma library from Gregor Aisch https://github.com/gka/chroma.js/
//                We animate a box view in a repeated bounce cycle from red to blue and also show sliders altering the colour, brightness and saturation
//                of a box view.
//@reference      You can read an articles on this example on Medium.
//                ?????????????????????????

//REQUIRES
var Chroma = require('Chroma');

//VARS
var colour1 = '#FF0000',
    colour2 = '#00FF00',
    colour3 = '#0000FF',
    frameRate = 20, //frames per second
    frameCount = 0,
    animationPeriod = 2000, //time in milliseconds for one cycle of animation
    chromaScale,
    intervalID;

//init box colours
$.animatedBox.backgroundColor = colour1;
$.box1.backgroundColor = colour1;
$.box2.backgroundColor = Chroma(360, 1, 1, 'hsv').hex(); //colour1;
$.box3.backgroundColor = Chroma(360, 1, 1, 'hsv').hex();

//set a chroma scale - an even colour gradient between colours 1, 2 or 3
chromaScale = Chroma.scale([colour1, colour3]);

//change the colour hue
function onSlider1Change(_evt) {
    var scaleFactor = _evt.value / 100;
    $.box1.backgroundColor = chromaScale(scaleFactor).hex();
}

//change the colour saturation
function onSlider2Change(_evt) {
    var scaleFactor = _evt.value / 100;
    $.box2.backgroundColor = Chroma(360, scaleFactor, 1, 'hsv').hex();
}

//change the colour brightness
function onSlider3Change(_evt) {
    var scaleFactor = _evt.value / 100;
    $.box3.backgroundColor = Chroma(360, 1, scaleFactor, 'hsv').hex();
}

function updateAnimation() {
    frameCount++;
    var time = frameCount * 1000 / frameRate;
    //phase
    var phase = Math.floor(time / animationPeriod) % 2;
    //cycle the animation
    time = time % animationPeriod;
    var scaleFactor = time / animationPeriod;
    //if we are in an odd phase then reverse the animation
    if (phase === 1)
        scaleFactor = 1 - scaleFactor;
    $.animatedBox.backgroundColor = chromaScale(scaleFactor).hex();
}

//update animation on every frame
intervalID = setInterval(function() {
    updateAnimation();
}, 1000 / frameRate);

//make sure and stop the interval timer on window close!
$.win.addEventListener('close', function(_evt) {
    if (intervalID)
        clearInterval(intervalID);
});

$.win.open();
