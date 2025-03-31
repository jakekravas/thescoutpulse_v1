import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Navbar from '../components/Navbar';

const Rankings = () => {
  const [prospects, setProspects] = useState([]);
  const [filteredProspects, setFilteredProspects] = useState([]);
  const [logos, setLogos] = useState();
  const [positionView, setPositionView] = useState('OVR');
  const [sortBy, setSortBy] = useState('PFF Rank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortArrowClass, setSortArrowClass] = useState('fa fa-chevron-up');
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [viewAmount, setViewAmount] = useState(150);
  const [rankingsType, setRankingsType] = useState('pff');
  const [customProspects, setCustomProspects] = useState([]);


  const [customRankInput, setCustomRankInput] = useState('');
  const [customNameInput, setCustomNameInput] = useState('');
  const [customSchoolInput, setCustomSchoolInput] = useState('');
  const [customPositionInput, setCustomPositionInput] = useState('');
  const [customHeightInput, setCustomHeightInput] = useState("6'0");
  const [customWeightInput, setCustomWeightInput] = useState('');
  const [customDraftPulseScoreInput, setCustomDraftPulseScoreInput] = useState('');
  const [customMyScoreInput, setCustomMyScoreInput] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchData(viewAmount);
  }, []);

  const fetchData = async (amountLimit) => {
    try {
        const response = await fetch('/data/prospects.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProspects(data);
        setFilteredProspects(data.slice(0, amountLimit));
    } catch (error) {
        console.error('Error loading the JSON file: ', error);
    }

    try {
        const response = await fetch('/data/logos_college.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLogos(data);
    } catch (error) {
        console.error('Error loading the JSON file: ', error);
    }

    // console.log(JSON.parse(localStorage.getItem('customProspects')))
    let customProspectsStorage = localStorage.getItem('customProspects');
    customProspectsStorage = JSON.parse(customProspectsStorage);
    if (customProspectsStorage) {
      console.log('HIT STORAGE IF')
      console.log(customProspectsStorage)
      setCustomProspects(customProspectsStorage)
    }
  };


  const sortRankings = (attribute) => {

    if (sortDirection === 'desc') {
      const sortedProspects = [...prospects].sort((a, b) => {
        if (typeof a[attribute] === 'number') {
            return a[attribute] - b[attribute];
        } else {
            const nameA = a[attribute].toUpperCase(); // assuming other attributes are strings
            const nameB = b[attribute].toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        }
      });
  
      const sortedFilteredProspects = [...filteredProspects].sort((a, b) => {
          if (typeof a[attribute] === 'number') {
              return a[attribute] - b[attribute];
          } else {
              const nameA = a[attribute].toUpperCase(); // assuming other attributes are strings
              const nameB = b[attribute].toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
          }
      });

      const sortedSearchResults = [...searchResults].sort((a, b) => {
          if (typeof a[attribute] === 'number') {
              return a[attribute] - b[attribute];
          } else {
              const nameA = a[attribute].toUpperCase(); // assuming other attributes are strings
              const nameB = b[attribute].toUpperCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
          }
      });
  
      setProspects(sortedProspects);
      setFilteredProspects(sortedFilteredProspects);
      setSearchResults(sortedSearchResults);
      setSortBy(attribute);
      setSortDirection('asc');
      setSortArrowClass('fa fa-chevron-up');

    } else if (sortDirection === 'asc') {
      const sortedProspects = [...prospects].sort((a, b) => {
        if (typeof a[attribute] === 'number') {
            return b[attribute] - a[attribute]; // reverse the subtraction order for numbers
        } else {
            const nameA = a[attribute].toUpperCase(); // assuming other attributes are strings
            const nameB = b[attribute].toUpperCase();
            if (nameA < nameB) return 1; // reverse the outcomes for string comparisons
            if (nameA > nameB) return -1;
            return 0;
        }
      });
      const sortedFilteredProspects = [...filteredProspects].sort((a, b) => {
        if (typeof a[attribute] === 'number') {
            return b[attribute] - a[attribute]; // reverse the subtraction order for numbers
        } else {
            const nameA = a[attribute].toUpperCase(); // assuming other attributes are strings
            const nameB = b[attribute].toUpperCase();
            if (nameA < nameB) return 1; // reverse the outcomes for string comparisons
            if (nameA > nameB) return -1;
            return 0;
        }
      });
      const sortedSearchResults = [...searchResults].sort((a, b) => {
        if (typeof a[attribute] === 'number') {
            return b[attribute] - a[attribute]; // reverse the subtraction order for numbers
        } else {
            const nameA = a[attribute].toUpperCase(); // assuming other attributes are strings
            const nameB = b[attribute].toUpperCase();
            if (nameA < nameB) return 1; // reverse the outcomes for string comparisons
            if (nameA > nameB) return -1;
            return 0;
        }
      });

      setProspects(sortedProspects);
      setFilteredProspects(sortedFilteredProspects);
      setSearchResults(sortedSearchResults);
      setSortBy(attribute);
      setSortDirection('desc');
      setSortArrowClass('fa fa-chevron-down');
    }
  }


  const filterPositionView= (pos) => {
    setPositionView(pos);
    // setSearchVal('');
    clearSearch();

    if (pos === 'OVR') {
      setFilteredProspects(prospects);
    } else if (pos === 'QB' || pos === 'RB' || pos === 'WR' || pos === 'TE' || pos === 'OT' || pos === 'EDGE' || pos === 'LB' || pos === 'K' || pos === 'P') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === pos))
    } else if (pos === 'IOL') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === 'OG' || prospect.Position === 'C'))
    } else if (pos === 'IDL') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === 'DI' || prospect.Position === 'DT'))
    } else if (pos === 'DB') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === 'CB' || prospect.Position === 'S'))
    }
  }

  const searchForProspect=(searchInput) => {

    setSearchVal(searchInput);

    setSearchResults(filteredProspects.filter(prospect =>
      prospect.Name.toLowerCase().startsWith(searchInput.toLowerCase()) || prospect.Name.toLowerCase().split(' ')[1].startsWith(searchInput.toLowerCase())
    ));

    // setSearchResults(filteredProspects.filter(prospect => prospect.Name.toLowerCase().startsWith(searchInput)));
    
    // setSearchVal(searchInput);
    // if (searchInput) {
    //   setFilteredProspects(filteredProspects.filter(prospect => prospect.Name.toLowerCase().startsWith(searchInput)));
    // } else {
    //   filterPositionView(positionView);
    // }
  }

  const viewAmountChange=(val)=> {
    setViewAmount(val);
    fetchData(val);
    // setFilteredProspects(prospects.slice(0, val));
    resetAttributes();
  }

  const rankingsTypeChange=(val)=> {
    setRankingsType(val);
    resetAttributes();
  }

  const resetAttributes=() => {
    setPositionView('OVR');
    setSortBy('PFF Rank');
    setSortDirection('asc');
    setSortArrowClass('fa fa-chevron-up');
    setSearchVal('');
    setSearchResults([]);
  }

  const clearSearch=() => {
    setSearchVal('');
    setSearchResults([]);
  }

  const checkInputLength=(e) => {
    if (e.target.value.length <= 3) {
      setCustomWeightInput(e.target.value)
    }
    console.log(e.target.value)
  }

  const clearCustomInputValues = () => {
    setCustomNameInput('');
    setCustomSchoolInput('');
    setCustomPositionInput('');
    setCustomHeightInput("6'0");
    setCustomWeightInput('');
    setCustomDraftPulseScoreInput('');
    setCustomMyScoreInput('');
  }

  const addCustomProspect = () => {
    console.log(customNameInput)
    console.log(customSchoolInput)
    console.log(customPositionInput)
    console.log(customHeightInput)
    console.log(customWeightInput)
    
    if (customNameInput && customSchoolInput && customPositionInput && customHeightInput && customWeightInput) {
      const newProspect = {
        "Rank": customProspects.length + 1,
        "Name": customNameInput,
        "School": customSchoolInput,
        "Position": customPositionInput,
        "Height": customHeightInput,
        "Weight": customWeightInput,
        "Draft Pulse Score": customDraftPulseScoreInput,
        "My Score": customMyScoreInput,
      }

      setCustomProspects([...customProspects, newProspect]);
      let storageArray = [...customProspects];
      storageArray.push(newProspect);
      localStorage.setItem('customProspects', JSON.stringify(storageArray));

      clearCustomInputValues();
    }
  }

  const resetProspects = () => {
    setCustomProspects([]);
    localStorage.removeItem('customProspects');
    setModalIsOpen(false);
  }
  
  function openModal() {
    setModalIsOpen(true);
  }

  let subtitle;
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = 'black';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // backgroundColor: 'rgb(77, 81, 84)',
      backgroundColor: 'rgb(33, 37, 41)',
      color: 'rgb(240, 240, 240)',
      border: 'rgb(77, 81, 84)'
      
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change the background color here
    }
  };

  return (
    <div>

      <Navbar/>
      <div className='bg-dark-color'>
        <div className='container'>
          
          <h5 className='text-main-color'>2025 NFL Draft Prospect Rankings</h5>

            <div className='d-flex justify-content-between mb-2'>
              <div>
                <select id='rankings-type' className='my-2' name='rankings-type' onChange={(e) => rankingsTypeChange(e.target.value)}>
                  <option value='pff'>PFF Rankings</option>
                  <option value='custom'>Custom Rankings</option>
                </select>
                {rankingsType === 'pff'
                &&
                <select id='view-amount' className='my-2' name='view-amount' onChange={(e) => viewAmountChange(parseInt(e.target.value))}>
                  <option value='50'>Top 50</option>
                  <option value='100'>Top 100</option>
                  <option value='150' selected>Top 150</option>
                </select>
                }
              </div>

              {rankingsType === 'custom' &&
                <div>
                  {/* <button className='ml-auto draft-btn'>Edit Rankings</button> */}
                  <button className='ml-auto delete-btn ms-2' onClick={() => setModalIsOpen(true)}>Delete Rankings</button>
                </div>
              }
            </div>

            <ul id='rankings-table-position-select'>
              <input value={searchVal} id='rankings-player-search' type='text' placeholder='Search' onChange={e => searchForProspect(e.target.value)}/>
              
              <li className={`text-light rt-position-option ${positionView === 'OVR' ? 'pos-active' : ''}`} onClick={() => filterPositionView('OVR')}>OVR</li>
              <li className={`text-light rt-position-option ${positionView === 'QB' ? 'pos-active' : ''}`} onClick={() => filterPositionView('QB')}>QB</li>
              <li className={`text-light rt-position-option ${positionView === 'RB' ? 'pos-active' : ''}`} onClick={() => filterPositionView('RB')}>RB</li>
              <li className={`text-light rt-position-option ${positionView === 'WR' ? 'pos-active' : ''}`} onClick={() => filterPositionView('WR')}>WR</li>
              <li className={`text-light rt-position-option ${positionView === 'TE' ? 'pos-active' : ''}`} onClick={() => filterPositionView('TE')}>TE</li>
              <li className={`text-light rt-position-option ${positionView === 'OT' ? 'pos-active' : ''}`} onClick={() => filterPositionView('OT')}>OT</li>
              <li className={`text-light rt-position-option ${positionView === 'IOL' ? 'pos-active' : ''}`} onClick={() => filterPositionView('IOL')}>IOL</li>
              <li className={`text-light rt-position-option ${positionView === 'EDGE' ? 'pos-active' : ''}`} onClick={() => filterPositionView('EDGE')}>EDGE</li>
              <li className={`text-light rt-position-option ${positionView === 'IDL' ? 'pos-active' : ''}`} onClick={() => filterPositionView('IDL')}>IDL</li>
              <li className={`text-light rt-position-option ${positionView === 'LB' ? 'pos-active' : ''}`} onClick={() => filterPositionView('LB')}>LB</li>
              <li className={`text-light rt-position-option ${positionView === 'DB' ? 'pos-active' : ''}`} onClick={() => filterPositionView('DB')}>DB</li>
            </ul>
            <table className='table table-bordered table-dark table-striped rankings-table pb-5'>
              <thead>
                <tr>
                  {/* <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>{rankingsType === 'pff' && `PFF RK`} {sortBy === 'PFF Rank' && <i class={sortArrowClass}/>}</span></th> */}
                  {/* {rankingsType === 'custom' && <th scope='col'><span className='rankings-table-header'></span></th>} */}
                  {rankingsType === 'custom' && <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>RK {(sortBy === 'Rank' && rankingsType === 'rank') && <i class={sortArrowClass}/>}</span></th>}
                  {rankingsType === 'pff' && <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>PFF RK {(sortBy === 'PFF Rank' && rankingsType === 'pff') && <i class={sortArrowClass}/>}</span></th>}
                  {/* <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>{rankingsType === 'pff' && `PFF RK`} {(sortBy === 'PFF Rank' && rankingsType === 'pff') && <i class={sortArrowClass}/>}</span></th> */}
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Name')}>Name {sortBy === 'Name' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('School')}>School {sortBy === 'School' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Position')}>Position {sortBy === 'Position' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Height')}>Height {sortBy === 'Height' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Weight')}>Weight {sortBy === 'Weight' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Draft Pulse Score')}>Draft Pulse Score {sortBy === 'Draft Pulse Score' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('My Score')}>My Score {sortBy === 'My Score' && <i class={sortArrowClass}/>}</span></th>
                </tr>
              </thead>
              {rankingsType === 'pff' ? 
              <tbody className='pff-rankings-table'>
                {searchVal !== '' ? (
                  searchResults.map((prospect, index) => (
                    <tr key={index}>
                      <td className='rankings-table-data text-center'>{prospect['PFF Rank']}</td>
                      <td className='rankings-table-data'>
                        <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                        &nbsp;&nbsp;{prospect.Name}
                      </td>
                      <td className='rankings-table-data'>{prospect.School}</td>
                      <td className='rankings-table-data text-center'>{prospect.Position}</td>
                      <td className='rankings-table-data text-center'>{prospect.Height}"</td>
                      <td className='rankings-table-data text-center'>{prospect.Weight}</td>
                      <td className='rankings-table-data'>{prospect['Draft Pulse Score']}</td>
                      <td className='rankings-table-data'>{prospect['My Score']}</td>
                    </tr>
                  ))
                ) : (
                  filteredProspects.map((prospect, index) => (
                    <tr key={index}>
                      <td className='rankings-table-data text-center'>{prospect['PFF Rank']}</td>
                      <td className='rankings-table-data'>
                        <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                        &nbsp;&nbsp;{prospect.Name}
                      </td>
                      <td className='rankings-table-data'>{prospect.School}</td>
                      <td className='rankings-table-data text-center'>{prospect.Position}</td>
                      <td className='rankings-table-data text-center'>{prospect.Height}"</td>
                      <td className='rankings-table-data text-center'>{prospect.Weight}</td>
                      <td className='rankings-table-data text-center'>{prospect['Draft Pulse Score']}</td>
                      <td className='rankings-table-data text-center'>{prospect['My Score']}</td>
                    </tr>
                  ))
                )}
              </tbody>
              :
              <tbody className='pff-rankings-table'>
                {customProspects && customProspects.map((prospect, index) => (
                  <tr key={index}>
                    <td className='rankings-table-data text-center'>{prospect['Rank']}</td>
                    <td className='rankings-table-data'>
                      <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                      &nbsp;&nbsp;{prospect.Name}
                    </td>
                    <td className='rankings-table-data'>{prospect.School}</td>
                    <td className='rankings-table-data text-center'>{prospect.Position}</td>
                    <td className='rankings-table-data text-center'>{prospect.Height}"</td>
                    <td className='rankings-table-data text-center'>{prospect.Weight}</td>
                    <td className='rankings-table-data text-center'>{prospect['Draft Pulse Score']}</td>
                    <td className='rankings-table-data text-center'>{prospect['My Score']}</td>
                    {/* <td className='rankings-table-data text-center'>Edit</td> */}
                  </tr>
                ))}
                <tr>
                  <td className='custom-rankings-table-data text-center'>
                    <button
                    className='draft-btn'
                    onClick={addCustomProspect}
                    // style={{opacity: 0.65}}
                    >
                      Add Player
                    </button>
                  </td>
                  <td className='custom-rankings-table-data'><input type='text' maxLength='50' value={customNameInput} onChange={e => setCustomNameInput(e.target.value)}/></td>
                  <td className='custom-rankings-table-data'>
                    <select name='school' id='' value={customSchoolInput} onChange={e => setCustomSchoolInput(e.target.value)}>
                      <option value=''>--</option>
                      {logos && Object.keys(logos).map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </td>
                  <td className='custom-rankings-table-data text-center'>
                      <select name='position' id='' value={customPositionInput} onChange={e => setCustomPositionInput(e.target.value)}>
                        <option value=''>--</option>
                        <option value='QB'>QB</option>
                        <option value='RB'>RB</option>
                        <option value='WR'>WR</option>
                        <option value='TE'>TE</option>
                        <option value='OT'>OT</option>
                        <option value='IOL'>IOL</option>
                        <option value='EDGE'>EDGE</option>
                        <option value='IDL'>IDL</option>
                        <option value='LB'>LB</option>
                        <option value='DB'>DB</option>
                      </select>
                  </td>
                  <td className='custom-rankings-table-data text-center'>
                      <select name='height' id='' value={customHeightInput} onChange={e => setCustomHeightInput(e.target.value)}>
                        <option value="5'5">5'5"</option>
                        <option value="5'6">5'6"</option>
                        <option value="5'7">5'7"</option>
                        <option value="5'8">5'8"</option>
                        <option value="5'9">5'9"</option>
                        <option value="5'10">5'10"</option>
                        <option value="5'11">5'11"</option>
                        <option value="6'0">6'0"</option>
                        <option value="6'1">6'1"</option>
                        <option value="6'2">6'2"</option>
                        <option value="6'3">6'3"</option>
                        <option value="6'4">6'4"</option>
                        <option value="6'5">6'5"</option>
                        <option value="6'6">6'6"</option>
                        <option value="6'7">6'7"</option>
                        <option value="6'8">6'8"</option>
                        <option value="6'9">6'9"</option>
                        <option value="6'10">6'10"</option>
                      </select>
                  </td>
                  <td className='custom-rankings-table-data text-center'>
                    <input type='number' name='weight' id='' onChange={checkInputLength} value={customWeightInput}/> lbs
                  </td>
                  <td className='custom-rankings-table-data'>
                    {/* <input type='number' name='dp-score' id='' onChange={e => setCustomDraftPulseScoreInput(e.target.value)} value={customDraftPulseScoreInput}/> */}
                  </td>
                  <td className='custom-rankings-table-data text-center'>
                    <input type='number' name='my-score' id='' min='1' max='100' onChange={e => setCustomMyScoreInput(e.target.value)} value={customMyScoreInput}/>
                  </td>
                </tr>
              </tbody>
            }
            </table>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
              <p>Are you sure you want to delete all custom prospects? This cannot be undone.</p>
              <button onClick={closeModal} className='dark-btn'>Cancel</button>
              <button onClick={resetProspects} className='ms-2 delete-btn'>Delete</button>
            </Modal>
        </div>
      </div>
    </div>
  )
}

export default Rankings