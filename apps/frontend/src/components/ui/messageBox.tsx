import { useEffect, useState } from "react";

interface MessageBoxProps {
  message: string | null;
  type?: "success" | "error" | "info";
}

export const MessageBox = ({ message, type = "info" }: MessageBoxProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000); // desaparece tras 4 segundos

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !visible) return null;

  const baseStyles = "p-3 rounded-lg text-sm font-medium mt-2";
  const styles =
    type === "success"
      ? "bg-green-100 text-green-800 border border-green-300"
      : type === "error"
      ? "bg-red-100 text-red-800 border border-red-300"
      : "bg-blue-100 text-blue-800 border border-blue-300";

  return <div className={`${baseStyles} ${styles}`}>{message}</div>;
};