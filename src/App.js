import React, { Component}  from 'react';
import { connect } from 'react-redux';
import './App.css';

import {
    changeLocation,
    fetchData,
    setSelectedDate,
    setSelectedTime
} from './actions';

class App extends Component {
    fetchData = (evt) => {
        evt.preventDefault();

        let location = encodeURIComponent(this.props.redux.get('location'));

        let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        let urlSuffix = '&APPID=50ac12677c6c07cb58bfe34d2363bae4&units=metric';
        let url = urlPrefix + location + urlSuffix;

        this.props.dispatch(fetchData(url));
    };

    changeDate = (date) => {
        this.props.dispatch(setSelectedDate(date));
    };

    changeTime = (time) => {
        this.props.dispatch(setSelectedTime(time));
    };

    changeLocation = (evt) => {
        this.props.dispatch(changeLocation(evt.target.value));
    };

    render() {
        let _self = this;
        let weatherDays = [], times = [], mainItems = [], weatherItems = [],
            dataList = this.props.redux.getIn(['data', 'list']);

        if (dataList) {
            const allDays = this.props.redux.getIn(['dates']).map(d => Date.parse(d.split(' ')[0]));
            weatherDays = allDays.filter((e, i) => allDays.indexOf(e) === i);
            const selectedDate = this.props.redux.getIn(['selected', 'date']);
            times = this.props.redux.getIn(['dates']).filter(d => Date.parse(d.split(' ')[0]) === selectedDate).map(d => d.split(' ')[1]);
            const selectedTime = this.props.redux.getIn(['selected', 'time']);
            const dateTime = this.props.redux.getIn(['dates']).find(d => d === new Intl.DateTimeFormat('fr-CA', 'yyyy-mm-dd').format(selectedDate)
                + ' ' + selectedTime);
            const indexOfDateTime = this.props.redux.getIn(['dates']).toArray().indexOf(dateTime) > -1
                ? this.props.redux.getIn(['dates']).toArray().indexOf(dateTime) : 0;
            mainItems.push('Temperature : ' +  this.props.redux.getIn(['data', 'list', indexOfDateTime, 'main', 'temp']) + '°C');
            mainItems.push('Temperature (Min) : ' + this.props.redux.getIn(['data', 'list', indexOfDateTime, 'main', 'temp_min']) + '°C');
            mainItems.push('Temperature (Max) : ' + this.props.redux.getIn(['data', 'list', indexOfDateTime, 'main', 'temp_max']) + '°C');
            mainItems.push('Humidity : ' + this.props.redux.getIn(['data', 'list', indexOfDateTime, 'main', 'humidity']));
            weatherItems.push(
                'Conditions : ' +
                this.props.redux.getIn(['data', 'list', indexOfDateTime, 'weather', 0, 'main']) + '(' +
                this.props.redux.getIn(['data', 'list', indexOfDateTime, 'weather', 0, 'description']) + ')'
            );
        }
        return (
            <div>
                <header className="App-header">
                    <h1>Wipro Weather App</h1>
                </header>
                <div className="App-container">
                    <h2>Show Weather for { this.props.redux.get('location') } </h2>
                    <form onSubmit={this.fetchData}>
                        <label className="App-intro">
                            <input
                                placeholder={"City or Country"}
                                type="text"
                                value={this.props.redux.get('location')}
                                onChange={this.changeLocation}
                            />
                        </label>
                    </form>
                    <div className="temp-wrapper">
                        <div className="left">
                            <span>Click Date to see forecast and times</span>
                            {weatherDays.map(function(day, index) {
                                return <div key={ index }>
                                    <a className={day === _self.props.redux.getIn(['selected', 'date'])? 'active' : ''}
                                       onClick={() => _self.changeDate(day)}>{ new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: 'long'
                                          }).format(day) }
                                    </a>
                                </div>;
                            })}
                        </div>
                        <div className="middle">
                            <span>Click Time to see forecast</span>
                            {times.map(function(time, i) {
                                return <div key={ i }>
                                    <a className={time === _self.props.redux.getIn(['selected', 'time'])? 'active' : ''}
                                       onClick={() => _self.changeTime(time)}>{ time }</a>
                                </div>;
                            })}
                        </div>
                        <div className="right">
                            <span>Current Conditions : </span>
                            <div className="weatherItems">
                                {mainItems.map(function(mainItem, mainKey) {
                                    return <div key={ mainKey }>
                                        <div>{ mainItem }</div>
                                    </div>;
                                })}
                            </div>
                            <div className="weatherItems">
                                {weatherItems.map(function(weatherItem, weatherKey) {
                                    return <div key={ weatherKey }>
                                        <div>{ weatherItem }</div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Since we want to have the entire state anyway, we can simply return it as is!
function mapStateToProps(state) {
    return {
        redux: state
    };
}


export default connect(mapStateToProps)(App);