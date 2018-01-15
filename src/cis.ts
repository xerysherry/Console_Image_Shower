import Colors = require("colors.ts");
import getPixels = require("get-pixels");
import { colors } from "colors.ts";

function GetPixels(pixels, pw, ph, x, y, w, h) {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;

    let aw = pw / w;
    let ah = ph / h;
    let i = 0;

    for (let ay = 0; ay < ah; ++ay) {
        let yy = Math.floor(ay + ah * y)
        for (let ax = 0; ax < aw; ++ax, ++i) {
            let xx = Math.floor(ax + aw * x)
            r += <number>pixels.get(xx, yy, 0);
            g += <number>pixels.get(xx, yy, 1);
            b += <number>pixels.get(xx, yy, 2);
            a += <number>pixels.get(xx, yy, 3);
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
    console.log("    infile/url: input image path or address")
    console.log("    -w: image show width. default = 80");
    console.log("    -h: image show height. if h=0, auto adjust");

}

let args = process.argv.splice(2);
let w = 80;
let h = 0;
let verbose = false;
let gray = false;
let background_p:string = null;
let background_rgb = null;
let mode = false;
let file = "";

for (let i = 0; i < args.length; ++i) {
    let a = args[i];
    if (a == "-w" || a == "--w")
        w = parseInt(args[++i]);
    else if (a == "-h" || a == "--h")
        h = parseInt(args[++i]);
    else if(a == "-v" || a == "--v"|| a=="-verbose" ||a=="--verbose")
        verbose = true;
    else if(a == "-g" || a =="--g" || a=="-gray" ||a=="--gray"
        || a=="-grey" ||a=="--grey")
        gray = true;
    else if(a == "-bg" || a=="--bg" || a=="-background" || a == "--background")
        background_p = args[++i];
    else if(a == "-m" || a=="--m" || a=="-mode" || a == "--mode")
        mode = true;
    else
        file = args[i];
}

if(background_p == null || background_p == "black")
    background_rgb = [0,0,0];
else if(background_p == "white")
    background_rgb = [255,255,255];
else
{
    while(background_p.length < 6)
        background_p = "0" + background_p;
    background_rgb = [0,0,0];
    background_rgb[0] = parseInt(background_p[0]+background_p[1], 16);
    background_rgb[1] = parseInt(background_p[2]+background_p[3], 16);
    background_rgb[2] = parseInt(background_p[4]+background_p[5], 16);
}

if (file == null || file.length == 0) {
    Description();
}
else {
    getPixels(file, function (err, pixels) {
        if (err) {
            console.log(file.red.underline + " is not Exist!")
            return
        }

        let ww = pixels.shape[0];
        let hh = pixels.shape[1];
        //let dd = pixels.shape[2];
        if(verbose)
        {
            console.log("Image: "+ file.green);
            console.log("Size: " + ww.toString().green + "*" + hh.toString().green);
        }

        if (w > ww)
            w = ww;
        if (h == 0)
        {
            if(!mode)
                h = Math.floor(w * hh / ww / 2);
            else
                h = Math.floor(w * hh / ww);
        }
        if (h > hh)
            h = hh;

        let fillchar = " "
        if(mode)
            fillchar = "  ";

        let line: string = null;
        for (let y = 0; y < h; ++y) {
            line = "";
            for (let x = 0; x < w; ++x) 
            {
                let rgba = GetPixels(pixels, pixels.shape[0], pixels.shape[1], x, y, w, h)
                if(rgba[3]<255)
                {
                    let a = rgba[3] / 255.0;
                    rgba[0] = Math.floor(rgba[0]*a + background_rgb[0]*(1-a));
                    rgba[1] = Math.floor(rgba[1]*a + background_rgb[1]*(1-a));
                    rgba[2] = Math.floor(rgba[2]*a + background_rgb[2]*(1-a));
                }
                if(gray)
                {
                    let g = Math.floor((rgba[0] + rgba[1] + rgba[2])/3/255*26)
                    line += fillchar.gray_bg(g);
                }
                else
                {
                    let rs = rgba[0].toString(16);
                    if (rgba[0] < 0x10)
                        rs = '0' + rs;
                    let gs = rgba[1].toString(16);
                    if (rgba[1] < 0x10)
                        gs = '0' + gs;
                    let bs = rgba[2].toString(16);
                    if (rgba[2] < 0x10)
                        bs = '0' + bs;
                    line += Colors.colors("b#" + rs + gs + bs, fillchar);
                }
            }
            console.log(line);
        }
    })
}