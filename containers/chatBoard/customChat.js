import { useContext, useEffect, useState, useRef } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import {
  User,
  Search,
  ChevronLeft,
  Phone,
  Video,
  PlusCircle,
  Trash2,
  Slash,
  MoreVertical,
  UserPlus,
  Pause,
  Volume2,
  Download,
  RotateCw,
  X,
} from 'react-feather';
import ChatContext from '../../helpers/chatContext';
import { Tooltip } from 'react-tippy';
import MessageInput from './messageInput';

const CustomChat = (props) => {
  const [volum, setVolum] = useState(true);
  const [search, setSearch] = useState(false);
  const [audiocall, setAudiocall] = useState(false);
  const [audioreceivecall, setAudioreceivecall] = useState(false);
  const [videocall, setVideocall] = useState(false);
  const [videoscreen, setVideoScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const chatCtx = useContext(ChatContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const { handleClickRight, mainMenu, profileToggle, setProfileToggle } = useContext(ChatContext);

  const chatMembers = chatCtx.chatMembers;
  const chats = chatCtx.chats;
  const currentUser = chatCtx?.currentUser;
  const selectedUser = chatCtx.selectedUser;
  const isTyeping = chatCtx.isTyeping;
  const typingMessage = chatCtx.typingMessage;
  const selectedChat =
    chatMembers && chats && selectedUser
      ? chats.find(
        (x) =>
          x.users.includes(currentUser.id) &&
          x.users.includes(selectedUser.id)
      )
      : null;

  const toggleAudiocall = () => {
    setAudiocall(!audiocall);
  };
  const toggleVideocall = () => {
    setVideocall(!videocall);
  };
  const toggleAudioReceiveCall = () => {
    setAudioreceivecall(!audioreceivecall);
  };

  const AudioReceiveCall = async () => {
    setAudioreceivecall(true);
    setAudiocall(false);
  };

  const profileSideBarToggle = (toggle) => {
    if (toggle) {
      document.body.className = `sidebar-active main-page menu-active ${localStorage.getItem(
        'layout_mode'
      )}`;
      // document
      //   .querySelector('.chitchat-main')
      //   .classList.remove('small-sidebar');
      document.querySelector('.chitchat-main').classList.add('small-sidebar');
      document.querySelector('.app-sidebar').classList.remove('active');
      setProfileToggle(toggle);
      props.setQuickAction(false);
    } else {
      document.body.className = `sidebar-active main-page ${localStorage.getItem(
        'layout_mode'
      )}`;
      document.querySelector('.chitchat-main').classList.add('small-sidebar');
      document.querySelector('.app-sidebar').classList.add('active');
      setProfileToggle(toggle);
    }
  };

  const refreshCw = (e) => {
    e.currentTarget.classList.toggle('refreshed');
  };

  useEffect(() => {
    setTimeout(() => {
      typingMessage(false);
    }, 3000);
  }, [isTyeping]);

  return chatMembers && chats && selectedUser ? (
    <>
      <div className='messages custom-scroll active wallpapers' id='chating'>
        <div className='contact-details'>
          <div className='row'>
            <form className={`form-inline search-form ${search ? 'open' : ''}`}>
              <div className='form-group'>
                <input
                  className='form-control-plaintext'
                  type='search'
                  placeholder='Search...'
                />
                <div
                  className='icon-close close-search'
                  onClick={() => setSearch(false)}
                ></div>
              </div>
            </form>
            <div className='col-7'>
              <div className='media left'>
                <div
                  className='media-left mr-3'
                  onClick={() => profileSideBarToggle(!profileToggle)}
                >
                  <div
                    className={`profile menu-trigger ${selectedUser.onlineStatus}`}
                    style={{
                      backgroundImage: `url('assets/images/${selectedUser.thumb}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  ></div>
                </div>
                <div className='media-body'>
                  <h5>{selectedUser.name}</h5>
                  <div
                    className={`badge ${selectedUser.onlineStatus === 'online'
                      ? 'badge-success'
                      : 'badge-danger'
                      }`}
                  >
                    {selectedUser.onlineStatus === 'online'
                      ? 'Active'
                      : 'InActive'}
                  </div>
                </div>
                <div className='media-right'>
                  <ul>
                    <li>
                      <a
                        className='icon-btn btn-light button-effect mute'
                        href='#'
                        onClick={() => setVolum(!volum)}
                      >
                        {volum ? <span className='effect-wave'></span> : ''}
                        <i
                          className={`fa fa-volume-up ${volum ? '' : 'off'}`}
                        ></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className='icon-btn btn-light search search-right'
                        href='#'
                        onClick={() => setSearch(!search)}
                      >
                        <Search />
                      </a>
                    </li>
                    <li>
                      <a
                        className='icon-btn btn-light button-effect mobile-sidebar'
                        href='#'
                        onClick={() => handleClickRight(mainMenu)}
                      >
                        <ChevronLeft />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col'>
              <ul className='calls text-right'>
                <li>
                  <Tooltip
                    title='Quick Audio Call'
                    position='bottom-end'
                    trigger='mouseenter'
                  >
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      onClick={() => setAudiocall(!audiocall)}
                    >
                      <Phone />
                    </a>
                  </Tooltip>
                  <Modal
                    className='show'
                    isOpen={audiocall}
                    toggle={toggleAudiocall}
                    centered={true}
                  >
                    <ModalBody className='p-0'>
                      <div
                        className='audiocall1 call-modal'
                        style={{
                          backgroundImage: `url('../assets/images/avtar/big/audiocall.jpg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'block',
                        }}
                      >
                        <img
                          className='bg-img'
                          src='../assets/images/avtar/big/audiocall.jpg'
                          alt='Avatar'
                          style={{ display: 'none' }}
                        />
                        <div className='center-con text-center'>
                          <div className='title2'>Josephin water</div>
                          <h6>log angelina california</h6>
                          <ul>
                            <li>
                              <a
                                className='icon-btn btn-success button-effect btn-xl is-animating'
                                href='#'
                                onClick={AudioReceiveCall}
                              >
                                <Phone />
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-danger button-effect btn-xl is-animating cancelcall'
                                href='#'
                                onClick={toggleAudiocall}
                              >
                                <Phone />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                  <Modal
                    className='fade audiorcvcall show'
                    id='audiorcvcall'
                    isOpen={audioreceivecall}
                    toggle={toggleAudioReceiveCall}
                    centered={true}
                  >
                    <ModalBody className='p-0'>
                      <div className='audiocall2 call-modal'>
                        <img
                          className='bg-img'
                          src='../assets/images/avtar/big/audiocall.jpg'
                          alt='Avatar'
                        />
                        <div className='center-con text-center'>
                          <div id='basicUsage2'>{props.timeValues}</div>
                          <div className='title2'>Josephin water</div>
                          <h6>log angelina california</h6>
                          <ul>
                            <li>
                              <a
                                className='icon-btn btn-light button-effect mute'
                                href='#'
                                onClick={() => setMute(!mute)}
                              >
                                <i
                                  className={`fa fa-microphone ${mute ? 'off' : ''
                                    }`}
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-light button-effect mute'
                                href='#'
                                onClick={() => setSpeaker(!speaker)}
                              >
                                <i
                                  className={`fa fa-volume-up ${speaker ? 'off' : ''
                                    }`}
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-danger button-effect btn-xl is-animating'
                                href='#'
                                onClick={toggleAudioReceiveCall}
                              >
                                {' '}
                                <Phone />
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-light button-effect'
                                href='#'
                                data-tippy-content='Add Call'
                              >
                                <UserPlus />
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-light button-effect'
                                href='#'
                                data-tippy-content='Pause'
                              >
                                <Pause />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </li>
                <li>
                  <Tooltip
                    title='Quick Video Call'
                    position='bottom-end'
                    trigger='mouseenter'
                  >
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      onClick={() => setVideocall(!videocall)}
                    >
                      <Video />
                    </a>
                  </Tooltip>
                  <Modal
                    className={`viddiolog fade show ${videoscreen ? 'active' : ''
                      }`}
                    isOpen={videocall}
                    toggle={toggleVideocall}
                    centered={true}
                  >
                    <ModalBody>
                      <div
                        className='videocall call-modal '
                        style={{
                          backgroundImage: `url('../assets/images/avtar/big/videocall_bg.jpg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'block',
                        }}
                      >
                        <img
                          className='bg-img'
                          src='/assets/images/avtar/big/videocall_bg.jpg'
                          alt='Avatar'
                          style={{ display: 'none' }}
                        />
                        <div
                          className='small-image'
                          style={{
                            backgroundImage: `url('../assets/images/avtar/big/videocall.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/big/videocall.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                        </div>
                        <div className='media videocall-details'>
                          <div className='usersprof'>
                            <div
                              className='profile'
                              style={{
                                backgroundImage: `url('../assets/images/avtar/2.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'block',
                              }}
                            >
                              <img
                                className='bg-img'
                                src='/assets/images/avtar/2.jpg'
                                alt='Avatar'
                                style={{ display: 'none' }}
                              />
                            </div>
                            <div
                              className='profile'
                              style={{
                                backgroundImage: `url('../assets/images/avtar/3.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'block',
                              }}
                            >
                              <img
                                className='bg-img'
                                src='/assets/images/avtar/3.jpg'
                                alt='Avatar'
                                style={{ display: 'none' }}
                              />
                            </div>
                          </div>
                          <div className='media-body'>
                            <h5>Josephin water</h5>
                            <h6>America ,California</h6>
                          </div>
                          <div id='basicUsage'>{props.timeValues}</div>
                          <div className='zoomcontent'>
                            <a
                              className='text-dark'
                              href='#'
                              onClick={() => setVideoScreen(!videoscreen)}
                            >
                              <img
                                src='../assets/images/logo/maximize.svg'
                                alt='zoom screen'
                              />
                            </a>
                          </div>
                        </div>
                        <div className='center-con text-center'>
                          <ul>
                            <li>
                              <a
                                className='icon-btn btn-light button-effect pause'
                                href='#'
                                data-tippy-content='Hold'
                              >
                                <i className='ti-control-pause'></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-danger button-effect btn-xl is-animating'
                                href='#'
                                onClick={toggleVideocall}
                              >
                                {' '}
                                <Phone />
                              </a>
                            </li>
                            <li>
                              <a
                                className='icon-btn btn-light button-effect mic'
                                href='#'
                                data-tippy-content='Mute'
                              >
                                <i className='fa fa-microphone'></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </li>
                <li>
                  <Tooltip
                    title='All Apps'
                    position='bottom-end'
                    trigger='mouseenter'
                  >
                    <a
                      className='icon-btn btn-light button-effect apps-toggle'
                      href='#'
                      onClick={() => props.OpenAppSidebar(props.toggleSmallSide)}
                    >
                      <i className='ti-layout-grid2'></i>
                    </a>
                  </Tooltip>
                </li>
                <li className='chat-friend-toggle'>
                  <Dropdown
                    isOpen={props.quickAction}
                    toggle={() => props.setQuickAction(!props.quickAction)}
                  >
                    <Tooltip
                      title='Quick action'
                      trigger='mouseenter'
                      position='bottom-end'
                    >
                      <DropdownToggle
                        tag='button'
                        data-toggle='dropdown'
                        aria-expanded={props.quickAction}
                        className='icon-btn btn-light bg-transparent button-effect outside'
                      >
                        <MoreVertical />
                      </DropdownToggle>
                    </Tooltip>
                    <div
                      className='chat-frind-content'
                      style={
                        props.quickAction
                          ? { display: 'block' }
                          : { display: 'none' }
                      }
                    >
                      <ul>
                        <li>
                          <a
                            className='icon-btn btn-outline-primary button-effect btn-sm'
                            href='#'
                            onClick={() => profileSideBarToggle(!profileToggle)}
                          >
                            <User />
                          </a>
                          <h5 onClick={() => profileSideBarToggle(!profileToggle)}>
                            Profile
                        </h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-danger button-effect btn-sm'
                            href='#'
                            onClick={() => setDeleteModal(!deleteModal)}
                          >
                            <Trash2 />
                          </a>
                          <h5 onClick={() => setDeleteModal(!deleteModal)}>
                            Delete
                        </h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-light button-effect btn-sm'
                            href='#'
                            onClick={() => setBlockModal(!blockModal)}
                          >
                            <Slash />
                          </a>
                          <h5 onClick={() => setBlockModal(!blockModal)}>
                            Block
                        </h5>
                        </li>
                      </ul>
                    </div>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal
          isOpen={deleteModal}
          className='add-popup delete-modal'
          toggle={() => setDeleteModal(!deleteModal)}
          centered
        >
          <ModalHeader toggle={() => setDeleteModal(!deleteModal)}></ModalHeader>
          <ModalBody>
            <h3>Do you want to delete the chat?</h3>
            <div className='delete-btn'>
              <Button
                className='button-effect'
                size='sm'
                color='danger'
                onClick={() => setDeleteModal(!deleteModal)}
              >
                Delete
            </Button>
              <Button
                className='button-effect ml-2'
                size='sm'
                color='primary'
                onClick={() => setDeleteModal(!deleteModal)}
              >
                Close
            </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={blockModal}
          className='add-popup delete-modal'
          toggle={() => setBlockModal(!blockModal)}
          centered
        >
          <ModalHeader toggle={() => setBlockModal(!blockModal)}></ModalHeader>
          <ModalBody>
            <h3>Do you want to block this user?</h3>
            <div className='delete-btn'>
              <Button
                className='button-effect'
                size='sm'
                color='danger'
                onClick={() => setBlockModal(!blockModal)}
              >
                Block
            </Button>
              <Button
                className='button-effect ml-2'
                size='sm'
                color='primary'
                onClick={() => setBlockModal(!blockModal)}
              >
                Close
            </Button>
            </div>
          </ModalBody>
        </Modal>
        <div className='contact-chat'>
          <ul className='chatappend'>
            {selectedUser.id === 1 ? (
              <>
                <li className='replies'>
                  <div className='media'>
                    <div
                      className='profile mr-4'
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
                    <div className='media-body'>
                      <div className='contact-name'>
                        <h5>Jony Lynetin</h5>
                        <h6>01:40 AM</h6>
                        <ul className='msg-box'>
                          <li className='msg-setting-main'>
                            <h5>Hi I am Alan,</h5>
                          </li>
                          <li className='msg-setting-main'>
                            <h5>
                              {' '}
                            your personal assistant to help you &#128512;{' '}
                            </h5>
                            <div className='badge badge-success sm ml-2'> R</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='sent'>
                  <div className='media'>
                    <div
                      className='profile mr-4'
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
                    <div className='media-body'>
                      <div className='contact-name'>
                        <h5>Josephin water</h5>
                        <h6>01:35 AM</h6>
                        <ul className='msg-box'>
                          <li className='msg-setting-main'>
                            <h5>
                              Hi I am Josephin, can you help me to find best chat
                            app?.{' '}
                            </h5>
                          </li>
                          <li className='msg-setting-main'>
                            <h5> it should from elite auther &#128519;</h5>
                            <div className='badge badge-success sm ml-2'> R</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='replies'>
                  <div className='media'>
                    <div
                      className='profile mr-4'
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
                    <div className='media-body'>
                      <div className='contact-name'>
                        <h5>Jony Lynetin</h5>
                        <h6>01:40 AM</h6>
                        <ul className='msg-box'>
                          <li className='msg-setting-main'>
                            <h5>
                              Sure, chitchat is best theme for chating project,
                              you can it check
                            <a
                                className='ml-1'
                                href='https://themeforest.net/user/pixelstrap/portfolio'
                                target='_blank'
                              >
                                here.
                            </a>
                            </h5>
                          </li>
                          <li className='msg-setting-main'>
                            <div className='document'>
                              <i className='fa fa-file-excel-o font-primary'></i>
                              <div className='details'>
                                <h5>Document.xlsx</h5>
                                <h6>25mb Seprate file</h6>
                              </div>
                              <div className='icon-btns'>
                                <a
                                  className='icon-btn btn-outline-light'
                                  href='/assets/doc/Document.xlsx'
                                  target='_blank'
                                >
                                  <Download />
                                </a>
                              </div>
                            </div>
                            <div className='badge badge-dark sm ml-2'> D</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='sent'>
                  <div className='media'>
                    <div
                      className='profile mr-4'
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
                    <div className='media-body'>
                      <div className='contact-name'>
                        <h5>Josephin water</h5>
                        <h6>01:42 AM</h6>
                        <ul className='msg-box'>
                          <li className='msg-setting-main'>
                            <h5>I think it's best for my project.</h5>
                          </li>
                          <li className='msg-setting-main'>
                            <ul className='auto-gallery'>
                              <li
                                style={{
                                  backgroundImage: `url('assets/images/media/1.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              >
                                <img
                                  className='bg-img'
                                  src='/assets/images/media/1.jpg'
                                  alt='Avatar'
                                  style={{ display: 'none' }}
                                />
                              </li>
                              <li
                                style={{
                                  backgroundImage: `url('assets/images/media/2.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              >
                                <img
                                  className='bg-img'
                                  src='/assets/images/media/2.jpg'
                                  alt='Avatar'
                                  style={{ display: 'none' }}
                                />
                              </li>
                              <li
                                style={{
                                  backgroundImage: `url('assets/images/media/3.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              >
                                <img
                                  className='bg-img'
                                  src='/assets/images/media/3.jpg'
                                  alt='Avatar'
                                  style={{ display: 'none' }}
                                />
                              </li>
                            </ul>
                            <div className='refresh-block'>
                              <div
                                className='badge badge-outline-primary refresh sm ml-2'
                                onClick={(e) => refreshCw(e)}
                              >
                                <RotateCw />
                              </div>
                              <div className='badge badge-danger sm ml-2'>F</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
                ''
              )}
            {selectedChat?.messages.length > 0 ? (
              selectedChat.messages.map((item, index) => {
                const participators = chatMembers.find(
                  (x) => x.id === item.sender
                );
                return (
                  <li
                    className={`${item.sender !== currentUser.id ? 'sent' : 'replies'
                      }`}
                    key={index}
                  >
                    <div className='media'>
                      <div
                        className='profile mr-4'
                        style={{
                          backgroundImage: `url('assets/images/${participators.thumb}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'block',
                        }}
                        style={{
                          backgroundImage: `url('assets/images/${participators.thumb}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'block',
                        }}
                      >
                        <img
                          className='bg-img'
                          src={`/assets/images/${participators.thumb}`}
                          alt='Avatar'
                          style={{ display: 'none' }}
                        />
                      </div>
                      <div className='media-body'>
                        <div className='contact-name'>
                          <h5>{participators.name}</h5>
                          <h6>{item.time}</h6>
                          <ul className='msg-box'>
                            <li className='msg-setting-main'>
                              {item.text.length ? <h5> {item.text}</h5> : ''}
                              {item.stickers ? <img src={item.stickers} alt='' /> : ''}
                              {item.read ? (
                                <div className='badge badge-success sm ml-2'>
                                  {' '}
                                R
                                </div>
                              ) : (
                                  ''
                                )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : selectedUser.id === 1 ? (
              ''
            ) :
                <li>
                  <div className='contact-chat'>
                    <div className='rightchat animat-rate'>
                      <div className='bg_circle'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className='cross'></div>
                      <div className='cross1'></div>
                      <div className='cross2'></div>
                      <div className='dot'></div>
                      <div className='dot1'> </div>
                    </div>
                  </div>
                  <div className='call-list-center'>
                    <img src='/assets/images/chat.png' alt='' />
                    <div className='animated-bg'>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <p>Select a chat to read messages</p>
                  </div>
                </li>
            }
            <li
              className='sent last typing-m'
              style={isTyeping ? { display: 'block' } : { display: 'none' }}
            >
              <div className='media'>
                <div
                  className='profile mr-4'
                  style={{
                    backgroundImage: `url('assets/images/${selectedUser.thumb}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                </div>
                <div className='media-body'>
                  <div className='contact-name'>
                    <h5>{selectedUser.name}</h5>
                    <ul className='msg-box'>
                      <li>
                        <h5>
                          <span className='d-block type'>
                            <span className='d-block typing-loader'></span>
                          </span>
                        </h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <MessageInput customChat={'direct'} />
    </>
  ) : (
      ''
    );
};

export default CustomChat;
