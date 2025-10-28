import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, HardDrive, BookOpen, ExternalLink, Zap, BookMarked } from 'lucide-react';
import axios from 'axios';

const OS = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState({});

  useEffect(() => {
    fetchNotes();
    fetchCategories();
    fetchResources();
  }, []);

  const filterNotes = useCallback(() => {
    let filtered = notes;

    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedCategory]);

  useEffect(() => {
    filterNotes();
  }, [filterNotes]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/os/');
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/os/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const [courses, topics, materials] = await Promise.all([
        axios.get('http://localhost:8000/api/os/resources/courses'),
        axios.get('http://localhost:8000/api/os/resources/topics'),
        axios.get('http://localhost:8000/api/os/resources/materials')
      ]);
      setResources({
        courses: courses.data.courses || [],
        topics: topics.data.topics || [],
        materials: materials.data.resources || []
      });
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Process Management': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Deadlocks': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'Memory Management': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'File Systems': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Security': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Virtualization': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
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
            Operating Systems
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master operating system concepts with comprehensive notes covering 
            process management, memory management, deadlocks, and more.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes..."
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

            {/* Results Count */}
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
              <span className="text-sm">
                {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <HardDrive className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {note.title}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getCategoryColor(note.category)}`}>
                        {note.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-4">
                  {note.content}
                </p>

                {/* Links */}
                {note.links && note.links.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Resources
                    </h4>
                    <div className="space-y-2">
                      {note.links.slice(0, 2).map((link, idx) => (
                        <a
                          key={idx}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 truncate"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>OS Notes</span>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <span>Study Now</span>
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredNotes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <HardDrive className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No notes found
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
            Comprehensive courses and key topics curated by experts
          </p>

          {/* Courses */}
          {resources.courses && resources.courses.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-purple-600 rounded mr-3"></span>
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
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-200 dark:border-purple-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-600 dark:text-purple-400 font-medium">
                        {item.difficulty || 'Beginner'}
                      </span>
                      <ExternalLink className="w-4 h-4 text-purple-600" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Topics */}
          {resources.topics && resources.topics.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-purple-600 rounded mr-3"></span>
                📋 Key Topics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.topics.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    {item.subtopics && item.subtopics.length > 0 && (
                      <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        {item.subtopics.length} subtopics
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {resources.materials && resources.materials.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-purple-600 rounded mr-3"></span>
                <BookMarked className="w-6 h-6 mr-2 text-purple-600" />
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
                    className="group relative bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 dark:from-purple-900 dark:via-purple-900 dark:to-purple-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-200 dark:border-purple-700 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 dark:bg-purple-700 rounded-full -mr-12 -mt-12 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                        <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center text-xs gap-1">
                        <span className="inline-block px-2 py-1 bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 rounded-full font-medium text-xs">
                          📚 Read
                        </span>
                        <span className="text-purple-600 dark:text-purple-400 font-medium ml-auto group-hover:translate-x-1 transition-transform">
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
          className="mt-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Deep Dive Resources</h2>
            <p className="text-xl mb-8 opacity-90">
              Explore these additional resources for comprehensive OS learning
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="https://www.geeksforgeeks.org/operating-systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">GeeksforGeeks</h3>
                <p className="opacity-90 text-sm">Comprehensive OS tutorials and examples</p>
              </a>
              <a
                href="https://www.tutorialspoint.com/operating_system/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">TutorialsPoint</h3>
                <p className="opacity-90 text-sm">Step-by-step OS concepts</p>
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">Gate Smashers</h3>
                <p className="opacity-90 text-sm">Video lectures on OS concepts</p>
              </a>
              <a
                href="https://www.coursera.org/learn/operating-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2">Coursera</h3>
                <p className="opacity-90 text-sm">University-level OS courses</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OS;
