import './App.css';
import NavBar from './NavBar';
import Home from './components/Home';
import FunctionPage from './components/FunctionPage';
import SortVisualize from './components/SortVisualize';
import Charts from './components/Charts';
import VisualizaData from './components/VisualizaData';
import { useState, useEffect, Component } from 'react';
import { Toaster, toast } from 'sonner';
import Page404 from './components/reusables/Page404';
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
               <Route exact path="/FunctionPage" element={<FunctionPage />} />
               <Route exact path="/sort-visualizer" element={<SortVisualize />} />
               <Route exact path="/Charts" element={<Charts />} />
               <Route exact path="/VisualizeData" element={<VisualizaData />} />
               <Route path="*" element={<Page404/>} />
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