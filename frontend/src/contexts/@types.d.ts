export interface AuthLocalStorage {
  accessToken: string
  isAuthenticated: boolean
  expiresIn: number
  userId: string
}

export interface AuthContextType {
  authClient: (user: string, password: string) => Promise<boolean>
  logoff: () => void
  authLoginResponse: AuthLocalStorage
  isAuthenticated: boolean
}
