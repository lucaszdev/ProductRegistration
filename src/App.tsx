import React from 'react';
import { NavigationContainer, StatusBar, useEffect } from '@modules';
import { Navigation } from '@navigation';
import { colors } from '@theme';
import Toast from 'react-native-toast-message';

import holidayStore from '@stores/holidayStore';

import './utils/config/reactotron';
import { LogBox } from 'react-native';

const App: React.FC = () => {
    LogBox.ignoreAllLogs();

    const onInit = () => {
        holidayStore.getHolidays();
    };

    useEffect(() => {
        onInit();
    }, []);

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={colors.primary}
                barStyle='dark-content'
            />

            <NavigationContainer>
                <Navigation />
            </NavigationContainer>

            <Toast />
        </>
    );
};

export default App;