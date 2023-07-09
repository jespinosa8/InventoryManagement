// URL's to retrieve data from backend
const gamesURL = 'http://localhost:8282/games';
const randomGamesURL = 'http://localhost:8282/games/random?count=3';
const warehouseURL = 'http://localhost:8282/warehouses';
const topWarehousesURL = 'http://localhost:8282/warehouses/top-warehouses';

let allGames = [];

document.addEventListener('DOMContentLoaded', () => {
  getTopWarehouses();
  getRandomGames();
});

// Fetch top warehouses
function getTopWarehouses() {
  fetch(topWarehousesURL)
    .then((response) => response.json())
    .then((data) => {
      const topWarehousesElement = document.getElementById('top-warehouses');
      const capacityElement = document.getElementById('warehouse-capacity');

      // Display the names and capacity in a list format
      const warehouseHTML = data
        .map(
          (warehouse) =>
            `<li>${warehouse.name} (Capacity: ${warehouse.capacity})</li>`
        )
        .join('');

      topWarehousesElement.innerHTML = warehouseHTML;
    })
    .catch((error) => {
      console.log('Error retrieving top warehouse data: ', error);
    });
}

// Fetch random games for homepage
function getRandomGames() {
  fetch(randomGamesURL)
    .then((response) => response.json())
    .then((data) => {
      // Inside the fetch success callback
      const randomGamesContainer = document.getElementById(
        'random-games-container'
      );

      data.forEach((game) => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-card');

        const title = document.createElement('h6');
        title.textContent = game.name;
        gameDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = `Description: ${game.description}`;
        gameDiv.appendChild(description);

        const developer = document.createElement('p');
        developer.textContent = `Developer: ${game.developer}`;
        gameDiv.appendChild(developer);

        randomGamesContainer.appendChild(gameDiv);
      });
    })
    .catch((error) => {
      console.log('Error retrieving game data: ', error);
    });
}
