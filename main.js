
function query(selector){
    return document.querySelector(selector)
}

function queryAll(selector){
    return document.querySelectorAll(selector)
}

const searchDiv = query('.search-button')
const searchButton = document.createElement('search-button')
searchButton.innerText = 'Search Button'
searchButton.addEventListener('click', function () {
    updateArtist(input)})
searchDiv.appendChild(searchButton) 


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
            // const trackUrl = searchResult.results[idx].artworkUrl100
            console.log(trackItem)
            trackItem.innerText = searchResult.results[idx].trackName
            trackDiv.appendChild(trackItem)
            // trackUrlHolder.innerHTML = `<img class="artwork" src="${trackUrl}>`
            trackItem.classList.add('track')
            // trackDiv.replaceChild(trackDiv, trackDiv)
        }
    })
}


document.addEventListener('DOMContentLoaded', function(){
    query('#name').addEventListener('change', function(event){
        console.log(event.target.value)
        updateArtist(event.target.value)
    })
})