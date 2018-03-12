// actions.js
import xhr from 'xhr';

export function changeLocation(location) {
    return {
        type: 'CHANGE_LOCATION',
        location: location
    };
}

export function setSelectedDate(date) {
    return {
        type: 'SET_SELECTED_DATE',
        date: date
    };
}

export function setSelectedTime(time) {
    return {
        type: 'SET_SELECTED_TIME',
        time: time
    };
}

export function setData(data) {
    return {
        type: 'SET_DATA',
        data: data
    };
};

export function setDates(dates) {
    return {
        type: 'SET_DATES',
        dates: dates
    };
};


export function fetchData(url) {
    return function thunk(dispatch) {
        xhr({
            url: url
        }, function (err, data) {

            let body = JSON.parse(data.body);
            let list = body.list;
            let dates = [];
            if (list) {
                for (let i = 0; i < list.length; i++) {
                    dates.push(list[i].dt_txt);
                }
                dispatch(setData(body));
                dispatch(setDates(dates));
                dispatch(setSelectedDate(''));
            }
        });
    }
}
