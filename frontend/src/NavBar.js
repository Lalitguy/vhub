import {Link } from 'react-router-dom';

function NavBar() {
   return (
      <div className='w-screen'>
         <div className='flex font-km md:text-4xl text-xl cursor-pointer justify-between w-screen pt-2'>
         <Link to="/" >
         <button className='ml-4 md:hover:scale-105'>Home</button>
         </Link>

         <div>
            <span className='mr-4'>vHUB</span>
         </div>
         </div>



      </div>
   );
}

export default NavBar;