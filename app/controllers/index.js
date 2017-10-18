// @author        Simon Buckingham
// @date          18 October 2017
// @description   Example Titanium project to show how to animate colour using the Chroma library from Gregor Aisch https://github.com/gka/chroma.js/
//                We animate a box view in a repeated bounce cycle from red to blue and also show sliders altering the colour, brightness and saturation
//                of a box view.
// @reference     You can read an article on this example on Medium.
//                https://medium.com/@simonbuckingham/colour-animation-in-titanium-9ad40bad8176

//REQUIRES
var Chroma = require('Chroma');

//CONSTANTS
var COLOUR1 = '#FF0000', //red
    COLOUR2 = '#0000FF', //blue
    FRAME_RATE = 20, //frames per second
    ANIMATION_PERIOD = 2000; //time in milliseconds for one cycle of animation

//VARS
var frameCount = 0,
    chromaScale,
    intervalID;

//init box colours
$.animatedBox.backgroundColor = COLOUR1;
$.box1.backgroundColor = COLOUR1;
$.box2.backgroundColor = Chroma(360, 1, 1, 'hsv').hex();
$.box3.backgroundColor = Chroma(360, 1, 1, 'hsv').hex();

//set a chroma scale - an even colour gradient between colours 1 and 2
//Note the interpolation is smoothest in the Lab colour space so we set the mode to 'lab'
chromaScale = Chroma.scale([COLOUR1, COLOUR2]).mode('lab');

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
    var time = frameCount * 1000 / FRAME_RATE;
    //phase
    var phase = Math.floor(time / ANIMATION_PERIOD) % 2;
    //cycle the animation
    time = time % ANIMATION_PERIOD;
    var scaleFactor = time / ANIMATION_PERIOD;
    //if we are in an odd phase then reverse the animation
    if (phase === 1)
        scaleFactor = 1 - scaleFactor;
    $.animatedBox.backgroundColor = chromaScale(scaleFactor).hex();
}

//update animation on every frame
intervalID = setInterval(function() {
    updateAnimation();
}, 1000 / FRAME_RATE);

//make sure and stop the interval timer on window close!
$.win.addEventListener('close', function(_evt) {
    if (intervalID)
        clearInterval(intervalID);
});

$.win.open();
