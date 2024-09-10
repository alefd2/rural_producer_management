import { format } from "date-fns"

export function formateToDate(
  date: string | number | Date,
  formatString = "dd/MM/yyyy HH:mm:ss"
) {
  if (!date) {
    return "" // Retorna uma string vazia se a data for nula
  }
  return format(new Date(date), formatString)
}

export const DateFormat = {
  formateToDate,
}
