import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import pbclient from './pbconn'
import { StyleSheet } from 'react-native'
import { TextField } from 'react-native-ui-lib'
import * as SecureStore from 'expo-secure-store';


export default function Register({navigation}) {
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    return (
        <View style={styles.container}>
        <Text>Create Account</Text>
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
          placeholder="Name"
          onChangeText={text => setName(text)}
          value={name}
          floatingPlaceholder
          autoCapitalize='words'
          autoComplete='name'
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
        <TextField
          style={styles.input}
          maxLength={40}
          placeholder="Confirm Password"
          onChangeText={text => setPassword2(text)}
          value={password2}
          floatingPlaceholder
          secureTextEntry={true}
          autoCapitalize='none'
          autoComplete='password'
        />
        </View>
        <View style={styles.inputbox}>
        <Button
          onPress={() => {
            pbclient.collection("users").create({
                email: email,
                name: name,
                password: password,
                passwordConfirm: password2
            }).then((response) => {
                console.log(response);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
            }).catch((error) => {
                console.log(error);
            })
          }}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
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
  