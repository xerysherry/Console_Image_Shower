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

import { shower } from "./cishower";

let args = process.argv.splice(2);
let w = 80;
let h = 0;
let verbose = false;
let gray = false;
let background_p:string = null;

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

function Description() {
    console.log("Console Image Shower");
    console.log("    file/url: input image localpath or address")
    console.log("    -w: image show width. default = 80");
    console.log("    -h: image show height. if h=0, auto adjust");
    console.log("    -g: gray mode");
    console.log("    -bg: set background color if image transparent. [whilte|black|000000~ffffff]");
    console.log("    -m: set w/h = 1:1, default: w/h = 2:1");
    console.log("    -v: image info show");
    console.log("   ex. cishower filepath -w 80 -g -v".green);
    console.log("   ex. cishower url -m -bg 0000ff".green);
}


if (file == null || file.length == 0) {
    Description();
}
else {
    shower(file, w, h, verbose, gray, background_p, mode);
}
