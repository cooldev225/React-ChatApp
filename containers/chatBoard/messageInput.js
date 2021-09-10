import { useEffect, useState, useContext, useRef } from 'react';
import {
  Smile,
  Image,
  Camera,
  Code,
  User,
  MapPin,
  Clipboard,
  BarChart2,
  Paperclip,
  Mic,
  Send,
} from 'react-feather';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  Button,
} from 'reactstrap';
import ChatContext from '../../helpers/chatContext';
import axios from 'axios';

const MessageInput = (props) => {
  const chatCtx = useContext(ChatContext);
  const chats = chatCtx.chats;
  const currentUser = chatCtx.currentUser;
  const selectedUser = chatCtx.selectedUser;
  const sendMessage = chatCtx.sendMessage;
  const replyMessage = chatCtx.replyMessage;
  const sendImages = chatCtx.sendImages;
  const typingMessage = chatCtx.typingMessage;
  const [emojis, setEmojis] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [sticker, setSticker] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [contactpoll, setContactpoll] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [snippetModal, setSnippetModal] = useState(false);
  const [pollModal, setPollModal] = useState(false);

  const toggleSnippetModal = () => {
    setSnippetModal(!snippetModal);
    setContactpoll(false);
  };
  const togglePollModal = () => {
    setPollModal(!pollModal);
    setContactpoll(false);
  };

  useEffect(() => {
    axios.get('/api/emoji.json').then((res) => setEmojis(res.data));
    axios.get('/api/sticker.json').then((res) => setStickers(res.data));
  }, []);

  const selcectedStickers = (stic) => {
    var container = document.querySelector('.messages');
    setTimeout(function () {
      container.scrollBy({ top: 400, behavior: 'smooth' });
    }, 310);
    let currentUserId = currentUser.id;
    let selectedUserId = selectedUser.id;
    let selectedUserName = selectedUser.name;
    sendMessage(currentUserId, selectedUserId, '', stic, chats);
    setSticker(false);
  };

  const hideAndShowContactPoll = (contpoll) => {
    setEmoji(false);
    setSticker(false);
    setContactpoll(!contpoll);
  };

  const getEmoji = (emoj) => {
    setMessageInput(messageInput + emoj.emoji);
    setEmoji(false);
  };

  const handleMessageChange = (message) => {
    setMessageInput(message);
  };

  const handleMessagePress = (e) => {
    if (e.key === 'Enter' || e === 'send') {
      var container = document.querySelector('.messages');
      setTimeout(function () {
        container.scrollBy({ top: 200, behavior: 'smooth' });
      }, 310);
      let currentUserId = currentUser.id;
      let selectedUserId = selectedUser.id;
      let selectedUserName = selectedUser.name;
      if (messageInput.length > 0) {
        setMessageInput('');
        sendMessage(currentUserId, selectedUserId, messageInput, '', chats);
        typingMessage(true);
        setTimeout(() => {
          const replyMsg =
            'Hey This is ' +
            selectedUserName +
            ', Sorry I busy right now, I will text you later';
          replyMessage(currentUserId, selectedUserId, replyMsg, chats);
        }, 3000);
      }
    }
  };

  const handleNoMessageSend = (e) => {
    if (e.key === 'Enter' || e === 'send') {
      if (messageInput.length > 0) {
        setMessageInput('');
      }
    }
  };

  return (
    <div className='message-input'>
      <div className='wrap emojis-main'>
        <Dropdown
          isOpen={sticker}
          toggle={() => setSticker((prevState) => !prevState)}
        >
          <DropdownToggle
            tag='button'
            data-toggle='dropdown'
            aria-expanded={sticker}
            className={`icon-btn btn-outline-primary button-effect mr-3 toggle-sticker outside ${sticker ? 'active' : ''
              }`}
          >
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              width='2158px'
              height='2148px'
              viewBox='0 0 2158 2148'
              enableBackground='new 0 0 2158 2148'
              xmlSpace='preserve'


            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill='none'
                stroke='#000000'
                strokeWidth='60'
                strokeMiterlimit='10'
                d='M699,693                        c0,175.649,0,351.351,0,527c36.996,0,74.004,0,111,0c18.058,0,40.812-2.485,57,1c11.332,0.333,22.668,0.667,34,1                        c7.664,2.148,20.769,14.091,25,20c8.857,12.368,6,41.794,6,62c0,49.329,0,98.672,0,148c175.649,0,351.351,0,527,0                        c0-252.975,0-506.025,0-759C1205.692,693,952.308,693,699,693z'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M886,799c59.172-0.765,93.431,25.289,111,66c6.416,14.867,14.612,39.858,9,63                        c-2.391,9.857-5.076,20.138-9,29c-15.794,35.671-47.129,53.674-90,63c-20.979,4.563-42.463-4.543-55-10                        c-42.773-18.617-85.652-77.246-59-141c10.637-25.445,31.024-49,56-60c7.999-2.667,16.001-5.333,24-8                        C877.255,799.833,882.716,801.036,886,799z'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1258,799c59.172-0.765,93.431,25.289,111,66c6.416,14.867,14.612,39.858,9,63                        c-2.391,9.857-5.076,20.138-9,29c-15.794,35.671-47.129,53.674-90,63c-20.979,4.563-42.463-4.543-55-10                        c-42.773-18.617-85.652-77.246-59-141c10.637-25.445,31.024-49,56-60c7.999-2.667,16.001-5.333,24-8                        C1249.255,799.833,1254.716,801.036,1258,799z'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1345,1184c-0.723,18.71-11.658,29.82-20,41c-18.271,24.489-50.129,37.183-83,47                        c-7.333,1-14.667,2-22,3c-12.013,2.798-33.636,5.15-44,3c-11.332-0.333-22.668-0.667-34-1c-15.332-3-30.668-6-46-9                        c-44.066-14.426-80.944-31.937-110-61c-22.348-22.353-38.992-45.628-37-90c0.667,0,1.333,0,2,0c9.163,5.585,24.723,3.168,36,6                        c26.211,6.583,54.736,7.174,82,14c34.068,8.53,71.961,10.531,106,19c9.999,1.333,20.001,2.667,30,4c26.193,6.703,54.673,7.211,82,14                        C1304.894,1178.445,1325.573,1182.959,1345,1184z'
              ></path>
              <polygon
                fillRule='evenodd'
                clipRule='evenodd'
                points='668.333,1248.667 901.667,1482 941.667,1432 922.498,1237.846                         687,1210.667 '
              ></polygon>
            </svg>
          </DropdownToggle>
          <div className={`sticker-contain ${sticker ? 'open' : ''}`}>
            <div className='sticker-sub-contain custom-scroll'>
              <ul>
                {stickers.map((item, i) => {
                  return (
                    <li key={i} onClick={() => selcectedStickers(item.stic)}>
                      <img
                        className='img-fluid'
                        src={item.stic}
                        alt='sticker'
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Dropdown>
        <div className='dot-btn dot-primary mr-3'>
          <Dropdown
            isOpen={emoji}
            toggle={() => setEmoji((prevState) => !prevState)}
          >
            <DropdownToggle
              tag='button'
              // role='button'
              data-toggle='dropdown'
              aria-expanded={emoji}
              className={`icon-btn btn-outline-primary button-effect toggle-emoji ${emoji ? 'active' : ''
                }`}
            >
              {/* <a
                className={`icon-btn btn-outline-primary button-effect toggle-emoji ${emoji ? 'active' : ''
                  }`}
                href='#'
              > */}
              <Smile />
              {/* </a> */}
            </DropdownToggle>
            <div
              className={`emojis-contain ${emoji ? 'open' : ''}`}
              style={{ left: '-50px' }}
            >
              <div className='emojis-sub-contain custom-scroll'>
                <ul>
                  {emojis.map((item, i) => {
                    return (
                      <li key={i} onClick={() => getEmoji(item)}>
                        {item.emoji}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Dropdown>
        </div>
        <div className='contact-poll'>
          <Dropdown
            isOpen={contactpoll}
            toggle={() => hideAndShowContactPoll(contactpoll)}
          >
            <DropdownToggle
              tag='button'
              data-toggle='dropdown'
              aria-expanded={contactpoll}
              className='icon-btn btn-outline-primary mr-4 outside'
            >
              {/* <a className='icon-btn btn-outline-primary mr-4 outside' href='#'> */}
              <i className='fa fa-plus'></i>
              {/* </a> */}
            </DropdownToggle>
            <div
              className='contact-poll-content'
              style={
                contactpoll
                  ? { display: 'block', left: '-20px', width: 'max-content' }
                  : { display: 'none' }
              }
            >
              <ul>
                <li>
                  <a href='#' onClick={() => setContactpoll(!contactpoll)}>
                    <Image />
                    gallery
                  </a>
                </li>
                <li>
                  <a href='#' onClick={() => setContactpoll(!contactpoll)}>
                    <Camera />
                    camera
                  </a>
                </li>
                <li>
                  <a
                    data-toggle='modal'
                    data-target='#snippetModal'
                    onClick={() => toggleSnippetModal()}
                  >
                    <Code />
                    Code Snippest
                  </a>
                </li>
                <li>
                  <a href='#' onClick={() => setContactpoll(!contactpoll)}>
                    <User />
                    contact
                  </a>
                </li>
                <li>
                  <a href='#' onClick={() => setContactpoll(!contactpoll)}>
                    <MapPin />
                    location
                  </a>
                </li>
                <li>
                  <a href='#' onClick={() => setContactpoll(!contactpoll)}>
                    <Clipboard />
                    document
                  </a>
                </li>
                <li>
                  <a
                    data-toggle='modal'
                    data-target='#pollModal'
                    onClick={() => togglePollModal()}
                  >
                    <BarChart2 />
                    poll
                  </a>
                </li>
                <li>
                  <a href='#' onClick={() => setContactpoll(!contactpoll)}>
                    <Paperclip />
                    attach
                  </a>
                </li>
              </ul>
              <Modal
                isOpen={snippetModal}
                toggle={toggleSnippetModal}
                className='snippet-modal-main add-popup'
                centered={true}
              >
                <ModalHeader toggle={toggleSnippetModal}>
                  <i className='fa fa-code'></i>
                  code snippets
                </ModalHeader>
                <ModalBody>
                  <form className='default-form'>
                    <h3>creat snippets</h3>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='title(optional)'
                      />
                    </div>
                    <div className='form-group'>
                      <select className='mb-0'>
                        <option>ebnf</option>
                        <option>c++</option>
                        <option>diff</option>
                        <option>dart</option>
                      </select>
                    </div>
                    <div className='form-group'>
                      <textarea className='form-control' rows='5'></textarea>
                    </div>
                    <div className='form-group'>
                      <input
                        className='form-control mb-0'
                        type='text'
                        placeholder='add commant (optional)'
                      />
                    </div>
                    <div className='form-group mb-0'>
                      <div className='btn-snipate'>
                        <a
                          className='btn btn-danger button-effect btn-sm mr-3'
                          href='#'
                          onClick={toggleSnippetModal}
                        >
                          Cancel
                        </a>
                        <a
                          className='btn btn-primary button-effect btn-sm'
                          href='#'
                          onClick={toggleSnippetModal}
                        >
                          Create & post
                        </a>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={pollModal}
                toggle={togglePollModal}
                className='pol-modal-main add-popup'
                centered={true}
              >
                <div className='modal-content'>
                  <ModalHeader toggle={togglePollModal}>
                    <i data-feather='bar-chart-2'></i>poll
                  </ModalHeader>
                  <ModalBody>
                    <form className='default-form'>
                      <h3>create poll</h3>
                      <div className='form-group'>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='ask que'
                        />
                        <input
                          className='form-control'
                          type='text'
                          placeholder='add commatn'
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          className='form-control'
                          type='text'
                          placeholder='option 1'
                        />
                        <input
                          className='form-control'
                          type='text'
                          placeholder='option 2'
                        />
                        <a className='add-option' href='#'>
                          add an option
                        </a>
                      </div>
                      <div className='form-group'>
                        <div className='post-poll'>
                          <ul>
                            <li>
                              post poll in
                              <p className='pt-0'>test name</p>
                            </li>
                            <li>
                              poll expier in 7 days
                              <p className='pt-0'>test name</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='form-group'>
                        <div className='allow-group'>
                          <input className='allow-check' type='checkbox' />
                          Allow users to vote anonymously
                        </div>
                      </div>
                      <div className='creat-poll-btn'>
                        <a
                          className='btn btn-primary button-effect btn-sm'
                          href='#'
                          onClick={togglePollModal}
                        >
                          Create poll
                        </a>
                      </div>
                    </form>
                  </ModalBody>
                </div>
              </Modal>
            </div>
          </Dropdown>
        </div>
        <input
          className='setemoj'
          value={messageInput}
          type='text'
          placeholder='Write your message...'
          onKeyPress={
            props.customChat === 'direct'
              ? (e) => handleMessagePress(e)
              : (e) => handleNoMessageSend(e)
          }
          onChange={(e) => handleMessageChange(e.target.value)}
        />
        <a
          className='icon-btn btn-outline-primary button-effect mr-3 ml-3'
          href='#'
        >
          <Mic />
        </a>
        <button
          className={`submit icon-btn btn-primary ${messageInput ? '' : 'disabled'
            }`}
          onClick={
            props.customChat === 'direct'
              ? () => handleMessagePress('send')
              : () => handleNoMessageSend('send')
          }
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
