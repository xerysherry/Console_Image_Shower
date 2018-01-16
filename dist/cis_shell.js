"use strict";
exports.__esModule = true;
var cis_1 = require("./cis");
var args = process.argv.splice(2);
var w = 80;
var h = 0;
var verbose = false;
var gray = false;
var background_p = null;
var mode = false;
var file = "";
for (var i = 0; i < args.length; ++i) {
    var a = args[i];
    if (a == "-w" || a == "--w")
        w = parseInt(args[++i]);
    else if (a == "-h" || a == "--h")
        h = parseInt(args[++i]);
    else if (a == "-v" || a == "--v" || a == "-verbose" || a == "--verbose")
        verbose = true;
    else if (a == "-g" || a == "--g" || a == "-gray" || a == "--gray"
        || a == "-grey" || a == "--grey")
        gray = true;
    else if (a == "-bg" || a == "--bg" || a == "-background" || a == "--background")
        background_p = args[++i];
    else if (a == "-m" || a == "--m" || a == "-mode" || a == "--mode")
        mode = true;
    else
        file = args[i];
}
function Description() {
    console.log("Console Image Shower");
    console.log("    infile/url: input image path or address");
    console.log("    -w: image show width. default = 80");
    console.log("    -h: image show height. if h=0, auto adjust");
    console.log("    -g: gray mode");
    console.log("    -bg: set background color if image transparent. [whilte|black|000000~ffffff]");
    console.log("    -m: set w/h = 1:1, default: w/h = 2:1");
    console.log("    -v: image info show");
    console.log("   ex. cis filepath -w 80 -g -v".green);
    console.log("   ex. cis url -m -bg 0000ff".green);
}
if (file == null || file.length == 0) {
    Description();
}
else {
    cis_1.shower(file, w, h, verbose, gray, background_p, mode);
}
//# sourceMappingURL=cis_shell.js.map