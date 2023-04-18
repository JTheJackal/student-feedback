const SIZEREDUCTION         = 100;
const PERCENTAGE            = 100;
const GRAPHICS              = new PIXI.Graphics();
const LABELSOFFSET          = 10;
const PERIMETEROFFSET       = 40;
const LABELANGLEOFFSET      = 225 * (Math.PI/180);
const HEADINGANGLEOFFSET    = 90 * (Math.PI/180);
const CIRCANGLEOFFSET       = 265 * (Math.PI/180);

let app             = null;
let width           = null;
let height          = null;
let radius          = null;
let background      = null;

let labelsText      = [
    "Depth of idea/s",
    "Ambition",
    "Composition",
    "Drawing",
    "Media Control",
    "Realisation",
    "Colour",
    "Source work"];

let aptitudeText        = [
    "Limited",
    "Developing",
    "Confident",
    "Assured"
]

let headingsText      = [
    "Life Drawings",
    "Sketchbook"];

let labelsColliders     = [];
let headingsColliders   = [];
let markers             = [];

let badges              = [];