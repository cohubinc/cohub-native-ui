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
import {SafeAreaView, View, StatusBar} from 'react-native';

import {Buttons, Icon, Color, Typography} from '@cohubinc/cohub-native-ui';

export default function DevSandbox() {
  return (
    <>
      <Buttons.Outline label="hi" onPress={() => console.log('hi')} />
    </>
  );
}
