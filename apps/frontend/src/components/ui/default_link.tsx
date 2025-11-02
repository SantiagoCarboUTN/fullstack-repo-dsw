import { Link } from 'react-router-dom'

type DefaultLinkProps = {
  route: string,
  text?: string,
  isImg?: boolean,
  imgSrc?: string,
}
{/* El signo de pregunta en typescript significa que la propiedad es opcional */}

export const Default_Link = ({ route, text, isImg, imgSrc }: DefaultLinkProps) => {
  return isImg ? (
    <Link to={route} className="hover:scale-105 transform transition duration-200">
      <img src={imgSrc} alt="Logo" className="h-25" />
      {text}
    </Link>
  ) : (
    <Link to={route} className="hover:text-black hover:scale-105 transform transition duration-200">
      {text}
    </Link>
  )
}


