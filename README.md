Console Image Shower
====================

![npm](https://nodei.co/npm/cishower.png)

How to install?
---------------

```
npm install cishower -g
```

How to use?
-----------

```
cishower <file/url>
```

Command Parameter:

    -w: image show width. default = 80  
    -h: image show height. if h=0, auto adjust  
    -g: gray mode  
    -bg: set background color if image transparent. [whilte|black|000000~ffffff]  
    -m: set w/h = 1:1, default: w/h = 2:1  
    -v: image info show

ex. cishower filepath -w 80 -g -v  
ex. cishower url -m -bg 0000ff

How to use in source
--------------------

Import it, and like this:

```Typescript
import { shower } from "cishower";

shower("https://www.linuxfoundation.org/wp-content/uploads/2017/05/nodejs_logo.png",
    80, undefined, undefined, undefined, "white", undefined, [1,1]);
```

Screenshot
----------
![screenshot1](https://raw.githubusercontent.com/xerysherry/Console_Image_Shower/master/screenshot/screenshot1.png)
![screenshot2](https://raw.githubusercontent.com/xerysherry/Console_Image_Shower/master/screenshot/screenshot2.png)

命令行图片查看器
====================

如何安装？
--------

```
npm install cishower -g
```

如何使用？
--------

```
cishower <file/url>
```

命令行参数说明:

    -w: 显示时图片宽度，默认为80  
    -h: 显示是图片高度，高度为0是自动匹配，默认为0  
    -g: 是否灰度显示图片  
    -bg: 设置背景颜色，如果图片有透明通道是有意义，[white|black|000000~ffffff]  
    -m: 设置宽高比，默认为2:1，设置后为1:1  
    -v: 是否显示图片信息  
   
例子： cishower filepath -w 80 -g -v  
例子： cishower url -m -bg 0000ff  

如何在代码是使用？
---------------

引用它, 然后像这样调用它:

```Typescript
import { shower } from "cishower";

shower("https://www.linuxfoundation.org/wp-content/uploads/2017/05/nodejs_logo.png",
    80, undefined, undefined, undefined, "white", undefined, [1,1]);
```

截图
----

![screenshot1](https://raw.githubusercontent.com/xerysherry/Console_Image_Shower/master/screenshot/screenshot1.png)
![screenshot2](https://raw.githubusercontent.com/xerysherry/Console_Image_Shower/master/screenshot/screenshot2.png)
