import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTimer } from 'use-timer';

const QuesCamp = () => {
  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [countLoad, setCountLoad] = useState(5);
  const [showScore, setShowScore] = useState(false);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 0,
    timerType: 'INCREMENTAL',
  });
  const [timerStatus, setTimerStatus] = useState(false);
  const [submitting, setSubmitting] = useState(false); // State for button submission animation

  const dataa = {
    interests: ["Technology", "Problem-solving", "Design", "Music"],
    skills: ["JavaScript", "Python", "Graphic Design", "Communication"],
    education: "Bachelor's degree in Computer Science",
    experience: "2 years of experience as a Front-End Developer"
  };

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      setQuestions(parsedQuestions);
      setDisplayedQuestions(parsedQuestions.slice(0, 5));
      setLoading(false);
    } else {
      fetchQuestions();
    }

    const storedAnswers = localStorage.getItem('selectedAnswers');
    if (storedAnswers) {
      setSelectedAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = "AIzaSyDQzs-I2hXHqtbBL_cp5ch3SgTzrTxn8gY"; // Ensure this is set in your environment variables
      const model = 'models/gemini-1.5-pro-latest';
      const version = 'v1beta';

      // Fetching data from the db
      const dataDb = await axios.post(`http://localhost:8000/account/${localStorage.getItem('userName')}`);
      console.log('your data is', dataDb ? dataDb.data.data : dataa);
       
      const prompt = ` 
You are a helpful career counselor. Based on the following information about a user:
${JSON.stringify(dataDb ? dataDb.data.data : dataa)}
Suggest 25 relevant and academic MCQ-based questions to test if the user is really interested, knowledgeable, passionate, and skilled about those paths.
- Randomize the order of the options, including the correct answer.
Provide your response as a JSON array in the following format:

\`\`\`json
[
  {
    "question": "Question text here",
    "options": [ 
      { "option": "Option A text", "correct": true or false },
      { "option": "Option B text", "correct": true or false },
      { "option": "Option C text", "correct": true or false },
      { "option": "Option D text", "correct": true or false } 
    ]
  },
  // ... more questions ...
]
\`\`\`
`;

      const url = `https://generativelanguage.googleapis.com/${version}/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: 'application/json' },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      // Check if the response has the expected structure
      if (
        resData.candidates &&
        resData.candidates.length > 0 &&
        resData.candidates[0].content &&
        resData.candidates[0].content.parts &&
        resData.candidates[0].content.parts.length > 0
      ) {
        const generatedText = resData.candidates[0].content.parts[0].text;

        try {
          // Since we are expecting a well-formatted JSON, we can directly parse it
          const suggestions = JSON.parse(generatedText);

          // Shuffle the options of each question
          const shuffledQuestions = suggestions.map((question) => {
            question.options = question.options.sort(() => Math.random() - 0.5);
            return question;
          });

          // Set the questions state
          setQuestions(shuffledQuestions);
          setDisplayedQuestions(shuffledQuestions.slice(0, 5));
          localStorage.setItem('questions', JSON.stringify(shuffledQuestions));
        } catch (parseError) {
          setError('Failed to process the questions: ' + parseError.message);
        }
      } else {
        setError('Unexpected response format from the API.');
      }
    } catch (error) {
      setError('Failed to fetch suggestions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (questionIndex, option) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [questionIndex]: option,
    };
    setSelectedAnswers(newSelectedAnswers);
    localStorage.setItem('selectedAnswers', JSON.stringify(newSelectedAnswers));
  };

  const handleTimer = (e) => {
    e.preventDefault();
    if (status === 'RUNNING') {
      pause();
    } else {
      start();
    }
    setTimerStatus(!timerStatus);
  };

  const loadMoreQuestions = () => {
    const currentLength = displayedQuestions.length;
    const nextQuestions = questions.slice(currentLength, currentLength + 5);
    setDisplayedQuestions(prev => [...prev, ...nextQuestions]);
    setCountLoad(countLoad + 5);
  };

  const calculateScore = async () => {
    try {
      let correctAnswers = 0;
      questions.forEach((question, index) => {
        const selectedAnswer = selectedAnswers[index];
        const correctOption = question.options.find(option => option.correct);
        if (selectedAnswer === correctOption.option) {
          correctAnswers += 1;
        }
      });
      setScore(correctAnswers);
      const username = localStorage.getItem('userName');
      const data = await axios.post("http://localhost:8000/account/", { username, scoredMarks: correctAnswers });
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log('Error calculating score: ', error);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true); // Start button animation

    // Calculate score
    await calculateScore();

    // Simulate a delay to show the loading spinner (adjust the timeout as needed)
    setTimeout(() => {
      setShowScore(true); // Display score
      setSubmitting(false); // Stop button animation
    }, 5000); // 5 seconds delay for demonstration
  };

  return (
    <>
      <div className="QuesMain">
        <div className="QuesHead">
          <h1><span className="material-symbols-rounded">light</span> QuesCamp <span className="material-symbols-rounded">light</span></h1>
          <p>powered by</p>
          <h1 style={{ color: 'yellow' }}>LAMP</h1>
        </div>
        <div className="QuesDetail">
          <h4>Course: {/* Add course name or identifier here */}</h4>
        </div>
        <div className="timer-nav">
          <button type="button" className="btn btn-outline-info timer">
            <p className='mx-2 border-bottom p-2'>Timer</p> &nbsp;<h3>{time}</h3>&nbsp;<h6>sec</h6>
            <button className='btn play' onClick={handleTimer}>
              <i className={`fa-solid fa-${status === 'RUNNING' ? 'pause' : 'play'}`}></i>
            </button>
            {timerStatus &&
              <div className='flexer'>
                {/* <button className='btn' onClick={pause}>
                  <i className={`fa-solid fa-pause`}></i>
                </button> */}
                <button className='btn' onClick={reset}>
                  <i className={`fa-solid fa-reply`}></i>
                </button>
              </div>
            }
          </button>
          <hr />
        </div>
        <div className="QuesArea">
          {loading &&
            <div>
              <h4>
                <div className="spinner-border spinner-s mx-3" style={{ width: "2rem", height: " 2rem" }} role="status"></div>
                Getting your questions ready...
              </h4>
            </div>
          }
          {error && <div className="error">{error}</div>}
          {!loading && !error && displayedQuestions.length > 0 &&
            displayedQuestions.map((question, index) => (
              <div key={index} className="ques">
                <h4>{index + 1}. {question.question}</h4>
                <div className="options">
                  {question.options && question.options.map((optionObj, idx) => (
                    <button
                      key={idx}
                      className={`option-button ${selectedAnswers[index] === optionObj.option ? 'selected' : ''}`}
                      onClick={() => handleOptionClick(index, optionObj.option)}
                    >
                      {String.fromCharCode(65 + idx).toLocaleLowerCase()}. {optionObj.option}
                    </button>
                  ))}
                </div>
              </div>
            ))
          }
          {!loading && !error && displayedQuestions.length === 0 &&
            <div>No questions available.</div>
          }
        </div>
        <div className="Action-btns">
          {displayedQuestions.length < questions.length &&
            <button className="btn btn-outline-primary next-btn" onClick={loadMoreQuestions}>
              Load More
            </button>
          }
          {!loading && displayedQuestions.length === questions.length &&
            <div className="quota-message">
              <p>Today's quota of questions completed. Come back tomorrow for more questions.</p>
            </div>
          }
          <div className='score-bar'>
            {!loading && displayedQuestions.length >= 1 &&
              <button className='btn btn-success mb-5' onClick={handleSubmit} disabled={submitting}>
                {submitting ?
                  <div>
                  <h4>
                    <div className="spinner-border spinner-s mx-3" style={{ width: "2rem", height: " 2rem" }} role="status"></div>
                    Ai scoring ongoing...
                  </h4>
                </div>
                  :
                  <p>Submit to see live score</p>
                }
              </button>
            }
            {showScore &&!submitting &&
              <div className="score">
                <h5>You scored: {score} / {questions.length}</h5>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default QuesCamp;
