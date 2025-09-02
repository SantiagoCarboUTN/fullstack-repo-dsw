import { Link } from 'react-router-dom'

type DefaultLinkProps = {
  route: string
  text: string
}

export const Default_Link = ({ route, text }: DefaultLinkProps) => {
  return (
    <Link to={route} className="hover:text-black hover:scale-105 transform transition duration-200">
      {text}
    </Link>
  )
}


