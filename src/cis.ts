/* Copyright xerysherry 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Colors = require("colors.ts");
import getPixels = require("get-pixels");

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

export function shower(file: string, w: number, h: number = 0,
    verbose: boolean = false, gray: boolean = false,
    background: string = null, mode: boolean = false,
    pos?:[number, number]): void {
        
    let background_rgb = null;
    background = background.toLowerCase();
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
    if(w == 0 || w == undefined)
        w = 80;

    getPixels(file, function (err, pixels) {
        if (err) {
            console.log(file.red.underline + " is not Exist!")
            return
        }

        let ww = pixels.shape[0];
        let hh = pixels.shape[1];
        //let dd = pixels.shape[2];
        if (verbose) {
            if(pos != null)
            {
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

        let fillchar = " "
        if (mode)
            fillchar = "  ";

        let line: string = null;
        for (let y = 0; y < h; ++y) {
            line = "";
            for (let x = 0; x < w; ++x) {
                let rgba = GetPixels(pixels, pixels.shape[0], pixels.shape[1], x, y, w, h)
                if (rgba[3] < 255) {
                    let a = rgba[3] / 255.0;
                    rgba[0] = Math.floor(rgba[0] * a + background_rgb[0] * (1 - a));
                    rgba[1] = Math.floor(rgba[1] * a + background_rgb[1] * (1 - a));
                    rgba[2] = Math.floor(rgba[2] * a + background_rgb[2] * (1 - a));
                }
                if (gray) {
                    let g = Math.floor((rgba[0] + rgba[1] + rgba[2]) / 3 / 255 * 26)
                    line += fillchar.gray_bg(g);
                }
                else {
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
            if(pos != null)
            {
                line = line.position(pos[0], pos[1]);
                ++pos[1];
            }
            console.log(line);
        }
    })

}