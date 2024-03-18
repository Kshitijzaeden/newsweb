const API_KEY = "92b584ccc46f4af2bc8c8b368862e511";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    return data;
}

fetchData("all").then(data => renderMain(data.articles));

// menu btn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
});

// render news
function renderMain(arr) {
    // Sort articles by publishedAt in descending order
    arr.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const mainElement = document.querySelector("main");
    mainElement.innerHTML = ''; // Clear existing content

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            cardElement.innerHTML = `<a href=${arr[i].url}>
                                        <img src=${arr[i].urlToImage} lazy="loading" />
                                        <h4>${arr[i].title}</h4>
                                        <div class="publishbyDate">
                                            <p>${arr[i].source.name}</p>
                                            <span>•</span>
                                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                                        </div>
                                        <div class="desc">
                                            ${arr[i].description}
                                        </div>
                                    </a>`;

            mainElement.appendChild(cardElement);
        }
    }
}

// Event listener for search form
const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    renderMain(data.articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInputMobile.value);
    renderMain(data.articles);
});

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        const query = searchTerm;
        const data = await fetchData(query);
        renderMain(data.articles);
    } else {
        alert("Please enter a search term.");
    }
});

searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTermMobile = searchInputMobile.value.trim();

    if (searchTermMobile) {
        const queryMobile = searchTermMobile;
        const dataMobile = await fetchData(queryMobile);
        renderMain(dataMobile.articles);
    } else {
        alert("Please enter a search term.");
    }
});

async function Search(query) {
    const data = await fetchData(query);
    renderMain(data.articles);
}

const searchIcon = document.querySelector(".inputSearch span");
searchIcon.addEventListener("click", async () => {
    const searchInputValue = searchInput.value.trim();
    
    if (searchInputValue) {
        const data = await fetchData(searchInputValue);
        renderMain(data.articles);
    } else {
        alert("Please enter a search term.");
    }
});
let visitorCount = localStorage.getItem('visitorCount') || 0;

function updateVisitorCount() {
    const visitorCountElement = document.getElementById("visitorCount");
    visitorCount++;
    visitorCountElement.textContent = visitorCount;

    // Store the updated count in local storage
    localStorage.setItem('visitorCount', visitorCount);
}

// Call this function whenever you want to update the visitor count
updateVisitorCount();

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Flatpickr
    flatpickr("#datePicker", {
      dateFormat: "Y-m-d", // Date format (YYYY-MM-DD)
      onClose: function (selectedDates, dateStr, instance) {
        handleSelectedDate(dateStr); // Handle selected date
      }
    });

    // Add click event listener for calendar icon
    const calendarIcon = document.getElementById('calendarIcon');
    calendarIcon.addEventListener('click', function () {
      flatpickr("#datePicker").open(); // Open date picker when icon is clicked
    });
  });

  // Function to handle selected date
  function handleSelectedDate(selectedDate) {
    console.log("Selected Date:", selectedDate);
    // Fetch news articles for the selected date
    fetchNewsForDate(selectedDate);
  }

  // Function to fetch news articles for a specific date
  function fetchNewsForDate(date) {
    // Construct the API query URL for fetching news articles based on the selected date
    const url = `https://newsapi.org/v2/everything?q=&from=${date}&to=${date}&apiKey=YOUR_API_KEY`;

    // Make a fetch request to the API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Render the fetched news articles
        renderNewsArticles(data.articles);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }

  // Function to render news articles on the page
  function renderNewsArticles(articles) {
    const newsContainer = document.getElementById('newsContainer');
    // Clear previous news articles
    newsContainer.innerHTML = '';

    // Render each news article
    articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(articleElement);
    });
  }

// Function to load news for a specific state
async function loadStateNews(state) {
    // Navigate to another page with state-specific news
    window.location.href = `${state.toLowerCase()}-news.html`;
}

function showMaharashtraDropdown() {
    document.getElementById('maharashtraDropdown').style.display = 'block';
}

function hideMaharashtraDropdown() {
    document.getElementById('maharashtraDropdown').style.display = 'none';
}

function showuttarPradeshDropdown() {
    document.getElementById('uttarPradeshDropdown').style.display = 'block';
}

function hideuttarPradeshDropdown() {
    document.getElementById('uttarPradeshDropdown').style.display = 'none';
}

function showtamilNaduDropdown() {
    document.getElementById('tamilNaduDropdown').style.display = 'block';
}

function hidetamilNaduDropdown() {
    document.getElementById('tamilNaduDropdown').style.display = 'none';
}



function showgujuratDropdown() {
    document.getElementById('gujuratDropdown').style.display = 'block';
}

function hidegujuratDropdown() {
    document.getElementById('gujuratDropdown').style.display = 'none';
}



function fetchNews(newsSource) {
    // Call the fetchData function with the specified news source
    fetchData(newsSource)
        .then(data => {
            renderMain(data.articles);
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

function selectLanguage(language) {
    if (language) {
        fetchNews(language);
    }
}
