import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [theme, setTheme] = useState("");
    const [shouldReload, setShouldReload] = useState(true);
    const [userScore, setUserScore] = useState('');
    const [scoredMarks, setScoredMarks] = useState(null); // State for scoredMarks

    const navigate = useNavigate();
    const [status, setStatus] = useState('queries');
    const [aiStatus, setAiStatus] = useState('');
    const [data, setData] = useState(null);

    const handleStatus = (e) => {
        setStatus(e.currentTarget.dataset.value);
        setAiStatus(e.currentTarget.dataset.value === "chat");
    };

    const handleStepClick = (step) => {
        setActiveStep(step);
    };

    const fetchData = async () => {
        try {
            const username = localStorage.getItem('userName');
            console.log(`http://localhost:8000/account/${username}`);
            const response = await axios.post(`http://localhost:8000/account/${username}`);
            console.log('the response is ', response)
            if (response.data && response.data.data) {
                console.log(response.data.data);
                setData(response.data.data);
                localStorage.setItem('fetchedData', JSON.stringify(response.data.data));
                localStorage.setItem('courseTitle',data.selectedCourse.title);
            }
        } catch (error) {
            console.log('Error at fetching data', error);
        }
    };

    const fetchData2 = async () => {
        try {
            const username = localStorage.getItem('userName');
            // console.log(`http://localhost:8000/account/user/${username}`);
            const response = await axios.post(`http://localhost:8000/account/user/${username}`);
            // console.log(response)
            if (response.data && response.data.data && response.data.data.scoredMarks) {
                console.log('the data is ', response.data.data['scoredMarks']);
                setScoredMarks(response.data.data.scoredMarks); // Set the scoredMarks state
            }
        } catch (error) {
            console.log('Error at fetching data', error);
        }
    };
// 
    // fetchData()

    useEffect(() => {
        if (sessionStorage.getItem('reloaded') !== 'true') {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        } else {
            const storedData = localStorage.getItem('fetchedData');
            if (storedData) {
                setData(JSON.parse(storedData));
            } else {
                fetchData();
            }
            fetchData2()
        }
    }, []);



    const handleDarkTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    const parseStepContent = ( content) => {
        let responseRel = content.split("*");
        let newResponse = "  <hr> ";
        for (let i = 0; i < responseRel.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newResponse += responseRel[i]
          } else {
            newResponse += "<br>" + responseRel[i] + "<br>"
          }
        }
        let newResponse2 = newResponse.split("**").join("");
        console.log(newResponse2)
      

        return { __html: newResponse2 };
      };    
   

    const steps = [
        {
            id: 1, title: 'STEP 1', content: parseStepContent(data && data.selectedCourse && data.selectedCourse.steps_to_become ? data.selectedCourse.
                steps_to_become
            [0] : "")
        },
        {
            id: 2, title: 'STEP 2', content: parseStepContent(data && data.selectedCourse && data.selectedCourse.
                steps_to_become
                ? data.selectedCourse.
                    steps_to_become
                [1] : "")
        },
        {
            id: 3, title: 'STEP 3', content: parseStepContent(data && data.selectedCourse && data.selectedCourse.
                steps_to_become
                ? data.selectedCourse.
                    steps_to_become
                [2] : "")
        },
        {
            id: 4, title: 'STEP 4', content: parseStepContent(data && data.selectedCourse && data.selectedCourse.
                steps_to_become
                ? data.selectedCourse.
                    steps_to_become
                [3] : "")
        },
        {
            id: 5, title: 'STEP 5', content: parseStepContent(data && data.selectedCourse && data.selectedCourse.
                steps_to_become
                ? data.selectedCourse.steps_to_become[4] : "")
        },
    ];

    const calculateProgressWidth = () => {
        switch (activeStep) {
            case 1: return '2%';
            case 2: return '25%';
            case 3: return '50%';
            case 4: return '75%';
            case 5: return '100%';
            default: return '0%';
        }
    };
    console.log(data)
    

    return (
        <div className={`UI`}>
            <br /><br /><br /><br />
            <h1 style={{ textAlign: 'center' }}>Our Process for `{ data?.selectedCourse.title}`</h1>
            <br />
            <div className="process-wrapper">
                <div id="progress-bar-container">
                    <ul>
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`step step0${index + 1} ${activeStep >= index + 1 ? 'active' : ''}`}
                                onClick={() => handleStepClick(index + 1)}
                            >
                                <div className="step-inner">{step.title}</div>
                            </li>
                        ))}
                    </ul>
                    <div id="line">
                        <div id="line-progress" style={{ width: calculateProgressWidth() }}></div>
                    </div>
                </div>
                <div id="progress-content-section">
                    {steps.map((step, index) => (
                        <div key={index} className={`section-content ${activeStep === index + 1 ? 'active' : ''}`}>
                            <h2>{step.title}</h2>
                            <p dangerouslySetInnerHTML={step.content}></p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-data">
                <div className="ag-format-container ">
                    <div className="ag-courses_box">
                        <div className="ag-courses_item quesCamp-progress-card ">
                            <a href="#" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">QuesCamp Progress</div>
                                <div className='ag-courses-item_title recent'>Today's Marks: &nbsp; <kbd>{scoredMarks <= 0 ? 'no attempts' : scoredMarks}/25</kbd></div> {/* Display scoredMarks */}
                                <div className="ag-courses-item_date-box">
                                    Total Scores:
                                    <span className="ag-courses-item_date">04.11.2022</span>
                                </div>
                            </a>
                        </div>
                        <div className="ag-courses_item">
                            <a href="#" className="ag-courses-item_link glassy-look">
                                <div className="ag-courses-item_bg "></div>
                                <Link to={'/quescamp'}>
                                    <div className="ag-courses-item_title">
                                        Test Yourself
                                    </div>
                                </Link>
                                <div className="ag-courses-item_date-box">
                                    Start:
                                    <span className="ag-courses-item_date">04.11.2022</span>
                                </div>
                            </a>
                        </div>

                        <div className="ag-courses_item">
                            <a href="#" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <Link to="/ai">
                                    <div className="ag-courses-item_title">
                                        Clear Doubts
                                    </div>
                                </Link>
                                <div className="ag-courses-item_date-box">
                                    Start:
                                    <span className="ag-courses-item_date">04.11.2022</span>
                                </div>
                            </a>
                        </div>

                        {/* Additional items commented out */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
