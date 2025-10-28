import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, HardDrive, Brain, Star, Zap, Target, Users, TrendingUp, CheckCircle } from 'lucide-react';
import HeroImage from '../assets/moti.jpg';

const Hero = () => {
  const features = [
    {
      icon: Code,
      title: 'Top 150 DSA Questions',
      description: 'Curated list of essential data structures and algorithms problems',
      link: '/dsa',
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800',
      badge: '🎯 Interview Ready'
    },
    {
      icon: Database,
      title: 'SQL Mastery',
      description: 'Comprehensive SQL interview questions and examples',
      link: '/sql',
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800',
      badge: '💾 Database Expert'
    },
    {
      icon: HardDrive,
      title: 'OS Notes',
      description: 'Complete operating system concepts and theory',
      link: '/os',
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800',
      badge: '⚙️ System Design'
    },
    {
      icon: Brain,
      title: 'AI/ML Projects',
      description: 'Hands-on machine learning projects, tutorials, and resources for aspiring AI engineers',
      link: '/aiml',
      color: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800',
      badge: '🤖 AI Powered'
    }
  ];

  const benefits = [
    { icon: Target, title: 'Goal-Oriented', description: 'Structured learning paths for your goals' },
    { icon: TrendingUp, title: 'Track Progress', description: 'Monitor your learning progress in real-time' },
    { icon: Users, title: 'Community', description: 'Learn alongside thousands of developers' },
    { icon: Zap, title: 'Quick Start', description: 'Begin learning in seconds, no setup needed' },
  ];

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        {/* Animated Floating Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 90, 180] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-300 to-primary-200 dark:from-primary-700 dark:to-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [180, 270, 360] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-300 to-accent-200 dark:from-accent-700 dark:to-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40" 
          />
          <motion.div 
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 w-60 h-60 bg-gradient-to-br from-blue-300 to-purple-200 dark:from-blue-700 dark:to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-full border border-primary-200 dark:border-primary-700"
              >
                <Star className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" />
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-300">Trusted by 10,000+ Learners</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                Master <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Tech Interviews</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-4"
              >
                Learn DSA, SQL, OS & AI/ML with structured paths
              </motion.p>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg"
              >
                Ace your interviews with 150+ DSA problems, comprehensive SQL mastery, OS concepts, and hands-on AI/ML projects. Everything you need to land your dream tech role.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  to="/dsa"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  Start Learning Now
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-bold rounded-xl transition-all duration-300 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="sticky top-24"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-2xl blur-2xl" />
                  <img
                    src={HeroImage}
                    alt="Hero illustration"
                    className="w-full max-w-md xl:max-w-lg rounded-2xl shadow-2xl object-cover mx-auto relative z-10"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {[
              { number: '150+', label: 'DSA Problems', icon: Code, color: 'from-blue-500 to-blue-600' },
              { number: '75+', label: 'LinkedIn Problems', icon: TrendingUp, color: 'from-green-500 to-green-600' },
              { number: '10+', label: 'AI/ML Projects', icon: Brain, color: 'from-red-500 to-red-600' },
              { number: '100%', label: 'Free Access', icon: Zap, color: 'from-yellow-500 to-yellow-600' },
              { number: '24/7', label: 'Available', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-center mb-3">
                      <StatIcon className="w-6 h-6 text-gray-900 dark:text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">{stat.number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Modules Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Learning Paths</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive modules designed by industry experts</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative h-full"
                >
                  <Link to={feature.link} className="block h-full">
                    <div className={`relative h-full rounded-2xl bg-gradient-to-br ${feature.bgGradient} p-8 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer`}>
                      {/* Decorative blob */}
                      <motion.div 
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 rounded-full mix-blend-multiply filter blur-xl group-hover:opacity-20 transition-opacity duration-300`}
                      />

                      {/* Badge */}
                      <div className="relative z-10 inline-block mb-4 px-3 py-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{feature.badge}</span>
                      </div>

                      {/* Icon */}
                      <div className={`relative z-10 w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                        <FeatureIcon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="relative z-10 text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="relative z-10 text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                        {feature.description}
                      </p>

                      {/* Arrow */}
                      <motion.div 
                        className="relative z-10 inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-300"
                      >
                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Learnova?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need for tech interview success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group p-8 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BenefitIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-800 dark:to-accent-800 p-12 text-center overflow-hidden shadow-2xl"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 bg-white opacity-5 rounded-full" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-40 h-40 bg-white opacity-5 rounded-full" />

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Ready to Ace Your Tech Interview?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of developers who are already mastering DSA, SQL, OS, and AI/ML on Learnova.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/dsa"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:bg-white/10"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
