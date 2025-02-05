import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/ui/Alert'; // Corrected import statement
import { AlertDescription } from '../components/ui/Alert';

const questions = [
  { text: "Do you have at least one close friend?", feature: 'close.friend' },
  { text: "Do you engage in repetitive behaviors?", feature: 'repetitive.behaviour' },
  { text: "Do you prefer being alone over socializing?", feature: 'introvert' },
  { text: "Do you hear or see things others don't?", feature: 'hallucinations' },
  { text: "Do you breathe rapidly when anxious or scared?", feature: 'breathing.rapidly' },
  { text: "Do you get angry over small things?", feature: 'anger' },
  { text: "Do stressful memories suddenly pop up in your mind?", feature: 'popping.up.stressful.memory' },
  { text: "Do you often feel negative about yourself?", feature: 'feeling.negative' },
  { text: "Do you have frequent nightmares?", feature: 'having.nightmares' },
  { text: "Do you have sudden energy bursts followed by extreme tiredness?", feature: 'increased.energy' },
  { text: "Do you sweat excessively without physical activity?", feature: 'sweating' },
  { text: "Have you noticed sudden weight gain or loss?", feature: 'weight.gain' },
  { text: "Do you struggle to focus or complete tasks?", feature: 'having.trouble.with.work' },
  { text: "Do you feel tired most of the time?", feature: 'feeling.tired' },
  { text: "Have you ever had thoughts of self-harm or suicide?", feature: 'suicidal.thought' }
];

export default function Problem() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    const feature = questions[currentQuestion].feature;
    const numericAnswer = answer === 'yes' ? 1 : 0;
    const newAnswers = { ...answers, [feature]: numericAnswer };

    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitAnswers(newAnswers);
    }
  };

  const submitAnswers = async (finalAnswers) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        answers: finalAnswers
      };
  
      console.log('Sending payload:', JSON.stringify(payload,null,2));

      const response = await axios.post(
        'http://localhost:5000/api/predict', 
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-4 h-2 bg-gray-200 rounded">
          <div 
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h2 className="text-2xl font-semibold text-blue-600 mb-6">
          Question {currentQuestion + 1}/{questions.length}
        </h2>

        <p className="text-gray-700 mb-8 text-lg">
          {questions[currentQuestion].text}
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => handleAnswer('yes')}
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer('no')}
            disabled={isSubmitting}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
