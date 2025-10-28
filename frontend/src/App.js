import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import DSA from './pages/DSA';
import SQL from './pages/SQL';
import OS from './pages/OS';
import AIML from './pages/AIML';
import About from './pages/About';
import Contact from './pages/Contact';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const LEARNOVA_INITIAL_MESSAGES = [
  {
    id: 'greeting',
    sender: 'bot',
    segments: [
      {
        type: 'text',
        content: '👋 Hi! I’m Learnova Assistant — your placement prep guide. I can help you understand DSA, OS, DBMS, SQL, or AI/ML concepts, and even generate code for you in Python, C++, or Java.'
      }
    ]
  },
  {
    id: 'purpose',
    sender: 'bot',
    segments: [
      {
        type: 'text',
        content: 'Ask me anything, share the topic you are studying, or request code. I will reply with explanations, optimized snippets, and follow-up suggestions tailored to Learnova.'
      }
    ]
  },
  {
    id: 'suggestions',
    sender: 'bot',
    type: 'suggestions'
  }
];

const LEARNOVA_SUGGESTIONS = [
  'Outline OS scheduling algorithms',
  'Generate Python code for merge sort',
  'Share DBMS normalization tips',
  'Summarize AI/ML learning path',
  'List top SQL interview questions'
];

const LEARNOVA_QUICK_ACTIONS = [
  {
    label: 'Generate Java DSA code',
    value: 'Write Java code for binary search tree insertion'
  },
  {
    label: 'Explain OS concept',
    value: 'Explain deadlock avoidance in operating systems'
  },
  {
    label: 'SQL practice set',
    value: 'Give me advanced SQL practice problems'
  },
  {
    label: 'DSA roadmap',
    value: 'Create a DSA study roadmap for 4 weeks'
  }
];

const parseAssistantContent = (content) => {
  const segments = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match = regex.exec(content);
  while (match) {
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) {
        segments.push({ type: 'text', content: text });
      }
    }
    segments.push({ type: 'code', language: match[1] || 'text', content: match[2].trim() });
    lastIndex = regex.lastIndex;
    match = regex.exec(content);
  }
  if (lastIndex < content.length) {
    const text = content.slice(lastIndex).trim();
    if (text) {
      segments.push({ type: 'text', content: text });
    }
  }
  return segments.length ? segments : [{ type: 'text', content }];
};

const LearnovaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [...LEARNOVA_INITIAL_MESSAGES]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const autoOpenRef = useRef(false);
  const copyTimeoutRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoOpenRef.current) {
        setIsOpen(true);
        autoOpenRef.current = true;
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const openChat = () => {
    setIsOpen(true);
    autoOpenRef.current = true;
  };

  const handleCopy = (id, value) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedId(id);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    });
  };

  const handleSend = async (value) => {
    const content = (value ?? inputValue).trim();
    if (!content) {
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: content
      }
    ]);
    setInputValue('');
    setIsTyping(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, { message: content });
      const assistantContent = response.data?.content ?? '';
      const segments = parseAssistantContent(assistantContent);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          segments
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-error-${Date.now()}`,
          sender: 'bot',
          segments: [
            {
              type: 'text',
              content: 'I ran into an issue while generating that. Please try again in a moment.'
            }
          ]
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white shadow-2xl border border-gray-200 rounded-3xl overflow-hidden transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">💡</div>
              <div>
                <div className="text-sm font-semibold">Learnova Assistant</div>
                <div className={`learnova-typing-indicator ${isTyping ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
                  <span className="learnova-typing-dot" />
                  <span className="learnova-typing-dot" />
                  <span className="learnova-typing-dot" />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Minimize Learnova Assistant"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-4 h-4"
              >
                <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="bg-white px-5 pt-5 pb-4">
            <div className="h-72 overflow-y-auto space-y-4 pr-1 transition-all duration-300">
              {messages.map((message) => {
                if (message.type === 'suggestions') {
                  return (
                    <div key={message.id} className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl bg-gray-100 text-gray-700 px-4 py-4 space-y-3 text-sm">
                        <div className="font-medium text-gray-800">Try one of these to get started:</div>
                        <div className="flex flex-wrap gap-2">
                          {LEARNOVA_SUGGESTIONS.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => handleSend(suggestion)}
                              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-gray-700 text-xs font-medium hover:from-blue-200 hover:via-indigo-200 hover:to-purple-200 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-300 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white'
                          : 'bg-gray-100 text-gray-800 space-y-3'
                      }`}
                    >
                      {message.segments ? (
                        message.segments.map((segment, index) => {
                          if (segment.type === 'code') {
                            const segmentId = `${message.id}-segment-${index}`;
                            return (
                              <div key={segmentId} className="learnova-code-block">
                                <button
                                  type="button"
                                  className="learnova-copy-button"
                                  onClick={() => handleCopy(segmentId, segment.content)}
                                >
                                  {copiedId === segmentId ? 'Copied' : 'Copy'}
                                </button>
                                <SyntaxHighlighter
                                  language={segment.language}
                                  style={vscDarkPlus}
                                  wrapLongLines
                                  customStyle={{
                                    margin: 0,
                                    borderRadius: '1rem',
                                    padding: '1.25rem',
                                    fontSize: '0.75rem',
                                    background: '#111827'
                                  }}
                                >
                                  {segment.content}
                                </SyntaxHighlighter>
                              </div>
                            );
                          }
                          return (
                            <div key={`${message.id}-segment-${index}`} className="space-y-2 text-sm text-gray-800">
                              {segment.content.split('\n').map((line, lineIndex) => (
                                <p key={`${message.id}-text-${index}-${lineIndex}`}>{line}</p>
                              ))}
                            </div>
                          );
                        })
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl">
                    <div className="learnova-typing-indicator">
                      <span className="learnova-typing-dot" />
                      <span className="learnova-typing-dot" />
                      <span className="learnova-typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={onSubmit} className="mt-4 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask for explanations or code..."
                className="w-full rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-3 px-4 pr-12 text-sm"
              />
              {inputValue.trim().length > 0 && (
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-purple-500 transition-colors"
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-5 h-5"
                  >
                    <path d="M3 12L21 3L14 12L21 21L3 12Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </form>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-gray-500 mb-2">Quick help</div>
              <div className="flex flex-wrap gap-2">
                {LEARNOVA_QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.value}
                    type="button"
                    onClick={() => handleSend(action.value)}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openChat}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-xl flex items-center justify-center text-2xl text-white hover:scale-105 transition-transform"
          aria-label="Open Learnova Assistant"
        >
          💬
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dsa" element={<DSA />} />
            <Route path="/sql" element={<SQL />} />
            <Route path="/os" element={<OS />} />
            <Route path="/aiml" element={<AIML />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <LearnovaAssistant />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
