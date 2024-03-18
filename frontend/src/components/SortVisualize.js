import { useState, useEffect, useRef } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import useScreenSize from './reusables/ScreenSize';


const SortVisualize = () => {

  const screenSize = useScreenSize();

  const [sleepSeconds, setSleepSeconds] = useState(500);
  const sleepSecondsRef = useRef(sleepSeconds);
  const [isDisabled, setIsDisabled] = useState(false);
  const [swapText, setSwapText] = useState(0);
  const [comparisonText, setComparisonText] = useState(0);
  const [complexity, setComplexity] = useState('O');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleTimeSleep = (selectedOption) => {
    setSleepSeconds(selectedOption);
    sleepSecondsRef.current = selectedOption;
  };

  const [textData, setTextData] = useState('');



  const handleTextArea = (e) => {
    const textValue = e.target.value;
    setTextData(textValue);


  }

  const handleBlur = (textValue) => {


    const updatedData = textValue.split(',').map((pv, index) => ({
      pv: pv.trim(),
    }));
    setData(updatedData);
  }
  // const [dataArray, setDataARray] = useState([])
  const [data, setData] = useState([
    { pv: 24 },
    { pv: 13 },
    { pv: 98 },
    { pv: 34 },
    { pv: 24 },
    { pv: 76 },
    { pv: 88 },
    { pv: 34 },
    { pv: 35 },
    { pv: 13 },
    { pv: 68 },
    { pv: 37 },
    { pv: 24 },
    { pv: 15 },
    { pv: 97 },
    { pv: 56 },
    { pv: 24 },
    { pv: 76 },
    { pv: 78 },
    { pv: 43 },
  ]);
  useEffect(() => {

    const defaultText = data.map((item) => item.pv).join(',' + ' ');
    setTextData(defaultText);
  }, [data]);

  data["fill"] = '#8884d8';

  async function bubbleSort() {

    setIsDisabled(true);
    setComplexity('O ( n² )');
    setComparisonText(0);
    setSwapText(0);

    var i, j, size = data.length;
    var data2 = [...data];

    for (i = 0; i < size; i++) {

      for (j = 0; j < (size - i - 1); j++) {
        setComparisonText(prevState => prevState + 1);

        if (data2[j].pv > data2[j + 1].pv) {

          setSwapText(prevState => prevState + 1);
          data2[j].fill = 'red';
          data2[j + 1].fill = 'red';
          setData([...data2]);
          await sleep(sleepSecondsRef.current);
          var temp = data2[j];
          data2[j] = data2[j + 1];
          data2[j + 1] = temp;
          //alert(data[j].pv);
          //alert(data);
          //var data2 = data;

          data2[j].fill = 'green';
          data2[j + 1].fill = 'green';
          setData([...data2]);
          await sleep(sleepSecondsRef.current);
          /*setTimeout(()=>{
             
          },500);
          */
        }

      }
    }
    setIsDisabled(false);
  }

  async function selectionSort() {

    setIsDisabled(true);
    setComparisonText(0);
    setComplexity('O ( n² )');
    setSwapText(0);

    var i, j, size = data.length;
    var data2 = [...data];
    for (i = 0; i < size; i++) {
      let min = i;

      for (j = i + 1; j < size; j++) {

        data2[min].fill = 'yellow';
        data2[j].fill = 'orange';
        setComparisonText(prevState => prevState + 1);

        setData([...data2])
        await sleep(sleepSecondsRef.current);
        if (data2[j].pv < data2[min].pv) {

          data2[min].fill = '#8884d8'
          min = j;
          data2[j].fill = 'yellow';

          //data2[j].fill = 'yellow';
        }
        else {
          data2[j].fill = '#8884d8';
        }

        await sleep(sleepSecondsRef.current);
      }
      if (min != i) {

        let temp = data2[i];
        data2[i] = data2[min];
        data2[min] = temp;
        setSwapText(prevState => prevState + 1);
      }
      setData([...data2]);
    }
    var fillArr = data2.map(obj => ({ ...obj, 'fill': '#53aa53' }));
    setData([...fillArr]);
    setIsDisabled(false);
  }

  async function insertionSort() {
    setIsDisabled(true);

    setComparisonText(0);
    setComplexity('O ( n² )');
    setSwapText(0);

    var data2 = [...data];
    let i;
    let currentValue;
    for (i = 1; i < data2.length; i++) {
      currentValue = data2[i];
      setSwapText(prevState => prevState + 1);
      let j;
      for (j = i - 1; (j >= 0 && data2[j].pv) > currentValue.pv; j--) {

        //setData([...data2])
        setComparisonText(prevState => prevState + 1);
        data2[j].fill = 'red';

        setData([...data2]);
        await sleep(sleepSecondsRef.current * 0.4);
        data2[j + 1] = data2[j];

        data2[j].fill = '#8884d8';


        await sleep(sleepSecondsRef.current);


      }

      data2[j + 1] = currentValue;

      await sleep(sleepSecondsRef.current);
      setData([...data2]);

    }
    var fillArr = data2.map(obj => ({ ...obj, 'fill': '#53aa53' }));
    setData([...fillArr]);
    setIsDisabled(false);
  }

  async function merge(arr, l, m, r) {
    setIsDisabled(true);

    var n1 = m - l + 1;
    var n2 = r - m;


    var L = new Array(n1);
    var R = new Array(n2);


    for (var i = 0; i < n1; i++)
      L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
      R[j] = arr[m + 1 + j];

    var i = 0;

    var j = 0;

    var k = l;

    while (i < n1 && j < n2) {
      setComparisonText(prevState => prevState + 1);

      if (L[i].pv <= R[j].pv) {
        arr[k] = L[i];
        i++;
        ;
      }
      else {
        arr[k] = R[j];
        j++;

      }
      k++;

    }
    setData([...arr])

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;

      setData([...arr]);
      setSwapText(prevState => prevState + 1);
      await sleep(sleepSecondsRef.current * 2);

    }


    while (j < n2) {
      arr[k] = R[j];

      j++;
      k++;
      setData([...arr]);
      setSwapText(prevState => prevState + 1);
      await sleep(sleepSecondsRef.current * 2);

    }
    var fillArr = arr.map(obj => ({ ...obj, 'fill': '#53aa53' }));
    setData([...fillArr]);
  }


  async function mergeSort(arr, l, r) {
    if (l >= r) {
      return;
    }
    var m = l + parseInt((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
    setIsDisabled(false);
  }

  async function startMergeSort(data) {

    setIsDisabled(true);
    setSwapText(0);
    setComparisonText(0);
    setComplexity('O (n log n )');
    var data2 = data.map((obj, index) => ({ ...obj, fill: index < data.length / 2 ? '#ddb56b' : '#58b1b4' }));

    var arr_size = data2.length;
    mergeSort(data2, 0, arr_size - 1);
  }


  const [range, setRange] = useState(1);


  const handleRangeChange = (event) => {
    const newRange = parseInt(event.target.value);
    setRange(newRange);

    const newRandomNumbers = [];
    for (let i = 0; i < newRange; i++) {
      newRandomNumbers.push(Math.floor(Math.random() * 100) + 1); // Generates random numbers between 1 and 100
    }
    let newData = newRandomNumbers.map((pv, index) => ({
      pv: pv
    }));
    setData(newData);
  };

  return (
    <div className='flex md:flex-row flex-col flex-wrap w-screen text-white pb-12'>
      <div className='flex flex-col flex-wrap md:w-2/4'>
        <div className=''>
          <BarChart width={screenSize[0]} height={screenSize[1]} data={data} animationBegin={0} animationDuration={0}>
            <CartesianGrid strokeDasharray="none" />
            {//<XAxis dataKey="name" />
            }
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill={data['fill']} barSize={35} />

          </BarChart>
        </div>
        <div >
          <div className='flex flex-row md:text-3xl text-base '>
            <input type="text" onChange={handleTextArea} value={textData} className={`md:w-10/12 w-9/12 font-mont bg-gray-800 text-white p-4 border border-white m-2 rounded-lg  ${isDisabled ? 'hover:cursor-not-allowed' : ''}`} />
            <button onClick={() => handleBlur(textData)} className={`p-1 rounded-lg border-gray-100 md:hover:outline hover:bg-green-700 border w-2/12 hover:font-bold ${isDisabled ? 'hover:cursor-not-allowed' : ''}`}>APPLY</button>
          </div>
          <div className='flex flew-wrap md:flex-row flex-col py-4 font-thin font-3 md:justify-end max-md:items-center max-md:w-screen'>

            <div className='p-2 flex flex-wrap flex-col items-center border rounded-md text-xl border-gray-500 md:mr-8 md:w-5/12 w-11/12 max-md:justify-center'>
              <span className='text-gray-400'>Generate Random</span>
              <input type="range" min="0" max="100" step='5' value={range} onChange={handleRangeChange} className={`w-9/12 cursor-pointer ${isDisabled ? 'hover:cursor-not-allowed' : ''}`} disabled={isDisabled} />
            </div>

            <div className='flex flex-row flew-wrap max-md:mt-2'>
              <div className='p-2 flex flex-wrap flex-col items-center text-center border rounded-md text-xl border-gray-500 md:mr-8 mr-4 max-md:ml-2'>
                <span className='text-gray-400'>Time complexity</span>
                <span className='text-white'>{complexity}</span>
              </div>
              <div className='p-2 flex flex-wrap flex-col items-center border rounded-md text-xl border-gray-500 md:mr-8 mr-4'>
                <span className='text-gray-400'>comparisons</span>
                <span className='text-white'>{comparisonText}</span>
              </div>
              <div className='p-2 px-4 flex flex-wrap flex-col items-center border rounded-md text-xl border-gray-500 md:mr-2 max-md:mr-2'>
                <span className='text-gray-400'>swaps</span>
                <span className='text-white'>{swapText}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='md:w-2/4 font-km md:text-4xl text-lg items-center flex flex-col'>

        <div className='flex md:flex-col max-md:w-screen md:w-2/4 justify-between '>
          <button onClick={() => bubbleSort()} className={`p-4 rounded-lg md:border-gray-100 border-gray-400 hover:outline hover:bg-orange-400 border  hover:text-black  transition duration-700 w-full md:py-10 hover:border-black mb-2 max-md:ml-6 md:mb-16 md:hover:font-bold ${isDisabled ? 'hover:cursor-not-allowed max-md:bg-gray-500 text-black' : ''}`} disabled={isDisabled}>
            Bubble Sort
          </button>
          <button onClick={() => selectionSort()} className={`p-4 rounded-lg border-gray-100 hover:outline hover:bg-orange-400 border  hover:text-black  transition duration-700 w-full md:py-10 max-md:mr-6 md:mb-16 mb-2 md:hover:font-bold ${isDisabled ? 'hover:cursor-not-allowed max-md:bg-gray-500 text-black' : ''}`} disabled={isDisabled}>
            Selection Sort
          </button>
        </div>

        <div className='flex md:flex-col max-md:w-screen md:w-2/4 justify-between'>
          <button onClick={() => insertionSort()} className={`p-4 rounded-lg md:border-gray-100 border-gray-400 hover:outline hover:bg-orange-400 border  hover:text-black  transition duration-700 w-full md:py-10 hover:border-black mb-2 max-md:ml-6 md:mb-16 md:hover:font-bold ${isDisabled ? 'hover:cursor-not-allowed max-md:bg-gray-500 text-black' : ''}`} disabled={isDisabled}>
            Insertion Sort
          </button>
          <button onClick={() => startMergeSort(data)} className={`p-4 rounded-lg border-gray-100 hover:outline hover:bg-orange-400 border  hover:text-black  transition duration-700 w-full md:py-10 max-md:mr-6 md:mb-16 mb-2 md:hover:font-bold ${isDisabled ? 'hover:cursor-not-allowed max-md:bg-gray-500 text-black' : ''}`} disabled={isDisabled}>
            Merge Sort
          </button>
        </div>


        <select onChange={(e) => handleTimeSleep(e.target.value)} className={`bg-transparent border-white border p-2 rounded-md hover:scale-105 hover:text-gray-700 hover:cursor-pointer ${isDisabled ? 'hover:cursor-not-allowed' : ''} mt-8`}>
          <option value="500">0.5 Seconds</option>
          <option value="200">0.2 Seconds</option>
          <option value="100">0.1 Seconds</option>
          <option value="50">0.05 Seconds</option>
          <option value="1000">1 Seconds</option>
        </select>


      </div>
    </div>
  );

};

export default SortVisualize;