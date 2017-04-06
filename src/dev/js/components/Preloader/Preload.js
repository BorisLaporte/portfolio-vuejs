// PRELOADER
class Prelaod {
  constructor(img, onSuccess, onFailure = null, percentage = null, limitTime = 6000, webpackResolve = null){
    this.onSuccess = onSuccess
    this.onFailure = onFailure
    this.percentage = percentage
    this.webpackResolve = webpackResolve
    this.imgToDownload = img

    this.imgDone = []
    this.timeout = this.safetyTimeout(limitTime)
    this.loadImages(img)
  }

  // LAUNCH PRELOADING AND ADD LISTENERS
  loadImages(imgArray){
    let images = []
    for (var i=0; i < this.imgToDownload.length; i++){
        images[i] = new Image()
        images[i].onload = this.updateStatus.bind(this, images[i])
        let src
        if ( this.webpackResolve != null ){
          src = this.webpackResolve(imgArray[i])
        } else {
          src = imgArray[i]
        }
        images[i].src = src
    }
  }

  // FIRES IF IT DIDN'T LOAD EVERYTHING ON TIME
  safetyTimeout(time){
    let self = this
    return setTimeout(function() {
      // IF onFailure exist fire it, else fire onSuccess
      self.onFailure ? self.onFailure() : self.onSuccess()
    }, time)
  }

  // FIRES EVERY TIME THAT A PICTURE IS LOADED
  updateStatus(img){
    this.imgDone.push(img)
    let status = ( this.imgDone.length / this.imgToDownload.length )

    // IF A PERCENTAGE FUNCTION IS ATTACHED, WARNS IT OF THE ACTUAL STATUS
    if ( this.percentage ){
      this.percentage(status)
    }

    // EVERY PICTURES DID LOAD
    if ( status === 1 ){
      clearTimeout(this.timeout)
      this.onSuccess()
    }
  }
}

export default Prelaod