import { useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Handle case where user navigates directly to results page
  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please complete the mental health assessment first.
          </p>
          <button
            onClick={() => navigate('/problem')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const { diagnosis, confidence } = state;

  // Disorder details: Symptoms & Recommendations
  const disorderData = {
    MDD: {
      name: 'Major Depressive Disorder (MDD)',
      symptoms: [
        'Persistent sadness or low mood',
        'Loss of interest in activities',
        'Fatigue or low energy',
        'Changes in appetite and sleep',
      ],
      recommendations: [
        'Consult a licensed mental health professional',
        'Engage in regular physical activity',
        'Practice mindfulness meditation daily',
      ],
    },
    Anxiety: {
      name: 'Generalized Anxiety Disorder (GAD)',
      symptoms: [
        'Excessive worry or fear',
        'Restlessness and irritability',
        'Difficulty concentrating',
        'Physical symptoms like rapid heartbeat',
      ],
      recommendations: [
        'Consider cognitive behavioral therapy',
        'Practice deep breathing exercises',
        'Maintain a regular sleep schedule',
      ],
    },
    Bipolar: {
      name: 'Bipolar Disorder',
      symptoms: [
        'Extreme mood swings',
        'Periods of high energy followed by depression',
        'Impulsivity and risky behavior',
        'Sleep disturbances',
      ],
      recommendations: [
        'Seek psychiatric consultation',
        'Maintain a stable daily routine',
        'Avoid alcohol and drugs',
      ],
    },
    PTSD: {
      name: 'Post-Traumatic Stress Disorder (PTSD)',
      symptoms: [
        'Flashbacks and intrusive thoughts',
        'Emotional numbness',
        'Avoiding places or reminders of trauma',
        'Difficulty sleeping and concentrating',
      ],
      recommendations: [
        'Consider trauma-focused therapy',
        'Practice grounding techniques',
        'Engage in support groups',
      ],
    },
    ADHD: {
      name: 'Attention-Deficit/Hyperactivity Disorder (ADHD)',
      symptoms: [
        'Difficulty focusing on tasks',
        'Impulsivity and hyperactivity',
        'Frequent forgetfulness',
        'Struggles with time management',
      ],
      recommendations: [
        'Break tasks into smaller steps',
        'Use reminders and schedules',
        'Consider behavioral therapy',
      ],
    },
    'Eating Disorder': {
      name: 'Eating Disorder',
      symptoms: [
        'Extreme concerns about body weight',
        'Unhealthy eating behaviors',
        'Frequent dieting or binge eating',
        'Preoccupation with food and calories',
      ],
      recommendations: [
        'Seek professional nutritional counseling',
        'Join a support group',
        'Practice self-acceptance and body positivity',
      ],
    },
    'Sleeping Disorder': {
      name: 'Sleeping Disorder',
      symptoms: [
        'Difficulty falling or staying asleep',
        'Daytime fatigue and drowsiness',
        'Snoring or breathing problems during sleep',
        'Frequent nightmares or sleepwalking',
      ],
      recommendations: [
        'Follow a consistent sleep schedule',
        'Limit screen time before bed',
        'Practice relaxation techniques before sleep',
      ],
    },
    ASD: {
      name: 'Autism Spectrum Disorder (ASD)',
      symptoms: [
        'Difficulty with social interactions',
        'Repetitive behaviors or fixations',
        'Sensitivity to sensory stimuli',
        'Struggles with changes in routine',
      ],
      recommendations: [
        'Early intervention programs',
        'Social skills training',
        'Structured routines and visual aids',
      ],
    },
    Loneliness: {
      name: 'Loneliness',
      symptoms: [
        'Feeling isolated or disconnected',
        'Lack of meaningful social relationships',
        'Increased stress or sadness',
        'Difficulty opening up to others',
      ],
      recommendations: [
        'Join social or hobby groups',
        'Engage in volunteering activities',
        'Consider therapy for social anxiety',
      ],
    },
    PDD: {
      name: 'Persistent Depressive Disorder (PDD)',
      symptoms: [
        'Chronic sadness lasting for years',
        'Low self-esteem and hopelessness',
        'Difficulty experiencing joy',
        'Changes in appetite and sleep',
      ],
      recommendations: [
        'Long-term psychotherapy',
        'Regular exercise and healthy diet',
        'Medication (if prescribed by a doctor)',
      ],
    },
    'psychotic deprission': {
      name: 'Psychotic Depression',
      symptoms: [
        'Severe depression with hallucinations',
        'Paranoia or delusional thinking',
        'Intense feelings of worthlessness',
        'Social withdrawal and isolation',
      ],
      recommendations: [
        'Immediate psychiatric intervention',
        'Medication and therapy combination',
        'Consistent monitoring and support',
      ],
    },
    'no symptoms detected': {
      name: 'No Symptoms Detected  🌟',
      symptoms: ['No mental health concerns identified based on your inputs.'],
      recommendations: [
        'Maintain a healthy lifestyle',
        'Practice mindfulness and self-care',
        'Stay socially active and connected',
      ],
    },
  };

  const disorder = disorderData[diagnosis] ||disorderData['Loneliness'];// {
   //name: 'Lonliness, Anxiety',
   //symptoms: ['Symptoms vary based on the individual’s condition.'],
   //recommendations: [
     //'Consult a licensed mental health professional',
     //'Engage in self-care and relaxation techniques',
     // 'Stay connected with supportive people',
    //],
  //};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Diagnosis Results
        </h1>

        {/* Diagnosis Section */}
        <div className="bg-yellow-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            Diagnosis: {disorder.name}
          </h3>
          <p className="text-gray-700">
            Confidence Score: <strong>{confidence}%</strong>
          </p>
        </div>

        {/* Symptoms Section */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Possible Symptoms
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {disorder.symptoms.map((symptom, index) => (
              <li key={index} className="text-gray-700">
                {symptom}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations Section */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            Recommended Actions
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {disorder.recommendations.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate('/home')}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/problem')}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Retake Diagnosis
          </button>
        </div>
      </div>
    </div>
  );
}
