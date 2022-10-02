chrome.webRequest.onCompleted.addListener(async (request) => {
    if (request.method !== 'GET' || request.type !== 'script' || !request.url.includes('GeoPhotoService')) {
        return;
    }

    await fetch(request.url).then((response) => {
        return response.text();
    }).then((data) => {
        const parsedData = JSON.parse(data.match(/(?<=\().*(?=\))/)[0])[1][0];
        try {
            if (parsedData.length !== 13) {
                return
            }
            const locationList = parsedData[3][2];
            const location = locationList[0][0] + locationList[1][0];
            const coordValue = parsedData[5][0][1][0];
            const lat = coordValue[2];
            const long = coordValue[3];
            console.log(lat, long);
            console.log(location);
        } catch (err) {
            console.log(parsedData);
        }
        console.log('-'.repeat(50));
    });

}, {urls: ['<all_urls>']});