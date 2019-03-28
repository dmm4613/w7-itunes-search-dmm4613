
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
    const promise = fetch(`https://itunes-api-proxy.glitch.me/search?term=${input}`)
    .then(function (response) {
        if (!response.ok) {
        throw Error(response.statusText)
        }
        return response.json()
    })
    return promise
}

function updateArtist (input) {
    getArtist (input)
    .then(function (searchResult){
        console.log(searchResult)
        console.log(searchResult.results.length)
        const artist = searchResult.results[0].artistName
        query('#artist').innerText = artist
        const trackDiv = query('#track')
        let trackUrlHolder = query("#artwork-holder")
        let idx
        for (idx = 0; idx < searchResult.results.length; idx++){
            let trackItem = document.createElement('track')
            let trackUrl = searchResult.results[idx].artworkUrl100
            console.log(trackItem)
            trackItem.innerText = searchResult.results[idx].trackName
            trackDiv.appendChild(trackItem)
            trackUrlHolder.innerHTML = `<img class="artwork" src="${trackUrl}>`
        }
    })
}

document.addEventListener('DOMContentLoaded', function(){
    query('#input').addEventListener('change', function(event){
        updateArtist(event.target.value)
    })
})