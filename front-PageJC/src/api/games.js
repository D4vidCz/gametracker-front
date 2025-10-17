export const MOCK_GAMES = [
  {
    id: '1',
    title: 'The Legend of Zelda: Breath of the Wild',
    coverUrl: 'https://assets.example/zelda.jpg',
    platform: 'Switch',
    releaseDate: '2017-03-03',
    genres: ['Action', 'Adventure'],
    hoursPlayed: 120,
    score: 5
  },
  {
    id: '2',
    title: 'Hades',
    coverUrl: 'https://assets.example/hades.jpg',
    platform: 'PC',
    releaseDate: '2020-09-17',
    genres: ['Roguelike'],
    hoursPlayed: 40,
    score: 4
  },
];

export async function fetchGames() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_GAMES), 600);
  });
}

export async function fetchGameById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const g = MOCK_GAMES.find(x => x.id === id);
      if (g) resolve(g);
      else reject(new Error('Game not found'));
    }, 400);
  });
}
