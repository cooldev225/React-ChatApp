import { useState, useContext } from 'react';
import {
  Phone,
  MessageSquare,
  Users,
  Search,
  Plus,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  ArrowDownLeft,
  ArrowDownRight,
  Video,
  CornerLeftDown,
  ArrowUpRight,
} from 'react-feather';
import {
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownToggle,
} from 'reactstrap';
import ChatContext from '../../helpers/chatContext';

const ChatSection = () => {
  const chatCtx = useContext(ChatContext);
  const chatMembers = chatCtx.chatMembers;
  const chats = chatCtx.chats;
  const currentUser = chatCtx.currentUser;
  const changeChat = chatCtx.changeChat;
  const createChat = chatCtx.createChat;
  const [newChatModal, setChatModal] = useState(false);
  const [newCallModal, setCallModal] = useState(false);
  const [newContactModal, setContactModal] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatSubTab, setChatSubTab] = useState('direct');
  const [callSubTab, setCallSubTab] = useState('all');
  const [ChatContact, setChatContact] = useState(false);

  const callLogMain = (e) => {
    document.querySelectorAll('.call-log-main li').forEach((item) => {
      item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  const callLogModal = (e) => {
    document.querySelectorAll('.call-log-main li').forEach((item) => {
      item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  const contactLogMain = (e) => {
    document.querySelectorAll('.contact-log-main li').forEach((item) => {
      item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  const ToggleTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'chat') {
      document.querySelector('.call-content').classList.remove('active');
      document.querySelector('.chat-content').classList.add('active');
      document.querySelector('.contact-content').classList.remove('active');
    } else {
      document.querySelector('.chat-content').classList.remove('active');
    }

    if (tab === 'call') {
      document.querySelector('.call-content').classList.add('active');
      document.querySelector('.chat-content').classList.remove('active');
      document.querySelector('.contact-content').classList.remove('active');
    } else {
      document.querySelector('.call-content').classList.remove('active');
    }

    if (tab === 'contact') {
      document.querySelector('.call-content').classList.remove('active');
      document.querySelector('.chat-content').classList.remove('active');
      document.querySelector('.contact-content').classList.add('active');
    } else {
      document.querySelector('.contact-content').classList.remove('active');
    }
  };
  const ToggleChatSubTab = (tab) => {
    setChatSubTab(tab);

    if (tab === 'direct') {
      var element = document.getElementById('chating');
      element.classList.add('active');
    } else {
      var element = document.getElementById('chating');
      element.classList.remove('active');
    }

    if (tab === 'group') {
      var element = document.getElementById('group_chat');
      element.classList.add('active');
    } else {
      var element = document.getElementById('group_chat');
      element.classList.remove('active');
    }
  };

  const changeChatClick = (e, selectedUser) => {
    document.querySelectorAll('.chat-main li').forEach((item) => {
      item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    const currentUserId = currentUser.id;
    const currentChat = chats.find(
      (x) =>
        x.users.includes(currentUserId) && x.users.includes(selectedUser.id)
    );
    if (currentChat) {
      changeChat(selectedUser.id);
    } else {
      createChat(currentUserId, selectedUser.id, chats);
    }
    document.querySelector('.sidebar-toggle').classList.add('mobile-menu');
  };

  const Tipin = (e) => {
    e.currentTarget.classList.toggle('pined');
  };

  const changeGroupChat = (e) => {
    document.querySelectorAll('.group-main li').forEach((item) => {
      item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  return (
    <div className='chat custom-scroll'>
      <Dropdown
        isOpen={ChatContact}
        toggle={() => setChatContact(!ChatContact)}
      >
        <DropdownToggle
          tag='span'
          role="button"
          data-toggle='dropdown'
          aria-expanded={ChatContact}
        ></DropdownToggle>
        <ul className={`chat-cont-setting ${ChatContact ? 'open' : ''}`}>
          <li>
            <a
              href='#'
              data-toggle='modal'
              data-target='#msgchatModal'
              onClick={() => setChatModal(!newChatModal)}
            >
              <span onClick={() => setChatContact(!ChatContact)}>new chat</span>
              <div
                className='icon-btn btn-outline-primary button-effect btn-sm'
                onClick={() => setChatContact(!ChatContact)}
              >
                <MessageSquare />
              </div>
            </a>
          </li>
          <li>
            <a
              href='#'
              data-toggle='modal'
              data-target='#msgcallModal'
              onClick={() => setCallModal(!newCallModal)}
            >
              <span onClick={() => setChatContact(!ChatContact)}>new call</span>
              <div
                className='icon-btn btn-outline-success button-effect btn-sm'
                onClick={() => setChatContact(!ChatContact)}
              >
                <Phone />
              </div>
            </a>
          </li>
          <li>
            <a
              href='#'
              data-toggle='modal'
              data-target='#exampleModalCenter'
              onClick={() => setContactModal(!newContactModal)}
            >
              <span onClick={() => setChatContact(!ChatContact)}>
                new Contact
              </span>
              <div
                className='icon-btn btn-outline-danger button-effect btn-sm'
                onClick={() => setChatContact(!ChatContact)}
              >
                <Users />
              </div>
            </a>
          </li>
        </ul>
      </Dropdown>
      <Modal
        isOpen={newChatModal}
        toggle={() => setChatModal(!newChatModal)}
        className='fade show add-popup msg-chat-modal'
        centered
      >
        <ModalHeader toggle={() => setChatModal(!newChatModal)}>
          {'Create New Message'}
        </ModalHeader>
        <ModalBody>
          <div className='chat-msg-search'>
            <div className='input-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Search'
                aria-label="Recipient's username"
                aria-describedby='basic-addon21'
              />
              <div className='input-group-append'>
                <span className='input-group-text' id='basic-addon21'>
                  @
                </span>
              </div>
            </div>
          </div>
          <ul className='chat-main custom-scroll'>
            {chatMembers.slice(1, 5).map((chatlist, i) => {
              return (
                <li
                  className={`${1 === chatlist.id ? 'active' : ''}`}
                  data-to='blank'
                  key={i}
                  onClick={(e) => changeChatClick(e, chatlist)}
                >
                  <div className='chat-box'>
                    <div
                      className={`profile  ${chatlist.onlineStatus}`}
                      style={{
                        backgroundImage: `url('assets/images/${chatlist.thumb}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'block',
                      }}
                    >
                      <img
                        className='bg-img'
                        src={`assets/images/${chatlist.thumb}`}
                        alt='Avatar'
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className='details'>
                      <h5>{chatlist.name}</h5>
                      <h6>{chatlist.mesg}</h6>
                    </div>
                    <div className='date-status'>
                      <i className='ti-pin2' onClick={(e) => Tipin(e)}></i>
                      <h6>{chatlist.lastSeenDate}</h6>
                      {chatlist.status === 'Sending' || 'Failed' || 'Seen' ? (
                        <h6
                          className={`${chatlist.status === 'Sending'
                            ? 'font-dark'
                            : chatlist.status === 'Failed'
                              ? 'font-danger'
                              : 'font-success'
                            }  status`}
                        >
                          {' '}
                          {chatlist.status === '8' ? '' : chatlist.status}
                        </h6>
                      ) : (
                          ''
                        )}
                      {chatlist.status === '8' ? (
                        <div className='badge badge-primary sm'>
                          {chatlist.status}
                        </div>
                      ) : (
                          ''
                        )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={newCallModal}
        toggle={() => setCallModal(!newCallModal)}
        className='fade show add-popup msg-chat-modal'
        centered
      >
        <ModalHeader toggle={() => setCallModal(!newCallModal)}>
          Create New Message
        </ModalHeader>
        <ModalBody>
          <div className='chat-msg-search'>
            <div className='input-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Search'
                aria-label="Recipient's username"
                aria-describedby='basic-addon20'
              />
              <div className='input-group-append'>
                <span className='input-group-text' id='basic-addon20'>
                  @
                </span>
              </div>
            </div>
          </div>
          <ul className='call-log-main custom-scroll'>
            <li className='active' onClick={(e) => callLogModal(e)}>
              <div className='call-box'>
                <div
                  className='profile offline'
                  style={{
                    backgroundImage: `url('assets/images/contact/2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div className='details'>
                  <h5>Jony Lynetin</h5>
                  <h6>
                    {' '}
                    <ArrowDownLeft />
                    3:30 pm
                  </h6>
                </div>
                <div className='call-status'>
                  <div className='icon-btn btn-outline-success button-effect btn-sm'>
                    <Phone />
                  </div>
                </div>
              </div>
            </li>
            <li onClick={(e) => callLogModal(e)}>
              <div className='call-box'>
                <div
                  className='profile online'
                  style={{
                    backgroundImage: `url('assets/images/contact/1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div className='details'>
                  <h5>Jony Lynetin</h5>
                  <h6>
                    {' '}
                    <i data-feather='arrow-down-right'></i>3:10 pm
                  </h6>
                </div>
                <div className='call-status'>
                  <div className='icon-btn btn-outline-success button-effect btn-sm'>
                    <Video />
                  </div>
                </div>
              </div>
            </li>
            <li onClick={(e) => callLogModal(e)}>
              <div className='call-box'>
                <div
                  className='profile offline'
                  style={{
                    backgroundImage: `url('assets/images/contact/2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div className='details'>
                  <h5>Jony Lynetin</h5>
                  <h6>
                    {' '}
                    <i className='missed' data-feather='corner-left-down'></i>
                    3:00 pm
                  </h6>
                </div>
                <div className='call-status'>
                  <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                    <Phone />
                  </div>
                </div>
              </div>
            </li>
            <li onClick={(e) => callLogModal(e)}>
              <div className='call-box'>
                <div
                  className='profile online'
                  style={{
                    backgroundImage: `url('assets/images/contact/1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div className='details'>
                  <h5>Jony Lynetin</h5>
                  <h6>
                    {' '}
                    <i data-feather='arrow-down-right'></i>3:00 pm
                  </h6>
                </div>
                <div className='call-status'>
                  <div className='icon-btn btn-outline-success button-effect btn-sm'>
                    <Video />
                  </div>
                </div>
              </div>
            </li>
            <li onClick={(e) => callLogModal(e)}>
              <div className='call-box'>
                <div
                  className='profile offline'
                  style={{
                    backgroundImage: `url('assets/images/contact/2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div className='details'>
                  <h5>Jony Lynetin</h5>
                  <h6>
                    {' '}
                    <i data-feather='arrow-down-right'></i>3:00 pm
                  </h6>
                </div>
                <div className='call-status'>
                  <div className='icon-btn btn-outline-success button-effect btn-sm'>
                    <Phone />
                  </div>
                </div>
              </div>
            </li>
            <li onClick={(e) => callLogModal(e)}>
              <div className='call-box'>
                <div
                  className='profile online'
                  style={{
                    backgroundImage: `url('assets/images/contact/1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div className='details'>
                  <h5>Jony Lynetin</h5>
                  <h6>
                    <i data-feather='arrow-down-right'></i>3:00 pm
                  </h6>
                </div>
                <div className='call-status'>
                  <div className='icon-btn btn-outline-success button-effect btn-sm'>
                    <Video />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={newContactModal}
        toggle={() => setContactModal(!newContactModal)}
        className='fade show add-popup add-contact-modal'
        centered
      >
        <ModalHeader toggle={() => setContactModal(!newContactModal)}>
          {'Add Contact'}
        </ModalHeader>
        <ModalBody>
          <form className='default-form'>
            <div className='form-group'>
              <h5>Email or Username</h5>
              <input
                className='form-control'
                id='exampleInputEmail1'
                type='text'
                placeholder='Josephin water'
              />
            </div>
            <div className='form-group mb-0'>
              <h5>Contact number</h5>
              <input
                className='form-control'
                id='examplemsg'
                type='number'
                placeholder='12345678912'
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='danger'
            className='button-effect'
            size='sm'
            onClick={() => setContactModal(!newContactModal)}
          >
            Cancel
          </Button>
          <Button
            color='primary'
            className='button-effect'
            size='sm'
            onClick={() => setContactModal(!newContactModal)}
          >
            Add contact
          </Button>
        </ModalFooter>
      </Modal>
      <div className='theme-title'>
        <div className='media'>
          <div>
            <h2>Chat</h2>
            <h4>Start New Conversation</h4>
          </div>
          <div className='media-body text-right'>
            <a
              className='icon-btn btn-outline-light btn-sm search contact-search'
              href='#'
              onClick={() => setSearchToggle(true)}
            >
              {' '}
              <Search />
            </a>
            <form
              className={`form-inline search-form ${searchToggle ? 'open' : ''
                }`}
            >
              <div className='form-group'>
                <input
                  className='form-control-plaintext'
                  type='search'
                  placeholder='Search..'
                />
                <div
                  className='icon-close close-search'
                  onClick={() => setSearchToggle(false)}
                ></div>
              </div>
            </form>
            <a
              className='icon-btn btn-primary btn-fix chat-cont-toggle outside'
              href='#'
              onClick={() => setChatContact(!ChatContact)}
            >
              <Plus />
            </a>
          </div>
        </div>
      </div>
      <div className='theme-tab tab-sm chat-tabs'>
        <Nav tabs id='myTab' role='tablist'>
          <NavItem>
            <NavLink
              className={`button-effect step4 ${activeTab === 'chat' ? 'active' : ''
                }`}
              onClick={() => ToggleTab('chat')}
              data-intro='Start chat'
            >
              <MessageSquare />
              Chat
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`button-effect ${activeTab === 'call' ? 'active' : ''
                }`}
              onClick={() => ToggleTab('call')}
            >
              <Phone />
              Call
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`button-effect ${activeTab === 'contact' ? 'active' : ''
                }`}
              onClick={() => ToggleTab('contact')}
            >
              {' '}
              <Users />
              Contact
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane
            tabId='chat'
            className='fade show'
            id='chat'
            role='tabpanel'
            aria-label='chat-tab'
          >
            <div className='theme-tab'>
              <Nav tabs id='myTab1' role='tablist'>
                <NavItem>
                  <NavLink
                    className={`button-effect ${chatSubTab === 'direct' ? 'active' : ''
                      }`}
                    onClick={() => ToggleChatSubTab('direct')}
                    id='direct-tab'
                    data-toggle='tab'
                    href='#direct'
                    role='tab'
                    aria-controls='direct'
                    aria-selected='false'
                    data-to='chating'
                  >
                    Direct
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`button-effect ${chatSubTab === 'group' ? 'active' : ''
                      }`}
                    onClick={() => ToggleChatSubTab('group')}
                    id='group-tab'
                    data-toggle='tab'
                    href='#group'
                    role='tab'
                    aria-controls='group'
                    aria-selected='true'
                    data-to='group_chat'
                  >
                    Group
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={chatSubTab}>
                <TabPane
                  tabId='direct'
                  className='fade show'
                  id='direct'
                  role='tabpanel'
                  aria-labelledby='direct-tab'
                >
                  <ul className='chat-main'>
                    {chatMembers.slice(1, 5).map((chatlist, i) => {
                      return (
                        <li
                          className={`${1 === chatlist.id ? 'active' : ''}`}
                          key={i}
                          onClick={(e) => changeChatClick(e, chatlist)}
                        >
                          <div className='chat-box'>
                            <div
                              className={`profile  ${chatlist.onlineStatus}`}
                              style={{
                                backgroundImage: `url('assets/images/${chatlist.thumb}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'block',
                              }}
                            >
                              <img
                                className='bg-img'
                                src={`assets/images/${chatlist.thumb}`}
                                alt='Avatar'
                                style={{ display: 'none' }}
                              />
                            </div>
                            <div className='details'>
                              <h5>{chatlist.name}</h5>
                              <h6>{chatlist.mesg}</h6>
                            </div>
                            <div className='date-status'>
                              <i
                                className='ti-pin2'
                                onClick={(e) => Tipin(e)}
                              ></i>
                              <h6>{chatlist.lastSeenDate}</h6>
                              {chatlist.status === 'Sending' ||
                                'Failed' ||
                                'Seen' ? (
                                  <h6
                                    className={`${chatlist.status === 'Sending'
                                      ? 'font-dark'
                                      : chatlist.status === 'Failed'
                                        ? 'font-danger'
                                        : 'font-success'
                                      }  status`}
                                  >
                                    {' '}
                                    {chatlist.status === '8'
                                      ? ''
                                      : chatlist.status}
                                  </h6>
                                ) : (
                                  ''
                                )}
                              {chatlist.status === '8' ? (
                                <div className='badge badge-primary sm'>
                                  {chatlist.status}
                                </div>
                              ) : (
                                  ''
                                )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </TabPane>
                <TabPane
                  tabId='group'
                  className='fade show'
                  id='group'
                  role='tabpanel'
                  aria-labelledby='group-tab'
                >
                  <div className='search2'>
                    <div>
                      <div className='input-group'>
                        <div className='input-group-append'>
                          <span>
                            <i className='fa fa-search'></i>
                          </span>
                        </div>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Start Chat'
                        />
                      </div>
                    </div>
                  </div>
                  <ul className='group-main'>
                    <li
                      className='active'
                      data-to='group_chat'
                      onClick={(e) => changeGroupChat(e)}
                    >
                      <div className='group-box'>
                        <div
                          className='profile'
                          style={{
                            backgroundImage: `url('/assets/images/avtar/teq.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/teq.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Tech Ninjas</h5>
                          <h6>
                            Lorem Ipsum is simply dummy text the printing and
                            typesetting industry.
                          </h6>
                        </div>
                        <div className='date-status'>
                          <ul className='grop-icon'>
                            <li>
                              <a
                                className='group-tp'
                                href='#'
                                data-tippy-content='Josephin'
                              >
                                {' '}
                                <img
                                  src='/assets/images/contact/1.jpg'
                                  alt='group-icon-img'
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className='group-tp'
                                href='#'
                                data-tippy-content='Jony '
                              >
                                {' '}
                                <img
                                  src='/assets/images/contact/2.jpg'
                                  alt='group-icon-img'
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className='group-tp'
                                href='#'
                                data-tippy-content='Pabelo'
                              >
                                {' '}
                                <img
                                  src='/assets/images/contact/3.jpg'
                                  alt='group-icon-img'
                                />
                              </a>
                            </li>
                            <li>+ 35</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li
                      data-to='group_blank'
                      onClick={(e) => changeGroupChat(e)}
                    >
                      <div className='group-box'>
                        <div className='profile'>
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/family.jpg'
                            alt='Avatar'
                          />
                        </div>
                        <div className='details'>
                          <h5>Family Ties</h5>
                          <h6>
                            Lorem Ipsum is simply dummy text the printing and
                            typesetting industry.
                          </h6>
                        </div>
                        <div className='date-status'>
                          <ul className='grop-icon'>
                            <li>
                              <a
                                className='group-tp'
                                href='#'
                                data-tippy-content='Josephin'
                              >
                                {' '}
                                <img
                                  src='/assets/images/contact/1.jpg'
                                  alt='group-icon-img'
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className='group-tp'
                                href='#'
                                data-tippy-content='Jony '
                              >
                                {' '}
                                <img
                                  src='/assets/images/contact/2.jpg'
                                  alt='group-icon-img'
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className='group-tp'
                                href='#'
                                data-tippy-content='Pabelo'
                              >
                                {' '}
                                <img
                                  src='/assets/images/contact/3.jpg'
                                  alt='group-icon-img'
                                />
                              </a>
                            </li>
                            <li>+ 12</li>
                          </ul>
                          <div className='badge badge-primary'></div>
                        </div>
                      </div>
                    </li>
                    <li
                      data-to='group_blank'
                      onClick={(e) => changeGroupChat(e)}
                    >
                      <div className='group-box'>
                        <div className='profile bg-danger'>
                          <span>HT</span>
                        </div>
                        <div className='details'>
                          <h5>Hungry for Trouble</h5>
                          <h6>
                            Lorem Ipsum is simply dummy text the printing and
                            typesetting industry.
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li
                      data-to='group_blank'
                      onClick={(e) => changeGroupChat(e)}
                    >
                      <div className='group-box'>
                        <div className='profile'>
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/girls.jpg'
                            alt='Avatar'
                          />
                        </div>
                        <div className='details'>
                          <h5>Staunch Ladies</h5>
                          <h6>
                            Lorem Ipsum is simply dummy text the printing and
                            typesetting industry.
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li
                      data-to='group_blank'
                      onClick={(e) => changeGroupChat(e)}
                    >
                      <div className='group-box'>
                        <div className='profile bg-success'>
                          <span>CE</span>
                        </div>
                        <div className='details'>
                          <h5>Crazy Engineers</h5>
                          <h6>
                            Lorem Ipsum is simply dummy text the printing and
                            typesetting industry.
                          </h6>
                        </div>
                        <div className='date-status'></div>
                      </div>
                    </li>
                  </ul>
                </TabPane>
              </TabContent>
            </div>
          </TabPane>
          <TabPane
            tabId='call'
            className='fade show'
            id='call'
            role='tabpanel'
            // aria-labelledby='call-tab'
            aria-label='call-tab'
          >
            <div className='theme-tab tab-icon'>
              <Nav tabs id='contactTab' role='tablist'>
                <NavItem>
                  <NavLink
                    className={callSubTab === 'all' ? 'active' : ''}
                    onClick={() => setCallSubTab('all')}
                  >
                    All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={callSubTab === 'incoming' ? 'active' : ''}
                    onClick={() => setCallSubTab('incoming')}
                  >
                    {' '}
                    <PhoneIncoming />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={callSubTab === 'outgoing' ? 'active' : ''}
                    onClick={() => setCallSubTab('outgoing')}
                  >
                    {' '}
                    <PhoneOutgoing />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={callSubTab === 'cancel' ? 'active' : ''}
                    onClick={() => setCallSubTab('cancel')}
                  >
                    {' '}
                    <PhoneMissed />
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={callSubTab}>
                <TabPane tabId='all' className='fade show'>
                  <ul className='call-log-main'>
                    <li className='active' onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        ></div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownLeft />
                            3:30 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            <ArrowDownRight />
                            3:10 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </TabPane>
                <TabPane tabId='cancel' className='fade show'>
                  <ul className='call-log-main'>
                    <li className='active' onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:30 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:10 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <CornerLeftDown className='missed' />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-danger button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </TabPane>
                <TabPane tabId='incoming' className='fade show'>
                  <ul className='call-log-main'>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownRight />
                            3:10 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowDownRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </TabPane>
                <TabPane tabId='outgoing' className='fade show'>
                  <ul className='call-log-main'>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowUpRight />
                            3:10 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowUpRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowUpRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile offline'
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/2.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowUpRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Phone />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li onClick={(e) => callLogMain(e)}>
                      <div className='call-box'>
                        <div
                          className='profile online'
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/contact/1.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='details'>
                          <h5>Jony Lynetin</h5>
                          <h6>
                            {' '}
                            <ArrowUpRight />
                            3:00 pm
                          </h6>
                        </div>
                        <div className='call-status'>
                          <div className='icon-btn btn-outline-success button-effect btn-sm'>
                            <Video />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </TabPane>
              </TabContent>
            </div>
          </TabPane>
          <TabPane
            tabId='contact'
            className='fade show'
            id='contact'
            role='tabpanel'
            aria-label='contact-tab'
          >
            <ul className='contact-log-main'>
              <li onClick={(e) => contactLogMain(e)}>
                <div className='contact-box'>
                  <div
                    className='profile offline'
                    style={{
                      backgroundImage: `url('assets/images/contact/2.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  >
                    <img
                      className='bg-img'
                      src='/assets/images/contact/2.jpg'
                      alt='Avatar'
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className='details'>
                    <h5>Jony Lynetin</h5>
                    <h6>+21 3523 25544 </h6>
                  </div>
                  <div className='contact-action'>
                    <div className='icon-btn btn-outline-primary btn-sm button-effect'>
                      <Phone />
                    </div>
                    <div className='icon-btn btn-outline-success btn-sm button-effect'>
                      <Video />
                    </div>
                  </div>
                </div>
              </li>
              <li className='active' onClick={(e) => contactLogMain(e)}>
                <div className='contact-box'>
                  <div
                    className='profile online'
                    style={{
                      backgroundImage: `url('assets/images/contact/1.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  >
                    <img
                      className='bg-img'
                      src='/assets/images/contact/1.jpg'
                      alt='Avatar'
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className='details'>
                    <h5>Jony Lynetin</h5>
                    <h6>+54 541447 255 </h6>
                  </div>
                  <div className='contact-action'>
                    <div className='icon-btn btn-outline-primary btn-sm button-effect'>
                      <Phone />
                    </div>
                    <div className='icon-btn btn-outline-success btn-sm button-effect'>
                      <Video />
                    </div>
                  </div>
                </div>
              </li>
              <li onClick={(e) => contactLogMain(e)}>
                <div className='contact-box'>
                  <div
                    className='profile busy'
                    style={{
                      backgroundImage: `url('assets/images/contact/3.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  >
                    <img
                      className='bg-img'
                      src='/assets/images/contact/3.jpg'
                      alt='Avatar'
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className='details'>
                    <h5>Jony Lynetin</h5>
                    <h6>+58 2564 02554</h6>
                  </div>
                  <div className='contact-action'>
                    <div className='icon-btn btn-outline-primary btn-sm button-effect'>
                      <Phone />
                    </div>
                    <div className='icon-btn btn-outline-success btn-sm button-effect'>
                      <Video />
                    </div>
                  </div>
                </div>
              </li>
              <li onClick={(e) => contactLogMain(e)}>
                <div className='contact-box'>
                  <div
                    className='profile unreachable'
                    style={{
                      backgroundImage: `url('assets/images/contact/4.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  >
                    <img
                      className='bg-img'
                      src='/assets/images/contact/4.jpg'
                      alt='Avatar'
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className='details'>
                    <h5>Jony Lynetin</h5>
                    <h6>+44 55124 2524</h6>
                  </div>
                  <div className='contact-action'>
                    <div className='icon-btn btn-outline-primary btn-sm button-effect'>
                      <Phone />
                    </div>
                    <div className='icon-btn btn-outline-success btn-sm button-effect'>
                      <Video />
                    </div>
                  </div>
                </div>
              </li>
              <li onClick={(e) => contactLogMain(e)}>
                <div className='contact-box'>
                  <div
                    className='profile online'
                    style={{
                      backgroundImage: `url('assets/images/contact/4.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  >
                    <img
                      className='bg-img'
                      src='/assets/images/contact/4.jpg'
                      alt='Avatar'
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className='details'>
                    <h5>Jony Lynetin</h5>
                    <h6>+54 541447 255 </h6>
                  </div>
                  <div className='contact-action'>
                    <div className='icon-btn btn-outline-primary btn-sm button-effect'>
                      <Phone />
                    </div>
                    <div className='icon-btn btn-outline-success btn-sm button-effect'>
                      <Video />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default ChatSection;
