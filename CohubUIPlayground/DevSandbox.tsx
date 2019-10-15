import React from 'react';
import {Icon, Color, Buttons, Divider} from '@cohubinc/cohub-native-ui';
import {View} from 'react-native';

export default function() {
  return (
    <>
      <Icon.Asterisk color={Color.primaryRed} />
      <View
        style={{
          width: '100%',
        }}>
        <Buttons.Primary
          style={{width: '50%', marginHorizontal: 'auto'}}
          label="dfasdHI"
          onPress={() => console.log('hi')}
        />
        <Divider />
        <Buttons.Outline
          style={{width: '50%', marginHorizontal: 'auto'}}
          label="Wha?"
          onPress={() => console.log('hi')}
        />
        <Buttons.Split
          values={['hi', 'bye']}
          selectedIndex={1}
          onChange={val => console.log(val)}
        />
      </View>
    </>
  );
}
