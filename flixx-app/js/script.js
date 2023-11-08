const global = {                          // Router - route through our pages
  currentPage: window.location.pathname   // this gives us the current page we are on.
}

// console.log(global.currentPage);



// Display Popular movies
  async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular') // making a call to this endpoint on TMDB / { results } destructuring to just give me the array
 
    // console.log(results);

    results.forEach(movie => {
      const popularMovies = document.getElementById('popular-movies')

      const div = document.createElement('div')
      div.classList.add('card')
      div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
         ${movie.poster_path
          ?   // if there is a movie.poster.path then fill the image with that data from endpoint as seen beow
        `<img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        class="card-img-top"
        alt="Movie Title"
        />` 
          : // ELSE if there is no image or it is not working 404 - fill with code below (our filler no image)
        `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`}  
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `

        popularMovies.appendChild(div)
    })
  }
// 

// Display movie details
  async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1] // this will grab the id after the search(?) in the url e.g  ?id=980489
                                                        // .split to split from the =  into arrays, from those arrays get second item [1]

    const movie = await fetchAPIData(`movie/${movieID}`)

    // overlay for background image 
    displayBackgroundImage('movie', movie.backdrop_path) // applying overlay, because were in moviedetails function - pass movie type in then access backdrop from movie const which gets our object

    console.log(movie);

    const movieDetails = document.getElementById('movie-details')

    const div = document.createElement('div')
    div.innerHTML = `<div class="details-top">
    <div>
    ${movie.poster_path
      ?   // if there is a movie.poster.path then fill the image with that data from endpoint as seen below
    `<img
    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
    />` 
      : // ELSE if there is no image or it is not working 404 - fill with code below (our filler no image)
    `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${movie.name}"
  />`}  
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(0)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview} 
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')} 
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
      <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((prodComp => `<li>${prodComp.name}</li>`)).join('')}</div>
  </div>`

  movieDetails.appendChild(div)

  // line 90 & 104; step into genres / production companies, and map -- map turns all of them into an array seperated by commas, we then .join('') with empty string to join them all together 

  }
// 

// Display Show details
async function displayShowDetails() {
  const showID = window.location.search.split('=')[1] // this will grab the id after the search(?) in the url e.g  ?id=980489
                                                      // .split to split from the =  into arrays, from those arrays get second item [1]

  const show = await fetchAPIData(`tv/${showID}`)

  // overlay for background image 
  displayBackgroundImage('show', show.backdrop_path) // applying overlay, because were in moviedetails function - pass movie type in then access backdrop from movie const which gets our object

  console.log(show);

  const showDetails = document.getElementById('show-details')

  const div = document.createElement('div')
  div.innerHTML = `<div class="details-top">
  <div>
  ${show.poster_path
    ?   // if there is a show.poster.path then fill the image with that data from endpoint as seen below
  `<img
  src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
  class="card-img-top"
  alt="${show.name}"
  />` 
    : // ELSE if there is no image or it is not working 404 - fill with code below (our filler no image)
  `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`}  
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(0)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
      ${show.overview} 
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')} 
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of episodes:</span> ${show.number_of_episodes}</li>
    <li><span class="text-secondary">Number of seasons:</span> ${show.number_of_seasons}</li>
    <li><span class="text-secondary">Language:</span> ${show.spoken_languages[0].english_name}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies.map((prodComp => `<li>${prodComp.name}</li>`)).join('')}</div>
</div>`

showDetails.appendChild(div)

// line 90 & 104; step into genres / production companies, and map -- map turns all of them into an array seperated by commas, we then .join('') with empty string to join them all together 

}
// 


// Display Popular tv shows
  async function displayPopularShows() {
    const  results  = await fetchAPIData('tv/popular') // making a call to this endpoint on TMDB / { results } destructuring to just give me the array
 
    console.log(results);

    results.forEach(show => {
      const popularShows = document.getElementById('popular-shows')

      const div = document.createElement('div')
      div.classList.add('card')
      div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
         ${show.poster_path
          ?   // if there is a show.poster.path then fill the image with that data from endpoint as seen below
        `<img
        src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
        />` 
          : // ELSE if there is no image or it is not working 404 - fill with code below (our filler no image)
        `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />`}  
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
        `

        popularShows.appendChild(div)
    })
  }
// 

// Display backdrop on details page
  function displayBackgroundImage(type, backgroundPath) { // we pass in a type, call this function in display moviedetails or show details
                                                          // access backgroundPath from our api const where we get data object.
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if (type === 'movie') { // simply passing in movie when we pass in type 
      document.querySelector('#movie-details').appendChild(overlayDiv)
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv)
    }
  }


// 


// Display slider movies
  async function displaySlider() {
    const { results } = await fetchAPIData('movie/now_playing') // {results} -- destructure - step into object we get back and just pull out the array
    console.log(results);

    results.forEach((movie) => {
      const div = document.createElement('div')
      div.classList.add('swiper-slide')

      div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>`

      let wrapper = document.querySelector('.swiper-wrapper')

      wrapper.appendChild(div)
    })


    
  }

// 

// Fetch data from TMD API
  async function fetchAPIData(endpoint) {
    const API_URL = 'https://api.themoviedb.org/3/'
    const API_KEY = '22139c07e12166e6ee9f9b318a4544e5'

    // Before/whilst fetching data show the spinner
    showSpinner()

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    // going to retrieve data from sites endpoints, first using the URL, the endpoint then specifying our key

    const data = await response.json()

    // Hide spinner after the data is gathered
    hideSpinner()

    return data; // give me this.
  }
// 

// Show & Hide Spinner
  function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
  }
  function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
  }
// 

// Highlight active link
  function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      // console.log(link);
      if (link.getAttribute('href') === global.currentPage) {
        link.classList.add('active')
      }
    })
  }
// 

// Init App
function init() {
  switch (global.currentPage) {  // switch to this case and run these functions depending on which page we are on.
    case '/':
    case '/index.html':   
      console.log('Home');
      displaySlider()
      displayPopularMovies(); // call this on homepage because homepage is going to display popular movies.
      break;
    case '/shows.html':
      console.log('Shows');
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      displayMovieDetails()
      break;
    case '/tv-details.html':
      console.log('Tv Details');
      displayShowDetails()
      break;
    case '/search.html':
      console.log('Search');
      break
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)