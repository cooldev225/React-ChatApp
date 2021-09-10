import React, { useContext, useState } from 'react';
import {
  PhoneIncoming,
  PhoneMissed,
  Phone,
  UserPlus,
  Pause,
} from 'react-feather';
import { Modal, ModalBody } from 'reactstrap';
import ChatContext from '../../helpers/chatContext';

const Call = (props) => {
  const { handleClickRight, mainMenu } = useContext(ChatContext);
  const [audiocall, setAudiocall] = useState(false);
  const [audioreceivecall, setAudioreceivecall] = useState(false);
  const [videocall, setVideocall] = useState(false);
  const [videoscreen, setVideoScreen] = useState(false);
  const [mute, setMute] = useState(false);
  const [dropResponse, setDropResponse] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  const toggleAudiocall = () => {
    setAudiocall(!audiocall);
  };
  const toggleVideocall = () => {
    setVideocall(!videocall);
  };
  const toggleAudioReceiveCall = () => {
    setAudioreceivecall(!audioreceivecall);
  };

  const handleacordion = (response) => {
    if (response) {
      setDropResponse(!response);
      document.querySelector('.collapse-block').classList.add('open');
    } else {
      setDropResponse(!response);
      document.querySelector('.collapse-block').classList.remove('open');
    }
  };

  const AudioReceiveCall = async () => {
    setAudioreceivecall(true);
    setAudiocall(false);
  };

  return (
    <div className='call-content tabto'>
      <a
        className='icon-btn btn-outline-primary button-effect mobile-back mb-3'
        href='#'
        onClick={() => handleClickRight(mainMenu)}
      >
        <i className='ti-angle-left'></i>
      </a>
      <div className='row'>
        <div className='col-sm-5'>
          <div className='user-profile mb-3'>
            <div className='user-content'>
              <img
                className='img-fluid'
                src='/assets/images/contact/2.jpg'
                alt='user-img'
              />
              <h3>Josephin water</h3>
              <h4 className='mt-2'>+0 1800 76855</h4>
              <ul>
                <li>
                  <i className='fa fa-twitch'></i>message
                </li>
                <li>
                  <i
                    className='fa fa-phone'
                    onClick={() => setAudiocall(!audiocall)}
                  ></i>
                  voice call
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
                                {' '}
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
                  <i
                    className='fa fa-video-camera'
                    onClick={() => setVideocall(!videocall)}
                  ></i>
                  video call
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
              </ul>
            </div>
          </div>
          <div className='user-profile'>
            <div className='document'>
              <div className='filter-block'>
                <div className={`collapse-block ${dropResponse ? '' : 'open'}`}>
                  <h5
                    className='block-title'
                    onClick={(e) => handleacordion(dropResponse)}
                  >
                    Shared Document
                    <label className='badge badge-success sm ml-2'>3</label>
                  </h5>
                  <div
                    className={`block-content ${dropResponse ? 'd-none' : ''}`}
                  >
                    <ul className='document-list'>
                      <li>
                        <i className='ti-folder font-danger'></i>
                        <h5>Simple_practice_project-zip</h5>
                      </li>
                      <li>
                        <i className='ti-write font-success'></i>
                        <h5>Word_Map-jpg</h5>
                      </li>
                      <li>
                        <i className='ti-zip font-primary'></i>
                        <h5>Latest_Design_portfolio.pdf</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-7'>
          <div className='call-log-main custom-scroll'>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneIncoming />
                  <div className='media-body'>
                    <h5>incoming call </h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>15 Minutes ago 5:10 &nbsp;(22/10/19)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneIncoming />
                  <div className='media-body'>
                    <h5>outgoing call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>30 Minutes ago 10:30 &nbsp;(12/09/19)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneMissed />
                  <div className='media-body'>
                    <h5>missed call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>1 Minutes ago 8:30 &nbsp; (28/08/19)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneMissed />
                  <div className='media-body'>
                    <h5>missed call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>10 Minutes ago 9:10 &nbsp; (18/01/19)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneMissed />
                  <div className='media-body'>
                    <h5>missed call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>35 Minutes ago 9:10 &nbsp; (17/01/19)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneMissed />
                  <div className='media-body'>
                    <h5>missed call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>80 Minutes ago 12:05 &nbsp; (17/01/19)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneIncoming />
                  <div className='media-body'>
                    <h5>incoming call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>15 Minutes ago 15:20 &nbsp; (28/02/20)</h6>
              </div>
            </div>
            <div className='coll-log-group'>
              <div className='log-content-left'>
                <div className='media'>
                  <PhoneIncoming />
                  <div className='media-body'>
                    <h5>incoming call</h5>
                  </div>
                </div>
              </div>
              <div className='log-content-right'>
                <h6>10 Minutes ago 20m 26s &nbsp; 10/3/20 </h6>
              </div>
            </div>
          </div>
          <div className='call-log-clear'>
            {' '}
            <i className='ti-trash font-danger'></i>
            <span className='font-danger'>Delete call log</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
