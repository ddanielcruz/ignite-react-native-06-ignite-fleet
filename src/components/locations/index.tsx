import { Car, FlagCheckered } from 'phosphor-react-native'

import { LocationInfo, LocationInfoProps } from '../location-info'
import { Container, Line } from './styles'

interface LocationsProps {
  departure: Omit<LocationInfoProps, 'icon'>
  arrival: Omit<LocationInfoProps, 'icon'>
}

export function Locations({ departure, arrival }: LocationsProps) {
  return (
    <Container>
      <LocationInfo {...departure} icon={Car} />
      <Line />
      <LocationInfo {...arrival} icon={FlagCheckered} />
    </Container>
  )
}
