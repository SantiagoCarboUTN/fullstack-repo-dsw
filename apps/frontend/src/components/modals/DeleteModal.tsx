

interface DeleteModalProps {
  confirmationText: string;
  setDeleteModalOpen: (value: React.SetStateAction<boolean>) => void,
  handleConfirmDelete: () => Promise<void>
}

export const DeleteModal= ({confirmationText,setDeleteModalOpen,handleConfirmDelete}:DeleteModalProps)=>{
  return(<div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={() => setDeleteModalOpen(false)}
          ></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">Confirmar Eliminación</h3>
            <p className="mb-4 text-center text-gray-700">
              {confirmationText}
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={()=>{
                  handleConfirmDelete()
                  setDeleteModalOpen(false)
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>)
}