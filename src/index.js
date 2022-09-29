
//Create empy variable to set main movie to.
let moviesArray

fetch(`http://localhost:3000/movies`)
.then(res => res.json())
.then(moviesArray => {
    renderImages(moviesArray)
    updateDisplay(moviesArray[0]) /* displays first movie in list when page loads */
})


//Create image for each movie
const renderImages = (moviesArray) => 
    moviesArray.forEach(movieImage => createMovieImage(movieImage))
    
        
//Create image in movie list
const createMovieImage = (movie) =>{
        const moviesList = document.getElementById('movie-list')
        const moviesSelect = document.createElement('div')
        const movieImage = document.createElement('img')

        movieImage.src = movie.image

        moviesList.appendChild(moviesSelect)
        moviesList.appendChild(movieImage)

        movieImage.addEventListener('click', (e) =>
        updateDisplay(movie))
}

const updateDisplay = (movie) => {
//Get all elements of main movie
    const movieDetailImage = document.getElementById('detail-image')
    const movieDetailTitle = document.getElementById('title')
    const movieDetailYear = document.getElementById('year-released')
    const movieDetailDesc = document.getElementById('description')
    const movieWatchedStatus = document.getElementById('watched')
    const movieBloodAmount = document.getElementById('amount')
    
    //Update DOM to display main movie
    movieDetailTitle.textContent = movie.title
    movieDetailYear.textContent = movie.released_year
    movieDetailDesc.textContent = movie.description
    movieDetailImage.src = movie.image
    movieWatchedStatus.textContent = movie.watched
    movieBloodAmount.textContent = movie.blood_amount

    //Declare empy variable to match current movie detail
    moviesArray = movie
}


//Add event listener to watch button. Check value of "watched" key and update then PATCH
const watchedButton = document.getElementById('watched')
    watchedButton.addEventListener('click', (e) =>{
        if(moviesArray.watched === false) {
            moviesArray.watched = true
            // watchedButton.textContent = moviesArray.watched /* line needed when not PATCHing value to make status persist locally*/
        } else {
            moviesArray.watched = false
            // watchedButton.textContent = moviesArray.watched /* line needed when not PATCHing value to make status persist locally*/
        }
        
        // console.log(moviesArray)
        updateStatus(`http://localhost:3000/movies/${moviesArray.id}`, {watched: moviesArray.watched})
        .then(res => res.json())
        .then(watched => updateDisplay(watched))
})            
    
//Add event listener to "Add Blood" button. Get elements that need to update and provide input for new blood amount
//Update object key:value and PATCH.
const updateBloodButton = document.getElementsByTagName('input')[1]
    updateBloodButton.addEventListener('click', (e) => {
        e.preventDefault()  
        const newBloodAmount = document.getElementById('blood-amount')
        const currentBloodAmount = document.getElementById('amount')
        const bloodForm = document.getElementById('blood-form')
        const totalBlood = parseInt(newBloodAmount.value) + parseInt(currentBloodAmount.textContent)

        moviesArray.blood_amount = totalBlood
        //currentBloodAmount.textContent = totalBlood.toString() /* line needed when not PATCHing value to make status persist locally*/

        updateStatus(`http://localhost:3000/movies/${moviesArray.id}`, {blood_amount: moviesArray.blood_amount})
        .then(res => res.json())
        .then(newBlood => updateDisplay(newBlood))
        bloodForm.reset()

    //    console.log(typeof(newBloodAmount.value))
    //    console.log(typeof(currentBloodAmount.textContent))
    //    console.log(typeof(currentBloodAmount.textContent + newBloodAmount.value))
       console.log(moviesArray)
})

const updateStatus = (url,body) => {
    const configurationObj ={
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    }
    return fetch(url,configurationObj)
}


/*
    Challenge 1:
        - Create image and add to nav list for each movie. - complete
    
    Challenge 2:
        - Display first movie in list on page load. - complete

    Challenge 3:
        - Movie details should be displayed when top image is clicked. Watched status should update
          to match value for the specific movie. - complete
    
    Challenge 4:
        - Make button toggle between "Watched" and "Unwatched". - completed after time

    Challenge 5:
        - User should be able to add and update blood drop count. - completed after time

*/