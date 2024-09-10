/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ReactNode } from "react"

export interface CustomGridColDef extends GridColDef {
  customType?: CustomType
  renderCell?: (params: GridRenderCellParams<any, any>) => ReactNode
}
export interface CustomGridColDef extends GridColDef {
  customType?: "default" | "list"
}

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
  renderCell?: (params: GridRenderCellParams<any, any>) => ReactNode
}
