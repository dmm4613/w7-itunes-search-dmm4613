
function query(selector){
    return document.querySelector(selector)
}

function queryAll(selector){
    return document.querySelectorAll(selector)
}


function searchArtist(input){
    // searchButton.addEventListener('click', function (event) {
        updateArtist(input)
}
    

function getArtist(input){
    encodeURIComponent(input)
    let promise = fetch(`https://itunes-api-proxy.glitch.me/search?term=${input}`)
    .then(function (response) {
        if (!response.ok) {
        throw Error(response.statusText)
        }
        return response.json()
    })
    return promise
}

function updateArtist (name) {
    getArtist (name)
    .then(function (searchResult){
        console.log(searchResult)
        const trackDiv = query('#track')
        // const trackUrlHolder = query("#artwork-holder")
        const artist = name
        query('#artist').innerText = artist
        // below will reset the trackDiv each time this is run so that way it will refresh the list.
        trackDiv.innerHTML = ''
        let idx
        for (idx = 0; idx < searchResult.results.length; idx++){
            const trackItem = document.createElement('div')
            const artworkTag = document.createElement('div')
            // const audioDiv = query('#audioplayer')
            const audioBar = document.createElement ('div')
            const audio = searchResult.results[idx].previewUrl
            const artworkUrl = searchResult.results[idx].artworkUrl100
            audioBar.innerHTML = `<audio
                                    controls="controls"
                                    src="${audio}">
                                        Your browser does not support the
                                        <code>audio</code> element.
                                </audio>`
            trackItem.innerText = searchResult.results[idx].trackName
            artworkTag.innerHTML = `<img src="${artworkUrl}">`
            // adding these elements as children **parent.appendchild(child)**
            trackDiv.appendChild(artworkTag)
            artworkTag.appendChild(trackItem)
            artworkTag.appendChild(audioBar)
            // adding classes to these elements
            artworkTag.classList.add('artwork')
            trackItem.classList.add('track')
            audioBar.classList.add('audio-player')

        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    query('#search-form').addEventListener('submit', function(event){
        const artistName = query('#name')
        // don't try to submit this form. Do what I ask instead.
        event.preventDefault()
        searchArtist(artistName.value)
        artistName.value = ''

    })
})