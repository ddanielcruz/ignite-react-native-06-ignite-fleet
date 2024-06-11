import {
  hasStartedLocationUpdatesAsync,
  LocationAccuracy,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import * as TaskManager from 'expo-task-manager'

export const TASK_NAME = 'location-tracking'

interface TaskData {
  locations: Array<{
    coords: {
      latitude: number
      longitude: number
    }
    timestamp: number
  }>
}

TaskManager.defineTask<TaskData>(TASK_NAME, async ({ data, error }) => {
  if (error) {
    return console.error(error)
  }

  try {
    const { coords, timestamp } = data.locations[0]
    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    }

    console.log(currentLocation)
  } catch (error) {
    console.error(error)
  }
})

export async function startLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(TASK_NAME)
    if (hasStarted) {
      await stopLocationUpdatesAsync(TASK_NAME)
    }

    await startLocationUpdatesAsync(TASK_NAME, {
      accuracy: LocationAccuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.error(error)
  }
}

export async function stopLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(TASK_NAME)
    if (hasStarted) {
      await stopLocationUpdatesAsync(TASK_NAME)
    }
  } catch (error) {
    console.error(error)
  }
}
