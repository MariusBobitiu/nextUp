import { Video } from '../types/MovieDetails';

const categorizeVideosByType = (videos: Video[]): Map<string, Video[]> => {
    const map = new Map<string, Video[]>();
    videos.forEach(video => {
        const { type } = video;
        if (!map.has(type)) {
        map.set(type, []);
        }
        map.get(type)!.push(video);
    });
    return map;
};

export default categorizeVideosByType;