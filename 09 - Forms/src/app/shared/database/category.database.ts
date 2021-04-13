import { Category } from '../models/category.model';

export const CATEGORIES: Category[] = [
    {
        title: 'filmek',
        icon: 'movie',
        value: 'movie',
        color: 'teal',
        url: '/home/movies'
    },
    {
        title: 'Játékok',
        icon: 'games',
        value: 'game',
        color: 'cyan',
        url: '/home/games'
    },
    {
        title: 'kedvencek',
        icon: 'star',
        value: 'favorite',
        color: '#c2185b',
        url: '/home/favorites'
    }
];
