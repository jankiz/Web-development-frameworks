import { Movie } from '../models/movie.model';

export const MOVIES: Movie[] = [
    {
        id: '1',
        title: 'Avengers: Endgame',
        description: 'Thanos',
        imdb: 7,
        lengthMin: 180,
        img: 'https://images5.alphacoders.com/998/thumb-1920-998470.jpg',
        star: false,
    },
    {
        id: '2',
        title: 'Spiderman',
        description: 'Pokcsávó',
        imdb: 6.3,
        lengthMin: 113,
        img: 'https://am23.mediaite.com/tms/cnt/uploads/2019/09/Ned-Was-Originally-in-the-Mid-Credit-Scenes-for-Far-from-Home-1200x675.jpg',
        star: false,
    },
    {
        id: '3',
        title: 'Matrix',
        description: 'Neo és az ügynökök',
        imdb: 8.3,
        lengthMin: 165,
        img: 'https://img.huffingtonpost.com/asset/5cfe99db240000120f85a95f.jpeg?cache=idtumdl0az&ops=1778_1000',
        star: false,
    },
    {
        id: '4',
        title: 'Én kicsi pónim',
        description: 'Fabolous',
        imdb: 10,
        img: 'https://wallpapercave.com/wp/m856jFo.jpg',
        star: false,
    }
];
