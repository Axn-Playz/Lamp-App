    import axios from 'axios';
    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { toast, ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";

    const SetUpQues = () => {

        const data = [
            {
                ques: "What is your current education level?",
                options: ["High school", "Undergraduate", "Graduate", "Other (please specify)"]
            },
            {
                ques: "Which subjects or topics are you most interested in? (Select all that apply)",
                options: ["Science", "Technology", "Engineering", "Mathematics", "Arts", "Humanities", "Business", "Health", "Social Sciences", "Other (please specify)"]
            },
            {
                ques: "What are your strongest skills and abilities? (Select all that apply)",
                options: ["Analytical thinking", "Creativity", "Communication", "Leadership", "Technical skills (please specify)", "Problem-solving", "Teamwork", "Other (please specify)"]
            },
            {
                ques: "Do you have any specific career goals or aspirations? (Please describe)",
                options: []
            },
            {
                ques: "Which industries are you interested in working in? (Select all that apply)",
                options: ["Technology", "Healthcare", "Finance", "Education", "Arts and Entertainment", "Government and Public Services", "Retail and Consumer Goods", "Other (please specify)"]
            },
            {
                ques: "Do you have any work experience?",
                options: ["Yes", "No", "If yes, please briefly describe your experience."]
            },
            {
                ques: "What was your major or field of study in your highest completed education?",
                options: []
            },
            {
                ques: "Are you willing to relocate for a job or educational opportunity?",
                options: ["Yes", "No"]
            },
            {
                ques: "Do you have any financial constraints that may affect your education or career choices?",
                options: ["Yes", "No"]
            },
            {
                ques: "Is there any other information you would like to share to help us better understand your needs and preferences?",
                options: []
            }
        ];

        const questionToKeyMap = {
            "What is your current education level?": "educationLevel",
            "Which subjects or topics are you most interested in? (Select all that apply)": "interests",
            "What are your strongest skills and abilities? (Select all that apply)": "skills",
            "Do you have any specific career goals or aspirations? (Please describe)": "careerGoals",
            "Which industries are you interested in working in? (Select all that apply)": "industriesOfInterest",
            "Do you have any work experience?": "workExperience",
            "What was your major or field of study in your highest completed education?": "majorFieldOfStudy",
            "Are you willing to relocate for a job or educational opportunity?": "willingToRelocate",
            "Do you have any financial constraints that may affect your education or career choices?": "financialConstraints",
            "Is there any other information you would like to share to help us better understand your needs and preferences?": "additionalInfo"
        };

        const [setupCompleted, setSetupCompleted] = useState(false);
        const [index, setIndex] = useState(0);
        const [responses, setResponses] = useState({
            educationLevel: '',
            interests: [],
            skills: [],
            careerGoals: '',
            industriesOfInterest: [],
            workExperience: '',
            majorFieldOfStudy: '',
            willingToRelocate: '',
            financialConstraints: '',
            additionalInfo: ''
        });
        const [answer, setAnswer] = useState('');
        const [progress, setProgress] = useState(0);
        const navigate = useNavigate();

        const handleNext = () => {
            if (data[index].options.length > 0 && !answer) {
                return toast.error('You cannot skip this!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

            const key = questionToKeyMap[data[index].ques];
            setResponses(prevResponses => {
                if (Array.isArray(prevResponses[key])) {
                    return {
                        ...prevResponses,
                        [key]: [...prevResponses[key], answer]
                    };
                } else {
                    return {
                        ...prevResponses,
                        [key]: answer
                    };
                }
            });

            setAnswer('');
            setProgress((prevProgress) => prevProgress + (100 / data.length));

            if (index + 1 < data.length) {
                setIndex(index + 1);
            }
            else {
                setSetupCompleted(true); 
            }
        };

        const handleBack = () => {
            setProgress((prevProgress) => prevProgress - (100 / data.length));
            setIndex(index - 1);
            const key = questionToKeyMap[data[index - 1].ques];
            setAnswer(responses[key] || '');
        };

        const handleResponse = async () => {
            try {
                const username = localStorage.getItem('userName');
                const updatedResponses = {
                    ...responses,
                    username: username
                };

                const {checkAccount} = await axios.post('http://localhost:8000/account/all-data',{username});
                console.log(checkAccount)
                console.log('Submitting responses:', updatedResponses);
                const response = await axios.post("http://localhost:8000/account/data", updatedResponses);
                if (response.data) {
                    
                    console.log(response.data);
                }
            } catch (error) {
                console.log('Error submitting data:', error.response?.data || error);
            }
        };

        return (
            <>
                {progress > 0 && (
                    <div className="progress mt-5 text-center" style={{ width: "auto" , height:'8px'}}>
                        <div className="progress-bar" style={{ width: `${progress}%`, height:'8px'}}></div>
                    </div>
                )}
                <div className="questionBank">
                    <h5 className='text-center'>Please fill up the details, asked below:</h5>
                    <br />
                    <div className="container-sm">
                        {!setupCompleted ? (
                            <div className="card mt-3 p-2 ques-box" style={{ width: "25rem", height: "26rem" }}>
                                <div className="card-body">
                                    <h4 className="card-text mt-3">{data[index].ques}</h4>
                                    {data[index].options.length > 0 ? (
                                        <select
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className='mt-3'
                                            required
                                        >
                                            <option value="">Select an option</option>
                                            {data[index].options.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder='Answer here'
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className='mt-3'
                                            required
                                        />
                                    )}
                                    <div className='mt-3'>
                                        {index > 0 && <button type="button" className="btn btn-outline-primary mt-3 mx-3" onClick={handleBack}>Back</button>}
                                        <button type="button" className="btn btn-outline-primary mt-3" onClick={handleNext}>Next</button>
                                        <h6 className="card-title mt-5">Question: {index + 1}/{data.length}</h6>
                                    </div>
                                </div>
                                </div>
                        ) : (
                            <div>
                                <div className="main-container">
                                    <div className="check-container">
                                        <div className="check-background">
                                            <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="check-shadow"></div>
                                    </div>
                                </div>
                                <h4 className="completetext text-center">Setup Completed</h4>
                                <Link to="/load"><button type="submit" id="proceed" onClick={handleResponse}>Proceed</button></Link>
                           
                            </div>
                           
                    
                       
                        )}
                        </div>
                    </div>
                <ToastContainer />
            </>
        );
    }

    export default SetUpQues;
