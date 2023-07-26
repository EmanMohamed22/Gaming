////////////// global/////////
const loader =document.querySelector('.loading');
const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id");
let detailResponse ;

////////////// start//////////

(async function showDetails() {
    loader.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '541bc83293msha30c2ee4cea9d84p1a7a02jsn7cd1136901e0',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options);
    const response = await api.json()
    
    detailResponse = response
    displayData()
    loader.classList.add('d-none')
})()

function displayData() {
   detailsBox =`
   <div class="col-md-4">
   <figure>
       <img src="${detailResponse.thumbnail}" alt="">
   </figure>
</div>
<div class="col-md-8">
   <div class="">
       <h1>${detailResponse.title}</h1>
       
       <p >${detailResponse.description}</p>
   </div>
</div>
   ` 
   document.querySelector('#detailsContent').innerHTML = detailsBox
}

// ///event//
document.querySelector(".btn-close").addEventListener("click",function () {
    location.href = "./home.html"
})