#open-jukebox

A jukebox-style music player.

##Overview

This music player made with [Node](https://nodejs.org/) and [Electron](http://electron.atom.io/) is designed to be used as the software of a protable jukebox built with a Raspberry Pi.

The jukebox hardware is yet to be built.

##Music Library Structure

To make it possible for open-jukebox to recognize your music library, it should follow the following structure:

* Library/
    * Artist1/
        * Album1/
            * Song1.mp3
            * Song2.mp3
            * ...
            * cover.jpg
        * Album2/
            * ...
        * ...
    * Artsit2/
        * ...
    * ...

##Development

###Dependencies

You will need to have [Node](https://nodejs.org/) and [Electron](http://electron.atom.io/) installed. CD to open-jukebox directory and install dependencies with

    npm install

###Running

After installing the dependencies, you will now be able to run open-jukebox with

    electron .

##Libraries

open-jukebox uses the following third-party JavaScript libraries:

* [Audio5](http://zohararad.github.io/audio5js/)
* [Bootstrap](http://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Slick](http://kenwheeler.github.io/slick/)

##Authors

* [JavierRizzoA](https://github.com/JavierRizzoA/)

##License

The MIT License (MIT)

Copyright (c) 2015 Javier Rizzo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

