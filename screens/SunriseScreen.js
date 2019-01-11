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

const { width } = Dimensions.get('window');


class SunriseScreen extends React.Component {
    exactTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    splitt = this.exactTime.split(',')
    state = {
        day: this.splitt[0],
        time: this.splitt[1],
        loading: true,
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

    getWeather = async () => {
        try {
            await this.props.getWeather();
        }
        catch{
            this.setState({ error: false })
        }
    }


    render() {
        const { loading, day, time } = this.state;
        const weatherCondition = this.props.weather && this.props.weather.weather && this.props.weather.weather.sys;

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
                        <Text style={styles.text}> Sunset </Text>
                    </View>

                    <View style={[styles.justify, { marginTop: 5 }]}>
                        <Text style={styles.text}> Lagos,Nigeria</Text>
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
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Text style={{ fontSize: 30, color: '#000000' }}> Sunset Time </Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }} >
                                <Text style={{ fontSize: 15, color: '#000000' }}>  {moment.unix(weatherCondition && weatherCondition.sunset).format("MM/DD/YYYY HH:mm")} </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <Text style={{ fontSize: 30, color: '#000000' }}> Sunrise Time </Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#000000' }}> {moment.unix(weatherCondition && weatherCondition.sunrise).format("MM/DD/YYYY HH:mm")} </Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 40, color: '#000000' }}> {day} </Text>
                        </View>
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
)(SunriseScreen);


const styles = StyleSheet.create({
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
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
