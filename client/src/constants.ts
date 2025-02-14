export const USERS_API_URL = 'http://localhost:3002/users'
export const ROLES_API_URL = 'http://localhost:3002/roles'

export interface User {
  id: string
  createdAt: string
  updatedAt: string
  first: string
  last: string
  roleId: string
  photo?: string
}

export interface UserResponse {
  data: User[]
  next: number | null
  prev: number | null
  pages: number
}

export interface Role {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  isDefault: boolean
}

export interface RolesQueryData {
  data: Role[] | undefined
  isLoading: boolean
  onUpdate: (roleId: string, name: string) => void
}

export const formatDate = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: "numeric", year: 'numeric' })