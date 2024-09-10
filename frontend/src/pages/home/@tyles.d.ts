interface FarmByState {
  state: string
  count: number
}

interface FarmByCrop {
  crop: string
  count: number
}

interface LandUse {
  arableAreaInHectares: number
  vegetationAreaInHectares: number
}

interface FarmStatistics {
  totalFarms: number
  totalAreaInHectares: number
  farmsByState: FarmByState[]
  farmsByCrops: FarmByCrop[]
  landUse: LandUse
}
