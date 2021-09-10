import React, { useState } from 'react'
import { X, Trash, MoreVertical } from 'react-feather'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const ReminderSection = (props) => {

    const [showCompletedToggle, setShowCompetdToggle] = useState(true)
    const [reminderModal, setReminderModal] = useState(false)

    const reminderBox = (e) => {
        document.querySelectorAll(".reminder-count li").forEach((item) => {
            item.classList.remove('active');
        })
        e.currentTarget.classList.add('active');
    }
    return (
        <div className="apps-content" id="reminder">
            <div className="reminder-main">
                <div className="theme-title">
                    <div className="media">
                        <div>
                            <h2>Reminders</h2>
                            <h4>Set reminders</h4>
                        </div>
                        <div className="media-body media-body text-right"><a className="icon-btn btn-sm btn-outline-light close-apps" href="#" onClick={() => props.smallSideBarToggle()}><X /></a></div>
                    </div>
                </div>
                <div className="reminder-content tab-card "><i className="ti-alarm-clock"></i>
                    <p>Never forget important tasks. Set personal and group reminders.</p>
                    <a className="setreminder btn btn-primary button-effect btn-sm" onClick={() => setReminderModal(!reminderModal)}>set reminder</a>
                    <Modal isOpen={reminderModal} toggle={() => setReminderModal(!reminderModal)} className="reminder-modal-main add-popup show" centered={true}>
                        <ModalHeader toggle={() => setReminderModal(!reminderModal)}>
                            Set reminder
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </ModalHeader>
                        <ModalBody>
                            <form className="form default-form">
                                <div className="lable">Reminder for (Groups or contacts)</div>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="contact or channel" />
                                </div>
                                <div className="lable">Remind about</div>
                                <div className="form-group">
                                    <textarea className="form-control dib" rows="3" placeholder="Some details about task"></textarea>
                                </div>
                                <div className="lable">Remind about</div>
                                <div className="form-group">
                                    <ul className="reminder-count">
                                        <li className="active" onClick={(e) => reminderBox(e)}>
                                            <div className="reminder-box">
                                                <h3 className="remi-num">15</h3>
                                                <h5 className="remi-val">minutes</h5>
                                            </div>
                                        </li>
                                        <li onClick={(e) => reminderBox(e)}>
                                            <div className="reminder-box">
                                                <h3 className="remi-num">1</h3>
                                                <h5 className="remi-val">hour</h5>
                                            </div>
                                        </li>
                                        <li onClick={(e) => reminderBox(e)}>
                                            <div className="reminder-box">
                                                <h3 className="remi-num">5 PM</h3>
                                                <h5 className="remi-val">today</h5>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="form-group mb-0">
                                    <div className="lable">select custom time</div>
                                    <div className="custom-remider-main">
                                        <div className="custom-remider-content">
                                            <div className="custom-reminder-inline">
                                                <input className="form-control" type="date" />
                                                <input className="form-control" type="time" />
                                            </div>
                                            <div className="custom-reminder-block">
                                                <select>
                                                    <option>Do not repeat</option>
                                                    <option>Weekdays (Mon-Fri)</option>
                                                    <option>Daily</option>
                                                    <option>Weekly (Custom)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="reminder-btn">
                                    <a className="btn btn-primary button-effect" onClick={() => setReminderModal(!reminderModal)}>set reminder</a>
                                </div>
                            </form>
                        </ModalBody>
                    </Modal>

                </div>
                <div className="reminder-list-disp">
                    <h5>Themeforest Discusssion</h5>
                    <h6>Project Discussion</h6><span>11:22 PM | 15 FAB</span>
                    <ul className="reminder-disp">
                        <li className="reminder-list-toggle"><a className="icon-btn bg-transparent" href="#"><MoreVertical /></a>
                            <div className="reminder-contentlist-toggle">
                                <ul>
                                    <li><a className="icon-btn btn-sm" href="#"><Trash /></a>
                                        <h5>Delete</h5>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="reminder-list">
                    <button className={`Show-reminder ${showCompletedToggle ? '' : 'd-none'}`} onClick={() => setShowCompetdToggle(!showCompletedToggle)}>Show Completed</button>
                    <button className="Hide-reminder" style={showCompletedToggle ? { display: 'none' } : { display: 'inline-block' }} onClick={() => setShowCompetdToggle(!showCompletedToggle)}>Hide Completed</button>
                    <div className="target-reminder-list" style={showCompletedToggle ? { display: 'none' } : { display: 'block' }}>
                        <h5>Session Start</h5>
                        <h6>Project Discussion</h6>
                        <h6>05:22 PM | 1 JAN</h6>
                        <ul className="reminder-disp">
                            <li className="reminder-toggle"><a className="icon-btn bg-transparent" href="#" data-tippy-content="Quick action"><MoreVertical /></a>
                                <div className="reminder-content-toggle">
                                    <ul>
                                        <li><a className="icon-btn btn-sm" href="#"><Trash /></a>
                                            <h5>Delete</h5>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReminderSection;