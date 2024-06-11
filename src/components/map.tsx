import { Car, FlagCheckered } from 'phosphor-react-native'
import { useRef } from 'react'
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import { useTheme } from 'styled-components/native'

import { IconBox } from './icon-box'

export interface MapProps extends MapViewProps {
  coordinates: LatLng[]
}

export function Map({ coordinates, ...props }: MapProps) {
  const mapRef = useRef<MapView>(null)
  const theme = useTheme()

  const center = calculateCoordinatesCenter(coordinates)
  const firstCoordinate = coordinates[0]
  const lastCoordinate =
    coordinates.length > 1 ? coordinates[coordinates.length - 1] : null

  async function onMapLoaded() {
    if (lastCoordinate) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      })
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      rotateEnabled={false}
      onMapLoaded={(e) => {
        onMapLoaded()
        props?.onMapLoaded?.(e)
      }}
      {...props}
    >
      {firstCoordinate && (
        <Marker identifier="departure" coordinate={firstCoordinate}>
          <IconBox size="small" icon={Car} />
        </Marker>
      )}

      {lastCoordinate && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="small" icon={FlagCheckered} />
          </Marker>

          <Polyline
            coordinates={coordinates}
            strokeColor={theme.colors.gray700}
            strokeWidth={6}
          />
        </>
      )}
    </MapView>
  )
}

function calculateCoordinatesCenter(coordinates: LatLng[]): LatLng {
  const center = coordinates.reduce<LatLng>(
    (acc, { latitude, longitude }) => {
      acc.latitude += latitude
      acc.longitude += longitude
      return acc
    },
    { latitude: 0, longitude: 0 },
  )

  center.latitude /= coordinates.length
  center.longitude /= coordinates.length

  return center
}
