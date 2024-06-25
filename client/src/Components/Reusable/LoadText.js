import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Suggestion from './Suggestion';

const LoadText = () => {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState(false);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const [data,setData] = useState('');

  const texts = [
    "",
    "Getting things ready",
    "For You",
    "A.I. is analyzing...",
    "✨✨✨",
    "✨✨",
    "✨",
    "Almost Done",
    "Thank You",
    ":)",
    "Welcome To LAMP"
  ];

  const morphTime = 2;
  const cooldownTime = 0.4;
  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  useEffect(() => {
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    if (text1 && text2) {
      text1.textContent = texts[textIndex % texts.length];
      text2.textContent = texts[(textIndex + 1) % texts.length];

      const animate = () => {
        requestAnimationFrame(animate);

        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
          if (shouldIncrementIndex) {
            textIndex++;
          }

          doMorph();
        } else {
          doCooldown();
        }
      };

      const doMorph = () => {
        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;

        if (fraction > 1) {
          cooldown = cooldownTime;
          fraction = 1;
        }

        setMorph(fraction);
      };

      const setMorph = (fraction) => {
        text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        text1.textContent = texts[textIndex % texts.length];
        text2.textContent = texts[(textIndex + 1) % texts.length];
      };

      const doCooldown = () => {
        morph = 0;

        text2.style.filter = "";
        text2.style.opacity = "100%";

        text1.style.filter = "";
        text1.style.opacity = "0%";
      };

      animate();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuggestion(true)
    }, 27000);
  }, []);

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        console.log(localStorage.getItem('userName'));
        const { data } = await axios.post(`http://localhost:8000/account/${localStorage.getItem('userName')}`);
        setData(data.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentData();
  }, []);

  console.log(suggestion);

  return (
    <>
      {suggestion === true ? (
        <Suggestion data={data}/>
      ) : (
        <div>
          <div
            id="text-box"
            style={{
              position: 'absolute',
              margin: 'auto',
              width: '100vw',
              height: '80pt',
              top: '0',
              bottom: '0',
              filter: 'url(#threshold) blur(0.6px)'
            }}>
            <span
              id="text1"
              ref={text1Ref}
              style={{
                color: '#2CAFAC',
                position: 'absolute',
                width: '100%',
                display: 'inlineBlock',
                fontFamily: 'Raleway, sans-serif',
                fontSize: '80pt',
                fontWeight: 'bolder',
                textAlign: 'center',
                userSelect: 'none'
              }}>
            </span>
            <span
              id="text2"
              ref={text2Ref}
              style={{
                color: '#2CAFAC',
                position: 'absolute',
                width: '100%',
                display: 'inlineBlock',
                fontFamily: 'Raleway, sans-serif',
                fontSize: '80pt',
                textAlign: 'center',
                fontWeight: 'bolder',
                userSelect: 'none'
              }}>
            </span>
          </div>

          <svg id="filters">
            <defs>
              <filter id="threshold">
                <feColorMatrix in="SourceGraphic" type="matrix"
                  values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140" />
              </filter>
            </defs>
          </svg>

        </div>
      )}
    </>
  );
};

export default LoadText;
