import { Text, TextInput, View, Dimension, TouchableOpacity, Image, FlatList, ScrollView,AsyncStorage } from 'react-native';

logout = async() => {
      await AsyncStorage.removeItem('userLoginAuthentication');
       // this.setState({LoggedIn:0})
      // this.props.navigation.navigate('Login');
    }

    export default { logout };