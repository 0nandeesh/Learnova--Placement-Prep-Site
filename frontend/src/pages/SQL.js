import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Code, BookOpen, ExternalLink, Zap, BookMarked } from 'lucide-react';
import axios from 'axios';

const SQL = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [resources, setResources] = useState({});

  useEffect(() => {
    fetchMaterials();
    fetchCategories();
    fetchDifficulties();
    fetchResources();
  }, []);

  const filterMaterials = useCallback(() => {
    const filtered = materials
      .filter(material => !searchTerm || 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(material => !selectedCategory || material.category === selectedCategory)
      .filter(material => !selectedDifficulty || material.difficulty === selectedDifficulty);

    setFilteredMaterials(filtered);
  }, [materials, searchTerm, selectedCategory, selectedDifficulty]);

  useEffect(() => {
    filterMaterials();
  }, [filterMaterials]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/sql/');
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching materials:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com/api/sql/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDifficulties = async () => {
    try {
      const response = await axios.get('https://learnova-placement-prep-site.onrender.com//api/sql/difficulties');
      setDifficulties(response.data.difficulties);
    } catch (error) {
      console.error('Error fetching difficulties:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const [courses, practice, materials] = await Promise.all([
        axios.get('https://learnova-placement-prep-site.onrender.com/api/sql/resources/courses'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/sql/resources/practice'),
        axios.get('https://learnova-placement-prep-site.onrender.com/api/sql/resources/materials')
      ]);
      setResources({
        courses: courses.data.courses || [],
        practice: practice.data.practice_platforms || [],
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
      'Basic SQL': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Joins': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Aggregation': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Advanced SQL': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Performance': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'Database Design': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
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
            SQL Mastery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master SQL with comprehensive materials covering basic queries, 
            joins, window functions, and advanced concepts.
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
                placeholder="Search materials..."
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
                {filteredMaterials.length} material{filteredMaterials.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Materials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {material.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(material.difficulty)}`}>
                          {material.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(material.category)}`}>
                          {material.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {material.content}
                </p>

                {/* Examples */}
                {material.examples && material.examples.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Examples
                    </h4>
                    <div className="space-y-2">
                      {material.examples.slice(0, 2).map((example, idx) => (
                        <div key={idx} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                          <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                            {example}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>SQL Material</span>
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <span>Study Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              
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
            Comprehensive courses and practice platforms curated by experts
          </p>

          {/* Practice Platforms */}
          {resources.practice && resources.practice.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-green-600 rounded mr-3"></span>
                💻 Practice Platforms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.practice.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-200 dark:border-green-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-green-600 text-white px-2 py-1 rounded">
                        {item.problems || 'Practice'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-green-600" />
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
                <span className="w-1 h-8 bg-green-600 rounded mr-3"></span>
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
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-200 dark:border-green-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {item.difficulty || 'Beginner'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-green-600" />
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
                <span className="w-1 h-8 bg-green-600 rounded mr-3"></span>
                <BookMarked className="w-6 h-6 mr-2 text-green-600" />
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
                    className="group relative bg-gradient-to-br from-green-50 via-green-50 to-green-100 dark:from-green-900 dark:via-green-900 dark:to-green-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-200 dark:border-green-700 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 dark:bg-green-700 rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Zap className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center text-xs gap-1">
                        <span className="inline-block px-2 py-1 bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-200 rounded-full font-medium text-xs">
                          📚 Read
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium ml-auto group-hover:translate-x-1 transition-transform">
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Practice SQL Online</h2>
            <p className="text-xl mb-8 opacity-90">
              Test your SQL skills with these popular platforms
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://www.hackerrank.com/domains/sql"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2">HackerRank SQL</h3>
                <p className="opacity-90">Practice SQL problems with instant feedback</p>
              </a>
              <a
                href="https://leetcode.com/problemset/database/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2">LeetCode Database</h3>
                <p className="opacity-90">Advanced SQL problems and solutions</p>
              </a>
              <a
                href="https://www.w3schools.com/sql/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2">W3Schools SQL</h3>
                <p className="opacity-90">Learn SQL basics with interactive tutorials</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SQL;
