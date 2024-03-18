import './App.css';
import NavBar from './NavBar';
import Home from './components/Home';
import FunctionPage from './components/FunctionPage';
import SortVisualize from './components/SortVisualize';
import Charts from './components/Charts';
import VisualizaData from './components/VisualizaData';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

import {
   BrowserRouter,
   Routes,
   Route
} from 'react-router-dom';

import {useAuth0} from '@auth0/auth0-react';

function App() {
   const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   
   useEffect(() => {
      setIsLoggedIn(isAuthenticated);
      if(isAuthenticated){
         toast.success('Logged in Successfully');
      }
   }, [isAuthenticated]);

   const handleLogin = () => {
      loginWithRedirect();
      
      localStorage.setItem('userLoggedIn', 'true');
   };
   const handleLogout = () => {
      logout({ returnTo: window.location.origin });
      toast('Logged Out Successfully');
      localStorage.removeItem('userLoggedIn');
      setIsLoggedIn(false);
   };

   useEffect(() => {
      const storedIsLoggedIn = localStorage.getItem('userLoggedIn');
      if (storedIsLoggedIn) {
         setIsLoggedIn(true);
      }
   }, []);

   return (

      <BrowserRouter>
      <div className="App bg-gray-900 text-white w-screen min-h-screen pb-16">
         
         <div className="nav w-screen">
            <NavBar />
         </div >
         
         <div >
            <Routes>
               <Route exact path="/" element={<Home />}/>
               <Route path="/FunctionPage" element={<FunctionPage />} />
               <Route path="/sort-visualizer" element={<SortVisualize />} />
               <Route path="/Charts" element={<Charts />} />
               <Route path="/VisualizeData" element={<VisualizaData />} />
               
            </Routes>
            
            
            {!isLoggedIn? 
            <button onClick={handleLogin} className='md:text-3xl border text-lg border-white text-white hover:scale-105 transition-colors duration-300 hover:bg-green-700 font-km px-6 py-2 rounded-xl md:ml-8 ml-2'>Log In</button>: 
            <button onClick={handleLogout} className='md:text-3xl border text-lg border-white text-white hover:scale-105 transition-colors duration-300 hover:bg-red-700 font-km px-6 py-2 rounded-xl md:ml-8 ml-2'>Log Out</button> 
            }
         </div>
         <Toaster  />
      </div>
    </BrowserRouter>
   );
}

export default App;