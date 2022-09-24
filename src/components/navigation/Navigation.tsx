import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <nav className='flex justify-between items-center px-5 h-[50px] shadow-md bg-pink-500'>
      <h3 className='font-bold'>GitHub Search</h3>

      <span>
        <Link to='/'> Home</Link>
        <Link to='/favourites'> Favourites</Link>
      </span>
    </nav>
  )
}
