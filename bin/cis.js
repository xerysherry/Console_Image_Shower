"use strict";
exports.__esModule = true;
var Colors = require("colors.ts");
var getPixels = require("get-pixels");
function GetPixels(pixels, pw, ph, x, y, w, h) {
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 0;
    var aw = pw / w;
    var ah = ph / h;
    var i = 0;
    for (var ay = 0; ay < ah; ++ay) {
        var yy = Math.floor(ay + ah * y);
        for (var ax = 0; ax < aw; ++ax, ++i) {
            var xx = Math.floor(ax + aw * x);
            r += pixels.get(xx, yy, 0);
            g += pixels.get(xx, yy, 1);
            b += pixels.get(xx, yy, 2);
            a += pixels.get(xx, yy, 3);
        }
    }
    r = Math.floor(r / i);
    g = Math.floor(g / i);
    b = Math.floor(b / i);
    a = Math.floor(a / i);
    return [r, g, b, a];
}
function Description() {
    console.log("Console Image Shower");
    console.log("    infile/url: input image path or address");
    console.log("    -w: image show width. default = 80");
    console.log("    -h: image show height. if h=0, auto adjust");
}
var args = process.argv.splice(2);
var w = 80;
var h = 0;
var verbose = false;
var gray = false;
var background_p = null;
var background_rgb = null;
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
if (background_p == null || background_p == "black")
    background_rgb = [0, 0, 0];
else if (background_p == "white")
    background_rgb = [255, 255, 255];
else {
    while (background_p.length < 6)
        background_p = "0" + background_p;
    background_rgb = [0, 0, 0];
    background_rgb[0] = parseInt(background_p[0] + background_p[1], 16);
    background_rgb[1] = parseInt(background_p[2] + background_p[3], 16);
    background_rgb[2] = parseInt(background_p[4] + background_p[5], 16);
}
if (file == null || file.length == 0) {
    Description();
}
else {
    getPixels(file, function (err, pixels) {
        if (err) {
            console.log(file.red.underline + " is not Exist!");
            return;
        }
        var ww = pixels.shape[0];
        var hh = pixels.shape[1];
        if (verbose) {
            console.log("Image: " + file.green);
            console.log("Size: " + ww.toString().green + "*" + hh.toString().green);
        }
        if (w > ww)
            w = ww;
        if (h == 0) {
            if (!mode)
                h = Math.floor(w * hh / ww / 2);
            else
                h = Math.floor(w * hh / ww);
        }
        if (h > hh)
            h = hh;
        var fillchar = " ";
        if (mode)
            fillchar = "  ";
        var line = null;
        for (var y = 0; y < h; ++y) {
            line = "";
            for (var x = 0; x < w; ++x) {
                var rgba = GetPixels(pixels, pixels.shape[0], pixels.shape[1], x, y, w, h);
                if (rgba[3] < 255) {
                    var a = rgba[3] / 255.0;
                    rgba[0] = Math.floor(rgba[0] * a + background_rgb[0] * (1 - a));
                    rgba[1] = Math.floor(rgba[1] * a + background_rgb[1] * (1 - a));
                    rgba[2] = Math.floor(rgba[2] * a + background_rgb[2] * (1 - a));
                }
                if (gray) {
                    var g = Math.floor((rgba[0] + rgba[1] + rgba[2]) / 3 / 255 * 26);
                    line += fillchar.gray_bg(g);
                }
                else {
                    var rs = rgba[0].toString(16);
                    if (rgba[0] < 0x10)
                        rs = '0' + rs;
                    var gs = rgba[1].toString(16);
                    if (rgba[1] < 0x10)
                        gs = '0' + gs;
                    var bs = rgba[2].toString(16);
                    if (rgba[2] < 0x10)
                        bs = '0' + bs;
                    line += Colors.colors("b#" + rs + gs + bs, fillchar);
                }
            }
            console.log(line);
        }
    });
}
//# sourceMappingURL=cis.js.map