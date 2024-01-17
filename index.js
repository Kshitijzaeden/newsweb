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

// Add this function to handle news fetching based on selected date
function fetchNewsBySelectedDate() {
    const selectedDate = document.getElementById("selectedDate").value;

    if (selectedDate) {
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
        console.log("Selected Date:", formattedDate);

        const query = `publishedAt:${formattedDate}`;
        console.log("Query:", query);

        fetchData(query)
        .then(data => {
            if (data.articles) {
                renderMain(data.articles);
            } else {
                console.error("Invalid response format:", data);
                alert("Error fetching news. Please try again.");
            }
        })
        .catch(error => {
            console.error("API request failed:", error);
            alert("Error fetching news. Please try again.");
        });
    }
}

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
