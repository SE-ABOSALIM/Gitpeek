const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const profileContainer = document.querySelector(".profile-container");
const errorMessage = document.querySelector(".error");
const template = document.getElementsByTagName("template")[0];

const errors = {
    notFound: "User not found!",
    forbidden: "Rate limit exceeded or access forbidden!",
    server: "GitHub server error. Please try again later.",
    other: "Unexpected error"
}

async function getData() {
    const searchInputText = searchInput.value.trim();

    if (!searchInputText) throw new Error("Username field is empty. Please enter a username");

    const profileLink = "https://api.github.com/users/" + searchInputText;
    const result = await fetch(profileLink);

    if (result.ok) {
        return await result.json();
    } else if (result.status === 404) {
        throw new Error(errors.notFound);
    } else if (result.status === 403) {
        throw new Error(errors.forbidden);
    } else if (result.status === 500) {
        throw new Error(errors.server);
    } else {
        throw new Error(`${errors.other} (${result.status})`);
    }
}

function handleProfileSearch() {
    errorMessage.innerText = "";

    let profile = getData();
    
    profile.then((profile) => {
        profileContainer.innerHTML = "";
        saveLocalStorage(profile);
        addProfileToDom(profile);
    })
    .catch(error => {
        hideProfileContainer();
        errorMessage.textContent = error;
        showErrorMessage();
    });
}


function addProfileToDom(profile) {

    if(profile.avatar_url) {
        const profileImg = document.createElement("img");
        profileImg.className = "img";
        profileImg.src = profile.avatar_url;
        profileImg.alt = "Profile Photo";
        profileContainer.prepend(profileImg);
    }

    const regex = /\d{4}-\d{2}-\d{2}/ig;

    if(profile.created_at || profile.updated_at) {
        profile.created_at = profile.created_at.match(regex);
        profile.updated_at = profile.updated_at.match(regex);
    }
    
    // DocumentFragment: DOM'a bağlı olmayan geçici bir kutu.
    // İçine elemanları doldur, DOM'u yormadan hazırla.
    // En son tek seferde gerçek DOM'a ekle → performans artar.
    const fragment = document.createDocumentFragment();

    for(let key in profile) {

        const value = profile[key];
        if(!value) continue;
        if(key === "login") key = "Username";
        if(key === "node_id") continue;

        const clone = template.content.cloneNode(true);
        const text = clone.querySelector(".text");

        text.append(`${key}: `);

        
        if(key === "html_url") {
            text.textContent = "Html Page: ";
            const link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.className = "link";
            link.href = value;
            link.textContent = "Here";
            text.appendChild(link);
        } else {
            text.append(value);
        }

        if(typeof value === "string" && value.startsWith("http") && key !== "html_url") continue;
        
        fragment.appendChild(clone);
    }
    
    profileContainer.appendChild(fragment);
    showProfileContainer();
}

function saveLocalStorage(profile) {
    const toJson = JSON.stringify(profile);
    window.localStorage.setItem("profile", toJson);
}

function loadLocalStorage() {
    const profile = window.localStorage.getItem("profile");
    if(!profile) return;
    const toJsObj = JSON.parse(profile);
    addProfileToDom(toJsObj);
}

function showProfileContainer() {
    profileContainer.classList.remove("hidden");
}

function showErrorMessage() {
    errorMessage.classList.remove("hidden");
}

function hideProfileContainer() {
    profileContainer.classList.add("hidden");
}

function hideErrorMessage() {
    errorMessage.classList.add("hidden");
}

searchBtn.addEventListener("click", handleProfileSearch);
searchInput.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        handleProfileSearch();
    }  
});

window.onload = () => {
    loadLocalStorage();
};