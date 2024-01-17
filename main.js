// var filmsApi = "http://localhost:3000/films";

// function start() {
//   getFilms(renderFilms); //(films) => {renderFilms(films);});
//   handleCreateFilms();
// }

// start();

// function getFilms(callback) {
//   fetch(filmsApi)
//     .then((response) => response.json())
//     .then(callback);
// }

// function renderFilms(films) {
//   var filmsList = document.querySelector(".films-list");
//   var html = films.map((film) => {
//     var date = new Date(film.released);
//     var year = date.getFullYear();
//     return `<div class="col-lg-2 col-md-3 col-sm-4 col-6 film-${film.id}" >
//           <div class="film"  data-quality = "${film.quality}">
//             <div class="img-wrap">
//               <img class="film-img" src="${film.image}" alt="" />
//               <i class="fa-solid fa-play"></i>
//               <span class="delete-btn d-none" onclick = "handleDeleteFilm(${film.id})">&times;</span>
//             </div>
//             <div class="film-title" data-title = "${film.name}"><a href="${film.link}">${film.name}</a></div>
//             <div class="group-info">
//               <div class="released">${year}</div>
//               <div class="time">${film.duration} mins</div>
//               <div class="IMDB">${film.IMDB}/10</div>
//             </div>
//           </div>
//         </div>`;
//   });
//   var htmls = html.join("");
//   filmsList.innerHTML = htmls;
// }
// function createFilm(data, callback) {
//   var options = {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.

//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(filmsApi, options)
//     .then((response) => response.json())
//     .then(callback);
// }

// function handleDeleteFilm(id) {
//   var options = {
//     method: "DELETE", // *GET, POST, PUT, DELETE, etc.

//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   };
//   fetch(filmsApi + "/" + id, options)
//     .then((response) => response.json())
//     .then(() => {
//       var film = document.querySelector(".film-" + id);
//       if (film) {
//         film.remove();
//       }
//     });
// }
// function handleCreateFilms() {
//   var createBtn = document.querySelector(".create-btn");

//   createBtn.onclick = () => {
//     var name = document.querySelector('.create-film input[name="Name"]').value;
//     var duration = document.querySelector(
//       '.create-film input[name="Duration"]'
//     ).value;
//     var imdb = document.querySelector('.create-film input[name="IMDB"]').value;
//     var released = document.querySelector(
//       '.create-film input[name="Released"]'
//     ).value;
//     var image = document.querySelector(
//       '.create-film input[name="Image"]'
//     ).value;
//     var description = document.querySelector(
//       '.create-film input[name="Description"]'
//     ).value;
//     var genre = document.querySelector(
//       '.create-film input[name="Genre"]'
//     ).value;
//     var country = document.querySelector(
//       '.create-film input[name="Country"]'
//     ).value;
//     var link = document.querySelector('.create-film input[name="Link"]').value;
//     var quality = document.querySelector(
//       '.create-film input[name="Quality"]'
//     ).value;

//     var formData = {
//       name: name,
//       duration: duration,
//       IMDB: imdb,
//       released: released,
//       image: image,
//       description: description,
//       genre: genre,
//       country: country,
//       link: link,
//       quality: quality,
//     };
//     createFilm(formData, () => {
//       getFilms(renderFilms);
//     });
//   };
// }

// // let user = {}; // a user without "address" property

// // alert(user.address?.street); // Error!

// let html = document.querySelector(".elem")?.innerHTML; // error if it's null
// console.log(html);
