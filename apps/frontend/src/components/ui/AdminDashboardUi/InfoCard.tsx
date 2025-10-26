
interface InfoCardProps {
  label: string;
  value: number;}

export const InfoCard = ({ label, value }:InfoCardProps) => {
  return (
    <div
      className="
        bg-white 
        shadow-md 
        rounded-3xl 
        p-4 
        w-75 
        h-30 
        flex 
        flex-col 
        justify-center 
        items-center 
        transition-transform 
        transform 
        hover:scale-105 
        hover:shadow-lg
      "
    >
      <p className="text-gray-600 text-2xl font-medium mb-1">{label}</p>
      <p className="text-blue-700 text-4xl ">{value}</p>
    </div>
  );
};