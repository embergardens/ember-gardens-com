export const updateReducedMotionLocalStorage = ( value ) => {
   localStorage.setItem('reducedMotion', value )
}

export const stopVideoAutoplay = () => {
   // Find all HTML5 video elements.
   const videos = document.querySelectorAll( 'video' )
   videos.forEach( video => {
      // Pause all videos with autoplay.
      const autoplay  = video.getAttribute('autoplay')
      if ( autoplay ) {
         video.pause()
      }
   })
}