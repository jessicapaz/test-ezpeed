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
            address: '',
            latitude: 0,
            longitude: 0,
            marker:{
              latitude: null,
              longitude: null
            },
            email: this.props.navigation.state.params.email,
        }
        const lat = this.state.latitude;
        const long = this.state.longitude;
        
    }
    componentDidMount(){
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords
        this.setState({latitude,longitude, marker:{latitude, longitude}
        })
      })
    }
    render() {
      const lat = this.state.latitude;
      const long = this.state.longitude;
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyCNWPp3cslhIJ5YRbeVMCVu6EYVfzgkEIM", {
        method: 'get'})
        .then((data) =>  data.json()).then((dataJson) => {
          const address = dataJson.results[0].formatted_address;
          this.setState({address:address})
        })
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
          <Text>Endereço: {this.state.address}</Text>
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