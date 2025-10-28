import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Github, Linkedin, ExternalLink, Heart, Code, Zap } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post('http://localhost:8000/api/contact/', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'nandeesh@learnova.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Code,
      title: 'GitHub',
      details: 'github.com/nandeesh',
      description: 'Check out our open source projects'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      details: 'linkedin.com/in/nandeesh',
      description: 'Connect with us professionally'
    }
  ];

  const developer = {
    name: 'Nandeesh C M',
    role: 'Full-Stack Developer & Creator',
    bio: 'Passionate about building educational platforms that empower students to achieve their dream jobs in tech. With expertise in web development and a mission to democratize quality technical interview preparation.',
    email: 'nandeesh@learnova.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    avatar: '👨‍💻',
    skills: ['React', 'Python', 'FastAPI', 'Tailwind CSS', 'Full-Stack Development']
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-300 to-primary-200 dark:from-primary-700 dark:to-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [180, 270, 360] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-300 to-accent-200 dark:from-accent-700 dark:to-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 rounded-full border border-primary-200 dark:border-primary-700"
          >
            <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-300">Connect With Us</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Get in <span className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions or feedback? Reach out to us directly or connect with the developer behind Learnova. We'd love to hear from you!
          </p>
        </motion.div>

        {/* Developer Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-20 relative"
        >
          {/* Decorative Background */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-700 dark:to-accent-700 rounded-3xl opacity-10 blur-3xl"
          />

          <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-primary-100 dark:border-primary-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Developer Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl"
                  >
                    {developer.avatar}
                  </motion.div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {developer.name}
                    </h2>
                    <p className="text-lg bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent font-semibold">
                      {developer.role}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {developer.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {developer.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold border border-primary-200 dark:border-primary-700"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <motion.a
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href={developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="flex items-center gap-3">
                    <Github className="w-5 h-5" />
                    GitHub
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href={`mailto:${developer.email}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-300 rounded-xl font-semibold border-2 border-primary-200 dark:border-primary-700 hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    Email
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Have questions about the platform, want to collaborate, or just want to say hi? 
                Reach out through any of these channels. I read every message and would love to connect!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 dark:hover:from-primary-900/20 dark:hover:to-accent-900/20 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-1 group-hover:font-bold transition-all">
                        {info.details}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Response Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl p-6 border border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    I typically respond to all messages within 24 hours. Your feedback and suggestions help make Learnova better!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-primary-100 dark:border-primary-800"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all duration-300"
                  placeholder="Share your message, feedback, or questions..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-300 dark:border-green-700"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-300 dark:border-red-700"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Failed to send message. Please try again later.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about Learnova and how to get the most out of the platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How often is the content updated?',
                answer: 'Content is updated monthly with new problems, improved explanations, and the latest interview trends. Quality and relevance are our top priorities.',
                icon: '📅'
              },
              {
                question: 'Is Learnova completely free?',
                answer: 'Yes! Learnova is 100% free. I believe in making quality placement preparation resources accessible to all students, regardless of their financial background.',
                icon: '💰'
              },
              {
                question: 'Can I contribute to the project?',
                answer: 'Absolutely! Contributions are welcome. Check out the GitHub repository for contribution guidelines. Whether it\'s bug fixes, features, or content, your help is appreciated!',
                icon: '🤝'
              },
              {
                question: 'How do I get help with a specific problem?',
                answer: 'Each problem includes links to original sources and community discussions. Feel free to reach out with questions about specific topics using the contact form above.',
                icon: '🆘'
              },
              {
                question: 'Is there a mobile app?',
                answer: 'Currently, Learnova is web-based and works great on mobile browsers. A dedicated mobile app is on the roadmap for future releases.',
                icon: '📱'
              },
              {
                question: 'How can I track my progress?',
                answer: 'Your progress is automatically tracked as you work through problems. Your solved problems and attempts are saved in your profile dashboard.',
                icon: '📊'
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl p-8 border border-primary-100 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{faq.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
