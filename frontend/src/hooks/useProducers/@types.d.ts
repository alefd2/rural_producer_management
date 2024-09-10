export interface Producers {
  id?: string
  document: string
  producerName: string
  farmNAme: string
  city: string
  state: string
  areaInHectares: double
  usersId: string
  plantedCrops: string[]
  arableAreaInHectares: double
  vegetationAreaInHectares: double
}

export interface CreateProducersResponse {
  data: Producers
}

export interface CreateProducersParams {
  producers: Producers
  closeModal: () => void
}
