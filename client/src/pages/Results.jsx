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

  // Customize recommendations based on diagnosis
  let recommendations = [];
  if (diagnosis === 'MDD') {
    recommendations = [
      'Consult a licensed mental health professional',
      'Engage in regular physical activity',
      'Practice mindfulness meditation daily',
    ];
  } else if (diagnosis === 'Anxiety') {
    recommendations = [
      'Consider cognitive behavioral therapy',
      'Practice deep breathing exercises',
      'Maintain a regular sleep schedule',
    ];
  } else {
    recommendations = [
      'Consult a licensed mental health professional',
      'Engage in physical activity regularly',
      'Maintain a balanced diet',
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Assessment Results
        </h1>

        {/* Diagnosis Section */}
        {/* Recommendations Section */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            Recommended Actions
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {(recommendations || defaultRecommendations).map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/problem')}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}