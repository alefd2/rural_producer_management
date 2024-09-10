import { useState } from "react"
import { useSnackbar } from "../../components/Snackbar"

export const useClipboard = () => {
  const { setInfo, setError } = useSnackbar()
  const [copiado, setCopiado] = useState(false)

  const copiarTextoParaClipboard = (texto: string) => {
    navigator.clipboard
      .writeText(texto)
      .then(function () {
        setInfo(`Código copiado: ${texto}`)
        setCopiado(true)
      })
      .catch(function (err) {
        setError("Erro ao copiar texto: " + err.message)
      })
  }

  return { copiado, copiarTextoParaClipboard }
}
