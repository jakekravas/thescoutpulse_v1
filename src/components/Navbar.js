import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState('');

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-dark-color py-3 containerß'>
      <div className='container-fluid'>
        <Link className='navbar-brand text-light fs-36' id='scoutpulse-nav-logo' to='/'>ScoutPulse</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link-animation nav-link active text-light align-items-center fs-16' aria-current='page' to='/rankings'>Draft Rankings</Link>
            </li>
            {/* <li className='nav-item'>
              <Link className='nav-link-animation nav-link active text-light align-items-center' aria-current='page' to='/rankings2'>Draft Rankings v2</Link>
            </li> */}
            <li className='nav-item'>
              <Link className='nav-link-animation nav-link active text-light align-items-center' aria-current='page' to='/MockDraft'>Mock Draft</Link>
              {/* <a className='nav-link-animation nav-link text-light' href='#'>Mock Drafts</a> */}
            </li>
            <li className='nav-item'>
              <a className='nav-link-animation nav-link text-light' href='#'>My Team</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link-animation nav-link text-light' href='#'>User Profiles</a>
            </li>
            <li className="nav-item nav-sign-up">
              <a className='nav-link' href=''>Sign Up</a>
              {/* <a className='nav-link nav-sign-up' href=''>Sign Up</a> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar