import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  label: string;
  to: string;
}


export const NavigateButton = ({ label, to }:NavigateButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="animate-slide-in-bottom w-70 border-box mt-5 self-end bg-blue-600 text-white py-4 rounded-2xl text-xl font-semibold hover:bg-blue-700 transition-colors duration-300 ml-5"
    >
      {label}
    </button>
  );
};