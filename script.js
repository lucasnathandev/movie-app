const movieApi = {
  API_URL:
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=79b10b587481ed5c1f71ed1c3fc28788&page=1&count=3",
  IMG_PATH: "https://image.tmdb.org/t/p/w1280",
  SEARCH_URL:
    "https://api.themoviedb.org/3/search/movie?api_key=79b10b587481ed5c1f71ed1c3fc28788&query=",
};

const mainTag = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
  return (await fetch(url))
    .json()
    .then((data) => data.results)
    .then((movies) => showMovies(movies));
}

function searchMovie(e) {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(movieApi.SEARCH_URL + searchTerm);
    search.value = "";
    return;
  }
  window.location.reload();
}

function showMovies(movies) {
  mainTag.textContent = "";
  if (!movies.length) {
    mainTag.innerHTML = `<span class="error">Nenhum filme encontrado.</span>`;
  }
  movies.forEach((movie) => {
    const { title, poster_path, vote_average: rate, overview } = movie;
    const movieEl = document.createElement("div");
    const rateColor = rate >= 8 ? "green" : rate >= 5 ? "orange" : "red";
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img src="${movieApi.IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${rateColor}">${rate.toFixed(2)}</span>
    </div>
    <div class="overview">
      <h3>Visão geral</h3>
      ${overview}
    </div>`;
    mainTag.appendChild(movieEl);
  });
}

async function main() {
  const movies = await getMovies(movieApi.API_URL);

  form.addEventListener("submit", searchMovie);
}

main();
