const charactersContainer = document.querySelector(".characters");
const houseButtons = document.querySelectorAll(".houses > div");
const menuBtn = document.querySelector("#menu-btn");
const menuNav = document.querySelector(".nav-menu");

let initialCharacters = [];

if (charactersContainer) {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      initialCharacters = data.slice(0, 20);
      renderCharacters(initialCharacters);
    });

  function renderCharacters(list) {
    charactersContainer.innerHTML = "";

    list.forEach((char) => {
      const imageUrl = char.image ? char.image : "./images/troll.jpg";
      const houseClass = char.house ? char.house : "";

      const card = `
        <div class="${houseClass}">
          <a href="details.html?id=${char.id}">
            <img src="${imageUrl}" alt="${char.name}" />
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

      const filtered = initialCharacters.filter(
        (char) => char.house === selectedHouse
      );

      filtered.sort((a, b) => a.name.localeCompare(b.name));

      renderCharacters(filtered);
    });
  });
}

if (menuBtn && menuNav) {
  menuBtn.addEventListener("click", () => {
    if (menuNav.style.display === "none") {
      menuNav.style.display = "flex";
    } else {
      menuNav.style.display = "none";
    }
  });
}