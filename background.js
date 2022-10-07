chrome.webRequest.onCompleted.addListener(async (request) => {
    if (request.method !== 'GET' || request.type !== 'script' || !request.url.includes('GeoPhotoService')) {
        return;
    }

    await fetch(request.url).then((response) => {
        return response.text();
    }).then((data) => {
        // console.log(data);
        let coordHolder = JSON.parse(data.match(/\[null,null,-?\d*.\d*,-?\d*.\d*\]/)[0]);
        if (!coordHolder) {
            chrome.storage.sync.set({coords: JSON.stringify(data[1][0])}, () => {
                console.log('set value weird');
            });
            console.log(data[1][0])
        } else {
            let coords = coordHolder.splice(2, 2);
            chrome.storage.sync.set({coords: JSON.stringify(coords)}, () => {
                console.log('set value');
            });
            console.log(coords);
        }
        console.log('-'.repeat(50));
    });

}, {urls: ['<all_urls>']});
