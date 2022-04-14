import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Config from '../../config';
export default class CustomLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false
        };
    }

    isShowLoader = (value) => {
        this.setState({ showLoader: value })
    }

    render() {
        if (!this.state.showLoader)
            return null
        return (
            <View style={styles.mainContainer}>
                <View style={styles.centerView}>
                    <ActivityIndicator size='large' color={Config.Theme.COLOR_PRIMARY} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        backgroundColor:Config.Theme.COLOR_TRASPARENT
    },
    centerView: {
        padding: 20,
        shadowOffset: {
            height: 2,
            width: 2
        },
        shadowRadius: 6,
        borderRadius: 6,
        elevation: 10,
        backgroundColor: Config.Theme.COLOR_WHITE
    }

})