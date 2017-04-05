import * as PIXI from 'pixi.js'
import { TweenMax, Power2 } from 'gsap'

import TextPixi from './TextPixi'

'use strict'

class MainChars {
  constructor (options) {
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

    this.limitAlpha = options.limitAlpha || 0.05

    this.target = options.target
    this.app = null
    this.container = null

    this.lastSpawn = Date.now()
    this.spawnRatio = options.spawnRatio || 0.2
    this.fadeOutTime = options.fadeOutTime || 2

    this.start = this.start.bind(this)
    // AVOID FONT LAODING PROBLEMS
    window.addEventListener('load', this.start)
  }

  start () {
    this.init()
    this.app.start()
  }

  init () {
    const { animate, target, style, spaceWidth, spaceHeight, size, limitAlpha } = this
    const { width, height } = size
    const app = new PIXI.Application(width, height, { transparent: true })
    target.appendChild(app.view)

    app.stop()

    var container = new PIXI.Container()
    app.stage.addChild(container)

    const textPixi = new TextPixi(app.renderer, {
      style: style,
      spaceWidth: spaceWidth,
      spaceHeight: spaceHeight,
      limitAlpha: limitAlpha
    })

    app.ticker.add(animate.bind(this))

    this.textPixi = textPixi
    this.container = container
    this.app = app

    this.calcSpecs()
    this.initBoard()
  }

  initBoard () {
    const { lines, columns } = this.specs
    for (let _line = 0; _line < lines; _line++) {
      for (let _column = 0; _column < columns; _column++) {
        const letter = this.getSpriteWithRatio({ x: _column, y: _line })
        this.updateMapChildren(_line, _column, letter)
      }
    }
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

  updateMapChildren (line, column, char) {
    const { size } = this.mapChildren
    this.mapChildren.normalMap[size] = { line: line, column: column, char: char }
    this.mapChildren.reversedMap[line + '-' + column] = { size: size, char: char }
    this.mapChildren.size++
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
    const { char, column, line } = mapChildren.normalMap[pos]
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
    this.mapChildren.normalMap[pos].char = newLetter
  }
}

export default MainChars
