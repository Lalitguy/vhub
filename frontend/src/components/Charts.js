import React, { useState, useEffect } from 'react';
import { AreaChart, BarChart, LineChart, Area, Line, CartesianGrid, linearGradient, defs, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';
import ToggleButton from './reusables/ToggleButton';
import Download from './reusables/DownloadService';
import useScreenSize from './reusables/ScreenSize';


const Charts = () => {
  const [inputValue, setInputValue] = useState('');
  const [uvInputValue, setUvInputValue] = useState('');
  const [inputDatakeyValue, setInputDatakeyValue] = useState('');
  const [data, setData] = useState([]);
  const [xText, setXAxisText] = useState('');
  const [yText, setYAxisText] = useState('');
  const [isChecked, setCheckStatus] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [showLine, setShowLine] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const screenSize = useScreenSize();

  const handleSelectChange = (selectedOption) => {
    // Reset all variables to false
    //const selectedOption = e.target.value;



    setShowBar(false);
    setShowLine(false);
    setShowArea(false);

    // Set the selected variable to true
    if (selectedOption === 'BarChart') {
      setShowBar(true);
    } else if (selectedOption === 'LineChart') {
      setShowLine(true);
    } else if (selectedOption === 'AreaChart') {
      setShowArea(true);
    }
  };
  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);

    // Split input values by comma and create an array of objects
    const newData = input.split(',').map((value, index) => ({
      name: String.fromCharCode(65 + index), // A, B, C, ...
      pv: parseInt(value, 10) || 0,
      uv: 0

    }));

    setData(newData);
  };
  const handleUvInputChange = (e) => {
    const uvInput = e.target.value;
    setUvInputValue(uvInput);

    const updatedData = data.map((item, index) => ({
      ...item,
      uv: uvInput.split(',')[index] ? parseInt(uvInput.split(',')[index], 10) || 0 : 0 // Parse UV value, default to 0 if not a valid number
    }));

    setData(updatedData);
  };
  const handleToggle = (isToggled) => {
    //alert(`Toggle state: ${isToggled}`);
    setCheckStatus(isToggled);

  };
  useEffect(() => {

    const defaultNames = data.map((item) => item.name).join(',' + ' ');
    setInputDatakeyValue(defaultNames);
  }, [data]);

  const handleDatakeyChange = (e) => {
    const defaultInput = e.target.value;
    setInputDatakeyValue(defaultInput);

    // Update the corresponding names in the data array
    const updatedData = defaultInput.split(',').map((name, index) => ({
      name: name.trim(), // Trim whitespace
      pv: data[index] ? data[index].pv : 0,
      uv: data[index] ? data[index].uv : 0
    }));

    setData(updatedData);
  };



  const handleXAxisText = (e) => {
    const xtext = e.target.value;
    setXAxisText(xtext);
  }
  const handleYAxisText = (e) => {
    const ytext = e.target.value;
    setYAxisText(ytext);
  }

  const [firstValue, setFirstValue] = useState('pv');
  const [secondValue, setSecondValue] = useState('uv');

  const handleFirstValue = (e)=>{
    const val = e.target.value;
    setFirstValue(val)
  }
  const handleSecondValue = (e)=>{
    const val = e.target.value;
    setSecondValue(val)
  }
  return (
    <div className='text-white md:text-2xl text-base w-screen font-mont min-h-screen mt-4 pb-12'>
      <div className='flex flex-wrap w-screen '>
        <div className='flex justify-between w-screen md:px-14 p-4 md:my-4'>
          <select onChange={(e) => handleSelectChange(e.target.value)} className='bg-transparent border-white border p-2 rounded-md hover:scale-105 hover:text-gray-700 hover:cursor-pointer'>
            <option value="BarChart">Bar Chart</option>
            <option value="AreaChart">Area Chart</option>
            <option value="LineChart">Line Chart</option>
          </select>
          <span className='p-2 flex items-center justify-center'>Joint bar<ToggleButton onToggle={handleToggle} /></span>
        </div>
      </div>
      <div className='flex flex-row-reverse flex-wrap w-screen'>
        <div className='flex flex-wrap flex-col md:p-10 md:w-1/2 max-md:text-base'>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter values separated by commas..." className='w-11/12 md:text-3xl bg-gray-800 text-white md:p-4  border border-white m-2 rounded-lg px-2 hover:border-yellow-200 md:hover:scale-x-105 transition duration-700' />

          <input type="text" value={inputDatakeyValue} onChange={handleDatakeyChange} placeholder="Datakey Name..." className='w-11/12 md:text-3xl bg-gray-800 text-white md:p-4 px-2 border border-white m-2 rounded-lg hover:border-yellow-200 md:hover:scale-x-105 transition duration-700' />

          {isChecked && <input type="text" value={uvInputValue} onChange={handleUvInputChange} placeholder="Second data key value" className='w-11/12 md:text-3xl bg-gray-800 text-white md:p-4 px-2 border border-white m-2 rounded-lg hover:border-blue-400 hover:scale-x-105 transition duration-700 md:mb-8' />}
         
<div className='flex md:flex-col'>
          <input type="text" value={firstValue} onChange={handleFirstValue} placeholder="Data Attribute Name" className='w-1/2 md:text-3xl bg-gray-800 text-white md:p-4 border px-2 border-white m-2 rounded-md hover:border-blue-400 md:hover:scale-x-105 transition duration-700' />

          <input type="text" value={secondValue} onChange={handleSecondValue} placeholder="Data Attribute Name" className='w-1/2 md:text-3xl bg-gray-800 text-white md:p-4 border px-2 border-white m-2 rounded-md hover:border-blue-400 md:hover:scale-x-105 transition duration-700' />
          </div>
<div className='flex md:flex-col'>
          <input type="text" value={xText} onChange={handleXAxisText} placeholder="X axis Value" className='w-1/2 md:text-3xl bg-gray-800 text-white md:p-4 border border-white px-2 m-2 rounded-md hover:border-blue-400 md:hover:scale-x-105 transition duration-700' />

          <input type="text" value={yText} onChange={handleYAxisText} placeholder="Y axis Value" className='w-1/2 md:text-3xl bg-gray-800 text-white md:p-4 border border-white px-2 m-2 rounded-md hover:border-blue-400 md:hover:scale-x-105 transition duration-700' />
          </div>


        </div>



        {/*<ul>
        {data.map((item) => (
          <li key={item.name}>{`Name: ${item.name}, PV: ${item.pv}`}</li>
        ))}
        </ul>*/}
        <div className='max-md:w-screen max-md:mt-4'>
          {showBar && (
            <div className='bg-white'>
              <BarChart id='barId' data={data} width={screenSize[0]} height={screenSize[1]} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis >
                  <Label value={xText} offset={0} position="bottom" className='-mb-12'>
                  </Label>
                </XAxis>
                <YAxis>
                  <Label value={yText} angle={-90} position="insideLeft" offset={10}>
                  </Label>
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey={firstValue} fill="#8884d8" />
                {isChecked && <Bar dataKey={secondValue} fill="#82ca9d" />}

              </BarChart>
            </div>)}




          {showArea && (
            <div className='bg-white p-4'>
              <AreaChart
               width={screenSize[0]} height={screenSize[1]}
                data={data}
                id="areaId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis >
                  <Label value={xText} offset={0} position="insideBottom">
                  </Label>
                </XAxis>
                <YAxis>
                  <Label value={yText} angle={-90} position="insideLeft">
                  </Label>
                </YAxis>
                <Tooltip />
                <Area type="monotone" dataKey={firstValue} stroke="#8884d8" fill="#8884d8" />
                {isChecked && <Area type="monotone" dataKey={secondValue} stroke="#8884d8" fill="#82ca9d" />}
              </AreaChart>
            </div>)}

          {showLine && (
            <div className='bg-white'>
              <LineChart
                width={screenSize[0]} height={screenSize[1]}
                data={data}
                id="lineId"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis>
                  <Label value={xText} offset={0} position="insideBottom">
                  </Label>
                </XAxis>
                <YAxis>
                  <Label value={yText} angle={-90} position="insideLeft">
                  </Label>
                </YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={firstValue} stroke="#8884d8" />
                <Line type="monotone" dataKey={secondValue} stroke="#82ca9d" />
              </LineChart>
            </div>)}



          {showBar && <button onClick={() => Download("barId", "barchart")} className='p-4 rounded-lg md:outline-dashed border-gray-100 hover:scale-105 hover:outline hover:bg-green-500 border hover:border-l-black hover:border-t-black transition duration-700 mt-12 md:ml-12'>Download Bar Chart</button>}
          {showArea && <button onClick={() => Download("areaId", "areachart")} className='p-4 rounded-lg md:outline-dashed border-gray-100 hover:scale-105 hover:outline hover:bg-green-500 border hover:border-l-black hover:border-t-black transition duration-700 mt-12 md:ml-12'>Download Area Chart</button>}
          {showLine && <button onClick={() => Download("lineId", "linechart")} className='p-4 rounded-lg md:outline-dashed border-gray-100 hover:scale-105 hover:outline hover:bg-green-500 border hover:border-l-black hover:border-t-black transition duration-700 mt-12 md:ml-12'>Download Line Chart</button>}
        </div>
      </div>
    </div>
  );
};

export default Charts;
