import { HomepageData } from '../../app/home/home.types';
import { HomepageDataOutput } from '../types/home.types';

export const fromHomepageOutput = (data: HomepageDataOutput[]): HomepageData[] => {
    const result: HomepageData[] = [];
    // data.forEach((item)=>result.push({
    //     title: item.title,
    //     data: item.data
    // }))
    return result;
};
