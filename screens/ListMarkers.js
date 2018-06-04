import MapView, { Marker, AnimatedRegion, Animated} from 'react-native-maps';
import { StyleSheet,
        View, 
        Text, 
        TextInput,
        TouchableOpacity,
        Modal,
        FlatList,
        Dimensions,
        ScrollView,
        } from 'react-native';
import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';

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
                latitude: 0,
                longitude: 0,
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
            <LinearGradient 
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} 
              colors={['#c6145c', '#cb2356', '#d03051', '#d3364c', '#d64747']}
              style ={styles.container}>
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
            
            <ScrollView contentContainerStyle={styles.infoContent}>
            {this.state.markers.map(marker => (
                <View style={styles.items}>
                <Text style={styles.itemText}>{marker.title}</Text>
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
                    <LinearGradient 
                    start={{x: 0.0, y: 0.25}} end={{x: 1.0, y: 1.0}} 
                    colors={['#d64747', '#d54249', '#d33e4b', '#d2394d', '#d0344f']} style={styles.itemBtn}>
                    <Text style={styles.itemBtnText}>Ver</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            )
            )}
            </ScrollView>
        </LinearGradient>
        );
    }
}
const {height, width} = Dimensions.get('screen'); 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 0,
        flex: 1,
    },
    map: {
        height: height*0.52,
        width: width*0.97,
        margin: 10
    },
    infoContent:{
        width: width - 20,
        paddingVertical: 20,
    },
    items:{
        // borderBottomWidth: 0.6,
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText:{
        fontSize: 18,
        color: '#fff'
    },
    itemBtn:{
        borderRadius: 50,
        borderWidth: 1.6,
        borderColor: '#fff',
        width: width*0.2,
        height: height*0.05,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    itemBtnText:{
        fontSize: 18,
        color: '#fff',
    },
});
  
  