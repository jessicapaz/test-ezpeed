import React, { Component } from 'react';
import { View } from 'react-native';
import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { StackNavigator,
  } from 'react-navigation';
  
const App = StackNavigator({
    Login: { screen: Home },
    Home: { screen: Login },
});
export default App;
console.disableYellowBox = true;
// export default class App extends Component{

//     render(){
//       return(
//           <Login />
//       )
//     }
// }