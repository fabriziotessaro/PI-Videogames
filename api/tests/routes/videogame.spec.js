/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Metal Gear Solid',
  description: 'saracatunga',
  background_image: 'imagen'
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /genres', () => {
    it('/genres should get 200', () =>
      agent.get('/genres').expect(200)
    );
  });
  describe('GET /platforms', () => {
    it('/platforms should get 200', () =>
      agent.get('/platforms').expect(200)
    );
  });
  describe('GET /videogame/3328(idVideogame)', () => {
    it('/videogame/3328 should get 200', () =>
      agent.get('/videogame/3328').expect(200)
    );
  });
});
