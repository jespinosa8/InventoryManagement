// URL's to retrieve data from backend
const randomGamesURL = 'http://localhost:8282/games/random?count=3';
const topWarehousesURL = 'http://localhost:8282/warehouses/top-warehouses';

let allGames = [];

document.addEventListener('DOMContentLoaded', () => {

  const manageWarehousesButton = document.getElementById('manage-warehouses-btn');
  manageWarehousesButton.addEventListener('click', () => {
    // Redirect to the warehouses page
    window.location.href = 'warehouses.html';
  });

  const manageGamesButton = document.getElementById('manage-games-btn');
  manageGamesButton.addEventListener('click', () => {
    // Redirect to the games page
    window.location.href = 'games.html';
  });

  getTopWarehouses();
  getRandomGames();
});

// Fetch top warehouses
function getTopWarehouses() {
  fetch(topWarehousesURL)
    .then((response) => response.json())
    .then((data) => {
      const topWarehousesElement = document.getElementById('top-warehouses');      

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
