const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreButton = document.getElementById("show-more-btn");
const Clearsearch = document.getElementById("clear-search-btn");

const acessKey = "XR9p59yQ_F7NJDuWAVOzErmnIZ7MKtH4bXify8DsrcA";
let keyword="";
let page=1;

async function searchImages(){
    keyword=searchBox.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${acessKey}&per_page=12`;


    const response= await fetch(url);
    const data= await response.json();

    if(page ===1){
        searchResult.innerHTML="";
    }

    const results=data.results;
    results.map((result)=>{
        const image=document.createElement("img");
        image.src=result.urls.small;

        const imagelink= document.createElement("a");
        imagelink.href=result.links.html;
        imagelink.target="_blank";

        imagelink.appendChild(image);
        searchResult.appendChild(imagelink)
    })
    searchMoreButton.style.display="block";
    Clearsearch.style.display="block";

}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    searchImages();
})


searchMoreButton.addEventListener("click",()=>{
    page++;
    searchImages();
})

Clearsearch.addEventListener("click",()=>{
    searchResult.innerHTML="";
    Clearsearch.style.display="none";
    searchMoreButton.style.display="none";
     searchBox.value="";
})