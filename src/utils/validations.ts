const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

export function isValidLicensePlate(value: string): boolean {
  return new RegExp(LICENSE_PLATE_REGEX).test(value)
}
