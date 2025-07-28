import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';

export default function Layout() {
    return(
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="auto" />
            <Stack/>
        </GestureHandlerRootView>
    )
}