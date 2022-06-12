
function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (items) => {
        if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
        }
        resolve(items);
        });
    });
}
// getAllStorageSyncData().then(res => console.log(res))


const subOnly = document.getElementById('subonly-toggle')
const noShorts = document.getElementById('noshorts-toggle')




// Init
chrome.storage.sync.get('subonly-toggle', (val) => {
    if (val['subonly-toggle'] != undefined) {
        subOnly.checked = val['subonly-toggle']
    }
})

chrome.storage.sync.get('noshorts-toggle', (val) => {
    if (val['noshorts-toggle'] != undefined) {
        noShorts.checked = val['noshorts-toggle']
    }
})



window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...

    sendUpdatedSettings()
      
});

function sendUpdatedSettings() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        // ...and send a request for the DOM info...
        let currTab = new URL(tabs[0].url)
        if(currTab.host !== 'www.youtube.com') {
            return
        }
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'settings', subOnly: subOnly.checked, noShorts: noShorts.checked}).catch((error) => {
                    console.log("Content Script not Found")
                })  
      });
}


subOnly.addEventListener('input', function(e) {
    var setting = e.target.checked 
    chrome.storage.sync.set({'subonly-toggle': setting}, function() {
        console.log('Value is set to ' + setting);
    });
    sendUpdatedSettings();
})

noShorts.addEventListener('input', function(e) {
    var setting = e.target.checked 
    chrome.storage.sync.set({'noshorts-toggle': setting}, function() {
        console.log('Value is set to ' + setting);
    });
    sendUpdatedSettings();
})
