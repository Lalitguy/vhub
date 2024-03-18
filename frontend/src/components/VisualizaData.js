import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { AreaChart, BarChart, LineChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
import Download from './reusables/DownloadService';
import ToggleButton from './reusables/ToggleButton';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import useScreenSize from './reusables/ScreenSize';
import ConfirmationComponent from './reusables/ConfirmationBox';
import { toast } from 'sonner';

const VisualizaData = () => {
  const [jsonData, setJsonData] = useState(null);
  const screenSize = useScreenSize();

  const convertXLSXtoCSV = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const csv = XLSX.utils.sheet_to_csv(sheet, { header: 1, raw: true });

        resolve(csv);
      };
      reader.readAsArrayBuffer(file);
    });
  };


  const parseCSVtoJSON = (csv) => {
    return new Promise((resolve) => {
      Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data);
        },
      });

    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      let jsonData;
      if (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
        jsonData = await parseCSVtoJSON(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const csv = await convertXLSXtoCSV(file);
        setCsvData(csv);
        jsonData = await parseCSVtoJSON(csv);
      } else {
        console.error('Unsupported file type');
        return;
      }
      setJsonData(jsonData);
      newArrFun(jsonData);
    });
  }, []);

  const [newArray, setNewArray] = useState(null);
  const newArrFun = (arr) => {
    const keys = Object.keys(arr[0]);

    // Initialize an empty array for each key
    const newArray = keys.map(key => arr.map(item => ({ [key]: item[key] })));
    setNewArray(newArray)
  }
  const [csvData, setCsvData] = useState([]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.csv,.xlsx' });

  const [colorValues, setColorValues] = useState(null);

  const handleColorChange = (index, newValue) => {
    const newColorValues = [...colorValues];
    newColorValues[index] = newValue;
    setColorValues(newColorValues);
  };
  useEffect(() => {
    // Set colorValues array length based on jsonData length
    if (jsonData && jsonData[0] && jsonData.length > 0) {
      setColorValues(Array(jsonData.length).fill("#82ca9d"));

    }
  }, [jsonData]);

  const [showBar, setShowBar] = useState(true);
  const [showLine, setShowLine] = useState(false);
  const [showArea, setShowArea] = useState(false);

  const handleSelectChange = (selectedOption) => {

    setShowBar(false);
    setShowLine(false);
    setShowArea(false);


    if (selectedOption === 'BarChart') {
      setShowBar(true);
    } else if (selectedOption === 'LineChart') {
      setShowLine(true);
    } else if (selectedOption === 'AreaChart') {
      setShowArea(true);
    }
  };


  const [isChecked, setCheckStatus] = useState(false);

  const handleToggle = (isToggled) => {

    setCheckStatus(isToggled);

  };


  const { user, isAuthenticated } = useAuth0();

  const [savedDataset, setSavedDataset] = useState([]);
  const [communityDataset, setCommunityDataset] = useState([]);

  
  const saveToUserDB = async (name) => {
    try {
      //const name = prompt("Enter name for Data set");
      const dataArray = [
        {
          name: name,
          email: user.email,
          data: jsonData
        }]
      const response = await axios.post('https://vhub.onrender.com/saveData', dataArray);
      toast.success('Dataset Saved');
    } catch (error) {
      toast.error("Snap ! Unable to Save");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      axios.get('https://vhub.onrender.com/user', {
        params: {
          email: user.email
        }
      })
        .then((result) => {
          setSavedDataset(result.data);
          
        })
        .catch((err) => {
          toast.error("Unable to load user Datasets. Please try again");
        });

    }
  },[]);

  const saveToCommunityDB = async (name) => {
    try {
      //const name = prompt("Enter name for Data set");
      const dataArray = [
        {
          name: name,
          email: user.email,
          data: jsonData
        }]

      const response = await axios.post('https://vhub.onrender.com/saveTocommunity', dataArray);

      toast.success('Dataset Saved for community');
    } catch (error) {
      toast.error("Snap ! Unable to Save");
    }
 
  }

  const handleCommunityImport = () => {
    axios.get('https://vhub.onrender.com/community')
      .then((result) => {

        setCommunityDataset(result.data);
        setShowCommunityDatasets(true);
        toast.success('Datasets Imported');
      })
      .catch((err) => {
        toast.error("Unable to load Datasets. please Try Again");
      })
  }

  const [showCommunityDatasets, setShowCommunityDatasets] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [importedData, setImportedData] = useState(null);
  const [askDatasetName, setAskDatabaseName] = useState(false);
  const [datasetName, setDatasetName] = useState('');
  const [forCommunity, setForCommunity] = useState(false);

  const handleConfirmationDialogue = (data) => {
    setImportedData(data);
    setShowConfirmation(true);
  }
  const handleConfirm = () => {

    setJsonData(importedData.data);
    newArrFun(importedData.data);
    setShowConfirmation(false);
    setShowCommunityDatasets(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setAskDatabaseName(false);
    toast.success('Operation Aborted');
  };

  const handleDBsaving = (comunity)=>{

    setAskDatabaseName(true);
    
    if(comunity){
      setForCommunity(true);
    }
  }
  const getDatasetName = (e)=>{
    const name= e.target.value;
    setDatasetName(name);
  }
  const saveToDatabase =()=>{
    if (!forCommunity ){
      saveToUserDB(datasetName);
    }
    else{
      saveToCommunityDB(datasetName);
      setForCommunity(false);
    }
    setAskDatabaseName(false);
    setDatasetName('');
  }
  return (
    <div className='w-screen flex flex-col flex-wrap items-center content-center md:text-3xl text-lg text-white font-mont min-h-screen mt-8 pb-8'>
      <div {...getRootProps()} style={dropzoneStyle} className='w-8/12 border-white font-km h-52 flex flex-wrap items-center justify-center rounded-xl'>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the CSV or XLSX file here ...</p> : <p>Drag & drop a CSV or XLSX file here, or click to select a file</p>}
      </div>


      {showConfirmation && <ConfirmationComponent
        message="Are you sure you want to import this Dataset ?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />}
      {
        askDatasetName && (
          <div className="w-3/5 top-1/3 flex flex-col p-2 bg-gray-500 text-black fixed font-mont text-2xl rounded-lg transition-opacity duration-300">
            <div className='flex justify-end  pb-4'><button onClick={handleCancel} className='border px-1 py-0 hover:text-red-500 hover:border-red-500 '>X</button></div>
            <div className=" pb-4 w-full font-bold mb-4 transition duration-1000">Enter the name for the dataset</div>
            <input type='text' className='border px-2 py-2' value={datasetName} onChange={getDatasetName} />
            <div className="confirmation-buttons flex justify-end mt-4">
                <button onClick={handleCancel} className='border-black border hover:border-red-500 hover:text-red-800 hover:font-bold bg-red-100 p-2 rounded-lg ml-4'>Cancel</button>
                <button onClick={saveToDatabase} className='border-black border hover:border-green-500 hover:text-green-800 hover:font-bold bg-green-100 p-2 rounded-lg ml-4'>Confirm</button>

            </div>
        </div>
        )
      }

      <div className='flex flex-wrap flex-col w-screen items-center justify-center '>
        <span className='font-thin text-gray-500'>---OR---</span>
        <div className='md:w-8/12 w-screen flex max-md:flex-col text-gray-400 items-center'>
          <div className='max-md:w-9/12 flex flex-row'>
          <span> Import any Community uploaded Datasets ?</span>
          <button onClick={handleCommunityImport} className='border hover:scale-105 transition duration-300 p-4 md:px-12 hover:bg-green-500 hover:font-bold hover:border-black text-white rounded-lg md:ml-8'>GET</button>
          </div>
          {!showCommunityDatasets && !jsonData && <span className='md:w-64 md:text-lg md:p-2 md:ml-4 max-md:text-base max-md:text-center w-screen max-md:mt-4'>This will Fetch the Datasets uploaded by the users for community</span>}
        </div>
        <div className=' bg-transparent text-white md:text-lg text-base  w-screen flex flex-col items-center justify-center'>

          {showCommunityDatasets && (<div className='border-2 border-black rounded-2xl md:w-6/12 w-11/12 my-4 bg-slate-700' >
            {
              communityDataset.map((data) => (

                <div className=" flex flex-row w-full justify-between md:px-8 px-2 py-2  rounded-2xl" >
                  <div className='flex flex-col bg-slate-800 w-4/5 p-4 rounded-xl'>
                    <span className=' md:text-2xl text-lg'>{data.name}</span>
                    <span className='font-thin text-gray-400'>Uploaded By: <span className='md:ml-4'>{data.email}</span></span>
                  </div>
                  <div className='p-4 rounded-xl'>
                    <button className=" text-white border-black md:text-xl text-base hover:bg-blue-500  hover:border-black rounded-lg py-4 px-2 transition duration-200 bg-slate-800 " onClick={() => handleConfirmationDialogue(data)}> IMPORT </button>
                  </div>
                </div>
              ))
            }
          </div>)}
        </div>
      </div>
      {jsonData && (<div className='flex flex-wrap max-md:flex-col md:justify-between w-screen md:px-12'>
        <select onChange={(e) => handleSelectChange(e.target.value)} className='bg-transparent border-white border p-2 rounded-md hover:scale-105 hover:text-gray-700 hover:cursor-pointer m-4'>
          <option value="BarChart">Bar Chart</option>
          <option value="AreaChart">Area Chart</option>
          <option value="LineChart">Line Chart</option>
        </select>
        
        <span className='p-2 flex items-center max-md:ml-2' >Split data charts<ToggleButton onToggle={handleToggle} className='m-l-4' /></span>
      </div>)}


      <br />


      {jsonData && showBar && <div className='md:m-8 bg-white md:p-8 mb-8'>
        <BarChart id='barId2' width={screenSize[0]} height={screenSize[1]} data={jsonData} >
          <CartesianGrid strokeDasharray='none' />
          <XAxis dataKey={Object.keys(jsonData[0])[0]}>

          </XAxis>
          <YAxis>

          </YAxis>
          <Tooltip />
          <Legend />
          {colorValues && Object.keys(jsonData[0]).map((key, index) => {
            if (index != 0) {
              return <Bar key={index} dataKey={key} fill={colorValues[index] || "#8884d8"} barSize={3} />;
            }
            return null;
          })}
        </BarChart>
      </div>}



      {jsonData && showArea && <div className='md:m-8 bg-white md:p-8 mb-8'>
        <AreaChart
          width={screenSize[0]} height={screenSize[1]}
          id="areaId2"
          data={jsonData}

        >

          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey={Object.keys(jsonData[0])[0]} >

          </XAxis>
          <YAxis>

          </YAxis>
          <Tooltip />

          {colorValues && Object.keys(jsonData[0]).map((key, index) => {
            if (index != 0) {
              return <Area key={index} dataKey={key} stroke="#8884d8" fill={colorValues[index] || "#8884d8"} />;
            }
            return null;
          })}

        </AreaChart>
      </div>}




      {jsonData && showLine && <div className='md:m-8 bg-white md:p-8 mb-8'>
        <LineChart
          width={screenSize[0]} height={screenSize[1]}
          id="lineId2"
          data={jsonData}
        >
          <CartesianGrid strokeDasharray="none" />
          <XAxis dataKey={Object.keys(jsonData[0])[0]} >

          </XAxis><YAxis>

          </YAxis>

          <Tooltip />
          <Legend />
          {colorValues && Object.keys(jsonData[0]).map((key, index) => {
            if (index != 0) {
              return <Line key={index} dataKey={key} type="monotone" stroke={colorValues[index] || "#8884d8"} />;
            }
            return null;
          })}

        </LineChart>
      </div>}


      {<div className="splitCharts">
        {newArray && (
          <div >
            {newArray.slice(1).map((newData, index) => (


              isChecked && showBar && (<div className='m-8'>

                <BarChart width={screenSize[0]} height={screenSize[1]} data={newData} id={`splitBar${index}`}>
                  <CartesianGrid strokeDasharray="none" />
                  <XAxis >

                  </XAxis>
                  <YAxis>

                  </YAxis>
                  <Tooltip />
                  <Legend />
                  {colorValues && Object.keys(newData[0]).map((key, subIndex) => {
                    if (subIndex >= 0) {
                      return <Bar key={subIndex} dataKey={key} fill={colorValues[index + 1] || "#8884d8"} />;
                    }
                    return null;
                  })}
                  
                </BarChart>
                <button onClick={() => Download(`splitBar${index}`, "barchart")} className='p-2 px-4 border border-white hover:border-black hover:bg-orange-400 transition duration-500 rounded-xl hover:text-black hover:font-bold'>Download This Bar Chart</button>
              </div>)
              ||


              isChecked && showArea && (<div className='m-8'>


                <AreaChart
                  width={screenSize[0]} height={screenSize[1]}
                  id={`splitArea${index}`}
                  data={newData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >

                  <CartesianGrid strokeDasharray="none" />
                  <XAxis >

                  </XAxis>
                  <YAxis>

                  </YAxis>
                  <Tooltip />

                  {colorValues && Object.keys(newData[0]).map((key, subIndex) => {
                    if (subIndex >= 0) {
                      return <Area key={subIndex} dataKey={key} stroke="#8884d8" fill={colorValues[index + 1] || "#8884d8"} />;
                    }
                    return null;
                  })}
                  

                </AreaChart>
                <button onClick={() => Download(`splitArea${index}`, "areachart")} className='p-2 px-4 border border-white hover:border-black hover:bg-orange-400 transition duration-500 rounded-xl hover:text-black hover:font-bold'>Download This Area Chart</button>
              </div>)
              ||


              isChecked && showLine && (<div className='m-8'>


                <LineChart
                  width={screenSize[0]} height={screenSize[1]}
                  id={`splitLine${index}`}
                  data={newData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="none" />
                  <XAxis >

                  </XAxis>
                  <YAxis>

                  </YAxis>
                  <Tooltip />
                  <Legend />
                  {colorValues && Object.keys(newData[0]).map((key, subIndex) => {
                    if (subIndex >= 0) {
                      return <Line key={subIndex} dataKey={key} type="monotone" stroke={colorValues[index + 1] || "#8884d8"} />;
                    }
                    return null;
                  })}


                </LineChart>
                <button onClick={() => Download(`splitLine${index}`, "linechart")} className='p-2 px-4 border border-white hover:border-black hover:bg-orange-400 transition duration-500 rounded-xl hover:text-black hover:font-bold'>Download This Line Chart</button>
              </div>)
            ))}
          </div>)
        }
      </div>}



      {colorValues && (
        <div className='md:fixed md:ml-12 md:left-0 md:top-2/4 max-md:mb-8'>
          {Object.keys(jsonData[0]).map((key, index) => {
            if (index != 0) {
              return (<div>
                <input type="color" value={colorValues[index]}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className='border hover:border-1 hover:border-black'
                />
                <span className='text-white bg-transparent font-mont text-xl hover:cursor-default'> {key} </span>
              </div>);
            }
            return null;
          })}
        </div>)}

      {colorValues && (
        <div className=''>
          {showBar && <button onClick={() => Download("barId2", "barchart")} className='p-2 px-4 border border-white hover:border-black hover:bg-orange-400 transition duration-500 rounded-xl hover:text-black hover:font-bold'>Download Bar Chart</button>}
          <br />
          {showArea && <button onClick={() => Download("areaId2", "areachart")} className='p-2 px-4 border border-white hover:border-black hover:bg-orange-400 transition duration-500 rounded-xl hover:text-black hover:font-bold'>Download Area Chart</button>}
          <br />
          {showLine && <button onClick={() => Download("lineId2", "linechart")} className='p-2 px-4 border border-white hover:border-black hover:bg-orange-400 transition duration-500 rounded-xl hover:text-black hover:font-bold'>Download Line Chart</button>}


          <br />

          {/*newArray.map((nestedArray, index) => (
        <div key={index}>
          {nestedArray.map((item, innerIndex) => (
            <div key={innerIndex}>
              {Object.entries(item).map(([key, value], i) => (
                <p key={i}>{key}: {value}</p>
              ))}
            </div>
          ))}
        </div>
      ))*/}
        </div>
      )}

      {!isAuthenticated && <p> Login to use full functionality</p>}
      {isAuthenticated && jsonData && 
        (<div className='flex flex-row justify-between w-3/4 text-white px-12 text-2xl items-center'>
          <button onClick={()=>handleDBsaving()} className='border-2 text-black border-blue-500 hover:scale-105 transition duration-200 rounded-xl bg-blue-100 p-2 px-6 hover:font-bold hover:bg-blue-900 hover:text-white'>SAVE TO YOUR ACCOUNT</button>

          <span className='font-thin text-gray-500'>Save This Dataset</span>
          <button onClick={()=>handleDBsaving('comunity')} className='border-2 text-black hover:font-bold border-blue-500 hover:scale-105 transition duration-200 rounded-xl bg-blue-100 p-2 px-6 hover:bg-blue-900 hover:text-white'> SAVE FOR COMMUNITY</button>
        </div>
        )}
      {isAuthenticated &&

        (
          <div className='font-mont md:w-6/12 w-11/12 md:mt-80 mt-12 max-md:text-base' >
            <p className='md:text-3xl bg-slate-500 text-black py-4 w-full rounded-lg px-12 font-bold'>Your Saved Datasets:</p>
            <div className='bg-slate-700 mt-4 rounded-xl'>
              {savedDataset.map((data) => (

                <div className=' flex flex-row w-full justify-between md:px-8 px-2 py-2 rounded-2xl md:text-2xl' >

                  <span className='bg-slate-800 w-4/5 p-4 rounded-xl px-8'>{data.name}</span>



                  <button className="text-white border-black md:text-xl text-sm hover:bg-green-500 hover:font-bold hover:border-black rounded-lg md:py-4 py-2 px-2 transition duration-500 bg-slate-800 md:mr-8 max-md:ml-4 max-md:border" onClick={() => handleConfirmationDialogue(data)}> IMPORT </button>

                </div>        
              ))}
            </div>
            
          </div>

        )


      }

    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default VisualizaData;
