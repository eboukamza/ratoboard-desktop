# RatoBoard

[![CircleCI](https://circleci.com/gh/eboukamza/ratoboard-desktop/tree/master.svg?style=shield)](https://circleci.com/gh/eboukamza/ratoboard-desktop/tree/master)
[![Appveyor](https://ci.appveyor.com/api/projects/status/12jp45s86xu26y5u/branch/master?svg=true)](https://ci.appveyor.com/project/eboukamza/ratoboard-desktop/branch/master)
[![Travis](https://travis-ci.org/eboukamza/ratoboard-desktop.svg?branch=master)](https://travis-ci.org/eboukamza/ratoboard-desktop)

 RatoBoard is an accessibility tool that provides a virtual mouse and a virtual keyboard witch can be controlled only by a single action (mouse click).
 The user actions are selected by auto-scan. It's specifically designed to improve productivity of people with physical disabilities.
 It's faster than a conventional on-screen keyboard.
 
 You can use it for chat, play games and surf in the internet.

 Ratoboard is a desktop application developed using Electron, Angular and Ionic.
 Uses robotjs for control the mouse and iohook for handle the mouse events.
 
 Ratoboard is open-source and multiplatform (linux, windows and mac).

 Download last release [here](https://github.com/eboukamza/ratoboard-desktop/releases).

How use it
---

 RatoBoard is designed to be used with a Switch Adapted Mouse. You can buy one or do it yourself.
 Anyway if you have press button that produces a left click you can control Ratoboard with it.

 ![Switch Adapted Mouse](https://ratoboard.s3-eu-west-1.amazonaws.com/switch-adapted-mouse.jpg)


 You can try the concept of the keyboard in this [demo](https://eboukamza.github.io/ratoboard/) of this other repo [https://github.com/eboukamza/ratoboard](https://github.com/eboukamza/ratoboard)
 Remember, one single action for control it: left click.

 ![RatoBoard say hi](https://ratoboard.s3-eu-west-1.amazonaws.com/ratoboard-say-hi.gif)

What RatoBoard can do
-----
- Handle the mouse (move, left and right click)
- Write an text input with auto send (useful for chat)
- Config mouse move speed
- Config auto-scan speed
- Switch on/off

What next (road map)
--
- Full mouse control (drag & drop)
- Select keyboard layout (es, fr, en)
- Full keyboard (special chars, emojis)
- Simplified and faster mouse move
- Smart mouse speed
- Keyboard autocorrect
- Word prediction

How to Build
-----------
prerequisites 

 - nodejs 8
 - yarn
 - g++
 - see readme of robotjs for other deps

run `yarn && yarn build -- --prod && yarn dist`
