(function remSetting (win) {
    const doc = win.document
    const docEl = doc.documentElement
    let timer
    const refreshRem = function refreshRem () {
      let width = docEl.getBoundingClientRect().width
      if (width > 750) {
        width = 750
      } else if (width < 320) {
        width = 320
      }
      const rem = width / 7.5
      docEl.style.fontSize = rem + 'px'
    }
  
    win.addEventListener('resize', () => {
      clearTimeout(timer)
      timer = setTimeout(refreshRem, 300)
    }, false)
  
    win.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        clearTimeout(timer)
        timer = setTimeout(refreshRem, 300)
      }
    }, false)
  
    if (doc.readyState === 'complete') {
      doc.body.style.fontSize = '12px'
    } else {
      doc.addEventListener('DOMContentLoaded', () => {
        doc.body.style.fontSize = '12px'
      }, false)
    }
  
    refreshRem()
  }(window))