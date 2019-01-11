import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Spinner = ({ size, color }) => (
    <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} color={color || '#2F3CA3'} />
    </View>
);

Spinner.defaultProps = {
    size: 'large',
    color: '#2F3CA3',
};

Spinner.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
};

export default Spinner;