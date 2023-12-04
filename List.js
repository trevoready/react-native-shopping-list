import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Button, Dialog } from 'react-native-ui-lib';
import pbclient from './pbconn';
import { StyleSheet } from 'react-native';

export default function List({navigation, route}) {
    const { listID } = route.params;
    const [list, setList] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [upc, setUPC] = React.useState('');
    const [addItemDialog, setAddItemDialog] = React.useState(false);

    const getItem = (upc) => {
        pbclient.collection("items").getList(1,1,{filter:'upc="' + upc + '"'}).then((response) => {
            if (response.items.length > 0) {
                return response.items[0];
            } else {
                return null;
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    const handleScan = () => {
        const item = getItem(upc);
        if (item) {
        setUPC('');
            pbclient.collection("shopping_list_items").getList(1,1,{filter:'list="' + listID + '" and item="' + item.id + '"'}).then((response) => {
                if (response.items.length > 0) {
                    //item already exists in list
                    const item = response.items[0];
                    item.quantity += 1;
                    pbclient.collection("shopping_list_items").update(item.id, item).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    //item does not exist in list
                    pbclient.collection("shopping_list_items").create({list: listID, item: item.id, quantity: 1}).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            //item does not exist in database
            //prompt user to add item
            navigation.navigate('AddItem', {listID: listID, upc: upc});
        }
    }
    React.useEffect(() => {
        pbclient.collection("shopping_lists").getOne(listID).then((response) => {
            setList(response);
        }).catch((error) => {
            console.log(error);
        })

        pbclient.collection("shopping_list_items").getList(1,100,{filter:'list="' + listID + '"'}).then((response) => {
            setItems(response.items);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
  return (
    <View>
        <TextInput placeholder="Scan UPC"
        onChangeText={text => setUPC(text)}
        value={upc}
        onSubmitEditing={() => {
            handleScan();
        }}
         />
      <Text>List</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputbox: {
      margin: 10,
    },
    input: {
      width: 200,
      height: 40,
      borderWidth: 1,
      padding: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
    },
    addDialog: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
  });

