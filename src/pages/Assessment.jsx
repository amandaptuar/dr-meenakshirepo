import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assessment.css';

const API_BASE = '/api/v1';

const Assessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro'); // intro, loading_q, questions, loading_a
  const [error, setError] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '' 
  });

  // Questions & Responses
  const [assessmentId, setAssessmentId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({}); // { itemId: value }
  const [currentQIndex, setCurrentQIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleStart = async (e) => {
    e.preventDefault();
    setError(null);
    setStep('loading_q');

    try {
      const res = await fetch(`${API_BASE}/generate-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age),
          gender: formData.gender,
          locale: 'en'
        })
      });

      if (!res.ok) throw new Error('Failed to generate questions. Please try again.');
      
      const data = await res.json();
      setAssessmentId(data.assessmentId);
      
      const flatQuestions = [];
      if (data.sections) {
        data.sections.forEach(section => {
          if (section.items) {
            section.items.forEach(item => {
              flatQuestions.push({
                ...item,
                domain: section.title
              });
            });
          }
        });
      }
      
      setQuestions(flatQuestions);
      setStep('questions');
    } catch (err) {
      setError(err.message);
      setStep('intro');
    }
  };

  const handleAnswer = (val) => {
    const q = questions[currentQIndex];
    const updatedResponses = { ...responses, [q.id]: val };
    setResponses(updatedResponses);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      submitAnalysis(updatedResponses);
    }
  };

  const submitAnalysis = async (finalResponses) => {
    setStep('loading_a');
    try {
      const formattedResponses = Object.keys(finalResponses).map(key => ({
        itemId: key,
        value: finalResponses[key]
      }));

      // API docs expect specific enums for analyze endpoint vs generate endpoint
      let mappedGender = formData.gender;
      if (mappedGender === 'non_binary') mappedGender = 'other';
      if (mappedGender === 'prefer_not_to_say') mappedGender = 'prefer-not-to-say';

      const payload = {
        assessmentId: assessmentId,
        age: parseInt(formData.age),
        gender: mappedGender,
        responses: formattedResponses
      };
      
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Analysis failed. Please try again.');
      
      const analysisData = await res.json();
      navigate('/dashboard', { state: { analysisData, user: formData } });
      
    } catch (err) {
      setError(err.message);
      setStep('questions');
    }
  };

  return (
    <div className="assessment-page">
      <div className="assessment__bg"></div>
      <div className="container assessment__inner">
        
        {error && <div className="assessment-error">{error}</div>}

        {step === 'intro' && (
          <div className="assessment-card fade-in">
            <h1 className="assessment-title">Tell Us About Yourself</h1>
            <p className="assessment-desc">We need a few details to personalize your cognitive wellness assessment.</p>
            <form className="assessment-form" onSubmit={handleStart}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age (18-25)</label>
                  <input required type="number" min="18" max="25" placeholder="e.g. 22" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary w-100" style={{ marginTop: '20px' }}>Begin Assessment</button>
            </form>
          </div>
        )}

        {step === 'loading_q' && (
          <div className="assessment-loading fade-in">
            <div className="spinner"></div>
            <h2>Generating your personalized assessment...</h2>
            <p>Our AI is tailoring questions based on your profile.</p>
          </div>
        )}

        {step === 'questions' && questions.length > 0 && (
          <div className="assessment-quiz fade-in" style={{ maxWidth: '800px', width: '100%' }}>
            <div className="quiz-header" style={{ marginBottom: '32px', display: 'block', textAlign: 'center' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', margin: 0 }}>Cognitive Assessment</h2>
              <p style={{ color: '#666', marginTop: '12px', fontSize: '16px' }}>Please answer all questions below to get your personalized report.</p>
            </div>
            
            <div className="quiz-list">
              {questions.map((q, idx) => (
                <div key={q.id} className="quiz-list-item" style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #eaeaea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 700, color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Question {idx + 1}</span>
                    <span className="quiz-domain">{q.domain.replace(/_/g, ' ')}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '24px', lineHeight: 1.4 }}>{q.text}</h3>
                  
                  <div className="quiz-radio-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
                    {[0, 1, 2, 3, 4].map((val) => (
                      <label key={val} style={{ 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', 
                        cursor: 'pointer', padding: '16px 8px', borderRadius: '12px',
                        border: responses[q.id] === val ? '2px solid var(--primary)' : '2px solid #f0f0f0',
                        background: responses[q.id] === val ? 'rgba(212,20,58,0.05)' : '#fafafa',
                        transition: 'all 0.2s ease',
                        boxShadow: responses[q.id] === val ? '0 4px 12px rgba(212,20,58,0.1)' : 'none'
                      }}>
                        <input 
                          type="radio" 
                          name={q.id} 
                          value={val} 
                          checked={responses[q.id] === val}
                          onChange={() => setResponses({ ...responses, [q.id]: val })}
                          style={{ margin: 0, width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', textAlign: 'center', fontWeight: responses[q.id] === val ? 700 : 500, color: responses[q.id] === val ? 'var(--primary)' : '#666' }}>
                          {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'][val]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="btn-primary w-100" 
              onClick={() => submitAnalysis(responses)}
              disabled={Object.keys(responses).length !== questions.length}
              style={{ 
                padding: '20px', 
                fontSize: '18px', 
                marginTop: '24px', 
                opacity: Object.keys(responses).length !== questions.length ? 0.5 : 1,
                cursor: Object.keys(responses).length !== questions.length ? 'not-allowed' : 'pointer'
              }}
            >
              {Object.keys(responses).length !== questions.length 
                ? `Please answer all questions (${Object.keys(responses).length} of ${questions.length} completed)` 
                : 'Submit Assessment'}
            </button>
          </div>
        )}

        {step === 'loading_a' && (
          <div className="assessment-loading fade-in">
            <div className="spinner"></div>
            <h2>Analyzing your responses...</h2>
            <p>Processing cognitive markers and lifestyle impacts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
