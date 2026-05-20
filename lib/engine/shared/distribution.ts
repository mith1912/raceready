export function distributeBySelectedSources<T extends string>(
  selectedSources: T[] | undefined,
  defaultRatios: Record<T, number>
): Record<T, number> {
  const allSources = Object.keys(defaultRatios) as T[]

  const activeSources =
    selectedSources && selectedSources.length > 0
      ? selectedSources
      : allSources

  const activeTotal = activeSources.reduce((sum, source) => {
    return sum + (defaultRatios[source] ?? 0)
  }, 0)

  if (activeTotal <= 0) {
    const equalRatio = 1 / activeSources.length

    return activeSources.reduce((acc, source) => {
      acc[source] = equalRatio
      return acc
    }, {} as Record<T, number>)
  }

  return activeSources.reduce((acc, source) => {
    acc[source] = (defaultRatios[source] ?? 0) / activeTotal
    return acc
  }, {} as Record<T, number>)
}