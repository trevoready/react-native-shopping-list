import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import pbclient from './pbconn'
import { StyleSheet } from 'react-native'
import { TextField } from 'react-native-ui-lib'
import * as SecureStore from 'expo-secure-store';


export default function Login({navigation}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    async function checkLoginStatus() {
        if (pbclient.authStore.isValid) {
            pbclient.collection("users").authRefresh();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Lists' }],
              });
        }
    }

    React.useEffect(() => {
        //check if user is logged in
        const unsub = pbclient.authStore.onChange((user) => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Lists' }],
                  });
            }
        });
        return () => {
            unsub();
        }
    }, [])
    return (
        <View style={styles.container}>
        <Text>Login</Text>
        <View style={styles.inputbox}>
        <TextField
          style={styles.input}
          maxLength={40}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          floatingPlaceholder
          autoCapitalize='none'
          autoComplete='email'
        />
        </View>
        <View style={styles.inputbox}>
        <TextField
          style={styles.input}
          maxLength={40}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          floatingPlaceholder
          secureTextEntry={true}
          autoCapitalize='none'
          autoComplete='password'
        />
        </View>
        <View style={styles.inputbox}>
        <Button
          onPress={() => {
            pbclient.collection("users").authWithPassword(email, password).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
          }}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
        />
        </View>
        <View style={styles.inputbox}>
        <Button
          onPress={() => {
            navigation.navigate('Register')
          }}
          title="Register"
          color="#841584"
          accessibilityLabel="Register"
        />
        </View>
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
      width: '100%'
    },
    inputbox: {
      padding: 10,
      width: '80%',
    },
    input: {
    },
  });
  