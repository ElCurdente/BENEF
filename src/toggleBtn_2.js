import React from 'react';
import { useState } from 'react';
import './index.css';

import { DragSwitch } from 'react-dragswitch';
import 'react-dragswitch/dist/index.css';

const ToggleBtn2 = () => {

    const [checked, setChecked] = useState(false);
        
        return (
            <div className="mr-2">
            <DragSwitch checked={checked} onChange={(e) => {
                setChecked(e)
            }} />
              </div>
        ) 
   
}

export default ToggleBtn2
