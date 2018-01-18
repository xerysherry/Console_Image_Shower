"use strict";
exports.__esModule = true;
var cishower_1 = require("./cishower");
var colors = require("colors.ts");
var args = process.argv.splice(2);
var w = 80;
var h = 0;
var verbose = false;
var gray = false;
var background_p = null;
var adjust = false;
var mode = false;
var md = false;
var file = "";
for (var i = 0; i < args.length; ++i) {
    var a = args[i];
    if (a == "-w" || a == "--w")
        w = parseInt(args[++i]);
    else if (a == "-a" || a == "--a" || a == "--adjust" || a == "-adjust")
        adjust = true;
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
    else if (a == "-md" || a == "--md" || a == "-more_detail" || a == "--more_detail")
        md = true;
    else
        file = args[i];
}
if (adjust) {
    w = process.stdout.columns - 1;
    if (mode)
        w = Math.floor(w / 2);
}
if (md)
    colors.more_detail_on_color256();
function Description() {
    console.log("Console Image Shower");
    console.log("    file/url: input image localpath or address");
    console.log("    -a: adjust console width");
    console.log("    -w: image show width. default = 80");
    console.log("    -h: image show height. if h=0, auto adjust");
    console.log("    -g: gray mode");
    console.log("    -bg: set background color if image transparent. [whilte|black|000000~ffffff]");
    console.log("    -m: set w/h = 1:1, default: w/h = 2:1");
    console.log("    -md: more detail in color256, but will be grayful");
    console.log("    -v: image info show");
    console.log("   ex. cishower filepath -w 80 -g -v".green);
    console.log("   ex. cishower url -m -bg 0000ff".green);
}
if (file == null || file.length == 0) {
    Description();
}
else {
    if (colors.support() < colors.Support.ANSI256) {
        var gray_charlist = [' ', '.', ',', '-', '~', '=', 'c', 'o', 'n', 'm', 'O', 'A', 'M'];
        cishower_1.shower(file, w, h, verbose, gray, background_p, mode, gray_charlist);
    }
    else
        cishower_1.shower(file, w, h, verbose, gray, background_p, mode);
}
//# sourceMappingURL=cishower_shell.js.map