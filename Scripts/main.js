"use strict";

$(`.nav-link`).on("click", function () {
  $(`.nav-link`).removeClass(`active`);
  $(this).addClass(`active`);
});

$(`.close-mark`).on("click", function () {
  $(`.detailes-section`).addClass(`d-none`);
  $(`.cards-container`).removeClass(`d-none`);
});

$(`.nav-link`).on("click", function () {
  getData(this.innerHTML);
});
//
//
//
//
//
// ============================================= //
//
//
//
//
//
async function getData(category) {
  document.querySelector(`.loading-screen`).classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fd57808abbmsh634ca72b55570a4p1ec203jsnf2c8bc8b60c7",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let recievedData = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options
  );
  let myData = await recievedData.json();
  displayData(myData);
}

async function getDetails(id) {
  document.querySelector(`.loading-screen`).classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fd57808abbmsh634ca72b55570a4p1ec203jsnf2c8bc8b60c7",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let recievedDetails = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );

  let myDetails = await recievedDetails.json();

  displayDetails(
    myDetails.thumbnail,
    myDetails.title,
    myDetails.genre,
    myDetails.platform,
    myDetails.status,
    myDetails.description
  );
}

getData("MMORPG");
//
//
//
//
//
// ============================================= //
//
//
//
//
//
function displayData(list) {
  document.querySelector(`.loading-screen`).classList.add("d-none");
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `<div class="col-md-6 col-lg-4 col-xl-3">
      <div
        class="text-white border border-1 border-dark rounded-top-3 p-2 card" onclick="getDetails(${list[i].id})"
      >
        <figure class="rounded-top-3 overflow-hidden">
          <img class="w-100" src="${list[i].thumbnail}" />
        </figure>
        <div class="d-flex justify-content-between">
          <p>${list[i].title}</p>
          <p
            class="d-inline-block nav-bar-color py-1 px-2 rounded-3 status-mark"
          >
            Free
          </p>
        </div>
        <p class="text-white-50 text-center">${list[i].short_description}</p>
        <div
          class="d-flex justify-content-between border-top border-1 border-dark pt-3"
        >
          <p class="d-inline-block bg-dark py-1 px-2 rounded-3">${list[i].genre}</p>
          <p class="d-inline-block bg-dark py-1 px-2 rounded-3">
          ${list[i].platform}
          </p>
        </div>
      </div>
    </div>
  `;
  }
  document.querySelector(".cards-container").innerHTML = container;
}

function displayDetails(
  thumbnail,
  title,
  genre,
  platform,
  status,
  description
) {
  document.querySelector(`.loading-screen`).classList.add("d-none");
  let details = `<div class="row">
    <div class="col-md-4 mb-3">
      <img src="${thumbnail}" class="w-100" />
    </div>
    <div class="col-md-8">
      <h3 class="fs-2">Title: ${title}</h3>
      <p class="fs-5">
        Category:
        <span class="bg-info py-1 px-2 rounded-3 text-black"
          >${genre}</span
        >
      </p>
      <p class="fs-5">
        Platform:
        <span class="bg-info py-1 px-2 rounded-3 text-black"
          >${platform}</span
        >
      </p>
      <p class="fs-5">
        Status:
        <span class="bg-info py-1 px-2 rounded-3 text-black">${status}</span>
      </p>
      <p>
      ${description}
      </p>
      <button class="btn btn-outline-info text-white">Show Game</button>
    </div>
  </div>
  `;

  document.querySelector(`.details-row`).innerHTML = details;
  $(`.detailes-section`).removeClass(`d-none`);
  $(`.cards-container`).addClass(`d-none`);
}
