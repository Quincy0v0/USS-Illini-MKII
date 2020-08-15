/**
 * @fileoverview
 * Storing constants and utility functions for PlayerTable
 * @exports tierDict
 * @exports nationDict
 */

export const tierDict = {
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
    '6': 'VI',
    '7': 'VII',
    '8': 'VIII',
    '9': 'IX',
    '10': 'X',
}

export const nationDict = {
    'usa': { image: 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png', text: 'USA' },
    'ussr': { image: 'http://wiki.gcdn.co/images/0/04/Wows_flag_Russian_Empire_and_USSR.png', text: 'USSR' },
    'uk': { image: 'http://wiki.gcdn.co/images/3/34/Wows_flag_UK.png', text: 'UK' },
    'japan': { image: 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png', text: 'Japan' },
    'france': { image: 'http://wiki.gcdn.co/images/7/71/Wows_flag_France.png', text: 'France' },
    'germany': { image: 'http://wiki.gcdn.co/images/6/6b/Wows_flag_Germany.png', text: 'Germany' },
    'poland': { value: 'poland', image: 'http://wiki.gcdn.co/images/5/5f/Wows_flag_Poland.png', text: 'Poland' },
    'pan_asia': { value: 'pan_asia', image: 'http://wiki.gcdn.co/images/3/33/Wows_flag_Pan_Asia.png', text: 'Pan Asia' },
    'italy': { value: 'italy', image: 'http://wiki.gcdn.co/images/d/d1/Wows_flag_Italy.png', text: 'Italy' },
    'commonwealth': { image: 'http://wiki.gcdn.co/images/3/3e/Wows_flag_Commonwealth.PNG', text: 'Common Wealth' },
    'pan_america': { image: 'http://wiki.gcdn.co/images/9/9e/Wows_flag_Pan_America.png', text: 'Pan America' },
    'europe': { image: 'https://wiki.gcdn.co/images/5/52/Wows_flag_Europe.png', text: 'Europe' }
};

export const typeDict = {
    'Destroyer': { image: 'http://wiki.gcdn.co/images/d/d2/Wows-destroyer-icon.png', text: 'Destroyer' },
    'Cruiser': { image: 'http://wiki.gcdn.co/images/f/f5/Wows-cruiser-icon.png', text: 'Cruiser' },
    'Battleship': { image: 'http://wiki.gcdn.co/images/2/24/Wows-battleship-icon.png', text: 'Battleship' },
    'AirCarrier': { image: 'http://wiki.gcdn.co/images/d/d8/Wows-aircarrier-icon.png', text: 'Carrier' }
};

export const tierOptions = [
    { key: 'all', value: 'all', text: '' },
    { key: '1', value: '1', text: 'I' },
    { key: '2', value: '2', text: 'II' },
    { key: '3', value: '3', text: 'III' },
    { key: '4', value: '4', text: 'IV' },
    { key: '5', value: '5', text: 'V' },
    { key: '6', value: '6', text: 'VI' },
    { key: '7', value: '7', text: 'VII' },
    { key: '8', value: '8', text: 'VIII' },
    { key: '9', value: '9', text: 'IX' },
    { key: '10', value: '10', text: 'X' },
]; 