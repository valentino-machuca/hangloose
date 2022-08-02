const { Videogame, conn } = require('../../src/db.js');

describe('Videogame database model', () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
    });
    describe('Validators', () => {
        it('Should have an error if name is null or not send', async () => {
          try {
              await Videogame.create({
                 name: null,
                 publisher: 'NetherRealms Studios',
                 description: 'Combat game',
                 rating: 5
              });

          } catch (error) {
              expect(error.message).toBe(
                  'notNull Violation: Videogame.name cannot be null'
              );
            }
        });

        it('Should have an error if publisher is null or not send', async () => {
            try {
              await Videogame.create({
                name: 'Mortal Kombat',
                publisher: null,
                description: 'Combat game',
                rating: 5
            });

            } catch (error) {
                expect(error.message).toBe(
                    'notNull Violation: Videogame.publisher cannot be null'
                );
            }
        });
    });
});