import MapView, { Marker, AnimatedRegion, Animated} from 'react-native-maps';
import { StyleSheet,
        View, 
        Text, 
        TextInput,
        TouchableOpacity,
        Modal,
        FlatList
        } from 'react-native';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';

export class ListMarkers extends Component{
    static navigationOptions = {
        title: "Pontos salvos",
    }
    constructor(props){
        super(props);
        this.db = firebase.database().ref('markers');

        this.state = {
            markers: [],
            region: {
                latitude: -1.43589,
                longitude: -48.53456,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            },

        }
    }
    componentDidMount(){
        this.db.on('value', (dataSnapshot)=>{
          const markers = [];
          dataSnapshot.forEach((child) => {
              markers.push(child.toJSON().marker)
          })
          this.setState({markers:markers})
        })
    }
      onRegionChange = (region) => {
        this.setState({ region });
      }
      
    render() {
        // const { region } = this.props;

        return (
            <View style ={styles.container}>
            <MapView
                style={styles.map}
                region={this.state.region}
                onRegionChange={() => this.onRegionChange}
            >
            {this.state.markers.map(marker => (
                <Marker
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                />
            ))}

            </MapView>
            
            {this.state.markers.map(marker => (
                <View>
                <Text>{marker.title}</Text>
                <TouchableOpacity
                onPress={()=> {
                    this.onRegionChange({
                        latitude: marker.coordinate.latitude,
                        longitude: marker.coordinate.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    })
                }}
                >
                    <Text>Ver</Text>
                </TouchableOpacity>
                </View>
            )
            )}
            </View>
        );
        }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
    },
});
  
  