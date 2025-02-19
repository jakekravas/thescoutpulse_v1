import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';

const MockDraft = () => {

  const [draftStarted, setDraftStarted] = useState(true);
  const [round, setRound] = useState(1);
  const [currentPick, setCurrentPick] = useState(1);
  const [userTeam, setUserTeam] = useState('Bears');
  const [userPick, setUserPick] = useState(10);
  const [nflLogos, setNflLogos] = useState();
  const [collegeLogos, setCollegeLogos] = useState();
  const [prospects, setProspects] = useState();
  const [undraftedProspects, setUndraftedProspects] = useState([]);
  const [draftedProspects, setDraftedProspects] = useState([]);
  const [pickPosView, setPickPosView] = useState('ALL');
  const [draftViewAllPicks, setDraftViewAllPicks] = useState(true);
  const [teamOnTheClock, setTeamOnTheClock] = useState('Titans');
  const [draftOrder, setDraftOrder] = useState([
    {name: 'Titans', location: 'Tennessee', pick: 1, posNeeds: 'QB, T, ED, CB', pickSelections: []},
    {name: 'Browns', location: 'Cleveland', pick: 2, posNeeds: 'QB, RB, T, CB', pickSelections: []},
    {name: 'Giants', location: 'New York', pick: 3, posNeeds: 'QB, T, DB', pickSelections: []},
    {name: 'Patriots', location: 'New England', pick: 4, posNeeds: 'RB, WR, G, T', pickSelections: []},
    {name: 'Jaguars', location: 'Jacksonville', pick: 5, posNeeds: 'C, G, DI, CB', pickSelections: []},
    {name: 'Raiders', location: 'Las Vegas', pick: 6, posNeeds: 'QB, RB, WR, CB', pickSelections: []},
    {name: 'Jets', location: 'New York', pick: 7, posNeeds: 'QB, DI, DB', pickSelections: []},
    {name: 'Panthers', location: 'Carolina', pick: 8, posNeeds: 'DL, DB', pickSelections: []},
    {name: 'Saints', location: 'New Orleans', pick: 9, posNeeds: 'WR, TE, DL', pickSelections: []},
    {name: 'Bears', location: 'Chicago', pick: 10, posNeeds: 'RB, C, G, ED', pickSelections: []},
    {name: '49ers', location: 'San Francisco', pick: 11, posNeeds: 'G, T, DL', pickSelections: []},
    {name: 'Cowboys', location: 'Dallas', pick: 12, posNeeds: 'RB, WR, T, ED', pickSelections: []},
    {name: 'Dolphins', location: 'Miami', pick: 13, posNeeds: 'G, T, DI, S', pickSelections: []},
    {name: 'Colts', location: 'Indianapolis', pick: 14, posNeeds: 'TE, ED, DB', pickSelections: []},
    {name: 'Falcons', location: 'Atlanta', pick: 15, posNeeds: 'WR, ED, LB, CB', pickSelections: []},
    {name: 'Cardinals', location: 'Arizona', pick: 16, posNeeds: 'G, T, DL', pickSelections: []},
    {name: 'Bengals', location: 'Cincinnati', pick: 17, posNeeds: 'WR, G, DL', pickSelections: []},
    {name: 'Seahawks', location: 'Seattle', pick: 18, posNeeds: 'C, G, ED, LB', pickSelections: []},
    {name: 'Buccaneers', location: 'Tampa Bay', pick: 19, posNeeds: 'ED, LB, DB', pickSelections: []},
    {name: 'Broncos', location: 'Denver', pick: 20, posNeeds: 'WR, TE, LB, S', pickSelections: []},
    {name: 'Steelers', location: 'Pittsburgh', pick: 21, posNeeds: 'QB, WR, DB', pickSelections: []},
    {name: 'Chargers', location: 'Los Angeles', pick: 22, posNeeds: 'RB, WR, TE, ED', pickSelections: []},
    {name: 'Packers', location: 'Green Bay', pick: 23, posNeeds: 'WR, C, ED, CB', pickSelections: []},
    {name: 'Vikings', location: 'Minnesota', pick: 24, posNeeds: 'RB, G, DI, CB', pickSelections: []},
    {name: 'Texans', location: 'Houston', pick: 25, posNeeds: 'WR, C, G, DI', pickSelections: []},
    {name: 'Rams', location: 'Los Angeles', pick: 26, posNeeds: 'TE, T, LB, CB', pickSelections: []},
    {name: 'Ravens', location: 'Baltimore', pick: 27, posNeeds: 'WR, T, ED, CB', pickSelections: []},
    {name: 'Lions', location: 'Detroit', pick: 28, posNeeds: 'C, G, ED, LB', pickSelections: []},
    {name: 'Commanders', location: 'Washington', pick: 29, posNeeds: 'WR, T, ED, CB', pickSelections: []},
    {name: 'Bills', location: 'Buffalo', pick: 30, posNeeds: 'WR, DI, LB, CB', pickSelections: []},
    {name: 'Chiefs', location: 'Kansas City', pick: 31, posNeeds: 'T, DL, LB', pickSelections: []},
    {name: 'Eagles', location: 'Philadelphia', pick: 32, posNeeds: 'WR, G, ED, CB', pickSelections: []},
  ]);
  const intervalId = useRef(null);
  const undraftedProspectsRef = useRef(undraftedProspects);
  const currentPickRef = useRef(currentPick);

  
  useEffect(() => {
    fetchData();
    startDraft();
  }, []);


  useEffect(() => {
    if (currentPick === userPick) {
      clearInterval(intervalId.current);
    }
  }, [currentPick]);

  useEffect(() => {
    undraftedProspectsRef.current = undraftedProspects;
  }, [undraftedProspects]);

  useEffect(() => {
    currentPickRef.current = currentPick;
  }, [currentPick]);
  

  const startDraft = () => {
    intervalId.current = setInterval(function() {
      getCpuDraftPick();
    }, 1000);
  }

  // const getCpuDraftPick = () => {
  //   // const newProspect = draftedProspects[0];
  //   const newProspect = undraftedProspects[0];
  //   // newProspect.draftedBy = teamOnTheClock;
  //   setDraftedProspects(currentDraftedProspects => [...currentDraftedProspects, newProspect]);

  //   setUndraftedProspects(currentUndraftedProspects => [
  //     ...currentUndraftedProspects.slice(0, 0),
  //     ...currentUndraftedProspects.slice(1)
  //   ]);

  //   console.log('undraftedProspectsRef:', undraftedProspectsRef)

  //   // setTeamOnTheClock(draftOrder[currentPick + 1].name);
  //   // console.log('newpr', newProspect)
  //   setCurrentPick(current => current + 1);
  // }

  // const [draftOrder, setDraftOrder] = useState([
  //   {name: 'Titans', location: 'Tennessee', pick: 1, posNeeds: 'QB, T, ED, CB', pickSelections: []},
  //   {name: 'Browns', location: 'Cleveland', pick: 2, posNeeds: 'QB, T, ED, CB', pickSelections: []},
  //   {name: 'Giants', location: 'New York', pick: 3, posNeeds: 'QB, T, ED, CB', pickSelections: []},
  // ]);
  const getCpuDraftPick = () => {
    const newProspect = undraftedProspectsRef.current[0];
    if (newProspect) {
      // draftOrder[currentPick-1].pickSelections.push(newProspect);
      // console.log('newProspect:', newProspect)
      // console.log("Current Pick (before updating):", currentPickRef); // Debug log to check the value

      const updatedDraftOrder = draftOrder.map((team, index) => {
        if (index === currentPickRef - 1) {
          console.log('HIT IF');

          return {
            ...team,
            pickSelections: [...team.pickSelections, newProspect] // Step 2: Append newProspect
          };
        }
        return team;
      });

      console.log('updatedDraftOrder:', updatedDraftOrder);
  
      // Step 3: Update the state with the modified array
      setDraftOrder(updatedDraftOrder);

      setDraftedProspects(currentDraftedProspects => [...currentDraftedProspects, newProspect]);
      setUndraftedProspects(currentUndraftedProspects => currentUndraftedProspects.slice(1));
      setCurrentPick(current => current + 1);
      // console.log("Current Pick (after updating):", currentPickRef); // Debug log to check the value

    }
  };
  
  const getUserDraftPick = (id) => {
    if (userPick === currentPick) {
      // let selection = undraftedProspects.find(prospect => prospect.id === id);
      // let selectionIndex = undraftedProspects.findIndex(prospect => prospect.id === id);
      let selection;
      let selectionIndex;

      for (let i = 0; i < undraftedProspectsRef.current.length; i++) {
        if (undraftedProspectsRef.current[i].id === id) {
          selection = undraftedProspectsRef.current[i];
          selectionIndex = i;
          break;
        }
      }

      console.log('undraftedProspectsRef.current:', undraftedProspectsRef.current)
      console.log('selection:', selection)

      setDraftedProspects(currentDraftedProspects => [...currentDraftedProspects, selection]);

      setUndraftedProspects(currentUndraftedProspects => [
        ...currentUndraftedProspects.slice(0, selectionIndex),
        ...currentUndraftedProspects.slice(selectionIndex + 1)
      ]);

      setCurrentPick(current => current + 1);
    }
  }


  const fetchData = async () => {
    try {
        const NflLogosResponse = await fetch('/data/logos_nfl.json');
        if (!NflLogosResponse.ok) throw new Error('Network response was not ok');

        const NflLogosData = await NflLogosResponse.json();
        setNflLogos(NflLogosData);

      } catch (error) {
        console.error('Error loading the JSON file: ', error);
    }

    try {
      const CollegeLogosResponse = await fetch('/data/logos_college.json');
      if (!CollegeLogosResponse.ok) throw new Error('Network response was not ok');

      const CollegeLogosData = await CollegeLogosResponse.json();
      setCollegeLogos(CollegeLogosData);

    } catch (error) {
        console.error('Error loading the JSON file: ', error);
    }

    try {
      const prospectsResponse = await fetch('/data/prospects.json');
      if (!prospectsResponse.ok) throw new Error('Network response was not ok');

      const prospectsData = await prospectsResponse.json();
      setProspects(prospectsData);
      setUndraftedProspects(prospectsData);
    } catch (error) {
        console.error('Error loading the JSON file: ', error);
    }
  };

  const filterPickPosView = (pos) => {
    setPickPosView(pos);
  }

  const toggleDraftViewSelectClass = (viewAllClicked) => {
    if (viewAllClicked && !draftViewAllPicks) {
      setDraftViewAllPicks(true)
    } else if (!viewAllClicked && draftViewAllPicks) {
      setDraftViewAllPicks(false)
    }
  }

  return (
    <div>
      <Navbar/>
      <section id='mock-draft' className='d-flex container'>

      {draftStarted ? 
        <div id='mock-draft-view-area'>
          {/* <button onClick={() => {
            console.log('draftedProspects: ', draftedProspects);
            console.log('undraftedProspects: ', undraftedProspects);
            console.log('draftOrder:', draftOrder);
            console.log('currentPick:', currentPick);
          }}>test</button> */}
          <div id='draft-view-select-area'>
            <p className={`text-center w-50 m-0 py-3 cursor-pointer draft-view-select fs-14 ${draftViewAllPicks ? 'draft-view-select-current' : ''}`} onClick={() => toggleDraftViewSelectClass(true)}>Draft Results</p>
            <p className={`text-center w-50 m-0 py-3 cursor-pointer draft-view-select fs-14 ${!draftViewAllPicks ? 'draft-view-select-current' : ''}`} onClick={() => toggleDraftViewSelectClass(false)}>My Picks</p>
          </div>
          <p className='m-0 bg-dark-color-2 text-light-color fs-14'>ROUND 1</p>
          <div id='mock-draft-order-teams'>

            {prospects && draftOrder.map((team, index) => {
              if (index + 1 < currentPick) {
                return (
                  <div className='mock-draft-pick-view'>
                    <div className='pick-number-area'>
                      <p className='m-0'>{index + 1}</p>
                    </div>
                    <img className='pick-view-logo-nfl' src={nflLogos && nflLogos[team['name']]} alt={nflLogos && nflLogos[team['name']]} />
                    <div className='pick-view-past'>
                      <p className='pick-view-past-name hover-underline'>{prospects[index].Name}</p>
                      {/* <p className='pick-view-past-name hover-underline'>{draftOrder[index]?.pickSelections[0]?.Name}</p> */}
                      <p className='pick-view-past-info'>
                        {/* <span className='text-muted'>{prospects[index].Position.slice(0,2)}</span>
                        <img className='pick-view-past-college-logo' src={collegeLogos && collegeLogos[prospects[index].School]} alt=''/>
                        <span className='text-muted'>{prospects[index].School}</span> */}

                        {/* <span className='text-gray-color'>{prospects[index].Position.slice(0,2)}</span> */}
                        <span className='text-test-color fs-12'>{prospects[index].Position.slice(0,2)}</span>
                        <img className='pick-view-past-college-logo' src={collegeLogos && collegeLogos[prospects[index].School]} alt={collegeLogos && collegeLogos[prospects[index].School]}/>
                        <span className='text-test-color fs-12'>{prospects[index].School}</span>

                      </p>
                    </div>
                    <div className='pick-view-needs'>
                      <p className='m-0 fs-10 text-gray-color'>Needs</p>
                      <p className='m-0 fs-10'>{draftOrder[index].posNeeds}</p>
                    </div>
                    {/* <div className='pick-view-current'></div> */}
                    {/* <div className='pick-view-upcoming'></div> */}
                  </div>
                )
              } else if (index + 1 === currentPick) {
                return (
                  <div className='mock-draft-pick-view-current'>
                    <div className='pick-number-area'>
                      <p className='m-0'>{index + 1}</p>
                    </div>
                    <img className='pick-view-logo-nfl' src={nflLogos && nflLogos[team['name']]} alt={nflLogos && nflLogos[team['name']]} />
                    <div className='pick-view-past fs-14'>
                      On the clock
                    </div>
                    <div className='pick-view-needs'>
                      <p className='m-0 fs-10 text-gray-color'>Needs</p>
                      <p className='m-0 fs-10 text-white-color'>{draftOrder[index].posNeeds}</p>
                    </div>
                    {/* <div className='pick-view-current'></div> */}
                    {/* <div className='pick-view-upcoming'></div> */}
                  </div>
                )
              } else {
                return (
                  <div className='mock-draft-pick-view'>
                    <div className='pick-number-area'>
                      <p className='m-0'>{index + 1}</p>
                    </div>
                    <img className='pick-view-logo-nfl' src={nflLogos && nflLogos[team['name']]} alt={nflLogos && nflLogos[team['name']]} />
                    <div className='pick-view-past text-gray-color fs-14'>
                      Upcoming
                    </div>
                    <div className='pick-view-needs'>
                      <p className='m-0 fs-10 text-gray-color'>Needs</p>
                      <p className='m-0 fs-10'>{draftOrder[index].posNeeds}</p>
                    </div>
                    {/* <div className='pick-view-current'></div> */}
                    {/* <div className='pick-view-upcoming'></div> */}
                  </div>
                )
              }
            })}
          </div>
        </div>
        :
        <div id='pre-draft-menu'>
          <h5 className='m-0 text-center'>Select Your Team</h5>
          <div id='team-select-options'>
            <div className='team-select-option'>
              <div>
                <p className='m-0 text-gray-color fs-12'>Pick #1</p>
                <p className='m-0 fs-16'>Titans</p>
              </div>
              <img className='team-select-logo' src={nflLogos && nflLogos['Titans']} alt='' />
            </div>
            <div className='team-select-option'>
              <div>
                <p className='m-0 text-gray-color fs-12'>Pick #2</p>
                <p className='m-0 fs-16'>Browns</p>
              </div>
              <img className='team-select-logo' src={nflLogos && nflLogos['Browns']} alt='' />
            </div>
            <div className='flex-break'></div>
            <div className='team-select-option'>
              <div>
                <p className='m-0 text-gray-color fs-12'>Pick #2</p>
                <p className='m-0 fs-16'>Giants</p>
              </div>
              <img className='team-select-logo' src={nflLogos && nflLogos['Giants']} alt='' />
            </div>
            <div className='team-select-option'>
              <div>
                <p className='m-0 text-gray-color fs-12'>Pick #2</p>
                <p className='m-0 fs-16'>Patriots</p>
              </div>
              <img className='team-select-logo' src={nflLogos && nflLogos['Patriots']} alt='' />
            </div>
          </div>
        </div>
      }


        <div id='mock-draft-pick-area'>
          <div id='pick-area-top' className='d-flex justify-content-between'>
            {/* <i class="fa-regular fa-clock"></i> */}
            <p className='m-0 fs-14'>{currentPick !== userPick ? "On the clock:" : "You're on the clock!" }</p>
            <p className='m-0 fs-14'>ROUND 1, PICK {currentPick}</p>
          </div>
          <div id='pick-area-user-team-info'>
            {/* <span><img src={nflLogos && nflLogos['Bears']} alt={nflLogos && nflLogos['Bears']} width='32px'/> Chicago Bears</span> */}
            <span className='fs-16'><img src={nflLogos && nflLogos[draftOrder[currentPick-1].name]} alt={nflLogos && nflLogos[draftOrder[currentPick-1].name]} width='32px'/> {draftOrder[currentPick-1].location} {draftOrder[currentPick-1].name}</span>
            <div id='pick-area-user-team-needs' className='fs-14'>
              Needs: {draftOrder[currentPick-1].posNeeds}
            </div>
          </div>

          <div id='pick-area-position-filter'>
            <ul id='draft-position-select'>
              <input id='draft-player-search' type='text' placeholder='Search' maxLength={50}/>

              <li className={`text-light rt-position-option ${pickPosView === 'ALL' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('ALL')}>ALL</li>
              <li className={`text-light rt-position-option ${pickPosView === 'QB' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('QB')}>QB</li>
              <li className={`text-light rt-position-option ${pickPosView === 'RB' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('RB')}>RB</li>
              <li className={`text-light rt-position-option ${pickPosView === 'WR' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('WR')}>WR</li>
              <li className={`text-light rt-position-option ${pickPosView === 'TE' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('TE')}>TE</li>
              <li className={`text-light rt-position-option ${pickPosView === 'OT' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('OT')}>OT</li>
              <li className={`text-light rt-position-option ${pickPosView === 'IOL' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('IOL')}>IOL</li>
              <li className={`text-light rt-position-option ${pickPosView === 'EDGE' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('EDGE')}>EDGE</li>
              <li className={`text-light rt-position-option ${pickPosView === 'IDL' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('IDL')}>IDL</li>
              <li className={`text-light rt-position-option ${pickPosView === 'LB' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('LB')}>LB</li>
              <li className={`text-light rt-position-option ${pickPosView === 'DB' ? 'pos-active' : ''}`} onClick={() => filterPickPosView('DB')}>DB</li>
            </ul>
          </div>

          <div id='pick-area-prospect-list'>
            {undraftedProspects && undraftedProspects.map((prospect, index) => (
              <div className='pick-area-prospect py-3 mx-1'>
                <div className='quick-info d-flex'>
                  <div className='text-center mx-2 fs-14'>
                    <p className='m-0 text-gray-color'>Rank</p>
                    <p className='m-0'>{prospect['PFF Rank']}</p>
                  </div>
                  <div className='text-center mx-3 fs-14'>
                    <p className='m-0 text-gray-color'>ADP</p>
                    <p className='m-0'>{prospect['adp']}</p>
                  </div>
                  <div className='d-flex ms-3'>
                    <img className='pick-area-prospect-college-logo' src={collegeLogos && collegeLogos[prospect['School']]} alt='logo'/>
                    <div>
                      <p className='m-0 text-blue-color fs-14 cursor-pointer hover-underline fw-bold'>{prospect['Name']}</p>
                      <p className='m-0 text-gray-color fs-12'><span className='fw-bold'>{prospect['Position']}</span> {prospect['School']}</p>
                    </div>
                  </div>
                </div>

                <div className='d-flex align-content-center me-2'>
                  <p className='m-0 mi-text'>More Info</p>
                  <button 
                    className={`draft-btn ${currentPick === userPick ? 'draft-btn-hover' : ''}`}
                    style={{ opacity: currentPick === userPick ? 1 : 0.65 }}
                    disabled={currentPick !== userPick}
                    // onClick={() => getUserDraftPick(prospect.id)}
                  >
                    Draft
                  </button>
                </div>
              </div>
            ))}

            
          </div>

        </div>
      </section>
    </div>
  )
}

export default MockDraft