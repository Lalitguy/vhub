import React from 'react';

function ConfirmationComponent({ message, onConfirm, onCancel }) {
    return (
        <div className="w-3/5 top-1/3 flex flex-col p-2 bg-gray-300 text-black fixed font-mont text-2xl rounded-lg transition-opacity duration-1000">
            <div className='flex justify-end  pb-4'><button onClick={onCancel} className='border px-1 py-0 hover:text-red-500 hover:border-red-500 '>X</button></div>
            <div className=" pb-4 w-full font-bold mb-4 transition duration-1000">{message}</div>

            <div className="confirmation-buttons flex justify-end mt-4">
                <button onClick={onCancel} className='border-black border hover:border-red-500 hover:text-red-800 hover:font-bold bg-red-100 p-2 rounded-lg ml-4'>Cancel</button>
                <button onClick={onConfirm} className='border-black border hover:border-green-500 hover:text-green-800 hover:font-bold bg-green-100 p-2 rounded-lg ml-4'>Confirm</button>

            </div>
        </div>
    );
}

export default ConfirmationComponent;
