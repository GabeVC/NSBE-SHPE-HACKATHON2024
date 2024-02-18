import React, { useState, useEffect } from 'react';

import './News.css';
import Navbar from './Navbar';

function News() {
  const [newsItems] = useState([
    {
      id: 1,
      title: 'Ex-Goldman analyst found guilty of ...',
      content: 'A former Goldman Sachs analyst was found guilty of insider trading after making trades based on confidential information.',
      url: 'https://www.cnn.com/2024/02/15/investing/ex-goldman-analyst-guilty-insider-dealing/index.html',
      imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2005005129.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp',
      questions: [
        {
          questionText: 'What was the former Goldman Sachs analyst guilty of?',
          options: ['Embezzlement', 'Insider trading', 'Tax evasion', 'Money laundering'],
          correctAnswer: 'Insider trading',
        },
        {
          questionText: 'How long was Mohammed Zina sentenced to prison?',
          options: ['12 months', '22 months', '30 months', '36 months'],
          correctAnswer: '22 months',
        },
        {
          questionText: 'Which company was involved in the $32 billion acquisition?',
          options: ['Goldman Sachs', 'SoftBank', 'Arm', 'Clifford Chance'],
          correctAnswer: 'Arm',
        },
        {
          questionText: 'What did Mohammed Zina use to buy shares?',
          options: ['Personal savings', 'Insider information', 'Public research', 'Lottery winnings'],
          correctAnswer: 'Insider information',
        },
        {
          questionText: 'Which bank was misled about the purpose of loans?',
          options: ['Barclays', 'Tesco Bank', 'HSBC', 'NatWest'],
          correctAnswer: 'Tesco Bank',
        },
      ],
    },
    {
      id: 2,
      title: 'Morgan Stanley Capital International cuts Chinese stocks from index',
      content: 'MSCI has made significant cuts to Chinese stocks in its global indexes, which could have implications for investors worldwide.',
      url: 'https://www.cnn.com/2024/02/14/markets/msci-china-index-stocks-cut-intl-hnk/index.html',
      imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1984448720.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp',
      question: 'Which index made cuts to Chinese stocks?',
      options: ['Dow Jones', 'S&P 500', 'MSCI', 'Nasdaq'],
      correctAnswer: 'MSCI', // Assuming this is the correct answer
    },
    {
      id: 3,
      title: 'Premarket stocks trading update',
      content: 'Premarket trading sees stocks fluctuating amidst global uncertainty. Investors are treading cautiously.',
      url: 'https://www.cnn.com/2024/02/14/investing/premarket-stocks-trading/index.html',
      imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1975753299.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp',
      question: 'What is the focus of the latest stock market update?',
      options: ['Premarket trading', 'Cryptocurrency', 'Real estate', 'Commodities trading'],
      correctAnswer: 'Premarket trading', // Assuming this is the correct answer
    },
  ]);

  const [quizVisibility, setQuizVisibility] = useState({}); // Example: { 1: false, 2: false, 3: false }
  const [selectedAnswers, setSelectedAnswers] = useState({});


  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/1322201350/photo/digitally-enhanced-shot-of-a-graph-showing-the-ups-and-downs-shares-on-the-stock-market.jpg?s=612x612&w=0&k=20&c=XRsOnrdHQIoqaolR00ganJACUpCxD4JCELt3N3Mm3tk=')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed"; // Keeps the background fixed during scrolling

    // Clean up the effect when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);
  

  useEffect(() => {
    // Initialize quiz visibility state
    const initialVisibility = newsItems.reduce((acc, item) => ({ ...acc, [item.id]: false }), {});
    setQuizVisibility(initialVisibility);
  }, [newsItems]);

  const toggleQuizVisibility = (id) => {
    setQuizVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (itemId, questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [`${itemId}-${questionIndex}`]: option }));
  };

  const isAnswerCorrect = (itemId, questionIndex) => {
    const item = newsItems.find((item) => item.id === itemId);
    const correctAnswer = item.questions[questionIndex].correctAnswer;
    return selectedAnswers[`${itemId}-${questionIndex}`] === correctAnswer;
  };

  return (
    <>
      <Navbar />
      <div className="news-container">
        <h1>Latest Financial News</h1>
        <ul>
          {newsItems.map((item) => (
            <li key={item.id} className="news-item">
              <img src={item.imageUrl} alt={item.title} className="news-image" />
              <div className="news-text">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-title">
                  <h2>{item.title}</h2>
                </a>
                <p>{item.content}</p>
                <button onClick={() => toggleQuizVisibility(item.id)} className="fetch-quizzes-btn">
                  {quizVisibility[item.id] ? 'Hide Quiz' : 'Fetch Quiz'}
                </button>
                {quizVisibility[item.id] && (
                  item.questions.map((question, qIndex) => (
                    <div key={qIndex} className="news-quiz">
                      <p className="quiz-question">{question.questionText}</p>
                      {question.options.map((option, oIndex) => (
                        <label key={oIndex} className="quiz-option">
                          <input 
                            type="radio" 
                            name={`question-${item.id}-${qIndex}`} 
                            value={option} 
                            onChange={() => handleSelectAnswer(item.id, qIndex, option)}
                            checked={selectedAnswers[`${item.id}-${qIndex}`] === option}
                          />
                          {option}
                          {selectedAnswers[`${item.id}-${qIndex}`] === option && (
                            <span className={isAnswerCorrect(item.id, qIndex) ? "answer-correct" : "answer-incorrect"}>
                              {isAnswerCorrect(item.id, qIndex) ? "Correct!" : "Incorrect"}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
                          }  

export default News;