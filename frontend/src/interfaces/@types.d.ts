/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LogoProps {
  menuOpen: boolean
}

// Tipagem para o componente CustomIcon
export interface CustomIconProps extends SvgIconProps {
  active?: boolean
}

// Tipagem para o componente Drawer
export interface DrawerProps {
  open: boolean
  width?: string
}

// Tipagem para o componente MenuItem
export interface MenuItemProps {
  to?: string
  icon: ReactElement<IconProps>
  label: string
  childs?: MenuItemProps[]
  isChild?: boolean
  onClick?: () => void
  isDisabled?: boolean
  sx?: any // Adiciona a tipagem para sx
}
