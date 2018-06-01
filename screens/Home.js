import MapView, { Marker} from 'react-native-maps';
import { StyleSheet,
        View, } from 'react-native';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';



export class Home extends Component {
    static navigationOptions = {
        title: "Home",
    }
    constructor(props){
        super(props);
        
        this.state = {
            latitude: '',
            longitude: '',
            error: null,
            marker: {
              latitude: 2000,
              longitude: 2000
            },
            
        }
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            })
        })

        this.db = firebase.database().ref().child('markers')
    }

  
  render() {

    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          onPress={(e) => {
            this.setState({
              marker: e.nativeEvent.coordinate
            })
          }}
          initialRegion= { {
            latitude: 2000,
            longitude: 2000,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        <Marker
        coordinate={{latitude: this.state.marker.latitude,
        longitude: this.state.marker.longitude}}
        title="Você está aqui"
        description=""
        />
        </MapView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });