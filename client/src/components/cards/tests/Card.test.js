import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Card from '../Card';
import { BrowserRouter } from 'react-router-dom';

describe('must be render a Card', () => {

    test('must be have a name', () => {
        const game = {
            name: 'Mortal Kombat',
            image: 'image link',
            platforms: ['Pc', 'Play', 'Xbox'],
            genres: ['Action', 'Fight'],
            id: 999,
            isDb: true,
        }

        const component = render(
            <BrowserRouter>
                <Card
                    name={game.name}
                    image={game.image}
                    platforms={game.platforms}
                    genres={game.genres}
                    id={game.id}
                    isDb={game.isDb}
                />
            </BrowserRouter>
        );

        const name = component.container.querySelector('.name');
        expect(name.querySelector('h4')).toHaveTextContent(game.name);
    })

    test('must be have genres', () => {
        const game = {
            name: 'Mortal Kombat',
            image: 'image link',
            platforms: ['Pc', 'Play', 'Xbox'],
            genres: ['Action', 'Fight'],
            id: 999,
            isDb: true,
        }

        const component = render(
            <BrowserRouter>
                <Card
                    name={game.name}
                    image={game.image}
                    platforms={game.platforms}
                    genres={game.genres}
                    id={game.id}
                    isDb={game.isDb}
                />
            </BrowserRouter>
        );

        const genres = component.container.querySelector('.genres');
        expect(genres.querySelector('p')).toHaveTextContent(game.genres[0]);
    })

    test('must be have platforms', () => {
        const game = {
            name: 'Mortal Kombat',
            image: 'image link',
            platforms: ['Pc', 'Play', 'Xbox'],
            genres: ['Action', 'Fight'],
            id: 999,
            isDb: true,
        }

        const component = render(
            <BrowserRouter>
                <Card
                    name={game.name}
                    image={game.image}
                    platforms={game.platforms}
                    genres={game.genres}
                    id={game.id}
                    isDb={game.isDb}
                />
            </BrowserRouter>
        );

        const platforms = component.container.querySelector('.platforms');
        expect(platforms.querySelector('p')).toHaveTextContent(game.platforms[0]);
    })
});
