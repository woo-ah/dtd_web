// src/data/externalRoutes.js
export const externalRoutes = [
    {
        id: 1,
        departure: '두호SK뷰푸르지오2단지아파ㅇㄴㄹㄴㅇㄴ언ㄹㅌ',
        arrival: '한동대학교',
        route: [
            { type: 'walk', description: '도보 10분' },
            { type: 'bus', description: '302 번 버스', time: '10분' },
            { type: 'walk', description: '도보 2분' },
        ],
        isFavorite: true,
    },
    {
        id: 2,
        departure: '포항시청',
        arrival: '포항역',
        route: [
            { type: 'walk', description: '도보 5분' },
            { type: 'bus', description: '108 번 버스', time: '20분' },
            { type: 'walk', description: '도보 3분' },
        ],
        isFavorite: true,
    },
    {
        id: 3,
        departure: '양덕지구',
        arrival: '장성초등학교',
        route: [
            { type: 'walk', description: '도보 8분' },
            { type: 'bus', description: '105 번 버스', time: '15분' },
            { type: 'walk', description: '도보 4분' },
        ],
        isFavorite: true,
    },
];
