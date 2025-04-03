import { useEffect } from "react";
import { XCircle } from "lucide-react";

interface APIErrorPopupProps {
  message: string;
  onClose: () => void;
}

const APIErrorPopup: React.FC<APIErrorPopupProps> = ({ message, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center bg-red-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 animate-fadeIn">
      <XCircle className="w-5 h-5 mr-3" />
      <span>{message}</span>
      <button className="ml-4 text-white" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default APIErrorPopup;
