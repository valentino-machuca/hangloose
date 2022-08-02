const app = require('../../src/app.js');
const { Videogame } = require('../../src/db.js');
const supertest = require('supertest');

const sv = supertest(app);

const videogame = {
  name: 'Valorant',
  description: 'A shooter game',
  rating: 4.5,
  publisher: 'Riot Games',
};

describe('Videogames /GET test:', () => {
    Videogame.sync({ force: true })
    .then(async () => await Videogame.create(videogame));
  it('Must be return 200 status on get videogames', async () => {
    let response = await sv.get('/videogames');
    expect(response.statusCode).toBe(200);
  });
});
