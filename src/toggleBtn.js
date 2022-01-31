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
           html.classList.remove("dark");
           localStorage.setItem('theme', "dark"); 
        } else {
            html.classList.add("dark");
            localStorage.setItem('theme', "light");
        }
    }

    //DarkMode;
    // const [theme, setTheme] = useState(localStorage.theme);
    // const colorTheme = theme == "light" ? "dark" : 'light';
    // useEffect(() => {
    //     const root = window.document.documentElement;

    //     root.classList.remove(colorTheme);
    //     root.classList.add(theme);
    //     localStorage.setItem('theme', theme);
    // }, [theme, colorTheme]);

    // const [button, setButton] = useState({
    //     id:props.id, 
    //     checked: false,
    // });

    // const handleClick = () => {
    //     console.log(button.id);
    // }

    const [checked, setChecked] = useState(false);

    // let coche = false;

    // if (html.classList.contains('dark')) {
    //     coche = true;
    // } else {
    //     coche = false;
    // }
    // if (html.classList.contains('dark')) {
        
    // }
        
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
