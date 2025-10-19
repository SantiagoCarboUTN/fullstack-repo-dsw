
interface SubmitButtonProps {
  text: string;           // Texto por defecto del botón (ej: "Guardar")
  loadingText?: string;   // Texto mientras carga (ej: "Guardando...")
  loading?: boolean;      // Estado de carga
  disabled?: boolean;     // Desactivar manualmente
  className?: string;     // Clases extra opcionales
}

export const SubmitButton = ({
  text,
  loadingText = "Guardando...",
  loading = false,
  disabled = false,
  className = "",
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={`bg-blue-700 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-800 transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-700 ${
        (loading || disabled) ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? loadingText : text}
    </button>
  );
};