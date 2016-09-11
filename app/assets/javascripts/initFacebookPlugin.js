var initialized = false
var initializedPageUrl = ''

function initfb () {
  FB.init({
    appId      : '576280705890096',
    xfbml      : true,
    version    : 'v2.7'
  });
}

export function initFacebookPlugin (url) {
  if(initializedPageUrl !== url) {
    initialized = false
    initializedPageUrl = url
  }

  if(!initialized) {
    initialized = true
    if(typeof FB !== 'undefined') {
      initfb()
    } else {
      window.fbAsyncInit = initfb
    }
  }
}