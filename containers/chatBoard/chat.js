import { useEffect, useState } from 'react';
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
  ChevronsLeft,
  Plus,
  Pause,
  MicOff,
  VideoOff,
  UserPlus,
  CameraOff,
  Volume2,
  X,
} from 'react-feather';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Download, RotateCw } from 'react-feather';
import CustomChat from './customChat';
import MessageInput from './messageInput';
import { Tooltip } from 'react-tippy';
import { useContext } from 'react';
import ChatContext from '../../helpers/chatContext';

const Chat = (props) => {
  const [search, setSearch] = useState(false);
  const [VolumOnOff, setVolumOnOff] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [quickAction, setQuickAction] = useState(false);
  const [confercall, setConfercall] = useState(false);
  const [confvideocall, setConfvideocall] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const { OpenAppSidebar, toggleSmallSide } = useContext(ChatContext);
  const [addMember, setaddMember] = useState(false);

  const toggleConfercall = () => {
    setConfercall(!confercall);
  };
  const toggleConfvideocall = () => {
    setConfvideocall(!confvideocall);
  };

  return (
    <>
      <CustomChat
        quickAction={quickAction}
        setQuickAction={setQuickAction}
        OpenAppSidebar={OpenAppSidebar}
        toggleSmallSide={toggleSmallSide}
        timeValues={props.timeValues}
      />
      <div className='chat-content tabto active'>
        <div className='messages custom-scroll' id='blank'>
          <div className='contact-details'>
            <div className='row'>
              <div className='col'>
                <div className='media left'>
                  <div className='media-left mr-3'>
                    <div className='profile online menu-trigger'>
                      <img
                        className='bg-img'
                        src='/assets/images/contact/2.jpg'
                        alt='Avatar'
                      />
                    </div>
                  </div>
                  <div className='media-body'>
                    <h5>Josephin water</h5>
                    <h6>Last Seen 5 hours</h6>
                  </div>
                  <div className='media-right'>
                    <ul>
                      <li>
                        <a
                          className='icon-btn btn-light button-effect mute'
                          href='#'
                          onClick={() => setVolumOnOff(!VolumOnOff)}
                        >
                          <i
                            className={`fa fa-volume-up ${VolumOnOff ? 'off' : ''
                              }`}
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-light search search-right'
                          href='#'
                          onClick={() => setSearch(!search)}
                        >
                          {' '}
                          <Search />
                        </a>
                        <form
                          className={`form-inline search-form ${search ? 'open' : ''
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
                              onClick={() => setSearch(false)}
                            >
                              {' '}
                            </div>
                          </div>
                        </form>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-light button-effect mobile-sidebar'
                          href='#'
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
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      onClick={() => setCallModal(!callModal)}
                    >
                      <Phone />
                    </a>
                    <Modal
                      isOpen={callModal}
                      toggle={() => setCallModal(!callModal)}
                      className='fade show'
                      centered
                    >
                      <ModalBody className='p-0'>
                        <div className='audiocall1 call-modal'>
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/big/audiocall.jpg'
                            alt='Avatar'
                          />
                          <div className='center-con text-center'>
                            <div className='title2'>Josephin water</div>
                            <h6>log angelina california</h6>
                            <ul>
                              <li>
                                <a
                                  className='icon-btn btn-success button-effect btn-xl is-animating'
                                  href='#'
                                >
                                  {' '}
                                  <Phone />
                                </a>
                              </li>
                              <li>
                                <a
                                  className='icon-btn btn-danger button-effect btn-xl is-animating cancelcall'
                                  href='#'
                                  data-dismiss='modal'
                                >
                                  {' '}
                                  <Phone />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                  </li>
                  <li>
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      onClick={() => setVideoModal(!videoModal)}
                    >
                      <Video />
                    </a>
                    <Modal
                      className='viddiolog fade show'
                      isOpen={videoModal}
                      toggle={() => setVideoModal(!videoModal)}
                      centered
                    >
                      <ModalBody>
                        <div className='videocall call-modal'>
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/big/videocall_bg.jpg'
                            alt='Avatar'
                          />
                          <div className='small-image'>
                            <img
                              className='bg-img'
                              src='/assets/images/avtar/big/videocall.jpg'
                              alt='Avatar'
                            />
                          </div>
                          <div className='media videocall-details'>
                            <div className='usersprof'>
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('assets/images/avtar/2.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              ></div>
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('assets/images/avtar/3.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              ></div>
                            </div>
                            <div className='media-body'>
                              <h5>Josephin water</h5>
                              <h6>America ,California</h6>
                            </div>
                            <div id='basicUsage'>{props.timeValues}</div>
                            <div className='zoomcontent'>
                              <a
                                className='text-dark'
                                href='#!'
                                onClick='javascript:toggleFullScreen()'
                                data-tippy-content='Zoom Screen'
                              >
                                <img
                                  src='/assets/images/logo/maximize.svg'
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
                                  onClick={() => setVideoModal(!videoModal)}
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
                    <a
                      className='icon-btn btn-light button-effect apps-toggle'
                      href='#'
                      onClick={() => OpenAppSidebar(toggleSmallSide)}
                    >
                      <i className='ti-layout-grid2'></i>
                    </a>
                  </li>
                  <li className='chat-friend-toggle'>
                    <a
                      className='icon-btn btn-light bg-transparent button-effect outside'
                      href='#'
                      onClick={() => setQuickAction(!quickAction)}
                    >
                      <MoreVertical />
                    </a>
                    <div
                      className='chat-frind-content'
                      style={
                        quickAction ? { display: 'block' } : { display: 'none' }
                      }
                    >
                      <ul>
                        <li>
                          <a
                            className='icon-btn btn-outline-primary button-effect btn-sm'
                            href='#'
                          >
                            <User />
                          </a>
                          <h5>profile</h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-success button-effect btn-sm'
                            href='#'
                          >
                            <PlusCircle />
                          </a>
                          <h5>archive</h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-danger button-effect btn-sm'
                            href='#'
                          >
                            <Trash2 />
                          </a>
                          <h5>delete</h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-light button-effect btn-sm'
                            href='#'
                          >
                            <Slash />
                          </a>
                          <h5>block</h5>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
        </div>
        <div className='messages custom-scroll' id='group_chat'>
          <div className='contact-details'>
            <div className='row'>
              <div className='col'>
                <div className='media left'>
                  <div className='media-left mr-3'>
                    <div
                      className='profile online menu-trigger'
                      style={{
                        backgroundImage: `url('/assets/images/avtar/teq.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'block',
                      }}
                    >
                      <img
                        className='bg-img img-fluid'
                        src='/assets/images/avtar/teq.jpg'
                        alt='Avatar'
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  <div className='media-body'>
                    <h5>Tech Ninjas</h5>
                    <div className='badge badge-success'>Active</div>
                  </div>
                  <div className='media-right'>
                    <ul>
                      <li>
                        <a
                          className='icon-btn btn-light button-effect mute'
                          href='#'
                        >
                          <i className='fa fa-volume-up'></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-light search search-right'
                          href='#'
                        >
                          {' '}
                          <Search />
                        </a>
                        <form className='form-inline search-form'>
                          <div className='form-group'>
                            <input
                              className='form-control-plaintext'
                              type='search'
                              placeholder='Search..'
                            />
                            <div className='icon-close close-search'> </div>
                          </div>
                        </form>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-light button-effect mobile-sidebar'
                          href='#'
                        >
                          <ChevronsLeft />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col'>
                <ul className='calls text-right'>
                  <li>
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      onClick={() => setConfercall(!confercall)}
                    >
                      <Phone />
                    </a>
                    <Modal
                      className='show'
                      id='confercall'
                      isOpen={confercall}
                      toggle={toggleConfercall}
                      centered={true}
                    >
                      <ModalBody className='p-0'>
                        <div
                          className='conferencecall call-modal'
                          style={{
                            backgroundImage: `url('/assets/images/avtar/big/audiocall.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className='bg-img'
                            src='/assets/images/avtar/big/audiocall.jpg'
                            alt='Avatar'
                            style={{ display: 'none' }}
                          />
                          <div className='center-con text-center'>
                            <div className='usersprof'>
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('/assets/images/avtar/2.jpg')`,
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
                                  backgroundImage: `url('/assets/images/avtar/3.jpg')`,
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
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('/assets/images/avtar/5.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              >
                                <img
                                  className='bg-img'
                                  src='/assets/images/avtar/5.jpg'
                                  alt='Avatar'
                                  style={{ display: 'none' }}
                                />
                              </div>
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('/assets/images/avtar/big/videocall_bg.jpg')`,
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
                              </div>
                            </div>
                            <p>Incoming Call</p>
                            <h3>Conference Call</h3>
                            <ul>
                              <li>
                                <a
                                  className='icon-btn btn-danger button-effect btn-xl is-animating cancelcall'
                                  href='#'
                                  onClick={() => setConfercall(false)}
                                >
                                  {' '}
                                  <Phone />
                                </a>
                              </li>
                              <li>
                                <a
                                  className='icon-btn btn-success button-effect btn-xl is-animating'
                                  href='#'
                                >
                                  {' '}
                                  <Video />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                  </li>
                  <li>
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      onClick={() => setConfvideocall(!confvideocall)}
                    >
                      <Video />
                    </a>
                    <Modal
                      className='fade show'
                      id='confvideocl'
                      isOpen={confvideocall}
                      toggle={toggleConfvideocall}
                      centered={true}
                    >
                      <ModalBody>
                        <div className='row confimg'>
                          <div className='col-6'>
                            <div
                              className='vclimg'
                              style={{
                                backgroundImage: `url('/assets/images/avtar/big/videocall_bg.jpg')`,
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
                            </div>
                          </div>
                          <div className='col-6'>
                            <div
                              className='vclimg'
                              style={{
                                backgroundImage: `url('/assets/images/avtar/5.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'block',
                              }}
                            >
                              <img
                                className='bg-img'
                                src='/assets/images/avtar/5.jpg'
                                alt='Avatar'
                                style={{ display: 'none' }}
                              />
                            </div>
                          </div>
                          <div className='col-6'>
                            <div
                              className='vclimg'
                              style={{
                                backgroundImage: `url('/assets/images/avtar/2.jpg')`,
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
                          </div>
                          <div className='col-6'>
                            <div
                              className='vclimg'
                              style={{
                                backgroundImage: `url('/assets/images/avtar/3.jpg')`,
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
                        </div>
                      </ModalBody>
                      <ModalFooter className='clfooter'>
                        <div id='basicUsage3'>{props.timeValues}</div>
                        <ul>
                          <li>
                            <a
                              className='icon-btn btn-light button-effect'
                              href='#'
                              data-tippy-content='speaker'
                            >
                              <Volume2 />
                            </a>
                          </li>
                          <li>
                            <a
                              className='icon-btn btn-light button-effect'
                              href='#'
                              data-tippy-content='Camera'
                            >
                              <CameraOff />
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
                              className='icon-btn btn-danger button-effect is-animating'
                              href='#'
                              onClick={() => setConfvideocall(false)}
                            >
                              <Phone />
                            </a>
                          </li>
                          <li>
                            <a
                              className='icon-btn btn-light button-effect'
                              href='#'
                              data-tippy-content='Disable Video'
                            >
                              <VideoOff />
                            </a>
                          </li>
                          <li>
                            <a
                              className='icon-btn btn-light button-effect mic'
                              href='#'
                              data-tippy-content='Mute'
                            >
                              <MicOff />
                            </a>
                          </li>
                          <li>
                            <a
                              className='icon-btn btn-light button-effect'
                              href='#'
                              data-tippy-content='Hold'
                            >
                              <Pause />
                            </a>
                          </li>
                        </ul>
                      </ModalFooter>
                    </Modal>
                  </li>
                  <li>
                    <a
                      className='icon-btn btn-light button-effect apps-toggle'
                      href='#'
                      data-tippy-content='All Apps'
                      onClick={() => OpenAppSidebar(toggleSmallSide)}
                    >
                      <i className='ti-layout-grid2'></i>
                    </a>
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
            <ModalHeader
              toggle={() => setDeleteModal(!deleteModal)}
            ></ModalHeader>
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
            <ModalHeader
              toggle={() => setBlockModal(!blockModal)}
            ></ModalHeader>
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
              <li className='groupuser'>
                <h4>Jewellery project</h4>
                <div className='gr-chat-friend-toggle'>
                  <Dropdown
                    isOpen={addMember}
                    toggle={() => setaddMember(!addMember)}
                  >
                    <DropdownToggle
                      tag='button'
                      data-toggle='dropdown'
                      // role='button'
                      aria-expanded={addMember}
                      className='icon-btn btn-sm pull-right add-grbtn outside'
                    >
                      <Plus />
                    </DropdownToggle>
                    <div
                      className='gr-chat-frind-content'
                      style={
                        addMember ? { display: 'block' } : { display: 'none' }
                      }
                    >
                      <ul className='chat-main'>
                        <li>
                          <div className='chat-box'>
                            <div className='media'>
                              <div
                                className='profile offline menu-trigger'
                                style={{
                                  backgroundImage: `url('/assets/images/contact/1.jpg')`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  display: 'block',
                                }}
                              >
                                <img
                                  className='bg-img img-fluid '
                                  src='/assets/images/contact/1.jpg'
                                  alt='Avatar'
                                  style={{ display: 'none' }}
                                />
                              </div>
                              <div className='details'>
                                <h5>Josephin water</h5>
                                <h6>Alabma , USA</h6>
                              </div>
                              <div className='media-body'>
                                <a
                                  className='icon-btn btn-outline-primary btn-sm'
                                  href='#'
                                  data-tippy-content='Add User'
                                  onClick={() => setaddMember(!addMember)}
                                >
                                  <i className='fa fa-plus'></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='chat-box'>
                            <div className='media'>
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('/assets/images/contact/2.jpg')`,
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
                                <h5>Josephin water</h5>
                                <h6>Alabma , USA</h6>
                              </div>
                              <div className='media-body'>
                                <a
                                  className='icon-btn btn-outline-primary btn-sm'
                                  href='#'
                                  data-tippy-content='Add User'
                                  onClick={() => setaddMember(!addMember)}
                                >
                                  <i className='fa fa-plus'></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='chat-box'>
                            <div className='media'>
                              <div
                                className='profile'
                                style={{
                                  backgroundImage: `url('/assets/images/contact/3.jpg')`,
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
                                <h5>Josephin water</h5>
                                <h6>Alabma , USA</h6>
                              </div>
                              <div className='media-body'>
                                <a
                                  className='icon-btn btn-outline-primary btn-sm'
                                  href='#'
                                  data-tippy-content='Add User'
                                  onClick={() => setaddMember(!addMember)}
                                >
                                  <i className='fa fa-plus'></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='chat-box'>
                            <div className='media'>
                              <div
                                className='profile unreachable'
                                style={{
                                  backgroundImage: `url('/assets/images/contact/4.jpg')`,
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
                                <h5>Josephin water</h5>
                                <h6>Alabma , USA</h6>
                              </div>
                              <div className='media-body'>
                                <a
                                  className='icon-btn btn-outline-primary btn-sm'
                                  href='#'
                                  data-tippy-content='Add User'
                                  onClick={() => setaddMember(!addMember)}
                                >
                                  <i className='fa fa-plus'></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Dropdown>
                </div>
                <div
                  className='gr-profile dot-btn dot-success grow'
                  style={{
                    backgroundImage: `url('../assets/images/avtar/3.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
                <div
                  className='gr-profile dot-btn dot-success grow'
                  style={{
                    backgroundImage: `url('../assets/images/avtar/5.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                ></div>
              </li>
              <li className='sent'>
                <div className='media'>
                  <div
                    className='profile mr-4'
                    style={{
                      backgroundImage: `url('../assets/images/contact/2.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  ></div>
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
                      backgroundImage: `url('../assets/images/avtar/1.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  ></div>
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
                                href='../assets/doc/Document.xlsx'
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
                      backgroundImage: `url('../assets/images/contact/2.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  ></div>
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
                            ></li>
                            <li
                              style={{
                                backgroundImage: `url('assets/images/media/2.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'block',
                              }}
                            ></li>
                            <li
                              style={{
                                backgroundImage: `url('assets/images/media/3.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'block',
                              }}
                            ></li>
                          </ul>
                          <div className='refresh-block'>
                            <div className='badge badge-outline-primary refresh sm ml-2'>
                              {' '}
                              <RotateCw />
                            </div>
                          </div>
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
                      backgroundImage: `url('../assets/images/avtar/1.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'block',
                    }}
                  ></div>
                  <div className='media-body'>
                    <div className='contact-name'>
                      <h5>Jony Lynetin</h5>
                      <h6>01:45 AM</h6>
                      <ul className='msg-box'>
                        <li className='msg-setting-main'>
                          <h5>
                            If you have any other query then feel free to ask
                            us.
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
        <div className='messages custom-scroll' id='group_blank'>
          <div className='contact-details'>
            <div className='row'>
              <div className='col'>
                <div className='media left'>
                  <div className='media-left mr-3'>
                    <div className='profile online menu-trigger'>
                      <img
                        className='bg-img'
                        src='/assets/images/avtar/family.jpg'
                        alt='Avatar'
                      />
                    </div>
                  </div>
                  <div className='media-body'>
                    <h5>Family Ties</h5>
                    <h6>Last Seen 2 hours</h6>
                  </div>
                  <div className='media-right'>
                    <ul>
                      <li>
                        <a
                          className='icon-btn btn-light button-effect mute'
                          href='#'
                        >
                          <i className='fa fa-volume-up'></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-light search search-right'
                          href='#'
                        >
                          {' '}
                          <Search />
                        </a>
                        <form className='form-inline search-form'>
                          <div className='form-group'>
                            <input
                              className='form-control-plaintext'
                              type='search'
                              placeholder='Search..'
                            />
                            <div className='icon-close close-search'> </div>
                          </div>
                        </form>
                      </li>
                      <li>
                        <a
                          className='icon-btn btn-light button-effect mobile-sidebar'
                          href='#'
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
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      data-tippy-content='Quick Audio Call'
                      data-toggle='modal'
                      data-target='#confercall'
                    >
                      <Phone />
                    </a>
                  </li>
                  <li>
                    <a
                      className='icon-btn btn-light button-effect'
                      href='#'
                      data-tippy-content='Quick Video Call'
                      data-toggle='modal'
                      data-target='#confvideocl'
                    >
                      <Video />
                    </a>
                  </li>
                  <li>
                    <a
                      className='icon-btn btn-light button-effect apps-toggle'
                      href='#'
                      onClick={() => OpenAppSidebar()}
                    >
                      <i className='ti-layout-grid2'></i>
                    </a>
                  </li>
                  <li className='chat-friend-toggle'>
                    <a
                      className='icon-btn btn-light bg-transparent button-effect outside'
                      href='#'
                      onClick={() => setQuickAction(!quickAction)}
                    >
                      <MoreVertical />
                    </a>
                    <div
                      className='chat-frind-content'
                      style={
                        quickAction ? { display: 'block' } : { display: 'none' }
                      }
                    >
                      <ul>
                        <li>
                          <a
                            className='icon-btn btn-outline-primary button-effect btn-sm'
                            href='#'
                          >
                            <User />
                          </a>
                          <h5>profile</h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-success button-effect btn-sm'
                            href='#'
                          >
                            <PlusCircle />
                          </a>
                          <h5>archive</h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-danger button-effect btn-sm'
                            href='#'
                          >
                            <Trash2 />
                          </a>
                          <h5>delete</h5>
                        </li>
                        <li>
                          <a
                            className='icon-btn btn-outline-light button-effect btn-sm'
                            href='#'
                          >
                            <Slash />
                          </a>
                          <h5>block</h5>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
        </div>
        <MessageInput customChat={''} />
      </div>
    </>
  );
};

export default Chat;
