import { useContext } from 'react';
import {Grid,File,Book,List,Clock,X} from 'react-feather'
import ChatContext from '../../helpers/chatContext';

const AppList = (props) => {
    const {CloseAppSidebar,toggleSmallSide} = useContext(ChatContext);
    return (
        <div className="app-list">
            <ul className="app-list-ul custom-scroll">
            <li className="title apps-toggle" onClick={() => CloseAppSidebar(toggleSmallSide)}><Grid/>
                <h5>Apps</h5>
            </li>
            <li><a className={`icon-btn btn-outline-success btn-sm button-effect ${props.activeTab === "file" ? "active" : ""}`} href="#" onClick={() => props.ToggleTab("file")}><File/></a>
                <h5>Files</h5>
            </li>
            <li><a className={`icon-btn btn-outline-primary btn-sm button-effect ${props.activeTab === "notes" ? "active" : ""}`} href="#" onClick={() => props.ToggleTab("notes")}><Book/></a>
                <h5>Notes</h5>
            </li>
            <li><a className={`icon-btn btn-outline-danger btn-sm button-effect  ${props.activeTab === "todo" ? "active" : ""}`} href="#" onClick={() => props.ToggleTab("todo")}><List/></a>
                <h5>Todo</h5>
            </li>
            <li><a className={`icon-btn btn-outline-warning btn-sm button-effect ${props.activeTab === "reminder" ? "active" : ""}`} href="#" onClick={() => props.ToggleTab("reminder")}><Clock/></a>
                <h5>Reminder</h5>
            </li>
            <li className="close-app"><a className="icon-btn btn-danger" href="#" onClick={() => props.CloseAppSidebar()} ><X/></a>
                <h5>close</h5>
            </li>
            </ul>
        </div>
    );
}

export default AppList;