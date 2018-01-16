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
function shower(file, w, h, verbose, gray, background, mode, pos) {
    if (h === void 0) { h = 0; }
    if (verbose === void 0) { verbose = false; }
    if (gray === void 0) { gray = false; }
    if (background === void 0) { background = null; }
    if (mode === void 0) { mode = false; }
    var background_rgb = null;
    if (background == null || background == "black")
        background_rgb = [0, 0, 0];
    else if (background == "white")
        background_rgb = [255, 255, 255];
    else {
        while (background.length < 6)
            background = "0" + background;
        background_rgb = [0, 0, 0];
        background_rgb[0] = parseInt(background[0] + background[1], 16);
        background_rgb[1] = parseInt(background[2] + background[3], 16);
        background_rgb[2] = parseInt(background[4] + background[5], 16);
    }
    if (w == 0 || w == undefined)
        w = 80;
    getPixels(file, function (err, pixels) {
        if (err) {
            console.log(file.red.underline + " is not Exist!");
            return;
        }
        var ww = pixels.shape[0];
        var hh = pixels.shape[1];
        if (verbose) {
            if (pos != null) {
                console.log("Image: ".position(pos[0], pos[1]) + file.green);
                ++pos[1];
            }
            else
                console.log("Image: " + file.green);
            console.log("Size: " + ww.toString().green + "*" + hh.toString().green);
        }
        if (w > ww)
            w = ww;
        if (h == 0 || h == undefined) {
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
            if (pos != null) {
                line = line.position(pos[0], pos[1]);
                ++pos[1];
            }
            console.log(line);
        }
    });
}
exports.shower = shower;
//# sourceMappingURL=cis.js.map