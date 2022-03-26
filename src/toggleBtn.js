import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './index.css';

import { DragSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';

const ToggleBtn = () => {

    const html = document.querySelector('html');
    const [checked, setChecked] = useState(false);

    const toggleDarkMode = function () {
        if (checked) {
           html.classList.remove("dark");
           localStorage.setItem('theme', "light"); 
        } else {
            html.classList.add("dark");
            localStorage.setItem('theme', "dark");
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') == 'dark') {
            setChecked(true);
            html.classList.add("dark");
            // dragswitch.style.transform = "translateX(20px)";
        } else {
            setChecked(false);
        }
    }, [])
        
        return (            
            <div className="mr-2" onClick={toggleDarkMode}>
            <DragSwitch checked={checked} onChange={(e) => {
                setChecked(e)
            }} />
              </div>
        ) 
   
}

export default ToggleBtn
