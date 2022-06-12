
var lastHref = ''
var subOnly = true
var antiShorts = true

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if(msg.subject ===  'settings') {
        subOnly = msg.subOnly
        antiShorts = msg.noShorts
        console.log("Updated Settings")
    }
});





function checkWindow() {
    if (window.location.href != lastHref) {
        lastHref = window.location.href
        if((window.location.pathname == '/' || window.location.pathname == '/feed/explore') && subOnly) { // check for redir to subscriptions option
            window.location.replace('https://www.youtube.com/feed/subscriptions')
        } else if(window.location.pathname.includes('/shorts/') && window.location.pathname.length == 19 && antiShorts) { // check for No-Shorts Option
            window.location.replace('https://www.youtube.com/feed/subscriptions')
        }
    }
}

setInterval(checkWindow, 500)