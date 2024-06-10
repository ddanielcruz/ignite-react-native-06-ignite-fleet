import { IconProps } from '../button-icon'
import { IconBox } from '../icon-box'
import { Container, Info, Label, Location } from './styles'

export interface LocationInfoProps {
  label: string
  location: string
  icon: IconProps
}

export function LocationInfo({ label, location, icon }: LocationInfoProps) {
  return (
    <Container>
      <IconBox icon={icon} style={{ marginRight: 12 }} />

      <Info>
        <Label numberOfLines={1}>{label}</Label>
        <Location numberOfLines={1}>{location}</Location>
      </Info>
    </Container>
  )
}
