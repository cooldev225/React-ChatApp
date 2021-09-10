import React, { useState } from 'react';
import { Plus, X } from 'react-feather';
import DatePicker from 'react-datepicker';

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const TodoSection = (props) => {
  const [assignTo, setAssign] = useState({
    toggleOne: false,
    toggleTwo: false,
    toggleThree: false,
    togglefour: false,
  });
  const [seleted, setSelected] = useState({
    assignOne: '',
    assignTwo: '',
    assignThree: '',
    assignFour: '',
  });
  const [date, setDate] = useState({ one: '', two: '', three: '', four: '' });
  const [activeTab, setActiveTab] = useState('all');
  const [todoArray, setTodoArray] = useState([]);
  const [todoModal, setTodoModal] = useState(false);
  const [todoModal2, setTodoModal2] = useState(false);

  const handleChangeOne = (date) => {
    setDate({ ...date, one: date });
  };

  const handleChangeTwo = (date) => {
    setDate({ ...date, two: date });
  };

  const handleChangeThree = (date) => {
    setDate({ ...date, three: date });
  };

  const handleChangeFour = (date) => {
    setDate({ ...date, four: date });
  };

  const AssignToOne = (toggle) => {
    if (toggle) {
      setAssign({ ...assignTo, toggleOne: !assignTo.toggleOne });
    } else {
      setAssign({ ...assignTo, toggleOne: !assignTo.toggleOne });
    }
  };
  const AssignToTwo = (toggle) => {
    if (toggle) {
      setAssign({ ...assignTo, toggleTwo: !assignTo.toggleTwo });
    } else {
      setAssign({ ...assignTo, toggleTwo: !assignTo.toggleTwo });
    }
  };
  const AssignToThree = (toggle) => {
    if (toggle) {
      setAssign({ ...assignTo, toggleThree: !assignTo.toggleThree });
    } else {
      setAssign({ ...assignTo, toggleThree: !assignTo.toggleThree });
    }
  };

  const AssignToFour = (toggle) => {
    if (toggle) {
      setAssign({ ...assignTo, togglefour: !assignTo.togglefour });
    } else {
      setAssign({ ...assignTo, togglefour: !assignTo.togglefour });
    }
  };

  const selectAssignToValueOne = (value) => {
    setSelected({ ...seleted, assignOne: value });
    setAssign({ ...assignTo, toggleOne: false });
  };

  const selectAssignToValueTwo = (value) => {
    setSelected({ ...seleted, assignTwo: value });
    setAssign({ ...assignTo, toggleTwo: false });
  };

  const selectAssignToValueThree = (value) => {
    setSelected({ ...seleted, assignThree: value });
    setAssign({ ...assignTo, toggleThree: false });
  };

  const selectAssignToValueFour = (value) => {
    setSelected({ ...seleted, assignFour: value });
    setAssign({ ...assignTo, togglefour: false });
  };

  const addToTodo = () => {
    setTodoArray([...todoArray, todoArray.length + 1]);
  };

  const removeFromTodo = (id) => {
    const arrayUpdated = todoArray.filter((item) => id !== item);
    setTodoArray([...arrayUpdated]);
  };

  return (
    <>
      <div className="apps-content" id='todo'>
        <div className='todo-main'>
          <div className='theme-title'>
            <div className='media'>
              <div>
                <h2>Todo</h2>
                <h4>to create your task</h4>
              </div>
              <div className='media-body media-body text-right'>
                <a
                  className='icon-btn btn-sm btn-outline-light close-apps'
                  href='#'
                  onClick={() => props.smallSideBarToggle()}
                >
                  <X />
                </a>
              </div>
            </div>
          </div>
          <div className='todo-name'>
            <form className='default-form'>
              <select className='custom-scroll' name='support[support_type]'>
                <option>All Conversations</option>
                <option>Josephin water</option>
                <option>Jony Lynetin</option>
                <option>Sufiya Elija</option>
                <option>Mukrani Pabelo</option>
                <option>Jhon Deo</option>
              </select>
            </form>
          </div>
          <div className='todo-tab theme-tab custom-scroll'>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={`button-effect  ${activeTab === 'all' ? 'active show' : ''
                    }`}
                  href='#todo1'
                  onClick={() => setActiveTab('all')}
                >
                  All
              </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={`button-effect  ${activeTab === 'mytodo' ? 'active show' : ''
                    }`}
                  href='#todo2'
                  onClick={() => setActiveTab('mytodo')}
                >
                  My to-dos
              </NavLink>
              </NavItem>
              <li>
                <a
                  className='icon-btn btn-light button-effect btn-sm'
                  data-target='#todoModal'
                  onClick={() => setTodoModal2(!todoModal2)}
                >
                  <Plus />
                </a>
                <Modal
                  isOpen={todoModal2}
                  toggle={() => setTodoModal2(!todoModal2)}
                  className='fade add-popup create-todo-main-modal show'
                  id='createtodoModal'
                  centered={true}
                >
                  <ModalHeader toggle={() => setTodoModal2(!todoModal2)}>
                    Welcome To Chitchat
                  <button
                      className='close'
                      type='button'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </ModalHeader>
                  <ModalBody>
                    <form className='default-form'>
                      <div className='todo-task'>
                        <h5>Felling Lonely</h5>
                        <div className='todo-main-content'>
                          <div className='form-group'>
                            <input
                              type='checkbox'
                              aria-label='Checkbox for following text input'
                            />
                            <input
                              className='w-100'
                              id='user_input123'
                              type='text'
                              placeholder='Fill Your Fillings '
                            />
                          </div>
                          <div className='drop-picker'>
                            <Dropdown
                              className='dropdown currency'
                              isOpen={assignTo.togglefour}
                              toggle={AssignToFour}
                            >
                              <DropdownToggle
                                tag='span'
                                role='button'
                                data-toggle='dropdown'
                                aria-expanded={assignTo.togglefour}
                              >
                                <span
                                  style={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    color: '#1c9dea',
                                  }}
                                >
                                  {seleted.assignFour
                                    ? seleted.assignFour
                                    : 'Assign To'}
                                </span>
                              </DropdownToggle>
                              <ul
                                className='dropdown-menu'
                                style={
                                  assignTo.togglefour
                                    ? { display: 'block' }
                                    : { display: 'none' }
                                }
                              >
                                <li className='dropdown-divider'>
                                  <div className='fa fa-user text-muted'></div>
                                  <h5 className='text-muted'>Assign To</h5>
                                </li>
                                <li
                                  onClick={() =>
                                    selectAssignToValueFour('Josephin john')
                                  }
                                >
                                  Josephin john
                              </li>
                                <li
                                  onClick={() =>
                                    selectAssignToValueFour('Lynetin john')
                                  }
                                >
                                  Lynetin john
                              </li>
                                <li
                                  onClick={() =>
                                    selectAssignToValueFour('Sufiya john')
                                  }
                                >
                                  Sufiya john
                              </li>
                                <li
                                  onClick={() =>
                                    selectAssignToValueFour('Jhon john')
                                  }
                                >
                                  Jhon john
                              </li>
                              </ul>
                            </Dropdown>
                            {date.four ? (
                              <DatePicker
                                className='datepicker-here form-control digits'
                                selected={date.four}
                                onChange={handleChangeFour}
                                placeholderText='Due date'
                              />
                            ) : (
                                <DatePicker
                                  className='datepicker-here form-control digits'
                                  onChange={handleChangeFour}
                                  placeholderText='Due date'
                                />
                              )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      className='btn btn-danger button-effect btn-sm'
                      type='button'
                      onClick={() => setTodoModal2(!todoModal2)}
                    >
                      Save
                  </button>
                    <button
                      className='btn btn-primary button-effect btn-sm'
                      type='button'
                      onClick={() => setTodoModal2(!todoModal2)}
                    >
                      Cancel
                  </button>
                  </ModalFooter>
                </Modal>
              </li>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='all' className='fade show'>
                <div className='tab-card text-left'>
                  <div className='todo-task'>
                    <h4>Designer Discussion </h4>
                    <div className='todo-main-content'>
                      <div className='input-text'>
                        <input
                          type='checkbox'
                          aria-label='Checkbox for following text input'
                        />
                        <input
                          id='user_input12'
                          type='text'
                          name='todo-text'
                          placeholder='Give me review on our side'
                        />
                      </div>
                      <div className='drop-picker'>
                        {date.one ? (
                          <DatePicker
                            className='ditsatepicker-here form-control digits'
                            selected={date.one}
                            onChange={handleChangeOne}
                            placeholderText='Due date'
                          />
                        ) : (
                            <DatePicker
                              className='datepicker-here form-control digits'
                              onChange={handleChangeOne}
                              placeholderText='Due date'
                            />
                          )}
                        <Dropdown
                          className='dropdown currency'
                          isOpen={assignTo.toggleOne}
                          toggle={AssignToOne}
                        >
                          <DropdownToggle
                            tag='span'
                            role='button'
                            data-toggle='dropdown'
                            aria-expanded={assignTo.toggleOne}
                          >
                            <span
                              style={{
                                fontSize: '13px',
                                color: '#647589',
                                fontWeight: '400',
                                cursor: 'pointer',
                              }}
                            >
                              {seleted.assignOne
                                ? seleted.assignOne
                                : 'Assign To'}
                            </span>
                          </DropdownToggle>
                          <ul
                            className='dropdown-menu'
                            style={
                              assignTo.toggleOne
                                ? { display: 'block' }
                                : { display: 'none' }
                            }
                          >
                            <li className='dropdown-divider'>
                              <div className='fa fa-user'></div>
                              <h5 className='text-muted'>Assign To</h5>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueOne('Josephin john')
                                }
                              >
                                Josephin john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueOne('Lynetin john')
                                }
                              >
                                Lynetin john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueOne('Sufiya john')
                                }
                              >
                                Sufiya john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueOne('Jhon john')
                                }
                              >
                                Jhon john
                            </a>
                            </li>
                          </ul>
                        </Dropdown>
                      </div>
                    </div>
                    <div className='todo-list'>
                      <div className='element' id='div_3'>
                        <span className='add add-to-do'>Add-To-Do</span>
                      </div>
                    </div>
                    <div className='todo-main-content'>
                      <div className='input-text'>
                        <input
                          type='checkbox'
                          aria-label='Checkbox for following text input'
                        />
                        <input
                          id='user_input13'
                          type='text'
                          name='todo-text'
                          placeholder='Redesign Your Design'
                        />
                      </div>
                      <div className='drop-picker'>
                        {date.two ? (
                          <DatePicker
                            className='datepicker-here form-control digits'
                            selected={date.two}
                            onChange={handleChangeTwo}
                            placeholderText='Due date'
                          />
                        ) : (
                            <DatePicker
                              className='datepicker-here form-control digits'
                              onChange={handleChangeTwo}
                              placeholderText='Due date'
                            />
                          )}
                        <Dropdown
                          className='dropdown currency'
                          isOpen={assignTo.toggleTwo}
                          toggle={AssignToTwo}
                        >
                          <DropdownToggle
                            tag='span'
                             role='button'
                            data-toggle='dropdown'
                            aria-expanded={assignTo.toggleTwo}
                          >
                            <span
                              style={{
                                fontSize: '13px',
                                color: '#647589',
                                fontWeight: '400',
                                cursor: 'pointer',
                              }}
                            >
                              {seleted.assignTwo
                                ? seleted.assignTwo
                                : 'Assign To'}
                            </span>
                          </DropdownToggle>
                          <ul
                            className='dropdown-menu'
                            style={
                              assignTo.toggleTwo
                                ? { display: 'block' }
                                : { display: 'none' }
                            }
                          >
                            <li className='dropdown-divider'>
                              <div className='fa fa-user'></div>
                              <h5 className='text-muted'>Assign To</h5>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueTwo('Josephin john')
                                }
                              >
                                Josephin john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueTwo('Lynetin john')
                                }
                              >
                                Lynetin john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueTwo('Sufiya john')
                                }
                              >
                                Sufiya john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueTwo('Jhon john')
                                }
                              >
                                Jhon john
                            </a>
                            </li>
                          </ul>
                        </Dropdown>
                      </div>
                    </div>
                    <div className='todo-list'>
                      <div className='element' id='div_2'>
                        <span className='add add-to-do'>Add-To-Do</span>
                      </div>
                    </div>
                    <div className='todo-main-content'>
                      <div className='input-text'>
                        <input
                          type='checkbox'
                          aria-label='Checkbox for following text input'
                        />
                        <input
                          id='user_input14'
                          type='text'
                          name='todo-text'
                          placeholder=' Complete Project report'
                        />
                      </div>
                      <div className='drop-picker'>
                        {date.three ? (
                          <DatePicker
                            className='datepicker-here form-control digits'
                            selected={date.three}
                            onChange={handleChangeThree}
                            placeholderText='Due date'
                          />
                        ) : (
                            <DatePicker
                              className='datepicker-here form-control digits'
                              onChange={handleChangeThree}
                              placeholderText='Due date'
                            />
                          )}
                        <Dropdown
                          className='dropdown currency'
                          isOpen={assignTo.toggleThree}
                          toggle={AssignToThree}
                        >
                          <DropdownToggle
                            tag='span'
                            role='button'
                            data-toggle='dropdown'
                            aria-expanded={assignTo.toggleThree}
                          >
                            <span
                              style={{
                                fontSize: '13px',
                                color: '#647589',
                                fontWeight: '400',
                                cursor: 'pointer',
                              }}
                            >
                              {seleted.assignThree
                                ? seleted.assignThree
                                : 'Assign To'}
                            </span>
                          </DropdownToggle>
                          <ul
                            className='dropdown-menu'
                            style={
                              assignTo.toggleThree
                                ? { display: 'block' }
                                : { display: 'none' }
                            }
                          >
                            <li className='dropdown-divider'>
                              <div className='fa fa-user'></div>
                              <h5 className='text-muted'>Assign To</h5>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueThree('Josephin john')
                                }
                              >
                                Josephin john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueThree('Lynetin john')
                                }
                              >
                                Lynetin john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueThree('Sufiya john')
                                }
                              >
                                Sufiya john
                            </a>
                            </li>
                            <li>
                              <a
                                href='#'
                                onClick={() =>
                                  selectAssignToValueThree('Jhon john')
                                }
                              >
                                Jhon john
                            </a>
                            </li>
                          </ul>
                        </Dropdown>
                      </div>
                    </div>
                    <div className='todo-list'>
                      <div className='element' id='div_1'>
                        <span
                          className='add add-to-do'
                          onClick={() => addToTodo()}
                        >
                          Add-To-Do
                      </span>
                      </div>
                      {todoArray.map((item, i) => {
                        return (
                          <div className='element' key={i}>
                            <form className='p-15'>
                              <div
                                className='form-group'
                                style={{ display: 'flex' }}
                              >
                                <input type='checkbox' id='txt_4' />
                                <input type='text' className='m-l-15' />
                              </div>
                              <div className='todo-buttons'>
                                <a
                                  className='badge badge-success font_label'
                                  href='#'
                                  style={{ padding: '7px 12px' }}
                                >
                                  Save
                              </a>
                                <a
                                  className='badge badge-outline-primary font_label'
                                  href='#'
                                  style={{
                                    marginLeft: '15px',
                                    padding: '7px 12px',
                                  }}
                                >
                                  Cancel
                              </a>
                                <span
                                  id='remove_4'
                                  className='remove'
                                  style={{ marginLeft: '40px' }}
                                  onClick={() => removeFromTodo(item)}
                                >
                                  <i
                                    className='fa fa-trash'
                                    style={{ fontSize: '20px' }}
                                  ></i>
                                </span>
                              </div>
                            </form>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId='mytodo' className='fade show' id='todo2'>
                <div className='converstaion-docs tab-card'>
                  <i className='fa fa-sticky-note-o'></i>
                  <h5 className='mb-3'>No Open To-Dos Here</h5>
                  <a
                    className='btn btn-primary btn-sm'
                    data-target='#createtodoModal'
                    onClick={() => setTodoModal(!todoModal)}
                  >
                    Create A To-Do
                </a>
                  <Modal
                    isOpen={todoModal}
                    toggle={() => setTodoModal(!todoModal)}
                    className='fade add-popup create-todo-main-modal show'
                    id='createtodoModal'
                    centered={true}
                  >
                    <ModalHeader toggle={() => setTodoModal(!todoModal)}>
                      Today's ToDo
                    <button
                        className='close'
                        type='button'
                        data-dismiss='modal'
                        aria-label='Close'
                      >
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <form className='default-form'>
                        <div className='todo-task'>
                          <h5>Felling Lonely</h5>
                          <div className='todo-main-content'>
                            <div className='form-group'>
                              <input
                                type='checkbox'
                                aria-label='Checkbox for following text input'
                              />
                              <input
                                className='w-100'
                                id='user_input123'
                                type='text'
                                placeholder='Fill Your Fillings '
                              />
                            </div>
                            <div className='drop-picker'>
                              <Dropdown
                                className='dropdown currency'
                                isOpen={assignTo.togglefour}
                                toggle={AssignToFour}
                              >
                                <DropdownToggle
                                  tag='span'
                                  role='button'
                                  data-toggle='dropdown'
                                  aria-expanded={assignTo.togglefour}
                                >
                                  <span
                                    style={{
                                      fontSize: '15px',
                                      fontWeight: '400',
                                      color: '#1c9dea',
                                    }}
                                  >
                                    {seleted.assignFour
                                      ? seleted.assignFour
                                      : 'Assign To'}
                                  </span>
                                </DropdownToggle>
                                <ul
                                  className={`dropdown-menu ${assignTo.togglefour ? 'd-block' : 'd-none'}`}
                                >
                                  <li className='dropdown-divider'>
                                    <div className='fa fa-user text-muted'></div>
                                    <h5 className='text-muted'>Assign To</h5>
                                  </li>
                                  <li
                                    onClick={() =>
                                      selectAssignToValueFour('Josephin john')
                                    }
                                  >
                                    Josephin john
                                </li>
                                  <li
                                    onClick={() =>
                                      selectAssignToValueFour('Lynetin john')
                                    }
                                  >
                                    Lynetin john
                                </li>
                                  <li
                                    onClick={() =>
                                      selectAssignToValueFour('Sufiya john')
                                    }
                                  >
                                    Sufiya john
                                </li>
                                  <li
                                    onClick={() =>
                                      selectAssignToValueFour('Jhon john')
                                    }
                                  >
                                    Jhon john
                                </li>
                                </ul>
                              </Dropdown>
                              {date.four ? (
                                <DatePicker
                                  className='datepicker-here form-control digits'
                                  selected={date.four}
                                  onChange={handleChangeFour}
                                  placeholderText='Due date'
                                />
                              ) : (
                                  <DatePicker
                                    className='datepicker-here form-control digits'
                                    onChange={handleChangeFour}
                                    placeholderText='Due date'
                                  />
                                )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        className='btn btn-danger button-effect btn-sm'
                        type='button'
                        onClick={() => setTodoModal(!todoModal)}
                      >
                        Save
                    </button>
                      <button
                        className='btn btn-primary button-effect btn-sm'
                        type='button'
                        onClick={() => setTodoModal(!todoModal)}
                      >
                        Cancel
                    </button>
                    </ModalFooter>
                  </Modal>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoSection;
