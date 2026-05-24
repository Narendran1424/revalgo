const header=document.querySelector("header");
async function loadQuotes() {
  try {
    const resp = await fetch("./assets/json/quote.json")
    const data = await resp.json()
   
    if(!sessionStorage.getItem("quotes")){
      sessionStorage.setItem('quotes',JSON.stringify(data))
    }
  } catch (err) {
    console.error("Error:", err)
  }
}

loadQuotes();

async function init() {
  await loadQuotes();
  initializeSearch();
}
init();


document.querySelectorAll(".profile-container").forEach((container) => {
  const profileMenu = container.querySelector(".profile-menu");
  const profiles = container.querySelectorAll(".user-profile");

  container.addEventListener("click", () => {
    profileMenu.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-container")) {
      profileMenu.classList.remove("active");
    }
  });
});

const searchHeaderInput =header.querySelector(".search-quote-input");
const searchHeaderBtn =document.querySelector(".search-quote-btn");
let allQuotes;
const nameWrapper=header.querySelector(".name-wrapper");
const nameList=header.querySelector(".name-list");
const idWrapper=header.querySelector(".id-wrapper");
const idList=header.querySelector(".id-list");
const poWrapper=header.querySelector(".po-wrapper");
const poList=header.querySelector(".po-list");
const globalDropDown=header.querySelector(".global-dropdown")
let searchedQuotes=[];

function searchHeaderQuotes() {
  const value = searchHeaderInput.value.trim().toLowerCase();

  idList.innerHTML = "";
  nameList.innerHTML = "";
  poList.innerHTML = "";

  if (value === "") {
    globalDropDown.classList.remove("active");
    return;
  }

  globalDropDown.classList.add("active");

   searchedQuotes = allQuotes.filter(q => {

    const isIdMatch =q.id.toString().toLowerCase().includes(value);

    const isNameMatch =q.name.toLowerCase().includes(value);

    const isPoMatch =q.po_no &&q.po_no.toString().toLowerCase().includes(value);

    // render lists
    if (isIdMatch) {
    idList.innerHTML += `
      <li 
        data-type="id"
        data-value="${q.id}">
        ${q.id}
      </li>
    `;
  }

  if (isNameMatch) {
    nameList.innerHTML += `
      <li 
        data-type="name"
        data-value="${q.name}">
        ${q.name}
      </li>
    `;
  }

  if (isPoMatch) {
    poList.innerHTML += `
      <li 
        data-type="po"
        data-value="${q.po_no}">
        ${q.po_no}
      </li>
    `;
  }

    // filter condition
    return isIdMatch || isNameMatch || isPoMatch;

  });




  // hide empty sections
  idWrapper.classList.toggle(
  "not-active",!idList.children.length);

  nameWrapper.classList.toggle(
  "not-active",!nameList.children.length);

  poWrapper.classList.toggle(
  "not-active",!poList.children.length);

  if(!idList.children.length && !nameList.children.length && !poList.children.length){
    globalDropDown.classList.remove("active")
  }

  

}

function handleSearchItemClick(e){

  const li = e.target.closest("li");

  if(!li) return;

  const type = li.dataset.type;
  const value = li.dataset.value.toLowerCase();

  let filteredQuote = [];

  if(type === "id"){
    filteredQuote = allQuotes.filter(
      q => q.id.toString().toLowerCase() === value
    );
  }

  if(type === "name"){
    filteredQuote = allQuotes.filter(
      q => q.name.toLowerCase() === value
    );
  }

  if(type === "po"){
    filteredQuote = allQuotes.filter(
      q => q.po_no &&
      q.po_no.toString().toLowerCase() === value
    );
  }

  sessionStorage.setItem(
    "searchedQuotes",
    JSON.stringify(filteredQuote)
  );

  sessionStorage.setItem(
    "searchedItem",
    JSON.stringify(value)
  );

  window.location.href = "./global.html";
}

globalDropDown.addEventListener("click", handleSearchItemClick);

function initializeSearch() {
   allQuotes=JSON.parse(sessionStorage.getItem("quotes"));
  searchHeaderInput.addEventListener("input", () => {
    searchHeaderQuotes();
  });

  searchHeaderInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = searchHeaderInput.value.trim().toLowerCase()
      searchHeaderQuotes();


      if(value!=""){
        sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
        sessionStorage.setItem("searchedItem",JSON.stringify(value));
        searchHeaderInput.value = "";

        window.location.href = "./global.html";
      }
    }

  });

  searchHeaderBtn.addEventListener("click", () => {
    const value = searchHeaderInput.value.trim().toLowerCase();
    if(value!=""){

      sessionStorage.setItem("searchedQuotes",JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem",JSON.stringify(value));
      searchHeaderInput.value = "";

      window.location.href = "./global.html";
    }

  });
}


const logoutBtn=header.querySelector(".logout-btn");

logoutBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if(localStorage.getItem("loginDetails")){
    localStorage.removeItem("loginDetails")
  }
  window.location.href="./index.html";
})
