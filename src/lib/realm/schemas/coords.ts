import { Realm } from '@realm/react'

export interface CreateCoordsData {
  latitude: number
  longitude: number
  timestamp: number
}

export class Coords extends Realm.Object<Coords> {
  latitude!: number
  longitude!: number
  timestamp!: number

  static schema: Realm.ObjectSchema = {
    name: 'Coords',
    embedded: true,
    properties: {
      latitude: 'float',
      longitude: 'float',
      timestamp: 'float',
    },
  }

  static create(data: CreateCoordsData) {
    return data
  }
}
