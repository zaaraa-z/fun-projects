const searchInput = document.getElementById('search-input');
const form = document.querySelector('form');
const results = document.getElementById('result');
const nav = document.getElementById('pagination');
const apiURL = 'https://api.lyrics.ovh';

//Functions--------------------------------------
async function searchSongs(word) {
  //   fetch(`${apiURL}/suggest/${word}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${word}`);
  const data = await res.json();
  console.log(data);

  displayResults(data);
}

function displayResults(resultedSongs) {
  const totalResultedSongs = resultedSongs.total;
  let displayedSongs = '';
  resultedSongs.data.forEach((song) => {
    displayedSongs += `
    <li>
        <span><strong>${song.artist.name} - ${song.title}</strong></span>
        <button class="show-lyric" data-artist="${song.artist.name}" data-songTitle="${song.title}">Lyric</button>
    </li>
    `;
  });

  results.innerHTML = `<ul>${displayedSongs}</ul>`;
}

//Event Listeneres-------------------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchedTerm = searchInput.value.trim();

  if (!searchedTerm) {
    alert('Please Enter a Search Term!');
  } else {
    searchSongs(searchedTerm);
  }
});
