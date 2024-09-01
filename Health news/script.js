const apiKey = '0667cd96d0554dd2885318ed1e0e06ec'; // Replace with your NewsAPI key
const apiUrl = 'https://newsapi.org/v2/';
let bookmarks = [];

document.addEventListener('DOMContentLoaded', () => {
    loadArticles('top-headlines');
    
    document.getElementById('all').addEventListener('click', () => loadArticles('top-headlines'));
    document.getElementById('top-headlines').addEventListener('click', () => loadArticles('top-headlines'));
    document.getElementById('latest').addEventListener('click', () => loadArticles('everything'));
    document.getElementById('view-bookmarks').addEventListener('click', viewBookmarks);
});

async function loadArticles(category) {
    const url = category === 'everything' ? 
        `${apiUrl}everything?q=health&apiKey=${apiKey}` : 
        `${apiUrl}top-headlines?category=health&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    displayArticles(data.articles);
}

function displayArticles(articles) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        
        articleElement.innerHTML = `
            <img src="${article.urlToImage}" alt="Article Image">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <button onclick="bookmarkArticle('${article.url}')">Bookmark</button>
        `;
        
        articlesContainer.appendChild(articleElement);
    });
}

function bookmarkArticle(url) {
    if (!bookmarks.includes(url)) {
        bookmarks.push(url);
        alert('Article bookmarked!');
    } else {
        alert('Article already bookmarked.');
    }
}

function viewBookmarks() {
    const bookmarkedArticles = bookmarks.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join('');
    document.getElementById('articles').innerHTML = `<h2>Bookmarked Articles:</h2><ul>${bookmarkedArticles}</ul>`;
}
