
type SmallCardProps = {
  text:string;
  imgSrc:string;

}

export const Small_Card = ({text, imgSrc} : SmallCardProps) => {
  return (
    <div className = 'flex items-center gap-4 px-8 py-6 rounded-4xl shadow-xl bg-white hover:shadow-lg transition-transform duration-300 hover:scale-105 '>
        <img src={imgSrc} alt="icon" className='w-18 h-18'/>
          <p className='text-gray-700 font-medium'>
            {text} 
          </p>
    </div>
  )
}
