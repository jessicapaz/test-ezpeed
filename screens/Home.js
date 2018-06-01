import MapView, { Marker, AnimatedRegion, Animated} from 'react-native-maps';
import { StyleSheet,
        View, 
        Text, Platform} from 'react-native';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';



export class Home extends Component {
    static navigationOptions = {
        title: "Home",
    }
    constructor(props){
        super(props);
        
        this.state = {
            latitude: 0,
            longitude: 0,
            marker:{
              latitude: 0,
              longitude: 0
            },
            email: this.props.navigation.state.params.email,
        }
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({latitude: position.coords.latitude,
                          longitude: position.coords.longitude,
                        marker: {
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude
                        }})
        })

    }
    render() {
 
    return (
      <View style ={styles.container}>
        <MapView
          showUserLocation = {true}
          followUserLocation = {true}
          loadingEnabled = {true}
          style={styles.map}
          onPress={(e) => {
            this.setState({
              marker: e.nativeEvent.coordinate
            })
          }}
        >
        <MapView.Marker
        coordinate={{ latitude: this.state.marker.latitude,
                      longitude: this.state.marker.longitude}}
        title="Você está aqui"
        description=""
        />
        </MapView>
        <View>
          <Text>Endereço:</Text>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          <Text>Nome:</Text>
          <Text>E-mail: {this.state.email}</Text>
        </View>
      </View>
      
    )
  }
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,

      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      height: 400,
      width: 500,
      ...StyleSheet.absoluteFillObject,
    },
  });