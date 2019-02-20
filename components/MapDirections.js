import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { MapView } from 'expo';

const MapDirections = (props) => {
  return (
    <React.Fragment>
      <MapViewDirections
        destination={props.destination}
        origin={props.origin}
        onReady={props.onReady}
        apikey={props.apiKey}
        strokeWidth={3}
        strokeColor="#222"
      />

      <MapView.Marker
        coordinate={props.destination}
        anchor={{ x: 0, y: 0 }}
      />
    </React.Fragment>
  )
}

export default MapDirections;