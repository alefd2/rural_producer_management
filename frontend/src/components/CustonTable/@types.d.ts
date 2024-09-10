/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ReactNode } from "react"

// Tipos personalizados
export type CustomType =
  | "accessLevel"
  | "status"
  | "situationType"
  | "simpleStatusBoolean"
  | "defaultBadge"
  | "simpleKmBadge"
  | "action"

// Definição do tipo para as colunas
export interface CustomGridColDef extends GridColDef {
  customType?: CustomType
  renderCell?: (params: GridRenderCellParams<any, any>) => ReactNode
}

// Tipagem para as propriedades da tabela
interface CustonTableProps {
  rows: {
    data: any[]
    totalRecords: number
  }
  columns: CustomGridColDef[]
  setCurrentPage: (page: number) => void
  currentPage: number
  height?: number
  props?: object
}

interface TableSimpleProps {
  rows: GridRowsProp
  columns: CustomGridColDef[]
  props?: object
}
