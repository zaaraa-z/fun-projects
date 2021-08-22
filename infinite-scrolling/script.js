const searchInput = document.getElementById('search-input'),
  postContainer = document.getElementById('posts-container'),
  loader = document.querySelector('loader');

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
  console.log(postArr);

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

//------------------------------------------------------
showPosts();
