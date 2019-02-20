import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center',
  },
  timeContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 3,
  },
  timeDuration: {
    fontSize: 10,
    textAlign: 'center',
    color: '#fff'
  },
  timeLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: '#fff'
  },
  location: {
    fontSize: 13,
    color: '#000',
    paddingTop: 7,
    padding: 5,
  }
})

const Popup = ({ coordinate, location, duration }) => (
  <MapView.Marker coordinate={coordinate}>
    <View style={styles.container}>
      {duration &&
        <View style={styles.timeContainer}>
          <Text style={styles.timeDuration}>{duration}</Text>
          <Text style={styles.timeLabel}>mins</Text>
        </View>
      }
      <Text style={styles.location}>{location}</Text>
    </View>
  </MapView.Marker>
)

export default Popup;