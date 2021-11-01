const searchInput = document.getElementById('search-input');
const form = document.querySelector('form');
const results = document.getElementById('result');
const pagination = document.getElementById('pagination');
const apiURL = 'https://api.lyrics.ovh';

//------------------Functions------------------
//fetch the songs
async function searchSongs(word) {
  //WAY01:
  //   fetch(`${apiURL}/suggest/${word}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  //WAY02:
  const res = await fetch(`${apiURL}/suggest/${word}`);
  const data = await res.json();

  displayResults(data);
}

//display the fetched songs
function displayResults(resultedSongs) {
  const totalResultedSongs = resultedSongs.total;

  //WAY01 (forEach()):
  //   let displayedSongs = '';
  //   resultedSongs.data.forEach((song) => {
  //     displayedSongs += `
  //     <li>
  //         <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //         <button data-artist="${song.artist.name}" data-songTitle="${song.title}">Lyric</button>
  //     </li>
  //     `;
  //   });

  //   results.innerHTML = `<ul>${displayedSongs}</ul>`;

  //WAY02(map()):
  results.innerHTML = `
  <h2>${totalResultedSongs} Songs For You...</h2>
    <ul>
        ${resultedSongs.data
          .map(
            (song) =>
              `<li>
            <span>
            <strong>${song.artist.name}</strong> - ${song.title}
            </span>
            <button
            data-artist="${song.artist.name}"
            data-songTitle="${song.title}"
            >
            Lyric
            </button>
            </li>`
          )
          .join('')}
    </ul>
`;

  if (resultedSongs.prev || resultedSongs.next) {
    pagination.innerHTML = `
        ${
          resultedSongs.prev
            ? `<button onclick="navigate('${resultedSongs.prev}')">Previous</button>`
            : ''
        }
        ${
          resultedSongs.next
            ? `<button onclick="navigate('${resultedSongs.next}')">Next</button>`
            : ''
        }     
    `;
  } else {
    pagination.innerHTML = '';
  }
}

//fetch prev and next songs
async function navigate(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  displayResults(data);
}

//--------------Event Listeneres-------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchedTerm = searchInput.value.trim();

  if (!searchedTerm) {
    alert('Please Enter a Search Term!');
  } else {
    searchSongs(searchedTerm);
  }
});
