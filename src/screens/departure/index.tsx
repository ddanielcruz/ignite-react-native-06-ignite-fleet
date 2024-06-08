import { LicensePlateInput } from '@/components/license-plate-input'
import { Screen } from '@/components/screen'
import { ScreenHeader } from '@/components/screen-header'

import { Content } from './styles'

export function DepartureScreen() {
  return (
    <Screen>
      <ScreenHeader title="Saída" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="BRA1234" />
      </Content>
    </Screen>
  )
}
