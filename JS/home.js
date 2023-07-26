// /-----------global------------/ 
const loader =document.querySelector('.loading');
const theme = document.getElementById('mode')
// ----------start--------/

getGames("mmorpg");


// -------------events----------/
document.querySelectorAll(".menu a").forEach(function(item){
item.addEventListener("click",function(){
    document.querySelector(".menu .active").classList.remove("active");
    item.classList.add("active");
   const categryName= item.getAttribute('data-category');
    getGames(categryName)
})
})


document.querySelector('.logout-btn').addEventListener('click', function () {
    localStorage.removeItem('token');
    location.href ='./index.html'
})


theme.addEventListener('click', function(){
    if (theme.classList.contains('fa-sun')) {
        theme.classList.replace('fa-sun','fa-moon');
        document.querySelector('html').setAttribute('data-theme','light')
    } else {
        theme.classList.replace('fa-moon','fa-sun');
        document.querySelector('html').setAttribute('data-theme','dark')
    }
})
//------------functions--------/
async function getGames(category) {
    loader.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '541bc83293msha30c2ee4cea9d84p1a7a02jsn7cd1136901e0',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,options);
    const response = await api.json()
    displayGames(response);
    console.log(response);
    loader.classList.add('d-none')
    
}

function displayGames(games) {
    let game = ``;
    for (let i = 0; i < games.length; i++) {
     let videoPath = games[i].thumbnail.replace("thumbnail.jpg","videoplayback.webm");

    game += `
    <div class="col-md-3">
    <div onmouseenter="startVideo(event)" onmouseleave="closeVideo(event)" onclick="showDetails(${games[i].id})"
     class="card h-100 bg-transparent"
     role="button" >
       <div class="card-body">
          <figure class="position-relative">
             <img class="card-img-top object-fit-cover h-100" src="${games[i].thumbnail}" />
             <video muted loop preload="none" class="d-none w-100 h-100 top-0 start-0 position-absolute z-3" src="${videoPath}"></video>
           
          </figure>

          <figcaption>

             <div class="hstack justify-content-between">
                <h3 class="h6 small">${games[i].title}</h3>
                <span class="badge text-bg-primary p-2">Free</span>
             </div>

             <p class="card-text small text-center opacity-50">
                ${games[i].short_description?.split(" ", 8)}
             </p>

          </figcaption>
       </div>

       <footer class="card-footer small hstack justify-content-between">

          <span class="badge badge-color">${games[i].genre}</span>
          <span class="badge badge-color">${games[i].platform}</span>

       </footer>
    </div>
 </div> `
        
    }
    document.getElementById("gameData").innerHTML = game;
}

function startVideo(event) {
    let video = event.target.querySelector('video');
    video.classList.remove('d-none');
    video.play();
    video.muted = true
    console.log(video);
}


function closeVideo(event) {
    let video = event.target.querySelector('video');
    video.classList.add('d-none');
    video.pause();
    video.muted = true
    console.log(video);
}

function showDetails(id){
     location.href = `./details.html?id=${id}`;
    
}
