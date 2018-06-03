import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native'
import firebase from 'react-native-firebase'

export class Login extends Component{
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state = {
            email: 'jessicamorim.42@gmail.com',
            password: 'paramore08',
        }
        const { navigate } = this.props.navigation;
    }

    handleLogin = () => {
        const { email, password } = this.state
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home', {email: email}))
    }
    
    render(){
        return(
        <View style={styles.container}>
            <TextInput
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            />

            <TextInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            />

            <TouchableOpacity 
            style={styles.btn}
            onPress={this.handleLogin}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  })