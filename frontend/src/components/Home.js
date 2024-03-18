import {Link } from 'react-router-dom';

function Home() {
   return (
      <div className='w-screen flex p-3 md:justify-center content-center flex-col flex-wrap '>
     
      
         <div className='w-screen flex justify-center content-center flex-col flex-wrap text-3xl '>

         <span className='text-sm font-mont text-gray-300 text-center px-2 md:text-2xl md:text-gray-400 md:px-64 '>vHub is a visualization web app which can help you in visualizing Sorting Algorithms, Functions, Statistical Datasets, and even create your own charts</span>

            <Link to="/FunctionPage" className='w-screen flex p-3 justify-center content-center flex-col flex-wrap mt-2' >
               <button className='hover:bg-gray-800 rounded-xl transition duration-700 hover:text-yellow-300 md:m-1 md:text-5xl font-km font-bold p-1 hover:border-r-blue-500  hover:border-b-blue-500 hover:border-l-purple-500 hover:border-t-purple-500 md:border-8 border-4 border-transparent hover:scale-105 md:w-1/3 w-5/6 py-8 md:mb-8'>Functions</button>
            </Link>
        
            <Link to="/sort-visualizer" className='w-screen flex p-3 justify-center content-center flex-col flex-wrap mt-2' >
               <button className='hover:bg-gray-800 rounded-xl transition duration-700 hover:text-yellow-300 md:m-1 md:text-5xl font-km font-bold p-1 hover:border-r-blue-500  hover:border-b-blue-500 hover:border-l-purple-500 hover:border-t-purple-500 md:border-8 border-4 border-transparent hover:scale-105 md:w-1/3 w-5/6 py-8 md:mb-8'>Sorting Visualizer</button>
                
            </Link>
       
            <Link to="/VisualizeData" className='w-screen flex p-3 justify-center content-center flex-col flex-wrap mt-2' >
               <button className='hover:bg-gray-800 rounded-xl transition duration-700 hover:text-yellow-300 md:m-1 md:text-5xl font-km font-bold p-1 hover:border-r-blue-500  hover:border-b-blue-500 hover:border-l-purple-500 hover:border-t-purple-500 md:border-8 border-4 border-transparent hover:scale-105 md:w-1/3 w-5/6 py-8 md:mb-8'>Visualize Data</button>
               
            </Link>

            <Link to="/Charts" className='w-screen flex p-3 justify-center content-center flex-col flex-wrap mt-2' >
               <button className='hover:bg-gray-800 rounded-xl transition duration-700 hover:text-yellow-300 md:m-1 md:text-5xl font-km font-bold p-1 hover:border-r-blue-500  hover:border-b-blue-500 hover:border-l-purple-500 hover:border-t-purple-500 md:border-8 border-4 border-transparent hover:scale-105 md:w-1/3 w-5/6 py-8 md:mb-8'>Create Charts</button>
               
            </Link>
         </div>
      </div>
   );
}

export default Home;