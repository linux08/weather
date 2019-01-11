import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { connect } from 'react-redux';
import { getWeatherInfo } from '../actions/weather';

const { width } = Dimensions.get('window');
class WeatherScreen extends React.Component {

    exactTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    splitt = this.exactTime.split(',')
    state = {
        day: this.splitt[0],
        time: this.splitt[1],
        loading: true,
        temp: 0,
    }
    async componentDidMount() {
        setInterval(() => {
            this.setState({
                time: moment().format('MMMM Do YYYY, h:mm:ss a').split(',')[1],
                day: moment().format('MMMM Do YYYY, h:mm:ss a').split(',')[0],
            })
        }, 1000);

        if (this.props.weather && this.props.weather.weather === '') {
            await this.getWeather();
            this.setState({ loading: false })
        }
        else {
            this.setState({ loading: false })
        }

    };
    startTimer() {

    }

    getWeather = async () => {
        try {
            await this.props.getWeather();
            const temp = this.props.weather && this.props.weather.weather && this.props.weather.weather.main && this.props.weather.weather.main.temp;
            this.setState({ temp: (temp / 10).toPrecision(2) });
        }
        catch{
            this.setState({ error: false })
        }
    }

    convertTemp = () => {
        const { inCelsius, temp } = this.state;
        if (inCelsius) {
            const newTf = (temp * 1.8) + 32
            this.setState({ inCelsius: false, temp: newTf.toPrecision(2) })
        }
        else {
            const newCf = (temp - 32) * 0.5556;
            this.setState({ inCelsius: true, temp: newCf.toPrecision(2) })
        }
    }

    render() {
        const { loading, temp, day, time, inCelsius } = this.state;
        const weatherCondition = this.props.weather && this.props.weather.weather && this.props.weather.weather.weather[0];

        const wind = this.props.weather && this.props.weather.weather && this.props.weather.weather.wind;
        if (!!loading) {
            return (
                <View style={styles.spinner}>
                    <Spinner />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.justify}>
                        <Text style={styles.text}> Weather Condition </Text>
                    </View>

                    <View style={[styles.justify, { marginTop: 5 }]}>
                        <Text style={styles.text}> Lagos, Nigeria.</Text>
                    </View>
                </View>
                <View style={{ flex: 2, backgroundColor: '#151C6A' }} />
                <View style={styles.subMainContainer}>
                    <View style={{
                        flex: 1,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                    }}>
                        <View style={{ paddingTop: '10%', paddingLeft: '5%' }}>
                            <Text style={{ fontSize: 24, color: '#2F3CA3' }}>{time}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                    <View style={{ flex: 2, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 30, color: '#000000' }}> {weatherCondition.main} </Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <View style={{ flex: 2, justifyContent: 'center', flexDirection: 'row' }} >
                                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 50, color: '#000000' }}> {temp} </Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.button} onPress={() => this.convertTemp()}>
                                    <Text style={{ color: '#FFFFFF' }}>
                                        {inCelsius ? '°F' : '°C'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: '10%' }}>
                            <View>
                                <Text style={{ fontSize: 18, color: '#000000' }}>Wind Speed </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 24, color: '#2F3CA3' }}>{wind && wind.speed} Km/hr</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    weather: state.weather,
});

const mapDispatchToProps = dispatch => ({
    getWeather: () => dispatch(getWeatherInfo()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WeatherScreen);


const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#151C6A',
        borderRadius: 10,
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        flex: 1,
        backgroundColor: '#151C6A',
        justifyContent: 'center',
    },
    justify: {
        paddingHorizontal: '12%',
    },
    subMainContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        width,
        bottom: 0,
        backgroundColor: 'white',
        height: '65%',
        shadowColor: '#000000',
        elevation: 6,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 10,
            width: 10,
        },
    },
    text: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    secondText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
});
