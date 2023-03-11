// import { Hourly, Weather, WeatherApiParams } from '~/mappers';
import { ResponseError } from '@utils';
import request from '../request';
// import { IMovieApi } from './movie.api.interface';

export default class MovieApi {
    getHolidays = async (): Promise<any> => {
        try {
            const year = new Date().getFullYear();
            const { data } = await request.get(`/${year}`);

            return data;
        } catch (error) {
            throw new ResponseError(error);
        }
    };
}
