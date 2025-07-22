// components/ConfirmDeleteModal.tsx
'use client'

type ConfirmDeleteModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    itemName?: string
}

export default function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    itemName = 'this item',
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Delete Confirmation</h2>
                <p className="text-gray-600">
                    Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
