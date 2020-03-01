let baseImgUrl = 'https://image.tmdb.org/t/p/w500';
let baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=73c5ad84a6c042355108404f7b4d3633&language=en-US&sort_by=popularity.desc&page=';
var pages = 1;
var set = new Set();
var configSet = new Set();
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    document.getElementById("loading").style.display='none';
  }
}
window.addEventListener('DOMContentLoaded', getMovieList(pages));


function getMovieList(pages) {
    // console.log(pages);
    let url = "".concat(baseURL, pages.toString());
    fetch(url)
      .then( (res) => res.json())
      .then( (data) => {
        let total_result = data.total_results;
        let total_pages = data.total_pages;
        document.getElementById('total').innerText = "Page " + pages + "/ Total " + total_pages + " of " + total_result + " results";
        for (let x = 0; x < data.results.length; x++) {
          //movie poster
          let imgName = data.results[x].original_title;
          let imgUrl = "".concat(baseImgUrl, data.results[x].poster_path);
          let image = document.createElement("img");
          let id = data.results[x].id;
          image.setAttribute("src", imgUrl);
          image.setAttribute("alt", imgName);
          image.setAttribute("class", "img");
          image.setAttribute("id", id);
          image.id = id;
          image.url = imgUrl;
          image.title = data.results[x].title;
          image.release = data.results[x].release_date;
          image.overview = data.results[x].overview;
          image.genre = data.results[x].genre;
          //movie title and relearse date
          let title = document.createElement("p")
          title.innerText = image.title;
          title.setAttribute("class", "title");
          let releaseDate = document.createElement("p");
          releaseDate.innerText = image.release;
          //put them into a div
          let div = document.createElement("div");
          div.setAttribute("class", "movieDetail");
          div.appendChild(image);
          div.appendChild(title);
          div.appendChild(releaseDate);

          let like = document.createElement("a");
          like.innerHTML = "Like It!";
          like.setAttribute("id", "like");
          like.setAttribute("class", "like");
          like.setAttribute("href","javascript:void(0)");
          div.appendChild(like);

          like.addEventListener('click', ()  => {
            if (!set.has(image)) {
              set.add(image);
              addToList(set, image);
            }
          });
          document.getElementById('container').appendChild(div);
          document.getElementById(id).addEventListener('click', () => getDetails(image));
        }
      });
}

document.getElementById('pageIn').addEventListener('click', () => {
  pages++;
  document.getElementById('container').innerHTML = '';
  getMovieList(pages);
});
document.getElementById('pageDe').addEventListener('click', () => {
  pages--;
  if (pages <= 0) {
    pages = 1;
  }
  document.getElementById('container').innerHTML = '';
  getMovieList(pages);
});

function addToList(set, image) {
  let likeList = document.getElementById('likedList');

  document.getElementById('totalLike').innerHTML = set.size.toString();
  document.getElementById('totalLike').style.display = "block";
  likeList.style.display = "block";


  let title = document.createElement("p")
  title.innerText = image.title;
  title.setAttribute("class", "title");
  let releaseDate = document.createElement("p");
  releaseDate.innerText = image.release;

  let url = image.url;
  let likedImg = document.createElement('img');
  likedImg.setAttribute("src", url);
  likedImg.setAttribute("class", "img");

  let contain = document.getElementById("subList");
  let div = document.createElement("div");
  div.setAttribute("class", "likedList");
  div.appendChild(likedImg);
  div.appendChild(title);
  div.appendChild(releaseDate);
  contain.appendChild(div);
  let index = Array.prototype.indexOf.call(contain.children, div);
  div.setAttribute("id", index.toString());
}
document.getElementById('config').addEventListener('click', () => {
  configFunc(set);
});

function configFunc(set) {
  set.forEach(image => generateConfig(image));
  document.getElementById('congfigFade').style.display='block';
}

function generateConfig(image) {
  let title =document.createElement('div');
  title.innerHTML = image.title;
  title.setAttribute("class", "drag");
  title.setAttribute("draggable", "true");
  title.setAttribute("ondragstart", "handleDragStart(event,this)");
  title.setAttribute("ondragover", "handleDragOver(event,this)");
  title.setAttribute("ondragend", "handleDragEnd(event,this)");
  title.setAttribute("ondragenter", "handleDragEnter(event,this)");
  let parent = document.getElementById('configPage');
  let id = image.id;
  if (configSet.size !== configSet.add(id).size) {
    parent.appendChild(title);
    let ind = Array.prototype.indexOf.call(parent.children, title);
    title.index = ind;
  }
}



function closeConfig() {
  document.getElementById('congfigFade').style.display='none';
}

document.getElementById("likedList").addEventListener('click', () => {
  // document.getElementById("normal").style.width = '0px';
  document.getElementById("normal").style.height = '0px';
  document.getElementById("normal").style.visibility = 'hidden';
  setTimeout(() => {
    // document.getElementById("normal").style.display = 'none';
    document.getElementById("liked").style.display = 'block';
    document.getElementById("config").style.display ='block';}, 100);

});

document.getElementById("normalList").addEventListener('click', () => {
  document.getElementById("normal").style.height = '1456.88px';
  document.getElementById("normal").style.visibility = 'visible';


    document.getElementById("normal").style.display = 'block';
    document.getElementById("config").style.display = 'none';
    document.getElementById("liked").style.display = 'none';


});



function getDetails(image) {
  document.getElementById("loading").style.display='block';
  if (document.readyState === 'complete') {
    document.getElementById("loading").style.display='none';
  }

  let img = document.createElement("img");
  let title = document.createElement("h2");
  let overview = document.createElement("p");
  let genres = document.createElement("ul");
  let company = document.createElement("ul");
  overview.innerText = image.overview;
  let releaseDate = image.release.toString().substring(0,4);
  title.innerText = image.title + '(' + releaseDate +')';
  img.setAttribute("src", image.url);
  img.setAttribute("alt", "img");
  img.setAttribute("id", "dropImg");
  img.setAttribute("class", "dropImg");
  genres.setAttribute("id", "genres");
  genres.setAttribute("class", "genres");
  company.setAttribute("id", "company");
  company.setAttribute("class", "company");
  document.getElementById('light').appendChild(img);
  document.getElementById('leftContent').appendChild(title);
  document.getElementById('leftContent').appendChild(genres);
  document.getElementById('leftContent').appendChild(overview);
  document.getElementById('leftContent').appendChild(company);
  let url = 'https://api.themoviedb.org/3/movie/' + image.id + '?language=en-US&api_key=73c5ad84a6c042355108404f7b4d3633';
  fetch(url)
    .then((res) => res.json())
    .then ((data) => {
      let genres = data.genres;
      for(let i = 0; i < genres.length; i++) {
        let type = document.createElement("li");
        type.innerHTML = genres[i].name;
        type.style.backgroundColor = getRandomColor();
        document.getElementById('genres').appendChild(type);
      }

      let companies = data.production_companies;
      for (let i = 0; i < companies.length; i++) {
        let logoUrl = 'https://image.tmdb.org/t/p/w500' + companies[i].logo_path;
        let templi = document.createElement("li");
        templi.setAttribute("id", i.toString());
        document.getElementById('company').appendChild(templi);
        let logo = document.createElement("img");
        logo.src = logoUrl;
        document.getElementById(i).appendChild(logo);
      }
    });
  document.getElementById(image.id).onclick = document.getElementById('light').style.display='flex';
  document.getElementById(image.id).onclick = document.getElementById('fade').style.display='block';
}

function closeAll() {
  document.getElementById("dropImg").remove();
  document.getElementById("leftContent").innerHTML="";
  document.getElementById('light').style.display='none';
  document.getElementById('fade').style.display='none';
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Drag sth
let fromDom = null,
   toDom = null,
   lastDom = null;

function handleDragStart(e, dom) {
  lastDom = fromDom = dom;
  dom.style.opacity = 0.4;
}

function handleDragEnd(e,dom){
  dom.style.opacity = "";
  toDom = null;
}

function handleDragEnter(e, dom) {
  toDom = dom;
  if(fromDom === lastDom){
    //第一次调换
    swapDom(lastDom, toDom);
    lastDom = toDom;
  }else{
    if(lastDom === toDom){return;}
    swapDom(fromDom,lastDom);
    swapDom(fromDom,toDom);
    lastDom = toDom;
  }
}

function handleDragOver(e, dom) {
  e.preventDefault();
  e.dataTransfer.effectAllowed = "move";
}

function swapDom(a, b) {
  let obj1 = document.getElementById(a.index.toString());
  let obj2 = document.getElementById(b.index.toString());
  swapElements(obj1, obj2);
  let temp = a.innerHTML;
  a.innerHTML = b.innerHTML;
  b.innerHTML = temp;
}

function swapElements(obj1, obj2) {
  // create marker element and insert it where obj1 is
  let temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);

  // move obj1 to right before obj2
  obj2.parentNode.insertBefore(obj1, obj2);

  // move obj2 to right before where obj1 used to be
  temp.parentNode.insertBefore(obj2, temp);

  // remove temporary marker node
  temp.parentNode.removeChild(temp);
}





