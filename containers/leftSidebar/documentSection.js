import { useState } from 'react';
import { Search, X, Download } from 'react-feather';
const DocumentSection = (props) => {
  const [searchToggle, setSearchToggle] = useState(false);
  const closeLeftSide = () => {
    document.querySelector('.document-tab').classList.remove('active');
    document.querySelector('.recent-default').classList.add('active');
    props.ActiveTab('');
  };
  return (
    <div
      className={`document-tab dynemic-sidebar ${
        props.tab === 'document' ? 'active' : ''
      }`}
      id='document'
    >
      <div className='theme-title'>
        <div className='media'>
          <div>
            <h2>Document</h2>
            <h4>List of document</h4>
          </div>
          <div className='media-body text-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm m-r-15 search'
              href='#'
              onClick={() => setSearchToggle(true)}
            >
              {' '}
              <Search />
            </a>
            <form
              className={`form-inline search-form ${
                searchToggle ? 'open' : ''
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
                >
                  {' '}
                </div>
              </div>
            </form>
            <a
              className='icon-btn btn-outline-light btn-sm close-panel'
              href='#'
              onClick={() => closeLeftSide()}
            >
              <X />
            </a>
          </div>
        </div>
      </div>
      <ul className='chat-main'>
        <li>
          <div className='chat-box'>
            <div className='media'>
              <div className='profile'>
                <a
                  className='icon-btn btn-outline-danger btn-xl pull-right rouded15'
                  href='#'
                >
                  <i className='fa fa-file-code-o'></i>
                </a>
              </div>
              <div className='details'>
                <h5>messenger.html</h5>
                <h6>2, octomber 2019</h6>
              </div>
              <div className='media-body'>
                <a
                  className='icon-btn btn-outline-light btn-sm pull-right'
                  href='/'
                >
                  <Download />
                </a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className='chat-box'>
            <div className='media'>
              <div className='profile'>
                <a
                  className='icon-btn btn-outline-success btn-xl pull-right rouded15'
                  href='#'
                >
                  <i className='fa fa-file-video-o'></i>
                </a>
              </div>
              <div className='details'>
                <h5>chapter1.MP4</h5>
                <h6>3, Octomber 2019</h6>
              </div>
              <div className='media-body'>
                <a
                  className='icon-btn btn-outline-light btn-sm pull-right'
                  href='assets/doc/chapter1.MP4'
                  // target='_target'
                >
                  <Download />
                </a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className='chat-box'>
            <div className='media'>
              <div className='profile'>
                <a
                  className='icon-btn btn-outline-primary btn-xl pull-right rouded15'
                  href='#'
                >
                  <i className='fa fa-file-word-o'></i>
                </a>
              </div>
              <div className='details'>
                <h5>salary.xlsx</h5>
                <h6>5, Octomber 2019</h6>
              </div>
              <div className='media-body'>
                <a
                  className='icon-btn btn-outline-light btn-sm pull-right'
                  href='assets/doc/salary.xlsx'
                  // target='_target'
                >
                  <Download />
                </a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className='chat-box'>
            <div className='media'>
              <div className='profile'>
                <a
                  className='icon-btn btn-outline-warning btn-xl pull-right rouded15'
                  href='#'
                >
                  <i className='fa fa-file-pdf-o'></i>
                </a>
              </div>
              <div className='details'>
                <h5>document.pdf</h5>
                <h6>7, Octomber 2019</h6>
              </div>
              <div className='media-body'>
                <a
                  className='icon-btn btn-outline-light btn-sm pull-right'
                  href='assets/doc/document.pdf'
                  // target='_target'
                >
                  <Download />
                </a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className='chat-box'>
            <div className='media'>
              <div className='profile'>
                <a
                  className='icon-btn btn-outline-danger btn-xl pull-right rouded15'
                  href='#'
                >
                  <i className='fa fa-file-text-o'></i>
                </a>
              </div>
              <div className='details'>
                <h5>details.txt</h5>
                <h6>20, Octomber 2019</h6>
              </div>
              <div className='media-body'>
                <a
                  className='icon-btn btn-outline-light btn-sm pull-right'
                  href='assets/doc/details.txt'
                  // target='_target'
                >
                  <Download />
                </a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className='chat-box'>
            <div className='media'>
              <div className='profile'>
                <a
                  className='icon-btn btn-outline-success btn-xl pull-right rouded15'
                  href='#'
                >
                  <i className='fa fa-file-code-o'></i>
                </a>
              </div>
              <div className='details'>
                <h5>messenger.html</h5>
                <h6>2, octomber 2019</h6>
              </div>
              <div className='media-body'>
                <a
                  className='icon-btn btn-outline-light btn-sm pull-right'
                  href='/'
                  // target='_target'
                >
                  <Download />
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DocumentSection;
