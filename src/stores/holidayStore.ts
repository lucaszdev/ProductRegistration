import { holidayApi } from '@api';
import { action, makeObservable, observable, runInAction } from '@modules';

class HolidayStore {
    holidays: Holiday[] = [];
    loadingHolidays = false;

    constructor() {
        makeObservable(this, {
            holidays: observable,
            setHolidaysLoading: action.bound,
            getHolidays: action.bound
        })
    }

    setHolidaysLoading(value: boolean) {
        this.loadingHolidays = value;
    }

    async getHolidays() {
        try {
            this.setHolidaysLoading(true);

            const response = await holidayApi.getHolidays();

            this.setHolidaysLoading(false);

            runInAction(() => {
                this.holidays = response;
            });
        } catch (error) {
            console.error(error);
        }

    }
}

const holidayStore = new HolidayStore();

export default holidayStore;
