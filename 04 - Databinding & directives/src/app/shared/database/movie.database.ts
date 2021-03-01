import { Movie } from '../models/movie.model';

export const MOVIES: Movie[] = [
    {
        id: 1,
        title: 'Avengers: Endgame',
        description: 'Thanos',
        imdb: 7,
        lengthMin: 180,
        img: 'https://images5.alphacoders.com/998/thumb-1920-998470.jpg'
    },
    {
        id: 2,
        title: 'Spiderman',
        description: 'Pokcsávó',
        imdb: 6.3,
        lengthMin: 113
    },
    {
        id: 3,
        title: 'Matrix',
        description: 'Neo és az ügynökök',
        imdb: 8.3,
        lengthMin: 113
    },
    {
        id: 4,
        title: 'Én kicsi pónim',
        description: 'Fabolous',
        imdb: 10
    }
];
