import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, BookOpen, ExternalLink, Zap, BookMarked } from 'lucide-react';
import axios from 'axios';

const AIML = () => {
  const [concepts, setConcepts] = useState([]);
  const [filteredConcepts, setFilteredConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [resources, setResources] = useState({});

  useEffect(() => {
    fetchConcepts();
    fetchCategories();
    fetchDifficulties();
    fetchResources();
  }, []);

  const filterConcepts = useCallback(() => {
    let filtered = concepts;

    if (searchTerm) {
      filtered = filtered.filter(concept =>
        concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (concept.description && concept.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(concept => concept.category === selectedCategory);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(concept => concept.difficulty === selectedDifficulty);
    }

    setFilteredConcepts(filtered);
  }, [concepts, searchTerm, selectedCategory, selectedDifficulty]);

  useEffect(() => {
    filterConcepts();
  }, [filterConcepts]);

  const fetchConcepts = async () => {
    try {
       const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/');

      setConcepts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching concepts:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/difficulties');
      setDifficulties(response.data.difficulties);
    } catch (error) {
      console.error('Error fetching difficulties:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const [courses, projects, learningPaths, materials] = await Promise.all([
        axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/resources/courses'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/resources/projects'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/resources/learning-paths'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/aiml/resources/materials')
      ]);
      setResources({
        courses: courses.data.courses || [],
        projects: projects.data.projects || [],
        learningPaths: learningPaths.data.learning_paths || [],
        materials: materials.data.materials || []
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
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Deep Learning': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'NLP': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Computer Vision': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Reinforcement Learning': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'AI Fundamentals': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
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
            AI/ML Mastery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master artificial intelligence and machine learning concepts including deep learning, 
            NLP, computer vision, and reinforcement learning.
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
                placeholder="Search concepts..."
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
                {filteredConcepts.length} concept{filteredConcepts.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Concepts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {concept.title}
                  </h3>
                  <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(concept.difficulty)}`}>
                    {concept.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(concept.category)}`}>
                    {concept.category}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                  {concept.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>AI/ML</span>
                    </div>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <span>Learn</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredConcepts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Brain className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No concepts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
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
            Comprehensive courses, projects, and learning paths curated by experts
          </p>

          {/* Learning Paths */}
          {resources.learningPaths && resources.learningPaths.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-primary-600 rounded mr-3"></span>
                🎯 Learning Paths
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.learningPaths.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-primary-200 dark:border-primary-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name || item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {item.difficulty || 'Beginner'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary-600" />
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
                <span className="w-1 h-8 bg-primary-600 rounded mr-3"></span>
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
                    className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-primary-200 dark:border-primary-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {item.difficulty || 'Beginner'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary-600" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resources.projects && resources.projects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-primary-600 rounded mr-3"></span>
                💻 Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.projects.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-primary-200 dark:border-primary-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {item.difficulty || 'Intermediate'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary-600" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {resources.materials && resources.materials.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-primary-600 rounded mr-3"></span>
                <BookMarked className="w-6 h-6 mr-2 text-primary-600" />
                📖 Materials
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
                    className="group relative bg-gradient-to-br from-primary-50 via-primary-50 to-primary-100 dark:from-primary-900 dark:via-primary-900 dark:to-primary-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-primary-200 dark:border-primary-700 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-200 dark:bg-primary-700 rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <ExternalLink className="w-4 h-4 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center text-xs gap-1">
                        <span className="inline-block px-2 py-1 bg-primary-200 dark:bg-primary-700 text-primary-700 dark:text-primary-200 rounded-full font-medium text-xs">
                          📚 {item.type || 'Read'}
                        </span>
                        <span className="text-primary-600 dark:text-primary-400 font-medium ml-auto group-hover:translate-x-1 transition-transform">
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
      </div>
    </div>
  );
};

export default AIML;
