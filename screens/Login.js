import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';

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
        <LinearGradient  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} 
        colors={['#d64747', '#d33c4c', '#d03051', '#cb2356', '#c6145c']} style={styles.container}>
            <View style={styles.form}>
            <TextInput
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            underlineColorAndroid={'transparent'}
            style={styles.input}
            />

            <TextInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            underlineColorAndroid={'transparent'}
            style={styles.input}
            />

            <TouchableOpacity 
            style={styles.btn}
            onPress={this.handleLogin}>
                <Text 
                style={styles.btnText}
                >Entrar</Text>
            </TouchableOpacity>
            </View>
        </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        width: 340,
        alignSelf: 'center',
    },
    input:{
        borderBottomWidth: 1.5,
        borderColor: '#fff',
        color: '#fff',
        fontSize: 18,
        padding: 0,
        marginBottom: 8
    },
    btn: {
        backgroundColor: "#fff",
        borderRadius: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    btnText: {
        color: "#c6145c",
        fontSize: 18,
    },
});