
var lastHref = ''

function checkWindow() {
    if (window.location.href != lastHref) {
        lastHref = window.location.href
        if(window.location.pathname == '/' || window.location.pathname == '/feed/explore') { // check for redir to subscriptions option
            window.location.replace('https://www.youtube.com/feed/subscriptions')
        } else if(window.location.pathname.includes('/shorts/') && window.location.pathname.length == 19) { // check for No-Shorts Option
            // console.log('shorts:', window.location.pathname)
            window.location.replace('https://www.youtube.com/feed/subscriptions')
        }
    }
}

setInterval(checkWindow, 500)