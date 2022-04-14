import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import Config from '../config';

export default ImageComponent = (props) => {
    const { uri } = props
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>

            <Image
                source={{ uri: uri }}
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#c2c2c2'
                }}
            // onLoadStart={() => {
            //     setIsLoading(true)
            //     console.log('Load Start');
            // }}
            // onLoadEnd={() => {
            //     setIsLoading(false)
            //     console.log('Load End');
            // }}

            />


        </>
    );
}
