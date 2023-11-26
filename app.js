const starwars = [
  { id: 1, name: "Luke Skywalker", pic: "images/lukesky.png", homeworld: "tatooine" },
  { id: 11, name: "Anakin Skywalker", pic: "images/anokinskywalker.png", homeworld: "tatooine" },
  { id: 10, name: "Obi-Wan Kenobi", pic: "images/obivankenobi.png", homeworld: "stewjon" },
  { id: 3, name: "R2-D2", pic: "images/r2d2.png", homeworld: "naboo" },
  { id: 20, name: "Yoda", pic: "images/yoda.png" },
  { id: 4, name: "Darth Vader", pic: "images/dartvader.png", homeworld: "tatooine" },
  { id: 5, name: "Leia Organa", pic: "images/leiaorgana.png", homeworld: "alderaan" },
  { id: 21, name: "Palpatine", pic: "images/palpatine.png", homeworld: "naboo" },
  { id: 9, name: "Biggs Darklighter", pic: "images/biggsdarklighter.png", homeworld: "tatooine" },
  { id: 16, name: "Jabba Desilijic Tiure", pic: "images/jabadesilic.png", homeworld: "tatooine" },
  { id: 8, name: "R5-D4", pic: "images/r5d4.png", homeworld: "tatooine" },
  { id: 2, name: "C-3PO", pic: "images/c3po.png", homeworld: "tatooine" },
  { id: 12, name: "Wilhuff Tarkin", pic: "images/willvuf.png", homeworld: "eriadu" },
  { id: 13, name: "Chewbacca", pic: "images/chewbacca.png", homeworld: "kashyyyk" },
  { id: 14, name: "Han Solo", pic: "images/hansolo.png", homeworld: "corellia" },
  { id: 15, name: "Greedo", pic: "images/greeodo.png", homeworld: "Rodia" },
  { id: 18, name: "Wedge Antilles", pic: "images/wedgeantitles.png", homeworld: "corellia" },
  { id: 6, name: "Owen Lars", pic: "images/owenlars.png", homeworld: "tatooine" },
  { id: 7, name: "Beru Whitesun lars", pic: "images/berul.jpeg", homeworld: "tatooine" },
  { id: 19, name: "Jek Tono Porkins", pic: "images/jectonoporkins.png", homeworld: "bestine" }
];

const row = document.querySelector(".row");
let isStatus = true;
let filteredHomeworld = null;

document.getElementById("show-btn").addEventListener("click", function (e) {
  if (isStatus) {
    row.innerHTML = starwars.map(character => `
      <div class="col-lg-3 mb-5">
        <div class="card">
          <div class="card-header">
            <img src="${character.pic}">
          </div>
          <div class="card-body">
            <h2 class="card-title">${character.name}</h2>
            <p class="card-text">${character.homeworld || "Unknown"}</p> 
          </div>
        </div>
      </div>
    `).join("");

    const style = isStatus
      ? "width: 150px; height: 50px; margin: 50px; background: #440c0c; color:white;"
      : "width: 150px; height: 50px; margin: 50px; background: silver;color:black;";
    
    e.target.style.cssText = style;
    e.target.textContent = isStatus ? "Kaldır" : "Listele";
    isStatus = !isStatus;
  } else {
    document.querySelectorAll(".col-lg-3").forEach(card => card.remove());
    const style = isStatus
      ? "width: 150px; height: 50px; margin: 50px; background: silver;color:black;"
      : "width: 150px; height: 50px; margin: 50px; background: #440c0c; color:white;";
    
    e.target.style.cssText = style;
    e.target.textContent = isStatus ? "Listele" : "Kaldır";
    isStatus = !isStatus;
  }
});
let homeworldsRaw = starwars.map((character) => character.homeworld);

console.log("Raw Anavatanlar:", homeworldsRaw);

homeworldsRaw = homeworldsRaw.map((homeworld) =>
  homeworld !== undefined && homeworld !== null
    ? homeworld.toLowerCase()
    : "other"
);

console.log(
  "Raw Anavatanlar (Undefined Değiştirilmiş ve Küçük Harfe Çevrilmiş):",
  homeworldsRaw
);

const homeworldsUnique = [...new Set(homeworldsRaw)];

console.log("Unique Anavatanlar:", homeworldsUnique);
let homeworldsLowercase = [];

for (const character of starwars) {
  const homeworld =
    character.homeworld !== undefined && character.homeworld !== null
      ? character.homeworld.toLowerCase()
      : "other";

  if (!homeworldsLowercase.includes(homeworld)) {
    homeworldsLowercase.push(homeworld);
  }
}

console.log(
  "Lowercase Anavatanlar (Tekrarlananlar Önlenmiş):",
  homeworldsLowercase
);
const homeworlds = homeworldsLowercase;

const form = document.getElementById("homeworldForm");
const selectedHomeworldSpan = document.getElementById("selectedHomeworld");
const filterButton = document.getElementById("filter-btn");

homeworlds.forEach((anavatan, index) => {
  const lowercaseAnavatan = anavatan.toLowerCase();

  const div = document.createElement("div");
  div.classList.add("form-check", "form-check-inline");

  const input = document.createElement("input");
  input.type = "radio";
  input.classList.add("form-check-input");
  input.name = "homeworld";
  input.id = `homeworld${index}`;
  input.value = lowercaseAnavatan;

  const label = document.createElement("label");
  label.classList.add("form-check-label");
  label.htmlFor = `homeworld${index}`;
  label.textContent = anavatan;

  div.appendChild(input);
  div.appendChild(label);

  form.appendChild(div);

  input.addEventListener("change", () => {
    filteredHomeworld = lowercaseAnavatan;
    selectedHomeworldSpan.textContent = anavatan;
  });
});

filterButton.addEventListener("click", function () {
  if (filteredHomeworld !== null) {
    const filteredCharacters = starwars.filter(
      (character) =>
        character.homeworld &&
        character.homeworld.toLowerCase() === filteredHomeworld
    );

    row.innerHTML = "";

    for (const character of filteredCharacters) {
      row.innerHTML += `
      <div class="col-lg-3 mb-5">
      <div class="card">
        <div class="card-header">
          <img src="${character.pic}">
        </div>
        <div class="card-body">
          <h2 class="card-title">${character.name}</h2>
          <p class="card-text">${character.homeworld || "Unknown"}</p> 
        </div>
      </div>
    </div>
        `;
    }
  }
});
$(function () {
  FastClick.attach(document.body);

  var lightsaberHandle = $(".lightsaber__handle"),
    lightsaber = $(".lightsaber"),
    mask = $(".mask"),
    tooltip = $(".tooltip");

  lightsaberHandle.on("click", function () {
    lightsaber.toggleClass("lightsaber--on");
    mask.toggleClass("mask--on");
    tooltip.toggleClass("puff-left");
  });

  setTimeout(function () {
    tooltip.addClass("show");
  }, 1000);
});
