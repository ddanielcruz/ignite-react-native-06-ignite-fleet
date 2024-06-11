import { createRealmContext } from '@realm/react'

import { Coords } from './schemas/coords'
import { History } from './schemas/history'

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [History, Coords],
    schemaVersion: 1,
  })
