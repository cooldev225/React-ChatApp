import { Edit, ChevronLeft, X, ChevronRight, PlusCircle } from 'react-feather';
import { CustomInput } from 'reactstrap';
import { useState, useContext, useEffect } from 'react';
import CustomizerContext from '../../helpers/customizerContext';
import { config } from '../../config/customizerConfig.json';
const SettingSection = (props) => {
  const customizerCtx = useContext(CustomizerContext);
  const addBackgroundWallpaper = customizerCtx.addBackgroundWallpaper;
  const [acctRequestDisable, setDisable] = useState(false);
  const [deleteAcct, setDeleteDisable] = useState(false);
  const [settingTab, setSettingTab] = useState('');
  const [profile, setProfile] = useState({
    username: 'Josephin water',
    address: 'Alabma , USA',
    editStatus: false,
  });
  const [collapseShow, setCollapseShow] = useState({
    security: false,
    privacy: false,
    verfication: false,
    changeNumber: false,
    accountInfo: false,
    deleteAccount: false,
  });

  const ProfileHandle = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const EditProfile = (e) => {
    e.preventDefault();
    setProfile({ ...profile, editStatus: !profile.editStatus });
  };

  const closeLeftSide = () => {
    document.querySelector('.settings-tab').classList.remove('active');
    document.querySelector('.recent-default').classList.add('active');
    props.ActiveTab('');
  };

  useEffect(() => {
    // wallpaper
    if (config.wallpaper) {
      document.querySelector(
        '.wallpapers'
      ).style = `background-image: url(${`/assets/images/wallpaper/${config.wallpaper}.jpg`}) ; background-color: transparent; background-blend-mode: unset`;
    }
  }, []);

  const setBackgroundWallpaper = (e, wallpaper) => {
    addBackgroundWallpaper(e, wallpaper);
    config.wallpaper = wallpaper;
  };

  return (
    <div
      className={`settings-tab dynemic-sidebar custom-scroll ${
        props.tab === 'setting' ? 'active' : ''
      }`}
      id='settings'
    >
      <div className='theme-title'>
        <div className='media'>
          <div>
            <h2>Settings</h2>
            <h4>Change your app setting.</h4>
          </div>
          <div className='media-body text-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm close-panel'
              href='#'
              onClick={() => closeLeftSide()}
            >
              <X />
            </a>
          </div>
        </div>
        <div className='profile-box'>
          <div className={`media ${profile.editStatus ? 'open' : ''}`}>
            <div
              className='profile'
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
              <h5>{profile.username}</h5>
              <h6>{profile.address}</h6>
            </div>
            <div className='details edit'>
              <form className='form-radious form-sm'>
                <div className='form-group mb-2'>
                  <input
                    className='form-control'
                    type='text'
                    name='username'
                    defaultValue={profile.username}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div>
                <div className='form-group mb-0'>
                  <input
                    className='form-control'
                    type='text'
                    name='address'
                    defaultValue={profile.address}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div>
              </form>
            </div>
            <div className='media-body'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right edit-btn'
                href='#'
                onClick={(e) => EditProfile(e)}
              >
                {' '}
                <Edit />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='setting-block'>
        <div className={`block ${settingTab === 'account' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Account</h3>
            </div>
            <div className='media-right'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
                href='#'
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <div className='theme-according' id='accordion'>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    security: !collapseShow.security,
                    privacy: false,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    verfication: false,
                  })
                }
              >
                <a>
                  Security<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.security ? 'show' : ''}`}
                id='collapseTwo'
                data-parent='#accordion'
              >
                <div className='card-body'>
                  <div className='media'>
                    <div className='media-body'>
                      <h5>Show Security notification</h5>
                    </div>
                    <div className='media-right'>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch4'
                        name='customSwitch'
                        label=''
                        defaultChecked
                      />
                    </div>
                  </div>
                  <p>
                    {' '}
                    <b>Note : </b>turn on this setting to recive notification
                    when a contact's security code has been changes.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    privacy: !collapseShow.privacy,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a>
                  Privacy<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div className={`collapse ${collapseShow.privacy ? 'show' : ''}`}>
                <div className='card-body'>
                  <ul className='privacy'>
                    <li>
                      <h5>Last seen</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch5'
                        name='customSwitch'
                        label=''
                        defaultChecked
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see last seen or not.
                      </p>
                    </li>
                    <li>
                      <h5>Profile Photo</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch6'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        turn on this setting to whether your contact can see
                        your profile or not.
                      </p>
                    </li>
                    <li>
                      <h5>About</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch7'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see about status or not.
                      </p>
                    </li>
                    <li>
                      <h5>Status</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch8'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see your status or not.{' '}
                      </p>
                    </li>
                    <li>
                      <h5>Read receipts</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch9'
                        name='customSwitch'
                        label=''
                      />
                      <p>
                        {' '}
                        <b>Note : </b>If turn off this option you won't be able
                        to see read recipts from contact. read receipts are
                        always sent for group chats.{' '}
                      </p>
                    </li>
                    <li>
                      <h5>Groups</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch10'
                        name='customSwitch'
                        label=''
                        defaultChecked
                      />
                      <p>
                        {' '}
                        <b>Note : </b>turn on this setting to whether your
                        contact can add in groups or not.{' '}
                      </p>
                    </li>
                    <li>
                      <h5>Screen Lock(Require Touch ID)</h5>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch11'
                        name='customSwitch'
                        label=''
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header collapsed'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    verfication: !collapseShow.verfication,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    privacy: false,
                    security: false,
                  })
                }
              >
                <a>
                  Two Step verification<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.verfication ? 'show' : ''}`}
              >
                <div className='card-body'>
                  <div className='media'>
                    <div className='media-body'>
                      <h5>Enable</h5>
                    </div>
                    <div className='media-right'>
                      <CustomInput
                        className='custom-switch-primary'
                        type='switch'
                        id='exampleCustomSwitch12'
                        name='customSwitch'
                        label=''
                      />
                    </div>
                  </div>
                  <p>
                    {' '}
                    <b>Note : </b>For added security, enable two-step
                    verifiation, which will require a PIN when registering your
                    phone number with Chitchat again.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    changeNumber: !collapseShow.changeNumber,
                    verfication: false,
                    accountInfo: false,
                    deleteAccount: false,
                    privacy: false,
                    security: false,
                  })
                }
              >
                <a>
                  Change Number<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${
                  collapseShow.changeNumber ? 'show' : ''
                }`}
              >
                <div className='card-body change-number'>
                  <h5>Your old country code & phone number</h5>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text form-control m-0'>
                        +
                      </span>
                    </div>
                    <input
                      className='form-control country-code'
                      type='number'
                      placeholder='01'
                    />
                    <input
                      className='form-control'
                      type='number'
                      placeholder='1234567895'
                    />
                  </div>
                  <h5>Your new country code & phone number</h5>
                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text form-control m-0'>
                        +
                      </span>
                    </div>
                    <input
                      className='form-control country-code'
                      type='number'
                      placeholder='01'
                    />
                    <input
                      className='form-control'
                      type='number'
                      placeholder=''
                    />
                  </div>
                  <div className='text-right'>
                    {' '}
                    <a
                      className='btn btn-outline-primary button-effect btn-sm'
                      href='#'
                    >
                      confirm
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    accountInfo: !collapseShow.accountInfo,
                    changeNumber: false,
                    privacy: false,
                    deleteAccount: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a>
                  Request account info<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.accountInfo ? 'show' : ''}`}
              >
                <div className='card-body'>
                  <a className={`p-0 req-info ${acctRequestDisable ? 'disabled' : ''}`} id='demo' href='#' disabled={acctRequestDisable} onClick={() => setDisable(true)}>
                    Request Info
                  </a>
                  <p>
                    {' '}
                    <b>Note : </b>Create a report of your account information
                    and settings, which you can access ot port to another app.
                  </p>
                </div>
              </div>
            </div>
            <div className='card'>
              <div
                className='card-header'
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    deleteAccount: !collapseShow.deleteAccount,
                    changeNumber: false,
                    accountInfo: false,
                    privacy: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a>
                  Delete My account<i className='fa fa-angle-down'></i>
                </a>
              </div>
              <div
                className={`collapse ${
                  collapseShow.deleteAccount ? 'show' : ''
                }`}
              >
                <div className='card-body'>
                  <a className={`p-0 req-info font-danger ${deleteAcct ? 'disabled' : ''}`} href='#' disabled={deleteAcct} onClick={() => setDeleteDisable(true)}>
                    Delete Account{' '}
                  </a>
                  <p>
                    {' '}
                    <b>Note :</b>Deleting your account will delete your account
                    info, profile photo, all groups & chat history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Account</h3>
            <h4>Update Your Account Details</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              href='#'
              onClick={() => setSettingTab('account')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
      <div className='setting-block'>
        <div className={`block ${settingTab === 'chat' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Chat</h3>
            </div>
            <div className='media-right'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
                href='#'
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className='help'>
            <li>
              <h5>Chat Backup</h5>
              <ul className='switch-list'>
                <li>
                  <CustomInput
                    type='switch'
                    id='exampleCustomSwitch'
                    name='customSwitch'
                    label='Auto Backup'
                    defaultChecked
                  />
                </li>
                <li className='pt-0'>
                  <CustomInput
                    type='switch'
                    id='exampleCustomSwitch2'
                    name='customSwitch'
                    label='Include document'
                  />
                </li>
                <li className='pt-0'>
                  <CustomInput
                    type='switch'
                    id='exampleCustomSwitch3'
                    name='customSwitch'
                    label='Include Videos'
                  />
                </li>
              </ul>
            </li>
            <li>
              <h5>Chat wallpaper</h5>
              <ul className='wallpaper'>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 1)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/2.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 2)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/1.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 3)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/3.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/3.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 4)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/4.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/4.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 5)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/5.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/5.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 6)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/6.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/6.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
              </ul>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'>Archive all chat</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'> Clear all chats</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a className='font-danger' href='#'>
                  Delete all chats
                </a>
              </h5>
            </li>
          </ul>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Chat</h3>
            <h4>Control Your Chat Backup</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              href='#'
              onClick={() => setSettingTab('chat')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
      <div className='setting-block'>
        <div className={`block ${settingTab === 'integratin' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Integratin</h3>
            </div>
            <div className='media-right'>
              {' '}
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
                href='#'
                onClick={() => setSettingTab('')}
              >

                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className='integratin'>
            <li>
              <div className='media'>
                <div className='media-left'>
                  <a
                    className='fb'
                    href='https://www.facebook.com/login'
                    target='_blank'
                  >
                    <i className='fa fa-facebook mr-1'></i>
                    <h5>Facebook </h5>
                  </a>
                </div>
                <div className='media-right'>
                  <div
                    className='profile'
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
                </div>
              </div>
            </li>
            <li>
              <div className='media'>
                <div className='media-left'>
                  <a
                    className='insta'
                    href='https://www.instagram.com/accounts/login/?hl=en'
                    target='_blank'
                  >
                    <i className='fa fa-instagram mr-1'></i>
                    <h5>instagram</h5>
                  </a>
                </div>
                <div className='media-right'>
                  <div
                    className='profile'
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
                </div>
              </div>
            </li>
            <li>
              <div className='media'>
                <div className='media-left'>
                  <a
                    className='twi'
                    href='https://twitter.com/login'
                    target='_blank'
                  >
                    <i className='fa fa-twitter mr-1'></i>
                    <h5>twitter </h5>
                  </a>
                </div>
                <div className='media-right'>
                  <div
                    className='profile'
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
                </div>
              </div>
            </li>
            <li>
              <div className='media'>
                <div className='media-left'>
                  <a
                    className='ggl'
                    href='https://accounts.google.com/signin/v2/identifier?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin'
                    target='_blank'
                  >
                    <i className='fa fa-google mr-1'></i>
                    <h5>google </h5>
                  </a>
                </div>
                <div className='media-right'>
                  <div
                    className='profile'
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
                </div>
              </div>
            </li>
            <li>
              <div className='media'>
                <div className='media-left'>
                  <a className='slc' href='#'>
                    <i className='fa fa-slack mr-1'></i>
                    <h5>Slack </h5>
                  </a>
                </div>
                <div className='media-right'>
                  <div className='profile'>
                    <a href='https://slack.com/get-started#/' target='_blank'>
                      <PlusCircle />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Integratin</h3>
            <h4>Sync Your Other Social Account</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              href='#'
              onClick={() => setSettingTab('integratin')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
      <div className='setting-block'>
        <div className={`block ${settingTab === 'help' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Help</h3>
            </div>
            <div className='media-right'>
              {' '}
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
                href='#'
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className='help'>
            <li>
              <h5>
                {' '}
                <a href='#'>FAQ</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'> Contact Us</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'>Terms and Privacy Policy</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'>Licenses</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'>2019 - 20 Powered by Pixelstrap</a>
              </h5>
            </li>
          </ul>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Help</h3>
            <h4>You are Confusion, Tell me</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              href='#'
              onClick={() => setSettingTab('help')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSection;
