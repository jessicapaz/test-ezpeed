import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import MapView, { Marker } from 'react-native-maps';
import { 
        StyleSheet,
        View, 
        Text, 
        TextInput,
        TouchableOpacity,
        Modal,
        Dimensions,
        } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export class Home extends Component {
    static navigationOptions = {
        title: "Home",
    }
    constructor(props){
        super(props);

        this.db = firebase.database().ref('markers');

        this.state = {  
          address:"",
          latitude:0,
          longitude:0,
          error:null,
          marker:{  
             title:"",
             description:"",
             coordinate:{  
                latitude:0,
                longitude:0
             }
          },
          email:this.props.navigation.state.params.email,
          modalVisible:false
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

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
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
      const lat = this.state.marker.coordinate.latitude;
      const long = this.state.marker.coordinate.longitude;
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyC8g-XEfK3Ffoaac98sO2uovXZ2ifWj2uw", {
        method: 'GET'})
        .then((data) =>  data.json()).then((dataJson) => {
          const address = dataJson.results[0].formatted_address;
          this.setState({address:address})
        })

    return (
      <LinearGradient 
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} 
              colors={['#c6145c', '#cb2356', '#d03051', '#d3364c', '#d64747']}
              style ={styles.container}>
        <MapView
              showUserLocation = {true}
              region = {{
                latitude:this.state.marker.coordinate.latitude,
                longitude:this.state.marker.coordinate.longitude,
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
          <View style={styles.modalOut}>
          <View style={styles.modalIn}>
            <TextInput
            style={styles.modalTextInput}
            placeholder="Título"
            onChangeText={(title) => {
              const marker = this.state.marker
              marker.title = title
              this.setState({marker})
            }} 
            />
            <TextInput
            style={styles.modalTextInput}
            placeholder="Descrição"
            onChangeText={(description) => {
              const marker = this.state.marker
              marker.description = description
              this.setState({marker})
            }}/>
              <View style={styles.modalBtnView}>
                <TouchableOpacity
                  onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={styles.modalText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.saveMarker}>
                    <Text style={styles.modalText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
        </Modal>
        
          <View style={styles.infoContainer}>
            <View style={styles.btnView}>
              <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={styles.btn} >  
                  <Text style={styles.btnText}>Salvar ponto</Text>
              </TouchableOpacity>
            
              <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ListMarkers')
              }}
              style={styles.btn}>
                <Text style={styles.btnText}>Pontos salvos</Text>
              </TouchableOpacity>
          
            </View>
            <Text style={styles.infoText}>
              Endereço: {this.state.address}{'\n'}
              Latitude: {this.state.latitude}{'\n'}
              Longitude: {this.state.longitude}{'\n'}
              E-mail: {this.state.email}
            </Text> 
          </View>       
        </LinearGradient>
      
    )
  }
}

const {height, width} = Dimensions.get('screen'); 
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 0,
      flex: 1,
    },
    map: {
      height: height*0.52,
      width: width*0.97,
      margin: 10
    },
    infoContainer:{
      marginTop: height - height*0.99,
      padding: 5,
      paddingTop: 0,
      // height: height*0.2,
      width: width,
      // marginBottom: 0
      // ...StyleSheet.absoluteFillObject,
      // justifyContent: 'flex-start'
    },
    btnView:{
      flexDirection: 'row',
      justifyContent: 'space-between', 
    },
    btn:{
      borderRadius: 50,
      borderWidth: 1.6,
      borderColor: '#fff',
      height: height - height*0.94,
      width: width - width*0.54,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
    },
    btnText:{
      color: '#fff',
      fontSize: 18,
    },
    infoText:{
      paddingTop: 5,
      fontSize: 18,
      color: '#fff'
    },
    modalOut:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000080'
    },
    modalIn:{
      width: width - width*0.3,
      height: height - height*0.72,
      backgroundColor: '#fff', 
      padding: 20,
      borderRadius: 3,
    },
    modalTextInput:{
      fontSize: 18,
    },
    modalText:{
      fontSize: 15,
    },
    modalBtnView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignSelf: 'flex-bottom',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      paddingBottom: 10,

    },
  });