import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Dimensions
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
            password: '123456',
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
        colors={['#c6145c', '#cb2356', '#d03051', '#d3364c', '#d64747']}  style={styles.container}>

            <View style={styles.form}>
                <View style={styles.formInput}>
                    <Text style={{alignSelf:'center', 
                                color:'#c6145c',
                                paddingBottom: 20,
                                fontSize: 25,}}>
                                Login</Text>
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
                </View>

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
const {height, width} = Dimensions.get('screen'); 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    form: {
        width: width - width*0.08,
        alignSelf: 'center',
    },
    input:{
        backgroundColor: '#f1f1f1',
        color: '#777',
        fontSize: 20,
        marginBottom: 10,
        paddingLeft: 5,
        borderRadius: 6,
    },
    btn: {
        backgroundColor: "#fff",
        borderRadius: 50,
        height: height - height*0.90,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    btnText: {
        color: "#c6145c",
        fontSize: 20,
    },
    formInput:{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    }
});