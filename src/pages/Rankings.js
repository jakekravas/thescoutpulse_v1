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
  const [filteredCustomProspects, setFilteredCustomProspects] = useState([]);


  const [customRankInput, setCustomRankInput] = useState('');
  const [customNameInput, setCustomNameInput] = useState('');
  const [customSchoolInput, setCustomSchoolInput] = useState('');
  const [customPositionInput, setCustomPositionInput] = useState('');
  const [customHeightInput, setCustomHeightInput] = useState("6'0");
  const [customWeightInput, setCustomWeightInput] = useState('');
  const [customDraftPulseScoreInput, setCustomDraftPulseScoreInput] = useState('');
  const [customMyScoreInput, setCustomMyScoreInput] = useState('');
  

  const [customProspectToEdit, setCustomProspectToEdit] = useState(null);

  const [customRankInputEdit, setCustomRankInputEdit] = useState('');
  const [customNameInputEdit, setCustomNameInputEdit] = useState('');
  const [customSchoolInputEdit, setCustomSchoolInputEdit] = useState('');
  const [customPositionInputEdit, setCustomPositionInputEdit] = useState('');
  const [customHeightInputEdit, setCustomHeightInputEdit] = useState("6'0");
  const [customWeightInputEdit, setCustomWeightInputEdit] = useState('');
  const [customDraftPulseScoreInputEdit, setCustomDraftPulseScoreInputEdit] = useState('');
  const [customMyScoreInputEdit, setCustomMyScoreInputEdit] = useState('');

  const [customSearchVal, setCustomSearchVal] = useState('');
  const [customSearchResults, setCustomSearchResults] = useState([]);

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

    let customProspectsStorage = localStorage.getItem('customProspects');
    customProspectsStorage = JSON.parse(customProspectsStorage);

    if (customProspectsStorage) {
      setCustomProspects(customProspectsStorage)
      setFilteredCustomProspects(customProspectsStorage)
    }
  };

  const performSortAsc = (arrayToSort, attribute) => {
    console.log('ATTRIBUTE: ', attribute)
    const arr = [...arrayToSort].sort((a, b) => {
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
    return arr;
  }

  const performSortDesc = (arrayToSort, attribute) => {
    console.log('ATTRIBUTE: ', attribute)
    const arr = [...arrayToSort].sort((a, b) => {
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
    return arr;
  }

  const sortRankings = (attribute) => {

    if (sortDirection === 'desc') {

      if (rankingsType === 'pff') {
        const sortedProspects = performSortAsc(prospects, attribute);
        const sortedFilteredProspects = performSortAsc(filteredProspects, attribute);
        const sortedSearchResults = performSortAsc(searchResults, attribute);
    
        setProspects(sortedProspects);
        setFilteredProspects(sortedFilteredProspects);
        setSearchResults(sortedSearchResults);
        setSortBy(attribute);
        setSortDirection('asc');
        setSortArrowClass('fa fa-chevron-up');

      } else {
        const sortedProspects = performSortAsc(customProspects, attribute);
        const sortedFilteredProspects = performSortAsc(filteredCustomProspects, attribute);
        // const sortedSearchResults = performSortAsc(searchResults, attribute);
    
        setCustomProspects(sortedProspects);
        setFilteredCustomProspects(sortedFilteredProspects);
        // setCustomSearchResults(sortedSearchResults);
        setSortBy(attribute);
        setSortDirection('asc');
        setSortArrowClass('fa fa-chevron-up');
      }


    } else {

      if (rankingsType === 'pff') {
        const sortedProspects = performSortDesc(prospects, attribute);
        const sortedFilteredProspects = performSortDesc(filteredProspects, attribute);
        const sortedSearchResults = performSortDesc(searchResults, attribute);
  
        setProspects(sortedProspects);
        setFilteredProspects(sortedFilteredProspects);
        setSearchResults(sortedSearchResults);
        setSortBy(attribute);
        setSortDirection('desc');
        setSortArrowClass('fa fa-chevron-down');
        
      } else {
        const sortedProspects = performSortDesc(customProspects, attribute);
        const sortedFilteredProspects = performSortDesc(filteredCustomProspects, attribute);
        // const sortedSearchResults = performSortDesc(searchResults, attribute);
  
        setCustomProspects(sortedProspects);
        setFilteredCustomProspects(sortedFilteredProspects);
        // setCustomSearchResults(sortedSearchResults);
        setSortBy(attribute);
        setSortDirection('desc');
        setSortArrowClass('fa fa-chevron-down');

      }
    }
  }


  const filterPositionView= (pos) => {
    setPositionView(pos);
    clearSearch();

    if (pos === 'OVR') {
      setFilteredProspects(prospects);
      setFilteredCustomProspects(customProspects);
    } else if (pos === 'QB' || pos === 'RB' || pos === 'WR' || pos === 'TE' || pos === 'OT' || pos === 'EDGE' || pos === 'LB' || pos === 'K' || pos === 'P') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === pos))
      setFilteredCustomProspects(customProspects.filter(prospect => prospect.Position === pos))
    } else if (pos === 'IOL') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === 'OG' || prospect.Position === 'C'))
      setFilteredCustomProspects(customProspects.filter(prospect => prospect.Position === 'IOL' || prospect.Position === 'OG' || prospect.Position === 'C'))
    } else if (pos === 'IDL') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === 'DI' || prospect.Position === 'DT'))
      setFilteredCustomProspects(customProspects.filter(prospect => prospect.Position === 'IDL' || prospect.Position === 'DI' || prospect.Position === 'DT'))
    } else if (pos === 'DB') {
      setFilteredProspects(prospects.filter(prospect => prospect.Position === 'CB' || prospect.Position === 'S'))
      setFilteredCustomProspects(customProspects.filter(prospect => prospect.Position === 'DB' || prospect.Position === 'CB' || prospect.Position === 'S'))
    }
  }

  const searchForProspect=(searchInput) => {
    console.log('HIT SEARCH');

    setSearchVal(searchInput);

    console.log('FP: ', filteredProspects)


    setSearchResults(filteredProspects.filter(prospect =>
      prospect.Name.toLowerCase().startsWith(searchInput.toLowerCase()) || prospect.Name.toLowerCase().split(' ')[1].startsWith(searchInput.toLowerCase())
    ));
  }

  const searchForCustomProspect=(searchInput) => {
    console.log('HIT CUSTOM SEARCH');

    setCustomSearchVal(searchInput);

    console.log('FCP: ', filteredCustomProspects)

    setCustomSearchResults(filteredCustomProspects.filter(prospect =>
      prospect.Name.toLowerCase().startsWith(searchInput.toLowerCase()) || prospect.Name.toLowerCase().split(' ')[1].startsWith(searchInput.toLowerCase())
    ));
    // setCustomSearchResults(
    //   filteredCustomProspects.filter(prospect => {
    //     const nameLower = prospect.Name?.toLowerCase() || '';
    //     const lastName = nameLower.split(' ')[1];
    //     console.log(nameLower)
    //     console.log(lastName)
    //     return (
    //       nameLower.startsWith(searchInput.toLowerCase()) ||
    //       (lastName && lastName.startsWith(searchInput.toLowerCase()))
    //     );
    //   })
    // );
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
    
    if (customNameInput && customSchoolInput && customPositionInput && customHeightInput && customWeightInput) {
      const newProspect = {
        "id": customProspects.length + 1,
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
      // let storageArray = [...customProspects];
      let storageArray = performSortAsc(customProspects, 'id');
      storageArray.push(newProspect);
      localStorage.setItem('customProspects', JSON.stringify(storageArray));

      setFilteredCustomProspects([...filteredCustomProspects, newProspect]);

      clearCustomInputValues();
    }
  }


  const resetProspects = () => {
    localStorage.removeItem('customProspects');
    setCustomProspects([]);
    setFilteredCustomProspects([]);
    setCustomSearchResults([]);
    setModalIsOpen(false);
  }

  const editCustomProspectView = (ind) => {
    console.log('IND: ', ind)
    setCustomProspectToEdit(ind);
    console.log(customProspectToEdit)

    setCustomNameInputEdit(customProspects[ind]['Name'])
    setCustomSchoolInputEdit(customProspects[ind]['School'])
    setCustomPositionInputEdit(customProspects[ind]['Position'])
    setCustomHeightInputEdit(customProspects[ind]['Height'])
    setCustomWeightInputEdit(customProspects[ind]['Weight'])
    setCustomMyScoreInputEdit(customProspects[ind]['My Score'])
  }

  const editCustomSearchProspectView = (ind) => {
    console.log('IND: ', ind)
    setCustomProspectToEdit(ind);
    console.log(customProspectToEdit)

    setCustomNameInputEdit(customSearchResults[ind]['Name'])
    setCustomSchoolInputEdit(customSearchResults[ind]['School'])
    setCustomPositionInputEdit(customSearchResults[ind]['Position'])
    setCustomHeightInputEdit(customSearchResults[ind]['Height'])
    setCustomWeightInputEdit(customSearchResults[ind]['Weight'])
    setCustomMyScoreInputEdit(customSearchResults[ind]['My Score'])
  }

  const editCustomProspectVieww = (id) => {
    console.log('ID: ', id)
    setCustomProspectToEdit(id);
    // console.log(customProspectToEdit)

    let prospectToTarget = filteredCustomProspects.filter(prospect => prospect['id'] === id)[0];
    console.log('PT: ', prospectToTarget);

    setCustomNameInputEdit(prospectToTarget['Name']);
    setCustomSchoolInputEdit(prospectToTarget['School']);
    setCustomPositionInputEdit(prospectToTarget['Position']);
    setCustomHeightInputEdit(prospectToTarget['Height']);
    setCustomWeightInputEdit(prospectToTarget['Weight']);
    setCustomMyScoreInputEdit(prospectToTarget['My Score']);
  }


  // const saveCustomEdit = (ind) => {
  const saveCustomEdit = (id) => {
    console.log('HIT saveCustomEdit')
    console.log('PROS ID: ', id)

    let prospectToEdit = customProspects.filter(prospect => prospect['id'] === id);
    if (prospectToEdit.length === 1) {
      prospectToEdit = prospectToEdit[0];
      console.log('P to E: ', prospectToEdit)

      if (customNameInputEdit && customSchoolInputEdit && customPositionInputEdit && customWeightInputEdit && customMyScoreInputEdit) {
        console.log('HIT IF ')
        const editedProspect = {
          "id": id,
          "Rank": prospectToEdit['Rank'],
          "Name": customNameInputEdit,
          "School": customSchoolInputEdit,
          "Position": customPositionInputEdit,
          "Height": customHeightInputEdit,
          "Weight": customWeightInputEdit,
          "Draft Pulse Score": '',
          "My Score": customMyScoreInputEdit,
        }
    
        let prospectIndex;
        let prospectFilteredIndex;
        let prospectSearchedIndex;

        for (let i = 0; i < customProspects.length; i++) {
          if (customProspects[i]['id'] === id) {
            prospectIndex = i;
            break;
          }
        }

        for (let i = 0; i < filteredCustomProspects.length; i++) {
          if (filteredCustomProspects[i]['id'] === id) {
            prospectFilteredIndex = i;
            break;
          }
        }

        for (let i = 0; i < customSearchResults.length; i++) {
          if (customSearchResults[i]['id'] === id) {
            prospectSearchedIndex = i;
            break;
          }
        }

        setCustomProspects(currentProspects => {
          let updatedProspects = [...currentProspects];
          updatedProspects[prospectFilteredIndex] = editedProspect;
          updatedProspects = performSortAsc(updatedProspects, 'id');
          localStorage.setItem('customProspects', JSON.stringify(updatedProspects));
          return updatedProspects;
        });

  
        setFilteredCustomProspects(currentProspects => {
          const updatedProspects = [...currentProspects];
          updatedProspects[prospectFilteredIndex] = editedProspect;
          return updatedProspects;
        });
        
        setCustomSearchResults(currentProspects => {
          const updatedProspects = [...currentProspects];
          updatedProspects[prospectSearchedIndex] = editedProspect;
          return updatedProspects;
        });
        
  
        setCustomProspectToEdit(null);

    } else {
      console.log('SOMETHING WENT WRONG');
    }

    }
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

  const modalStyles = {
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
                {/* {rankingsType === 'pff'
                &&
                <select id='view-amount' className='my-2' name='view-amount' onChange={(e) => viewAmountChange(parseInt(e.target.value))}>
                  <option value='50'>Top 50</option>
                  <option value='100'>Top 100</option>
                  <option value='150' selected>Top 150</option>
                </select>
                } */}
              </div>
              {/* <div className='d-flex align-items-center'>
                <p className='m-0 p-0'>Rankings: </p>
                <button>PFF</button>
                <button>Custom</button>
              </div> */}

              {rankingsType === 'custom' &&
                <div>
                  {/* <button className='ml-auto draft-btn'>Edit Rankings</button> */}
                  <button className='ml-auto delete-btn ms-2' onClick={() => setModalIsOpen(true)}>Delete Rankings</button>
                </div>
              }
            </div>

            <ul id='rankings-table-position-select'>

              {rankingsType === 'pff' ?
                <input value={searchVal} id='rankings-player-search' type='text' placeholder='Search' onChange={e => searchForProspect(e.target.value)}/>
              :
                <input value={customSearchVal} id='custom-rankings-player-search' type='text' placeholder='Search' onChange={e => searchForCustomProspect(e.target.value)}/>
              }
              
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
                  {/* <th scope='col'></th> */}
                  {/* <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>{rankingsType === 'pff' && `PFF RK`} {sortBy === 'PFF Rank' && <i class={sortArrowClass}/>}</span></th> */}
                  {/* {rankingsType === 'custom' && <th scope='col'><span className='rankings-table-header'></span></th>} */}
                  {rankingsType === 'custom' && <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Rank')}>RK {(sortBy === 'Rank' && rankingsType === 'custom') && <i class={sortArrowClass}/>}</span></th>}
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
                {/* {filteredCustomProspects && filteredCustomProspects.map((prospect, index) => { */}
                {customSearchVal !== '' ? (
                  customSearchResults.map((prospect, index) => {
                    if (customProspectToEdit === index) {
                      return (
                        <tr>
                          <td className='custom-rankings-table-data text-center'>
                            <button
                              className='draft-btn draft-btn-hover me-1'
                              onClick={() => saveCustomEdit(prospect['id'])}
                              style={{marginTop: '30px', marginBottom: '30px'}}
                            >
                            Save
                            </button>
                            <button
                              // className='draft-btn draft-btn-hover ms-1'
                              className='dark-btn ms-1'
                              onClick={() => setCustomProspectToEdit(null)}
                            >
                            Cancel
                            </button>
                            <i className='fa-solid fa-rotate'/>
                          </td>
                          <td className='custom-rankings-table-data'>
                            <input type='text' maxLength='50' className='my-30px' value={customNameInputEdit} onChange={e => setCustomNameInputEdit(e.target.value)}/>
                          </td>
                          <td className='custom-rankings-table-data'>
                            <select name='school' id='' className='my-30px' value={customSchoolInputEdit} onChange={e => setCustomSchoolInputEdit(e.target.value)}>
                              {logos && Object.keys(logos).map(team => (
                                <option key={team} value={team}>{team}</option>
                              ))}
                            </select>
                          </td>
                          <td className='custom-rankings-table-data text-center'>
                              <select name='position' id='' className='my-30px' value={customPositionInputEdit} onChange={e => setCustomPositionInputEdit(e.target.value)}>
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
                              <select name='height' id='' className='my-30px' value={customHeightInputEdit} onChange={e => setCustomHeightInputEdit(e.target.value)}>
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
                            <input type='number' name='weight' id='' className='my-30px' onChange={(e) => setCustomWeightInputEdit(e.target.value)} value={customWeightInputEdit}/> lbs
                          </td>
                          <td className='custom-rankings-table-data'>
                            {/* <input type='number' name='dp-score' id='' onChange={e => setCustomDraftPulseScoreInput(e.target.value)} value={customDraftPulseScoreInput}/> */}
                          </td>
                          <td className='custom-rankings-table-data text-center'>
                            <input type='number' name='my-score' id='' className='my-30px' min='1' max='100' onChange={e => setCustomMyScoreInputEdit(e.target.value)} value={customMyScoreInputEdit}/>
                          </td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={index}>
                          <td className='rankings-table-data text-center'>{prospect['Rank']}</td>
                          <td className='rankings-table-data'>
                            <div className='d-flex justify-content-between'>
                              <div>
                                <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                                &nbsp;&nbsp;{prospect.Name}
                              </div>
                              <p className='fs-12 text-gray-color cursor-pointer hover-underline my-0 me-2' onClick={() => editCustomSearchProspectView(index)}>Edit</p>
                            </div>
                          </td>
                          <td className='rankings-table-data'>{prospect.School}</td>
                          <td className='rankings-table-data text-center'>{prospect.Position}</td>
                          <td className='rankings-table-data text-center'>{prospect.Height}"</td>
                          <td className='rankings-table-data text-center'>{prospect.Weight}</td>
                          <td className='rankings-table-data text-center'>{prospect['Draft Pulse Score']}</td>
                          <td className='rankings-table-data text-center'>{prospect['My Score']}</td>
                        </tr>
                      )
                    }
                    // <tr key={index}>
                    //   <td className='custom-rankings-table-data text-center'>{prospect['Rank']}</td>
                    //   <td className='custom-rankings-table-data'>
                    //     <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                    //     &nbsp;&nbsp;{prospect.Name}
                    //   </td>
                    //   <td className='custom-rankings-table-data'>{prospect.School}</td>
                    //   <td className='custom-rankings-table-data text-center'>{prospect.Position}</td>
                    //   <td className='custom-rankings-table-data text-center'>{prospect.Height}"</td>
                    //   <td className='custom-rankings-table-data text-center'>{prospect.Weight}</td>
                    //   <td className='custom-rankings-table-data'>{prospect['Draft Pulse Score']}</td>
                    //   <td className='custom-rankings-table-data'>{prospect['My Score']}</td>
                    // </tr>
                  })
                ) : (
                  filteredCustomProspects.map((prospect, index) => {
                    // if (customProspectToEdit === index) {
                    if (customProspectToEdit === prospect['id']) {
                      return (
                      <tr>
                        <td className='custom-rankings-table-data text-center'>
                          <button
                            className='draft-btn draft-btn-hover me-1'
                            onClick={() => saveCustomEdit(prospect['id'])}
                            style={{marginTop: '30px', marginBottom: '30px'}}
                          >
                          Save
                          </button>
                          <button
                            // className='draft-btn draft-btn-hover ms-1'
                            className='dark-btn ms-1'
                            onClick={() => setCustomProspectToEdit(null)}
                            // style={{opacity: 0.65}}
                          >
                          Cancel
                          </button>
                          <i className='fa-solid fa-rotate'/>
                        </td>
                        {/* <td className='custom-rankings-table-data' style={{display: 'flex', alignItems: 'center', height: '100px'}}> */}
                        <td className='custom-rankings-table-data'>
                          <input type='text' maxLength='50' className='my-30px' value={customNameInputEdit} onChange={e => setCustomNameInputEdit(e.target.value)}/>
                        </td>
                        <td className='custom-rankings-table-data'>
                          <select name='school' id='' className='my-30px' value={customSchoolInputEdit} onChange={e => setCustomSchoolInputEdit(e.target.value)}>
                            {logos && Object.keys(logos).map(team => (
                              <option key={team} value={team}>{team}</option>
                            ))}
                          </select>
                        </td>
                        <td className='custom-rankings-table-data text-center'>
                            <select name='position' id='' className='my-30px' value={customPositionInputEdit} onChange={e => setCustomPositionInputEdit(e.target.value)}>
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
                            <select name='height' id='' className='my-30px' value={customHeightInputEdit} onChange={e => setCustomHeightInputEdit(e.target.value)}>
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
                          <input type='number' name='weight' id='' className='my-30px' onChange={(e) => setCustomWeightInputEdit(e.target.value)} value={customWeightInputEdit}/> lbs
                        </td>
                        <td className='custom-rankings-table-data'>
                          {/* <input type='number' name='dp-score' id='' onChange={e => setCustomDraftPulseScoreInput(e.target.value)} value={customDraftPulseScoreInput}/> */}
                        </td>
                        <td className='custom-rankings-table-data text-center'>
                          <input type='number' name='my-score' id='' className='my-30px' min='1' max='100' onChange={e => setCustomMyScoreInputEdit(e.target.value)} value={customMyScoreInputEdit}/>
                        </td>
                      </tr>
                      )
                    } else {
                      return (
                        <tr key={index}>
                          <td className='rankings-table-data text-center'>{prospect['Rank']}</td>
                          <td className='rankings-table-data'>
                            <div className='d-flex justify-content-between'>
                              <div>
                                <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                                &nbsp;&nbsp;{prospect.Name}
                              </div>
                              {/* <p className='fs-12 text-gray-color cursor-pointer hover-underline my-0 me-2' onClick={() => editCustomProspectView(index)}>Edit</p> */}
                              <p className='fs-12 text-gray-color cursor-pointer hover-underline my-0 me-2' onClick={() => editCustomProspectVieww(prospect['id'])}>Edit</p>
                            </div>
                          </td>
                          <td className='rankings-table-data'>{prospect.School}</td>
                          <td className='rankings-table-data text-center'>{prospect.Position}</td>
                          <td className='rankings-table-data text-center'>{prospect.Height}"</td>
                          <td className='rankings-table-data text-center'>{prospect.Weight}</td>
                          <td className='rankings-table-data text-center'>{prospect['Draft Pulse Score']}</td>
                          <td className='rankings-table-data text-center'>{prospect['My Score']}</td>
                          {/* <td className='rankings-table-data text-center'>Edit</td> */}
                        </tr>
                      )
                    }
                  })
                )}
                <tr>
                  <td className='custom-rankings-table-data text-center'>
                    <button
                    className='draft-btn draft-btn-hover'
                    onClick={addCustomProspect}
                    // style={{opacity: 0.65}}
                    >
                      Add Player
                    </button>
                    <i className='fa-solid fa-rotate'/>
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
              style={modalStyles}
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