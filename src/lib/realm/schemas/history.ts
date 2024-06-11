import { Realm } from '@realm/react'

import { Coords } from './coords'

export interface HistoryData {
  userId: string
  licensePlate: string
  description: string
  coords: Coords[]
}

export type HistoryStatus = 'departure' | 'arrival'

export class History extends Realm.Object<History> {
  _id!: string
  userId!: string
  licensePlate!: string
  description!: string
  coords!: Coords[]
  status!: HistoryStatus
  createdAt!: Date
  updatedAt!: Date

  static schema: Realm.ObjectSchema = {
    name: 'History',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      userId: {
        type: 'string',
        indexed: true,
      },
      licensePlate: 'string',
      description: 'string',
      coords: {
        type: 'list',
        objectType: Coords.schema.name,
        default: [],
      },
      status: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  }

  static create(data: HistoryData) {
    return {
      _id: new Realm.BSON.UUID(),
      ...data,
      status: 'departure',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}
