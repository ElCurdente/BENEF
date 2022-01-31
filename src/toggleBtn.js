import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { setState } from 'react';
import './index.css';

import { DragSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';

const ToggleBtn = () => {

    const html = document.querySelector('html');

    const toggleDarkMode = function () {
        if (checked) {
           html.classList.add("dark"); 
        } else {
            html.classList.remove("dark");
        }
        
        // toggleDot.setAttribute('className', 'toggle-dot relative w-4 h-4 bg-white-0 rounded-full shadow-md transform translate-x-3');
        console.log("haziuazfbazbngkl");
        // document.querySelector('._2-ZbH').addEventListener("click", toggleDarkMode);

    }

    // const [button, setButton] = useState({
    //     id:props.id, 
    //     checked: false,
    // });

    // const handleClick = () => {
    //     console.log(button.id);
    // }

    const [checked, setChecked] = useState(false);
        
        return (
            // <div>
            //     <input type="checkbox" id="toggle_btn_3" class="hidden w-10 h-5 text-green-600 mr-2 rounded-full"
            //         onClick={handleClick} ></input>
            //     <label for="toggle_btn_3">
            //         <div className="container-toggle-dot flex w-9 h-5 items-center bg-gray-300 rounded-full p-1 mr-2 transform transition duration-300 cursor-pointer">
            //             <div id="toggle_dot_3" className="toggle-dot-3 w-4 h-4 bg-white-0 rounded-full shadow-md transform transition duration-300"></div>
            //         </div>
            //     </label>
            // </div>
            <div className="mr-2" onClick={toggleDarkMode}>
            <DragSwitch checked={checked} onChange={(e) => {
                setChecked(e)
            }} />
              </div>
        ) 
   
}

export default ToggleBtn
