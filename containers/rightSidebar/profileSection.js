import React, { useContext, useState } from 'react';
import {
  X,
  Smartphone,
  Crosshair,
  MapPin,
  Share2,
  Trash2,
  ExternalLink,
  AlertCircle,
  MoreVertical,
  Book,
  List,
  Clock,
  Grid,
  Trash,
  File,
} from 'react-feather';
import Lightbox from 'react-image-lightbox';
import { CustomInput } from 'reactstrap';
import ChatContext from '../../helpers/chatContext';
import CustomizerContext from '../../helpers/customizerContext';

const fiveImageGallary = [
  '/assets/images/gallery/1.jpg',
  '/assets/images/gallery/2.jpg',
  '/assets/images/gallery/3.jpg',
  '/assets/images/gallery/4.jpg',
  '/assets/images/gallery/5.jpg',
];
const threeImageGallary = [
  '/assets/images/gallery/2.jpg',
  '/assets/images/gallery/3.jpg',
  '/assets/images/gallery/4.jpg',
];
const ProfileSection = (props) => {
  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);
  const initilindex1 = { index: 0, isOpen: false };
  const [photoIndex1, setPhotoIndex1] = useState(initilindex1);

  const chatCtx = useContext(ChatContext);
  const selectedUser = chatCtx.selectedUser;
  const [collapseShow, setCollapseShow] = useState({
    shareDocument: true,
    shareMedia: true,
    starredMessage: true,
    commonGroups: true,
  });
  const { setProfileToggle, profileToggle } = useContext(ChatContext)

  const closeProfileSidebar = (toggle) => {
    setProfileToggle(!toggle);
    document.body.className = `sidebar-active main-page`;
    document.querySelector('.chitchat-main').classList.add('small-sidebar');
    document.querySelector('.app-sidebar').classList.add('active');
  };
  return (
    <aside className='chitchat-right-sidebar' id='slide-menu'>
      <div className='custom-scroll right-sidebar'>
        <div className='contact-profile'>
          <div className='theme-title'>
            <div className='media'>
              <div>
                <h2>Profile</h2>
                <h4>Personal Information</h4>
              </div>
              <div className='media-body text-right'>
                <a
                  className='icon-btn btn-outline-light btn-sm close-profile ml-3'
                  href='#'
                  onClick={() => closeProfileSidebar(profileToggle)}
                >
                  <X />
                </a>
              </div>
            </div>
          </div>
          <div className='details'>
            <div
              className='contact-top'
              style={{
                backgroundImage: `url('/assets/images/${selectedUser?.thumb}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'block',
              }}
            >
              <img
                className='bg-img'
                src='/assets/images/avtar/2.jpg'
                alt=''
                style={{ display: 'none' }}
              />
            </div>
            <div className='name'>
              <h3>{selectedUser?.name}</h3>
              <h6>Add Description</h6>
            </div>
            <ul className='medialogo'>
              <li>
                <a className='icon-btn btn-danger button-effect' href='https://www.google.com/'>
                  <i className='fa fa-google'></i>
                </a>
              </li>
              <li>
                <a className='icon-btn btn-primary button-effect' href='https://twitter.com/'>
                  <i className='fa fa-twitter'></i>
                </a>
              </li>
              <li>
                <a className='icon-btn btn-facebook button-effect' href='https://www.facebook.com/'>
                  <i className='fa fa-facebook-f'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='document'>
          <div className='filter-block'>
            <div
              className={`collapse-block ${collapseShow.shareDocument ? 'open' : ''
                }`}
              onClick={() =>
                setCollapseShow({
                  ...collapseShow,
                  shareDocument: !collapseShow.shareDocument,
                  shareMedia: true,
                  starredMessage: true,
                  commonGroups: true,
                })
              }
            >
              <h5 className='block-title'>
                Shared Document
                <label className='badge badge-success sm ml-2'>3</label>
              </h5>
              <div
                className={`block-content ${collapseShow.shareDocument ? '' : 'd-none'}`}
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
        <div className='media-gallery portfolio-section grid-portfolio'>
          <div
            className={`collapse-block ${collapseShow.shareMedia ? 'open' : ''
              }`}
            onClick={() =>
              setCollapseShow({
                ...collapseShow,
                shareDocument: true,
                shareMedia: !collapseShow.shareMedia,
                starredMessage: true,
                commonGroups: true,
              })
            }
          >
            <h5 className='block-title'>
              Shared Media
              <label className='badge badge-primary sm ml-2'>2</label>
            </h5>
            <div
              className={`block-content ${collapseShow.shareMedia ? '' : 'd-none'}`}
            >
              <div className='row share-media zoom-gallery'>
                <div className='col-12'>
                  <h6 className='mb-2'>22/03/2019</h6>
                </div>
                <div className='col-4 isotopeSelector filter'>
                  <div className='media-big'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: 0,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='/assets/images/gallery/1.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='media-small isotopeSelector filter'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: 1,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='/assets/images/gallery/2.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='media-small isotopeSelector filter'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: 2,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='/assets/images/gallery/3.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='media-small isotopeSelector filter'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: 3,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='/assets/images/gallery/4.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='media-small isotopeSelector filter fashion'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: 4,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='/assets/images/gallery/5.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {photoIndex.isOpen && (
                  <Lightbox
                    mainSrc={fiveImageGallary[photoIndex.index]}
                    nextSrc={
                      fiveImageGallary[
                      (photoIndex.index + 1) % fiveImageGallary.length
                      ]
                    }
                    prevSrc={
                      fiveImageGallary[
                      (photoIndex.index + fiveImageGallary.length - 1) %
                      fiveImageGallary.length
                      ]
                    }
                    imageTitle={
                      photoIndex.index + 1 + '/' + fiveImageGallary.length
                    }
                    onCloseRequest={() =>
                      setPhotoIndex({ ...photoIndex, isOpen: false })
                    }
                    onMovePrevRequest={() =>
                      setPhotoIndex({
                        ...photoIndex,
                        index:
                          (photoIndex.index + fiveImageGallary.length - 1) %
                          fiveImageGallary.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex({
                        ...photoIndex,
                        index: (photoIndex.index + 1) % fiveImageGallary.length,
                      })
                    }
                  />
                )}
                <div className='col-12'>
                  <h6 className='mb-2 mt-2'>20/04/2019</h6>
                </div>
                <div className='col-4'>
                  <div className='media-small isotopeSelector filter'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex1({
                              ...photoIndex1,
                              index: 0,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='../assets/images/gallery/2.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='media-small isotopeSelector filter'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex1({
                              ...photoIndex1,
                              index: 1,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='../assets/images/gallery/3.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='media-small isotopeSelector filter'>
                    <div className='overlay'>
                      <div className='border-portfolio'>
                        <a
                          onClick={() =>
                            setPhotoIndex1({
                              ...photoIndex1,
                              index: 2,
                              isOpen: true,
                            })
                          }
                        >
                          <div className='overlay-background'>
                            <i className='ti-plus' aria-hidden='true'></i>
                          </div>
                          <img
                            className='img-fluid bg-img'
                            src='../assets/images/gallery/4.jpg'
                            alt='portfolio-image'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {photoIndex1.isOpen && (
                  <Lightbox
                    mainSrc={threeImageGallary[photoIndex1.index]}
                    nextSrc={
                      threeImageGallary[
                      (photoIndex1.index + 1) % threeImageGallary.length
                      ]
                    }
                    prevSrc={
                      threeImageGallary[
                      (photoIndex1.index + threeImageGallary.length - 1) %
                      threeImageGallary.length
                      ]
                    }
                    imageTitle={
                      photoIndex1.index + 1 + '/' + threeImageGallary.length
                    }
                    onCloseRequest={() =>
                      setPhotoIndex1({ ...photoIndex1, isOpen: false })
                    }
                    onMovePrevRequest={() =>
                      setPhotoIndex1({
                        ...photoIndex1,
                        index:
                          (photoIndex1.index + threeImageGallary.length - 1) %
                          threeImageGallary.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex1({
                        ...photoIndex1,
                        index:
                          (photoIndex1.index + 1) % threeImageGallary.length,
                      })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='status'>
          <div
            className={`collapse-block ${collapseShow.starredMessage ? 'open' : ''
              }`}
            onClick={() =>
              setCollapseShow({
                ...collapseShow,
                shareDocument: true,
                shareMedia: true,
                starredMessage: !collapseShow.starredMessage,
                commonGroups: true,
              })
            }
          >
            <h5 className='block-title'>
              Starred Messages
              <label className='badge badge-outline-dark sm ml-2'>2</label>
            </h5>
            <div
              className={`block-content ${collapseShow.starredMessage ? '' : 'd-none'} `}
            >
              <div className='contact-chat p-0 m-0'>
                <ul className='str-msg'>
                  <li>
                    <div className='media'>
                      <div
                        className='profile mr-4'
                        style={{
                          backgroundImage: `url('/assets/images/contact/2.jpg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'block',
                        }}
                      >
                        <img
                          className='bg-img'
                          src='../assets/images/contact/2.jpg'
                          alt='Avatar'
                          style={{ display: 'none' }}
                        />
                      </div>
                      <div className='media-body'>
                        <div className='contact-name'>
                          <h5>Alan josheph</h5>
                          <h6>01:35 AM</h6>
                          <ul className='msg-box'>
                            <li>
                              <h5>Hi I am Alan,</h5>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='media'>
                      <div
                        className='profile mr-4'
                        style={{
                          backgroundImage: `url('/assets/images/contact/3.jpg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'block',
                        }}
                      >
                        <img
                          className='bg-img'
                          src='../assets/images/contact/3.jpg'
                          alt='Avatar'
                          style={{ display: 'none' }}
                        />
                      </div>
                      <div className='media-body'>
                        <div className='contact-name'>
                          <h5>Josephin water</h5>
                          <h6>01:35 AM</h6>
                          <ul className='msg-box'>
                            <li>
                              <h5>Can you help me to find best chat app?.</h5>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='status'>
          <div
            className={`collapse-block ${collapseShow.commonGroups ? 'open' : ''
              }`}
            onClick={() =>
              setCollapseShow({
                ...collapseShow,
                shareDocument: true,
                shareMedia: true,
                starredMessage: true,
                commonGroups: !collapseShow.commonGroups,
              })
            }
          >
            <h5 className='block-title'>
              Common groups
              <label className='badge badge-outline-dark sm ml-2'>3</label>
            </h5>
            <div
              className={`block-content ${collapseShow.commonGroups ? '':'d-none'}`}
            >
              <ul className='group-main'>
                <li>
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
                        src='../assets/images/avtar/teq.jpg'
                        alt='Avatar'
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className='details'>
                      <h5>Tech Ninjas</h5>
                      <h6>johan, deo, Sufiya Elija, Pabelo & you</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='group-box'>
                    <div
                      className='profile'
                      style={{
                        backgroundImage: `url('/assets/images/avtar/family.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'block',
                      }}
                    >
                      <img
                        className='bg-img'
                        src='../assets/images/avtar/family.jpg'
                        alt='Avatar'
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className='details'>
                      <h5>Family Ties</h5>
                      <h6>Mukrani, deo & you</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='status other'>
          <h5 className='block-title p-b-25'>Contact info</h5>
          <ul>
            <li>
              <h5>
                <a href='#'>
                  <Smartphone />
                  +12 3456789587
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href='https://themeforest.net/user/pixelstrap/portfolio'>
                  <Crosshair />
                  https://pixelstrap
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href='#'>
                  <MapPin />
                  1766 Fidler Drive Texas, 78238.
                </a>
              </h5>
            </li>
          </ul>
        </div>
        <div className='status status-switch'>
          <ul>
            <li className='pl-0'>
              <CustomInput
                type='switch'
                id='exampleCustomSwitch15'
                name='customSwitch'
                label='Block'
              />
            </li>
            <li className='pl-0'>
              <CustomInput
                type='switch'
                id='exampleCustomSwitch16'
                name='customSwitch'
                label='Mute'
              />
            </li>
            <li className='pl-0'>
              <CustomInput
                type='switch'
                id='exampleCustomSwitch17'
                name='customSwitch'
                label='Get Notification'
              />
            </li>
          </ul>
        </div>
        <div className='status other'>
          <ul>
            <li>
              <h5>
                <a href='#'>
                  <Share2 />
                  share Contact
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href='#'>
                  <Trash2 />
                  Clear Chat
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href='#'>
                  <ExternalLink />
                  Export Chat
                </a>
              </h5>
            </li>
            <li>
              <h5>
                <a href='#'>
                  <AlertCircle />
                  Report Contact{' '}
                </a>
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSection;
