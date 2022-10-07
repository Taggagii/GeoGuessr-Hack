async function display() {
    const coordDisplayer = document.querySelector('#coordDisplayer');
    const { coords } = await chrome.storage.sync.get('coords')
    coordDisplayer.innerHTML = JSON.stringify(coords);
    window.open(`https://www.google.ca/maps/search/${coords}`, '_blank', 'location=yes,popup=yes')
}

display();