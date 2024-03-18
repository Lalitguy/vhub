import React, { useEffect, useRef } from 'react';
import Desmos from 'desmos';

function FunctionPage() {
  const containerRef = useRef(null);
  const calculator = useRef(null);

  useEffect(() => {
    if (!calculator.current) {
      calculator.current = Desmos.GraphingCalculator(containerRef.current);
    }
  }, []);

  useEffect(() => {
    const cleanup = () => {
      if (calculator.current) {
        calculator.current.destroy();
      }
    };
    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className='w-screen mb-4' style={{height: "94vh"}}>
      
    </div>
  );
}

export default FunctionPage;
