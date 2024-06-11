import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@ignitefleet:location'

export interface StorageLocation {
  latitude: number
  longitude: number
  timestamp: number
}

export async function getStoredLocations(): Promise<StorageLocation[]> {
  const storedLocations = await AsyncStorage.getItem(STORAGE_KEY)
  return storedLocations ? JSON.parse(storedLocations) : []
}

export async function saveLocationToStorage(location: StorageLocation) {
  const locations = await getStoredLocations()
  locations.push(location)

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(locations))
}

export async function removeStoredLocations() {
  await AsyncStorage.removeItem(STORAGE_KEY)
}
