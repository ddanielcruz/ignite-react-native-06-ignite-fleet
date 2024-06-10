import { LocationObjectCoords, reverseGeocodeAsync } from 'expo-location'

export async function getAddressLocation({
  latitude,
  longitude,
}: LocationObjectCoords) {
  try {
    const [address] = await reverseGeocodeAsync({ latitude, longitude })
    const { city, region, street, streetNumber } = address

    return `${street} ${streetNumber}, ${city}, ${region}`
  } catch (error) {
    console.error('Error getting address location:', error)
    return null
  }
}
