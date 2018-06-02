import MapView, { Marker, AnimatedRegion, Animated} from 'react-native-maps';
import { StyleSheet,
        View, 
        Text, 
        TextInput,
        TouchableOpacity,
        Modal,
        } from 'react-native';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';


export class Home extends Component {
    static navigationOptions = {
        title: "Home",
    }
    constructor(props){
        super(props);
        
        this.db = firebase.database().ref('markers');
        // this.db.on('value', (dataSnapshot)=>{
          
        // })

        this.state = {
            address: '',
            latitude: 0,
            longitude: 0,
            error: null,
            marker:{
              title: '',
              description: '',
              coordinate:{
                latitude: 0,
                longitude: 0,
              }
            },
            email: this.props.navigation.state.params.email,
            modalVisible: false,
        }
    }
    componentDidMount() {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const {latitude, longitude} = position.coords
          this.setState({
            latitude: latitude,
            longitude: longitude,
            error: null,
            marker:{
              coordinate:{
                latitude:latitude,
                longitude:longitude
              }
            },
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    saveMarker = () => {  
      const marker = {
        title: this.state.marker.title,
        description: this.state.marker.description,
        coordinate: this.state.marker.coordinate
      }

      this.db.push().set({marker})
      this.setModalVisible(!this.state.modalVisible);

    }
    render() {
      //Reverse geocoding
      // const lat = this.state.latitude;
      // const long = this.state.longitude;
      // fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyCeEGUoBCUAJL7v97QAd-Lo_ZVxxi_j2xw", {
      //   method: 'GET'})
      //   .then((data) =>  data.json()).then((dataJson) => {
      //     const address = dataJson.results[0].formatted_address;
      //     this.setState({address:address})
      //   })

    return (
      <View style ={styles.container}>
        <MapView
          showUserLocation = {true}
          region = {{
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          style={styles.map}
          onPress={(e) => {
            const marker = this.state.marker
            marker.coordinate = e.nativeEvent.coordinate
            this.setState({
              marker: marker
            })}}
        >
        <MapView.Marker
        coordinate={this.state.marker.coordinate}
        />
        </MapView>

        <Modal 
          visible={this.state.modalVisible}
          transparent={true}
          >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000080'}}>
          <View style={{
            width: 300,
            height: 300,
            backgroundColor: '#fff', 
            padding: 20}}>
            <Text>Título</Text>
            <TextInput
            placeholder="Título"
            onChangeText={(title) => {
              const marker = this.state.marker
              marker.title = title
              this.setState({marker})
            }} 
            />
            <Text>Descrição</Text>
            <TextInput
            placeholder="Descrição"
            onChangeText={(description) => {
              const marker = this.state.marker
              marker.description = description
              this.setState({marker})
            }}/>
            <TouchableOpacity
              onPress={this.saveMarker}>
                <Text>Salvar ponto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Fechar</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>

        <View>
          <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }
          }
          ><Text>Salvar ponto</Text>
          </TouchableOpacity>
          <TouchableOpacity
          ><Text>Ver pontos salvos</Text>
          </TouchableOpacity>
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