import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { MapView, Location, Permissions, PROVIDER_GOOGLE } from 'expo';

export default class MapContainer extends Component {

  state = {
    longitude: -30,
    latitude: -51,
  }

  async componentWillMount(){
    const permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.status == 'granted') {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuract: true
      });

      this.setState({
        latitude: Location.coords.latitude,
        longitude: Location.coords.longitude,
        latitudeDelta: Location.coords.latitudeDelta,
        longitudeDelta: Location.coords.longitudeDelta
      })
    }
  }


  render() {
    return (
      <View style={styles.viewContainer}>
        <MapView 
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
          showsUserLocation={true}
        />
        <TextInput 
          style={styles.input}
          placeholder="Para onde?"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  input: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
    paddingVertical: 14,
    color: 'black',
    top: 60,
    left: 15,
    right: 15,
    elevation: 15,
    borderRadius: 10
  }
})