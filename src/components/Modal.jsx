

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 h-3/4 overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          &times; {/* Close (X) Icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
