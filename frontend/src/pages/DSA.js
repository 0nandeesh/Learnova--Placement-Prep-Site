import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Code, Star, Zap, BookMarked } from 'lucide-react';
import axios from 'axios';

const DSA = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [resources, setResources] = useState({});

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
    fetchDifficulties();
    fetchResources();
  }, []);

  const filterQuestions = useCallback(() => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(question => question.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(question => question.difficulty === selectedDifficulty);
    }

    setFilteredQuestions(filtered);
  }, [questions, searchTerm, selectedCategory, selectedDifficulty]);

  useEffect(() => {
    filterQuestions();
  }, [filterQuestions]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/');
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/difficulties');
      setDifficulties(response.data.difficulties);
    } catch (error) {
      console.error('Error fetching difficulties:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const [courses, projects, learningPaths, problemSets, materials] = await Promise.all([
        axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/resources/courses'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/resources/projects'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/resources/learning-paths'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/resources/problem-sets'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/resources/materials'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/dsa/resources/all'),
        
      ]);
      setResources({
        courses: courses.data.courses || [],
        projects: projects.data.projects || [],
        learningPaths: learningPaths.data.learning_paths || [],
        problemSets: problemSets.data.problem_sets || [],
        materials: materials.data.resources || []
      });
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Arrays & Strings': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Linked Lists': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Trees & Graphs': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'DP & Backtracking': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Greedy & Miscellaneous': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'LinkedIn DSA': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            DSA Problems
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master data structures and algorithms with our curated collection of 
            problems including LeetCode 150, Top 75, and LinkedIn DSA questions.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Difficulties</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
              <span className="text-sm">
                {filteredQuestions.length} problem{filteredQuestions.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Questions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {question.title}
                  </h3>
                  <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                    {question.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Code className="w-4 h-4" />
                    <span>{question.topic}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{question.source}</span>
                  </div>
                </div>

                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Solve on {question.source}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
            
            </p>
          </motion.div>
        )}
        {/* Learning Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            📚 Learning Resources
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12">
            Comprehensive courses, problem sets, and learning paths curated by experts
          </p>

          {/* Problem Sets */}
          {resources.problemSets && resources.problemSets.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-blue-600 rounded mr-3"></span>
                🎯 Problem Sets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.problemSets.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-200 dark:border-blue-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded">
                        {item.problemCount || 'Problems'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          {resources.courses && resources.courses.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-blue-600 rounded mr-3"></span>
                🎓 Courses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.courses.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-200 dark:border-blue-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {item.difficulty || 'Beginner'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Learning Paths */}
          {resources.learningPaths && resources.learningPaths.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-blue-600 rounded mr-3"></span>
                🛤️ Learning Paths
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.learningPaths.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border border-blue-200 dark:border-blue-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {item.topics && item.topics.length} topics
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {resources.materials && resources.materials.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-blue-600 rounded mr-3"></span>
                <BookMarked className="w-6 h-6 mr-2 text-blue-600" />
                📖 Additional Materials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.materials.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-200 dark:border-blue-700 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200 dark:bg-blue-700 rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center text-xs gap-1">
                        <span className="inline-block px-2 py-1 bg-blue-200 dark:bg-blue-700 text-blue-700 dark:text-blue-200 rounded-full font-medium text-xs">
                          📚 Read
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium ml-auto group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quick Start Guides</h2>
            <p className="text-xl mb-8 opacity-90">
              Popular study plans to begin your DSA journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href="https://leetcode.com/studyplan/leetcode-75/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">LeetCode 75 Study Plan</h3>
                <p className="opacity-90 text-sm">A curated 75-problem study plan to build fundamentals</p>
              </a>

              <a
                href="https://leetcode.com/studyplan/top-interview-150/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">LeetCode 150</h3>
                <p className="opacity-90 text-sm">LeetCode's top 150 problems commonly asked in interviews</p>
              </a>

              <a
                href="https://leetcode.com/studyplan/top-100-liked/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">Top 100 Liked</h3>
                <p className="opacity-90 text-sm">Community-favorite top 100 liked problems on LeetCode</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DSA;
