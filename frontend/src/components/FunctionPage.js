import { useEffect, useState } from 'react';

function FunctionPage() {
   
   const [isLoading, setLoading] = useState(true);
   const [text,setText] = useState('Loading...');
  useEffect(() => {
     
    
    if (!document.getElementById('desmos-script')) {
      const script = document.createElement('script');
      script.id = 'desmos-script';
      script.src = 'https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
      script.async = true;
      script.onload = () => {
         setLoading(false);
        const elt = document.getElementById('calculator');
        const calculator = Desmos.GraphingCalculator(elt);
      };

      document.body.appendChild(script);
    };
    
    
  }, []);

  useEffect(() => {
    const updateText = () => {
      setText('Try reloading the page...');
    };

    const timeoutId = setTimeout(updateText, 4000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    
    <div id="calculator" className='w-screen h-screen'>
      {isLoading && <div className='md:text-2xl text-lg'>{text}</div> }
    </div>
  );
}

export default FunctionPage;
