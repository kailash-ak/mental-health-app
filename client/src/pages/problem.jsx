import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/ui/Alert';
import { AlertDescription } from '../components/ui/Alert';

const questions = [
  { text: "Do you have at least one close friend?", feature: 'close.friend', type: 'binary' },
  { text: "Do you engage in repetitive behaviors?", feature: 'repetitive.behaviour', type: 'binary' },
  { text: "Do you prefer being alone over socializing?", feature: 'introvert', type: 'binary' },
  { text: "Do you hear or see things others don't?", feature: 'hallucinations', type: 'binary' },
  { text: "Do you breathe rapidly when anxious or scared?", feature: 'breathing.rapidly', type: 'binary' },
  { text: "Do you get angry over small things?", feature: 'anger', type: 'binary' },
  { text: "Do stressful memories suddenly pop up in your mind?", feature: 'popping.up.stressful.memory', type: 'binary' },
  { text: "Do you often feel negative about yourself?", feature: 'feeling.negative', type: 'binary' },
  { text: "Do you have sudden energy bursts followed by extreme tiredness?", feature: 'increased.energy', type: 'binary' },
  { text: "Have you noticed sudden weight gain or loss?", feature: 'weight.gain', type: 'binary' },
  { text: "Do you struggle to focus or complete tasks?", feature: 'having.trouble.with.work', type: 'binary' },
  { text: "Do you feel tired most of the time?", feature: 'feeling.tired', type: 'binary' },
  { text: "Have you ever had thoughts of self-harm or suicide?", feature: 'suicidal.thought', type: 'binary' },
  // Special handling for social media questions
  { text: "How many hours per day do you spend on social media?", feature: 'social.media.addiction', type: 'social_media' },
  { text: "Has social media usage affected your sleep schedule?", feature: 'social.media.impact', type: 'binary' },
  // Special handling for hopelessness
  { text: "How often do you feel like giving up on your goals or ambitions?", feature: 'hopelessness', type: 'hopelessness' }
];

export default function Problem() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState('right'); // For animation direction
  const navigate = useNavigate();

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion) / (questions.length - 1)) * 100;

  const handleAnswer = (answer) => {
    const { feature, type } = questions[currentQuestion];

    let numericAnswer;
    if (type === 'binary') {
      numericAnswer = answer === 'yes' ? 1 : 0;
    } else if (type === 'social_media') {
      numericAnswer = answer === 'low' ? 0 : 1;
    } else if (type === 'hopelessness') {
      numericAnswer = answer === 'low_group' ? 0 : 1;
    }

    const newAnswers = { ...answers, [feature]: numericAnswer };
    setAnswers(newAnswers);
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection('right');
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitAnswers();
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setDirection('left');
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const { feature } = questions[currentQuestion];
    return feature in answers;
  };

  const submitAnswers = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/predict',
        { answers },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000
        }
      );

      if (response.data) {
        navigate('/Results', { 
          state: response.data,
          replace: true
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred while submitting your answers.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Unable to reach the server. Check your connection.';
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonColorClass = (isSelected, buttonType) => {
    if (buttonType === 'yes' || buttonType === 'no' || buttonType === 'low' || buttonType === 'low_group') {
      return isSelected ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100';
    } else if (buttonType === 'high_group') {
      return isSelected ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100';
    } else if (buttonType === 'always') {
      return isSelected ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100';
    } else {
      return isSelected ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100';
    }
  };

  const renderOptions = () => {
    const { type, feature } = questions[currentQuestion];
    const currentAnswer = answers[feature];

    if (type === 'binary') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleAnswer('yes')}
            disabled={isSubmitting}
            className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 1, 'yes')}`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer('no')}
            disabled={isSubmitting}
            className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 0, 'no')}`}
          >
            No
          </button>
        </div>
      );
    }

    if (type === 'social_media') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleAnswer('low')}
            disabled={isSubmitting}
            className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 0, 'low')}`}
          >
            1 to 3 hrs
          </button>
          <button
            onClick={() => handleAnswer('high')}
            disabled={isSubmitting}
            className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 1, 'high')}`}
          >
            More than 4 hrs
          </button>
        </div>
      );
    }

    if (type === 'hopelessness') {
      return (
        <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleAnswer('low_group')}
          disabled={isSubmitting}
          className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 0, 'low_group')}`}
        >
          Never
        </button>
        <button 
          onClick={() => handleAnswer('medium_group')}
          disabled={isSubmitting}
          className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 0, 'medium_group')}`}
        >
          Occasionally
        </button>
        <button 
          onClick={() => handleAnswer('high_group')}
          disabled={isSubmitting}
          className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 1, 'high_group')}`}
        >
          Often
        </button>
        <button
          onClick={() => handleAnswer('always')}
          disabled={isSubmitting}
          className={`py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-102 shadow-sm ${getButtonColorClass(currentAnswer === 1, 'always')}`}
        >
          Always
        </button>
      </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-teal-50 p-4 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-12 left-1/4 w-64 h-64 bg-sky-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 right-1/4 w-64 h-64 bg-teal-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-100 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Progress bar */}
        <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 mb-6 shadow-inner">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 relative overflow-hidden border border-white/50">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full opacity-70"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-sky-50 rounded-full opacity-70"></div>
          
          {error && (
            <Alert variant="destructive" className="mb-6 border-l-4 border-red-500">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Question <span className="text-slate-600">{currentQuestion + 1}</span>
              <span className="text-slate-400">/{questions.length}</span>
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>

          <div 
            key={currentQuestion}
            className={`mb-8 transition-all duration-300 transform ${
              direction === 'right' ? 'slide-in-right' : 'slide-in-left'
            }`}
            style={{
              animation: `${direction === 'right' ? 'slideInRight' : 'slideInLeft'} 0.3s forwards`
            }}
          >
            <p className="text-slate-700 text-xl font-medium">
              {questions[currentQuestion].text}
            </p>
          </div>

          {/* CSS animations for slide effects */}
          <style jsx>{`
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(50px); }
              to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-50px); }
              to { opacity: 1; transform: translateX(0); }
            }
            
            .slide-in-right {
              animation: slideInRight 0.3s forwards;
            }
            
            .slide-in-left {
              animation: slideInLeft 0.3s forwards;
            }
          `}</style>

          <div className="space-y-4">
            {renderOptions()}
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={moveToPreviousQuestion}
              disabled={currentQuestion === 0 || isSubmitting}
              className={`flex items-center px-4 py-2 rounded-xl transition-all shadow-sm ${
                currentQuestion === 0 
                  ? 'opacity-50 cursor-not-allowed bg-slate-100/70 backdrop-blur-sm text-slate-400' 
                  : 'bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            
            <button
              onClick={moveToNextQuestion}
              disabled={!isCurrentQuestionAnswered() || isSubmitting}
              className={`flex items-center px-6 py-2 rounded-xl font-medium transition-all shadow-sm ${
                !isCurrentQuestionAnswered() 
                  ? 'opacity-50 cursor-not-allowed bg-slate-100/70 backdrop-blur-sm text-slate-400' 
                  : currentQuestion === questions.length - 1
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              {currentQuestion !== questions.length - 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
