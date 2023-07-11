// URL to retrieve games data from the backend
const gamesURL = 'http://localhost:8282/games';

document.addEventListener('DOMContentLoaded', () => {
  const gamesTable = document.getElementById('games-table');
  populateGamesTable(gamesTable);
});

// Function to populate the games table
function populateGamesTable(table) {
  fetch(gamesURL)
    .then((response) => response.json())
    .then((data) => {
      const tbody = table.querySelector('tbody');
      tbody.innerHTML = '';

      data.forEach((game) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = game.name;
        row.appendChild(nameCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = game.description;
        row.appendChild(descriptionCell);

        const developerCell = document.createElement('td');
        developerCell.textContent = game.developer;
        row.appendChild(developerCell);

        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log('Error retrieving games data:', error);
    });
}
