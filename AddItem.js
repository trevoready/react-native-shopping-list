import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Button } from 'react-native-ui-lib';

export default function AddItem({navigation, route}) {
    const { listID, upc } = route.params;
    const [itemName, setItemName] = React.useState('');

  return (
    <View style={{margin:"10px"}}>
      <Text>AddItem</Text>
        <TextInput
            maxLength={40}
            placeholder="Item Name"
            onChangeText={text => setItemName(text)}
            value={itemName}
            autoCapitalize='words'
        />
        <Button label="Add Item" onPress={() => {
            navigation.navigate('List', {listID: listID})
        }}/>
    </View>
  )
}