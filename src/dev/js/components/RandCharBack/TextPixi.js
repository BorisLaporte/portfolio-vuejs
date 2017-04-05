import * as PIXI from 'pixi.js'

'use strict'

class TextPixi {
  constructor (renderer, options) {
    this.limitAlpha = options.limitAlpha || 0.05
    this.style = options.style
    this.size = {
      charWidth: 0,
      charHeight: 0
    }
    this.resolution = 2
    this.spaceWidth = options.spaceWidth || 0
    this.spaceHeight = options.spaceHeight || 0

    this.chars = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890<>?;/:!§ù%*µ$£ø^+=})]@àç\_è|-[({#é~&'

    this.textures = []
    this.renderer = renderer

    this.init()
  }

  init () {
    const { spaceWidth, spaceHeight } = this
    this.initTextures()
    this.calcSizeLetter({
      spaceWidth: spaceWidth,
      spaceHeight: spaceHeight
    })
  }

  initTextures () {
    const { chars } = this
    for (let i = 0; i < chars.length; i++) {
      this.createTextureChar(chars[i])
    }
  }

  createTextureChar (char) {
    const { style, resolution, textures, renderer } = this
    const letter = new PIXI.Text(char, style)
    letter.resolution = resolution
    // letter.cacheAsBitmap = true
    const texture = renderer.generateTexture(letter, 1, 2)
    textures.push(texture)
  }

  createPixiChar (args = {}) {
    const { limitAlpha, size, resolution, textures } = this
    const { charWidth, charHeight } = size
    const x = args.x || 0
    const y = args.y || 0
    const alpha = args.alpha || limitAlpha
    const rand = Math.floor(Math.random() * textures.length)
    const newTexture = textures[rand]
    const sprite = new PIXI.Sprite(newTexture)
    sprite.x = x * charWidth
    sprite.y = y * charHeight
    sprite.alpha = alpha
    sprite.resolution = resolution
    // sprite.cacheAsBitmap = true
    return sprite
  }

  calcSizeLetter (args = {}) {
    const { textures } = this
    const spaceWidth = args.spaceWidth || 0
    const spaceHeight = args.spaceHeight || 0
    const testSprite = new PIXI.Sprite(textures[0])
    const charWidth = testSprite.width + spaceWidth
    const charHeight = testSprite.height + spaceHeight
    const result = {
      charWidth: charWidth,
      charHeight: charHeight
    }
    this.size = result
  }
}

export default TextPixi
