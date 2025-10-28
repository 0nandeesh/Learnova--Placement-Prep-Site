import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, HardDrive, Target, Users, Heart, Github, Mail, ExternalLink, Award, Rocket, CheckCircle, Sparkles } from 'lucide-react';
import ProfileImage from '../assets/profile.jpg';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'DSA Mastery',
      description: '150+ carefully curated data structure and algorithm problems',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Database,
      title: 'SQL Expertise',
      description: 'Comprehensive SQL materials with examples and practice problems',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: HardDrive,
      title: 'OS Knowledge',
      description: 'Complete operating system concepts and theory notes',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { number: '150+', label: 'DSA Problems' },
    { number: '75+', label: 'LinkedIn Problems' },
    { number: '100%', label: 'Free Access' },
    { number: '24/7', label: 'Available' }
  ];

  const team = [
    {
      name: 'Learnova Team',
      role: 'Full-Stack Developers',
      description: 'Passionate about helping students succeed in their placement journey',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-300 to-primary-200 dark:from-primary-700 dark:to-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [180, 270, 360] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-300 to-accent-200 dark:from-accent-700 dark:to-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
          >
            <div className="text-left lg:text-left">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-full border border-primary-200 dark:border-primary-700"
              >
                <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-300">Empowering Tech Learners</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                About <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Learnova</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
              >
                Your comprehensive placement preparation companion, designed to help students master the essential skills needed to ace technical interviews and land their dream jobs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: CheckCircle, text: 'Expert-Curated Content' },
                  { icon: Rocket, text: 'Results-Driven' },
                  { icon: Users, text: 'Community Powered' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700">
                      <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex lg:justify-center lg:items-center"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-full max-w-md"
              >
                <div className="relative group">
                  {/* Animated gradient glow background */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  />
                  
                  {/* Profile Image */}
                  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-primary-500/50 transition-all duration-300">
                    <img 
                      src={ProfileImage} 
                      alt="Profile" 
                      className="w-full h-auto object-cover filter brightness-100 group-hover:brightness-110 transition-all duration-300"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20 rounded-3xl bg-gradient-to-r from-primary-50 via-white to-accent-50 dark:from-primary-900/20 dark:via-gray-800 dark:to-accent-900/20 border border-primary-200 dark:border-primary-700/30 p-12 overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-10 blur-3xl" 
          />
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Target className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Mission</span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              To <span className="font-semibold text-primary-600 dark:text-primary-400">democratize access</span> to high-quality placement preparation resources and empower students with the knowledge and confidence needed to succeed in technical interviews. We believe that every student deserves access to comprehensive, well-organized study materials regardless of their background or financial status.
            </p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What We <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive learning resources designed for your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`relative h-full rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary-500 dark:hover:border-primary-500`}>
                    {/* Decorative blob */}
                    <motion.div 
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 rounded-full mix-blend-multiply filter blur-xl group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className={`relative z-10 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="relative z-10 text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="relative z-10 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Bottom accent */}
                    <motion.div 
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-300`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20 rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-800 dark:to-accent-800 overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full"
            />
          </div>

          <div className="relative z-10 p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our <span className="text-white opacity-90">Impact</span></h2>
            <p className="text-xl text-white/90 mb-12">Numbers that speak for themselves</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-mono">{stat.number}</div>
                    <div className="text-sm md:text-base text-white/90 font-semibold">{stat.label}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500">
                  {/* Decorative background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-8xl mb-6"
                    >
                      {member.avatar}
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-6">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-lg leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Developer</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The mind behind Learnova</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-12 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary-500 dark:hover:border-primary-500">
                {/* Decorative blob */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-300" 
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-8xl md:text-9xl flex-shrink-0"
                  >
                    👨‍💻
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      Nandeesh C M
                    </h3>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-6">
                      🚀 Full-Stack Developer & Creator
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                      Passionate about building <span className="font-semibold text-primary-600 dark:text-primary-400">developer tools</span> and <span className="font-semibold text-accent-600 dark:text-accent-400">learning platforms</span>. Focused on creating clear, practical resources for students preparing for technical interviews. Dedicated to making quality education accessible to everyone.
                    </p>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex flex-col sm:flex-row items-center md:items-start gap-4"
                    >
                      <a 
                        href="https://www.linkedin.com/in/nandeesh-cm-703b92285/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Connect on LinkedIn
                      </a>
                      <a 
                        href="https://github.com/0nandeesh" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-200 dark:hover:to-gray-300 text-white dark:text-gray-900 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        GitHub Profile
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Student-First',
                description: 'Every decision we make is guided by what\'s best for student success.',
                color: 'from-green-500 to-green-600',
                delay: 0
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We believe in the power of community and collaborative learning.',
                color: 'from-blue-500 to-blue-600',
                delay: 0.1
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We strive for excellence in everything we do and create.',
                color: 'from-purple-500 to-purple-600',
                delay: 0.2
              }
            ].map((value, idx) => {
              const ValueIcon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: value.delay }}
                  className="group relative"
                >
                  <div className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-primary-500 dark:hover:border-primary-500 h-full">
                    {/* Decorative blob */}
                    <motion.div 
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${value.color} opacity-0 rounded-full mix-blend-multiply filter blur-xl group-hover:opacity-20 transition-opacity duration-300`}
                    />

                    <div className="relative z-10 text-center h-full flex flex-col">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + value.delay }}
                        className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <ValueIcon className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-800 dark:to-accent-800 p-12 text-white overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full"
            />
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Let's Get in <span className="text-white opacity-90">Touch</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed"
            >
              Have questions, suggestions, feedback, or want to contribute to Learnova? We'd absolutely love to hear from you! Reach out through any channel below.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://github.com/0nandeesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50 font-semibold"
              >
                <Github className="w-6 h-6 mr-3" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nandeesh-cm-703b92285/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50 font-semibold"
              >
                <ExternalLink className="w-6 h-6 mr-3" />
                LinkedIn
              </a>
              <a
                href="mailto:nandeesh.cm@example.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
              >
                <Mail className="w-6 h-6 mr-3" />
                Email Us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
