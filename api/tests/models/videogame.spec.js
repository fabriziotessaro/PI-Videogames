const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(async () => await Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
          description: "description",
          background_image: "img",
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });
    describe('all required fields', () => {
      it('should work when all required fields are completed', (done) => {
        Videogame.create({ 
          name: 'Metal Gear Solid',
          description: "description",
          background_image: "img",
        })
          .then(() => done())
          .catch(() => done(new Error('Some required fields are empty')));
      });
      it('should throw an error if required fields are empty, even if the other fields are full', (done) => {
        Videogame.create({ 
          rating: 'Metal Gear Solid',
          releaseDate: "description",
        }).then(() => done(new Error('It requires name, description and background_image')))
          .catch(() => done());
      });
    });
  });
});
