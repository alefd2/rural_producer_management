export interface User {
  id?: string
  name: string
  password: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUserResponse {
  data: User
}

export interface CreateUserParams {
  user: User
  closeModal: () => void
}
