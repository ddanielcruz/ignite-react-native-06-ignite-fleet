import dayjs from 'dayjs'
import { Check, ClockClockwise } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { History } from '@/lib/realm/schemas/history'

import { Container, Departure, Info, LicensePlate } from './styles'

export interface HistoryCardProps extends TouchableOpacityProps {
  history: History
  synced?: boolean
}

export function HistoryCard({
  history,
  synced = false,
  ...props
}: HistoryCardProps) {
  const theme = useTheme()

  const formattedDate = dayjs(history.createdAt).format(
    '[Saída em] DD/MM/YYYY [às] HH:mm',
  )

  return (
    <Container {...props}>
      <Info>
        <LicensePlate>{history.licensePlate}</LicensePlate>
        <Departure>{formattedDate}</Departure>
      </Info>

      {synced ? (
        <Check size={24} color={theme.colors.brandLight} />
      ) : (
        <ClockClockwise size={24} color={theme.colors.gray400} />
      )}
    </Container>
  )
}
