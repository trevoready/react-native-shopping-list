// Description: This file contains the code for the Sites screen. This screen displays a list of sites that the user has access to.
import React from 'react'
import pbclient from './pbconn'
import { ScrollView } from 'react-native'
import { Button } from 'react-native'
import { Card } from 'react-native-ui-lib'
import { Text } from 'react-native-ui-lib'


export default function Lists({navigation}) {
    const [lists, setLists] = React.useState([]);
    
    React.useEffect(() => {
        //get sites
        pbclient.collection("shopping_lists").getList(1,10).then((response) => {
            setLists(response.items);
            console.log(response.items);
        }).catch((error) => {
            console.log(error);
        });
        
        navigation.setOptions({
            headerRight: () => (
                <Button
                  onPress={() => {
                    pbclient.authStore.clear();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                          });
                  }}
                  title="Logout"
                  color="#841584"
                  accessibilityLabel="Logout"
                />
              ),
        })
    }, [])
  return (
    <ScrollView>
        {lists.map((list) => {
            console.log(list);
            return (
                <Card key={list.id} onPress={() => {
                    navigation.navigate('List', {listID: list.id})
                }}
                style={{margin:10,padding:10}}>
                    <Text>{list.listName}</Text>
                    <Text>{list.listStore}</Text>
                </Card>
            )
        }
        )}
    </ScrollView>
  )
}