import { Realm } from '@realm/react'

export interface CreateHistoryData {
  userId: string
  licensePlate: string
  description: string
}

export type HistoryStatus = 'departure' | 'arrival'

export class History extends Realm.Object<History> {
  _id!: string
  userId!: string
  licensePlate!: string
  description!: string
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
      status: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  }

  static create(data: CreateHistoryData) {
    return {
      _id: new Realm.BSON.UUID(),
      ...data,
      status: 'departure',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}
