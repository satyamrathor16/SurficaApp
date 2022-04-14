import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from './CustomText';

export default NoDataView = (props) => {
    const { noData } = props
    return (
        <View style={styles.centeredView}>
            {noData &&
                <CustomText>No Data Found</CustomText>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})