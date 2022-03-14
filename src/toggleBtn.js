import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { setState } from 'react';
import './index.css';

import { DragSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';

const ToggleBtn = () => {

    const html = document.querySelector('html');
    let dragswitch = document.getElementById('dragswitch-handle');
    const theme = localStorage.getItem('theme');
    const [checked, setChecked] = useState(false);

    const toggleDarkMode = function () {
        if (checked) {
           html.classList.remove("dark");
           localStorage.setItem('theme', "dark"); 
        } else {
            html.classList.add("dark");
            localStorage.setItem('theme', "light");
        }
    }

    useEffect(() => {
        console.log(theme);
        if (html.classList.contains("dark")) {
            setChecked(true);
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
