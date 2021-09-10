import { useEffect, useState } from 'react'
import Chat from './chat'
import Call from './call'
import Contact from './contact'
import EasyTimer from "easytimer";
const ChitChat = () => {

    const [timer,setTimer] = useState(new EasyTimer)
    const [timeValues,setTimeValues] = useState("")

    useEffect(() => {
        timer.start();
        timer.addEventListener("secondsUpdated", tick);
      },[]) 

    const  tick = (e) => {
    const timeValue = timer.getTimeValues().toString();
    setTimeValues(timeValue)
    }
    return (
        <div className="chitchat-main small-sidebar" id="content">
            <Chat timeValues={timeValues}/>
            <Call timeValues={timeValues}/>
            <Contact/>
        </div>
    );
}

export default ChitChat;