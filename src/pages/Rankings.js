import React, { useEffect, useState } from 'react';
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
  

  return (
    <div>

      <Navbar/>
      <div className='bg-dark-color'>
        <div className='container'>
          
          <h2 className='text-main-color'>2025 NFL Draft Prospect Rankings</h2>
            <select id='view-amount' className='my-2' name='view-amount' onChange={(e) => viewAmountChange(parseInt(e.target.value))}>
              <option value='50'>Top 50</option>
              <option value='100'>Top 100</option>
              <option value='150' selected>Top 150</option>
            </select>
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
              {/* <li className={`text-light rt-position-option ${positionView === 'K' ? 'pos-active' : ''}`} onClick={() => filterPositionView('K')}>K</li> */}
              {/* <li className={`text-light rt-position-option ${positionView === 'P' ? 'pos-active' : ''}`} onClick={() => filterPositionView('P')}>P</li> */}
            </ul>
            <table className='table table-bordered table-dark table-striped rankings-table pb-5'>
              <thead>
                <tr>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>PFF RK {sortBy === 'PFF Rank' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Name')}>Name {sortBy === 'Name' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('School')}>School {sortBy === 'School' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Position')}>Position {sortBy === 'Position' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Height')}>Height {sortBy === 'Height' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Weight')}>Weight {sortBy === 'Weight' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Draft Pulse Score')}>Draft Pulse Score {sortBy === 'Draft Pulse Score' && <i class={sortArrowClass}/>}</span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('My Score')}>My Score {sortBy === 'My Score' && <i class={sortArrowClass}/>}</span></th>

                  {/* <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('PFF Rank')}>PFF Rank <i class={`${sortArrowClass} ${sortBy === 'PFF Rank' ? 'visible' : 'invisible'}`}/></span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Name')}>Name <i class={`${sortArrowClass} ${sortBy === 'Name' ? 'visible' : 'invisible'}`}/></span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('School')}>School <i class={`${sortArrowClass} ${sortBy === 'School' ? 'visible' : 'invisible'}`}/></span></th>
                  <th scope='col'>
                    <span className='rankings-table-header' onClick={() => sortRankings('Position')}>
                      Position <i class={`${sortArrowClass} ${sortBy === 'Position Rank' ? 'visible' : 'invisible'}`}/>
                    </span>
                  </th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Height')}>Height <i class={`${sortArrowClass} ${sortBy === 'Height' ? 'visible' : 'invisible'}`}/></span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Weight')}>Weight <i class={`${sortArrowClass} ${sortBy === 'Weight' ? 'visible' : 'invisible'}`}/></span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('Draft Pulse Score')}>Draft Pulse Score <i class={`${sortArrowClass} ${sortBy === 'Draft Pulse Score' ? 'visible' : 'invisible'}`}/></span></th>
                  <th scope='col'><span className='rankings-table-header' onClick={() => sortRankings('My Score')}>My Score <i class={`${sortArrowClass} ${sortBy === 'My Score' ? 'visible' : 'invisible'}`}/></span></th> */}
                </tr>
              </thead>
              <tbody id='asdf'>
                {/* if searchResults is NOT empty, then map it here instead of mapping filteredProspects. Else, map filteredProspects as shown below */}
                {/* {filteredProspects && filteredProspects.map((prospect, index) => (
                  <tr key={index}>
                    <td className='rankings-table-data text-center'>{prospect['PFF Rank']}</td>
                    <td className='rankings-table-data'>
                      <img src={logos && logos[prospect.School]} alt={prospect.School} className='rankings-logo'/>
                      &nbsp;&nbsp;{prospect.Name}
                    </td>
                    <td className='rankings-table-data'>{prospect.School}</td>
                    <td className='rankings-table-data text-center'>{prospect.Position}</td>
                    <td className='rankings-table-data text-center'>{prospect.Height}'</td>
                    <td className='rankings-table-data text-center'>{prospect.Weight}</td>
                    <td className='rankings-table-data'>{prospect['Draft Pulse Score']}</td>
                    <td className='rankings-table-data'>{prospect['My Score']}</td>
                  </tr>
                ))} */}
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
                      <td className='rankings-table-data'>{prospect['Draft Pulse Score']}</td>
                      <td className='rankings-table-data'>{prospect['My Score']}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Rankings