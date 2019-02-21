import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

import SearchAddress from './SearchAddress';
import Popup from './popup';
import MapDirections from './MapDirections';
import config from '../config';

export default class MapContainer extends Component {

  state = {
    latitude: -30,
    longitude: -50,
  }

  async componentWillMount(){
    const permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.status == 'granted') {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuract: true
      });
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }
  }
  

    handleLocationSelected = (data, details) => {
        const { 
          location: { lat: latitude, lng: longitude }
        } = details.geometry;

      this.setState({
        destination: {
          latitude: latitude,
          longitude,
          title: data.structured_formatting.main_text
        }
      })
    }


  render() {
    return (
      <View style={styles.viewContainer}>
        <MapView
          ref={el => (this.mapView = el)}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >
        {this.state.destination ?
        <React.Fragment>
        <MapDirections
            apiKey={config.apiKey}
            origin={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            destination={this.state.destination}
            onReady={result => {
              this.setState({ duration: Math.floor(result.duration) });
              this.mapView.fitToCoordinates(result.coordinates,
              {
                edgePadding: {
                  right: 50,
                  left: 50,
                  top: 100,
                  bottom: 350
                }
              })
            }}
        />
        <Popup 
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          location="Minha localização!"
        />
        <Popup 
          coordinate={this.state.destination}
          location={this.state.destination.title}
          duration={this.state.duration}
        />
        </React.Fragment>
        : null }
        </MapView>
        <SearchAddress
          apiKey={config.apiKey}
          onLocationSelected={this.handleLocationSelected}
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
  }
})