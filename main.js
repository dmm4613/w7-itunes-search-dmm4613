
function query(selector){
    return document.querySelector(selector)
}

function queryAll(selector){
    return document.querySelectorAll(selector)
}

function searchArtist(input){
        updateArtist(input)
}

// initial pull from itunes API to grab the JSON file
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

// will populate screen with each song from the searched artist/band name
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
            const audioBar = document.createElement ('div')
            const audioUrl = searchResult.results[idx].previewUrl
            const artworkUrl = searchResult.results[idx].artworkUrl100
            const trackName = searchResult.results[idx].trackName
            trackItem.innerText = trackName
            artworkTag.innerHTML = `<img src="${artworkUrl}">`
            // adding these elements as children **parent.appendchild(child)**
            trackDiv.appendChild(artworkTag)
            artworkTag.appendChild(trackItem)
            artworkTag.appendChild(audioBar)
            // adding classes to these elements
            artworkTag.classList.add('artwork')
            artworkTag.classList.add(`track-${idx}`)
            trackItem.classList.add('track')
            playMusic(idx, audioUrl, trackName)
        }
    })
}

function playMusic(idx, audioUrl, trackName){
    query(`.track-${idx}`).addEventListener('click', function(){
        query("#audioplayer").innerHTML = `<p class="now-playing">Now Playing: ${trackName}</p><audio controls src="${audioUrl}"></audio>`
        query("audio").play()
    })
}

document.addEventListener('DOMContentLoaded', function(){
    query('#search-form').addEventListener('submit', function(event){
        const artistName = query('#name')
        // don't try to submit this form. Do what I ask instead.
        event.preventDefault()
        searchArtist(artistName.value)
        // resets the value of artistName so the search bar won't keep that there. 
        artistName.value = ''
    })
})