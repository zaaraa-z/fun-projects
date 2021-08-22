const searchInput = document.getElementById('search-input'),
  postContainer = document.getElementById('posts-container'),
  loader = document.querySelector('.loader');

let postLimit = 3;
let page = 1;

//------------------------------------------------------
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postLimit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

//--------------------
async function showPosts() {
  const postArr = await getPosts();

  postArr.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <h4 class="post-number">${post.id}</h4>
    <div class="post-info">
      <h4 class="post-title">${post.title}</h4>
      <p class="post-text">${post.body}</p>
    </div>
    `;

    postContainer.appendChild(postEl);
  });
}

//--------------------
function showMore() {
  //show loader for 1s
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    //show next page after 3s
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

//--------------------
function searchPosts(e) {
  const typedData = e.target.value;
  
}

//------------------------------------------------------
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showMore();
  }
});

searchInput.addEventListener('input', searchPosts);
