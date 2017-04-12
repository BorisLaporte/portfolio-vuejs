import * as PIXI from 'pixi.js'
import { TimelineLite, TweenMax, TweenLite, Power2 } from 'gsap'
import WebFont from 'webfontloader'

import TextPixi from './TextPixi'

'use strict'

class MainChars {
  constructor (options) {
    this.tl = new TimelineLite()

    this.loaded = false

    this.callbackReady = options.callbackReady || null

    this.style = {
      fontFamily: options.fontFamily,
      fontSize: options.fontSize,
      fill: options.fill
    }

    this.specs = {
      lines: 0,
      columns: 0
    }

    this.mapChildren = {
      normalMap: [],
      reversedMap: {},
      size: 0
    }

    this.spaceWidth = options.spaceWidth || 0
    this.spaceHeight = options.spaceHeight || 0

    this.size = options.size || { width: window.innerWidth, height: window.innerHeight }

    this.pickRatio = options.pickRatio || 0.4

    this.limitAlpha = options.limitAlpha || 0.03

    this.target = options.target
    this.app = null
    this.container = null

    this.lastSpawn = Date.now()
    this.spawnRatio = options.spawnRatio || 0.2
    this.fadeOutTime = options.fadeOutTime || 2

    this.hardText = {
      container: null,
      letters: []
    }

    this.removeHardText = this.removeHardText.bind(this)
    this.init = this.init.bind(this)
    // AVOID FONT LAODING PROBLEMS
    this.loadAndCallback(this.init)
  }

  loadAndCallback (callback) {
    const { style } = this
    WebFont.load({
      custom: {
        families: [style.fontFamily]
      },
      active: function () {
        callback()
      }
    })
  }

  init () {
    const { target, style, spaceWidth, spaceHeight, size, limitAlpha } = this
    const { width, height } = size
    PIXI.resolution = 4
    const app = new PIXI.Application(width, height, { transparent: true })
    target.appendChild(app.view)

    app.renderer.autoResize = true
    app.stop()

    var container = new PIXI.Container()
    container.alpha = 0
    app.stage.addChild(container)

    const textPixi = new TextPixi(app.renderer, {
      style: style,
      spaceWidth: spaceWidth,
      spaceHeight: spaceHeight,
      limitAlpha: limitAlpha
    })

    const animate = this.animate.bind(this)
    app.ticker.add(animate)

    this.textPixi = textPixi
    this.container = container
    this.app = app

    this.calcSpecs()
    this.initBoard()
    this.loaded = true

    if (this.callbackReady !== null) {
      this.callbackReady()
    }
  }

  initBoard () {
    const { lines, columns } = this.specs
    for (let _line = 0; _line < lines; _line++) {
      for (let _column = 0; _column < columns; _column++) {
        const letter = this.getSpriteWithRatio({ x: _column, y: _line })
        this.buildMapChildren(_line, _column, letter)
      }
    }
  }

  getSpriteWithRatio (args) {
    const { pickRatio, textPixi, container } = this
    if (Math.random() < pickRatio) {
      const letter = textPixi.createPixiChar(args)
      container.addChild(letter)
      return letter
    }
    return null
  }

  calcSpecs () {
    const { textPixi, size } = this
    const { charWidth, charHeight } = textPixi.size
    const { width, height } = size
    const result = { lines: 0, columns: 0 }
    result.lines = Math.ceil(height / charHeight)
    result.columns = Math.ceil(width / charWidth)
    this.specs = result
  }

  changeLetterMapChildren (pos, char) {
    const { column, line } = this.mapChildren.normalMap[pos]
    this.mapChildren.normalMap[pos].char = char
    this.mapChildren.reversedMap[line + '-' + column].char = char
  }

  buildMapChildren (line, column, char) {
    const { size } = this.mapChildren
    this.mapChildren.normalMap[size] = { line: line, column: column, char: char, free: true }
    this.mapChildren.reversedMap[line + '-' + column] = { pos: size, char: char, free: true }
    this.mapChildren.size++
  }

  updateMapChildren (line, column, char, free = true) {
    const { pos } = this.mapChildren.reversedMap[line + '-' + column]
    this.mapChildren.normalMap[pos].char = char
    this.mapChildren.normalMap[pos].free = free
    this.mapChildren.reversedMap[line + '-' + column].char = char
    this.mapChildren.reversedMap[line + '-' + column].free = free
  }

  // THE LOOP FUNCTION
  animate (delta) {
    this.updateSpawn()
  }

  updateSpawn () {
    const { lastSpawn, spawnRatio, mapChildren } = this
    const { size } = mapChildren
    const now = Date.now()
    const delta = (now - lastSpawn) / 1000
    if (delta >= spawnRatio) {
      const randPos = Math.floor(Math.random() * size)
      this.spawnLetter(randPos)
      this.lastSpawn = now
    }
  }

  spawnLetter (pos) {
    const { container, mapChildren, limitAlpha, fadeOutTime } = this
    const { char, column, line, free } = mapChildren.normalMap[pos]
    if (free) {
      if (char !== null) {
        container.removeChild(char)
      }
      const newLetter = this.getSpriteWithRatio(
        {
          x: column,
          y: line,
          alpha: 1
        })
      if (newLetter !== null) {
        TweenMax.to(newLetter, fadeOutTime, {
          alpha: limitAlpha,
          ease: Power2.easeOut
        })
      }
      this.changeLetterMapChildren(pos, newLetter)
    }
  }

  setHardText (xPerc, yPerc, text) {
    const { specs, hardText, container, textPixi, mapChildren, limitAlpha } = this
    const line = Math.floor(specs.lines * yPerc)
    const columns = Math.floor(specs.columns * xPerc)
    const size = text.length
    const columnStart = columns - Math.ceil(size / 2)
    const hardTextContainer = new PIXI.Container()
    container.addChild(hardTextContainer)
    hardText.container = hardTextContainer
    for (let i = 0; i < size; i++) {
      const column = i + columnStart
      const _mapChild = mapChildren.reversedMap[line + '-' + column]
      // console.log(_mapChild.char)
      if (_mapChild.char !== null) {
        container.removeChild(_mapChild.char)
      }
      let letter = null
      if (text[i] !== ' ') {
        letter = textPixi.createPixiChar({
          x: column,
          y: line,
          alpha: limitAlpha,
          char: text[i]
        })
        hardText.letters.push({ letter: letter, line: line, column: column, tween: null })
        hardTextContainer.addChild(letter)
      }
      this.updateMapChildren(line, column, letter, false)
    }
  }

  removeHardText () {
    const { hardText, container } = this
    for (let i = 0; i < hardText.letters.length; i++) {
      const { line, column } = hardText.letters[i]
      this.updateMapChildren(line, column, null, true)
    }
    container.removeChild(hardText.container)
  }

  fadeInApp (time = 1) {
    const { app, tl, container } = this
    app.start()
    const tween = TweenLite.to(container, time,
      {
        alpha: 1,
        ease: Power2.easeIn
      })
    tl.add(tween)
  }

  fadeOutApp (time = 1) {
    const { app, tl, container } = this
    const stop = app.stop.bind(app)
    const tween = TweenLite.to(container, time,
      {
        alpha: 0,
        ease: Power2.easeIn
      })
    tl.add([tween]).add(stop)
  }

  fadeInHardText (statusLoading = 1, alpha = 1, callback) {
    const { hardText, tl } = this
    const limit = hardText.letters.length * statusLoading
    for (let i = 0; i < limit; i++) {
      if (hardText.letters[i].tween == null) {
        const tween = TweenMax.to(hardText.letters[i].letter, 1,
          {
            alpha: alpha,
            ease: Power2.easeOut
          })
        tl.add(tween, '-=0.8')
        hardText.letters[i].tween = tween
      }
    }
    if (statusLoading === 1) {
      const fadeOutHardText = this.fadeOutHardText.bind(this, callback)
      tl.add(fadeOutHardText)
    }
  }

  fadeOutHardText (callback) {
    const { hardText, tl } = this
    const tween = TweenLite.to(hardText.container, 1,
      {
        alpha: 0,
        ease: Power2.easeOut
      })
    tl.add(tween).add(this.removeHardText).add(callback)
  }

  resize (width, height) {
    const { app, container, loaded } = this
    if (loaded) {
      app.stop()
      // app.stage.removeChild(container)
      app.view.style.width = width
      app.view.style.height = height
      app.renderer.resize(width, height)
      // const newContainer = new PIXI.Container()
      // app.stage.addChild(newContainer)
      // this.container = newContainer
      // this.size = { width: width, height: height }
      // this.calcSpecs()
      // this.initBoard()
      app.start()
    }
  }
}

export default MainChars
