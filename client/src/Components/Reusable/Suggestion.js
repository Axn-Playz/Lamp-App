import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Suggestion = ({ data }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const dataa = {
    educationLevel: "Graduate",
    interests: ["Technology", "Engineering"],
    skills: ["Analytical thinking", "Problem-solving"],
    careerGoals: "To become a software engineer",
    industriesOfInterest: ["Technology", "Finance"],
    workExperience: "Yes, I have work experience.",
    majorFieldOfStudy: "Computer Science",
    willingToRelocate: "Yes",
    financialConstraints: "No",
    additionalInfo: "I'm passionate about technology and eager to learn."
  };

  useEffect(() => {
    const handleSuggestions = async () => {
      setLoading(true);
      try {
        const apiKey = "AIzaSyDQzs-I2hXHqtbBL_cp5ch3SgTzrTxn8gY";
        const model = 'models/gemini-1.5-pro-latest';
        const version = 'v1beta';

        // Fetching data from the db
        const dataDb = await axios.post(`http://localhost:8000/account/${localStorage.getItem('userName')}`);
        const userInfo = dataDb.data.data || dataa;
        console.log(userInfo)

        const prompt = `
          You are a helpful career counselor. Based on the following information about a user:
          ${JSON.stringify(userInfo)} 

          Suggest 3 relevant career paths. For each suggestion, provide:
          - title 
          - short_description (around 20 words)
          - long_description (at least 40 words and less than 50 words)
          - skills (a list of 4 relevant skills)
          - make a array which includes 5 steps to become the suggested one from the user point of view after analyzing the userInfo. Also include three bullet points for the in-depth process on each step.
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
        console.log("Raw response:", resData); // Log for debugging

        if (resData.candidates && resData.candidates.length > 0) {
          const contentPart = resData.candidates[0].content.parts[0]?.text;
          if (contentPart) {
            try {
              const generatedText = JSON.parse(contentPart);
              console.log("Parsed JSON:", generatedText); // Add detailed logging
              setResult(generatedText.suggestions);
              localStorage.setItem('aiResponse', JSON.stringify(generatedText.suggestions));
            } catch (error) {
              console.error('Error parsing response as JSON:', error, 'Response text:', contentPart); // Log the raw text
              setResult([]);
            }
          } else {
            console.log('No valid content part in the response.');
            setResult([]);
          }
        } else {
          console.log('No response from AI.');
          setResult([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    const storedResult = localStorage.getItem('aiResponse');
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing stored result:', error);
        handleSuggestions();
      }
    } else {
      handleSuggestions();
    }
  }, []);

  const handleCardClick = (suggestion) => {
    setSelectedCard(suggestion);
  };

  const handleConfirmBtn = async () => {
    try {
      const data = await axios.post("http://localhost:8000/account/load", {
        username: localStorage.getItem('userName'),
        selectedCourse: selectedCard
      });
      if (data) {
        console.log(data.data);
        setTimeout(() => {
          navigate('/user');
        }, 1000);
        console.log(selectedCard)
      }
    } catch (error) {
      console.log('Error at selected Course', error);
    }
  };
  console.log('ai generated result is ',result);
  console.log('selected card is',selectedCard)

  return (
    <>
      <h1 className="sughead">AI Suggests:</h1>
      <div className="mainSug">
        {loading ? (
          <p style={{ color: 'white' }}>Waiting for the response...</p>
        ) : (
          <>
            <Typewriter
              options={{
                delay: 25,
                cursor: '✒️',
                deleteSpeed: 12,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString('<span style="color:white">I have analyzed the answer you provided before.</span>')
                  .pauseFor(500)
                  .deleteAll();
                typewriter
                  .typeString('<span style="color:white">Based on your profile, you might find these career paths interesting.</span>')
                  .start();
              }}
            />

            <div className="row">
              {result && result.length > 0 ? (
                result.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`col-md-4 mb-3`}
                    onClick={() => handleCardClick(suggestion)}
                  >
                    <div className={`card text-bg-${['primary', 'secondary', 'success', 'info', 'light'][index % 5]} ${selectedCard === suggestion ? 'active' : ''} h-100`}>
                      <div className="card-header" data-value={suggestion.title}>
                        <h5>{suggestion.title}</h5>
                      </div>
                      <div className="card-body">
                        <div className="card-text front-text">
                          <strong>Short Description:</strong> {suggestion.short_description}<br /><br />
                          <strong>Relevant Skills:</strong>
                          <ul>
                            {suggestion.skills.map((skill, i) => (
                              <li key={i}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="card-text back-text">
                          <strong>Long Description:</strong> {suggestion.long_description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{color:'white'}}>No career suggestions found. Please try again by refreshing the page. <i className="fa-solid fa-arrows-rotate"></i></p>
              )}
            </div>
          </>
        )}
        {selectedCard && (
          <button className="btn btn-primary load-btn-proceed" onClick={handleConfirmBtn}>
            Confirm and Proceed
          </button>
        )}
      </div>
    </>
  );
};

export default Suggestion;
