const charactersContainer = document.querySelector(".characters");
const houseButtons = document.querySelectorAll(".houses > div");
const menuBtn = document.querySelector("#menu-btn");
const navMenu = document.querySelector("#nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

if (charactersContainer) {
  let allCharacters = [];

  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      allCharacters = data;
      renderCharacters(allCharacters);
    });

  function renderCharacters(list) {
    charactersContainer.innerHTML = "";

    list.forEach((char) => {
      const imageUrl = char.image ? char.image : "./images/troll.jpg";
      const houseClass = char.house ? char.house : "";
      const deadClass = char.alive === false ? "dead" : "";

      const card = `
        <div class="${houseClass}">
          <a href="details.html?id=${char.id}">
            <img class="${deadClass}" src="${imageUrl}" alt="${char.name}" />
            <p>${char.name}</p>
          </a>
        </div>
      `;
      charactersContainer.innerHTML += card;
    });
  }

  houseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedHouse = btn.getAttribute("data-house");

      const filtered = allCharacters.filter(
        (char) => char.house === selectedHouse
      );

      filtered.sort((a, b) => a.name.localeCompare(b.name));

      renderCharacters(filtered);
    });
  });
}

const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

if (characterId) {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      const char = data.find((c) => c.id === characterId);
      if (!char) return;

      const titleElem = document.getElementById("char-name-title");
      if (titleElem) titleElem.innerText = char.name.toUpperCase();

      const actorElem = document.getElementById("char-actor");
      if (actorElem) actorElem.innerText = char.actor || "Inconnu";

      const genderElem = document.getElementById("char-gender");
      if (genderElem) genderElem.innerText = char.gender || "-";

      const eyeElem = document.getElementById("char-eye");
      if (eyeElem) eyeElem.innerText = char.eyeColour || "-";

      const hairElem = document.getElementById("char-hair");
      if (hairElem) hairElem.innerText = char.hairColour || "-";

      const dobElem = document.getElementById("char-dob");
      if (dobElem) dobElem.innerText = char.dateOfBirth || "-";

      const patronusElem = document.getElementById("char-patronus");
      if (patronusElem) patronusElem.innerText = char.patronus || "-";

      const nicknamesElem = document.getElementById("char-nicknames");
      if (nicknamesElem) {
        nicknamesElem.innerText =
          char.alternate_names && char.alternate_names.length > 0
            ? char.alternate_names.join(", ")
            : "Aucun";
      }

      const imgElem = document.getElementById("char-img");
      if (imgElem) {
        imgElem.src = char.image || "./images/troll.jpg";
        imgElem.alt = char.name;

        if (char.alive === false) {
          imgElem.classList.add("dead");
        } else {
          imgElem.classList.remove("dead");
        }
      }

      const houseLogoElem = document.getElementById("char-house-logo");
      if (houseLogoElem) {
        if (char.house) {
          houseLogoElem.src = `./images/logo/${char.house}.png`;
          houseLogoElem.alt = char.house;
          houseLogoElem.style.display = "block";
        } else {
          houseLogoElem.style.display = "none";
        }
      }
    });
}