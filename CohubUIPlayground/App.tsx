/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Buttons, Icon, Color, Typography} from '@cohubinc/cohub-native-ui';

const App = () => {
  const usingHermes =
    typeof HermesInternal === 'object' && HermesInternal !== null;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Icon.Asterisk color={Color.primaryRed} />
          <Typography>Test test test</Typography>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
