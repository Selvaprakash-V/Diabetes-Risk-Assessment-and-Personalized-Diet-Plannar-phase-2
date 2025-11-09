import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    { icon: '🤖', title: 'AI-Powered Analysis', desc: '95.2% accuracy with machine learning', color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50' },
    { icon: '📊', title: 'Real-time Results', desc: 'Instant risk assessment and visualization', color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50' },
    { icon: '🍽️', title: 'Personalized Nutrition', desc: 'Custom meal plans and food recommendations', color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-50' },
    { icon: '📱', title: 'Responsive Design', desc: 'Works perfectly on all devices', color: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-50' }
  ];

  const stats = [
    { value: '95.2%', label: 'Accuracy Rate', icon: '🎯', color: 'from-blue-500 to-cyan-500' },
    { value: '8', label: 'Health Factors', icon: '🧬', color: 'from-green-500 to-emerald-500' },
    { value: '1000+', label: 'Assessments', icon: '📈', color: 'from-purple-500 to-pink-500' },
    { value: '24/7', label: 'Available', icon: '⏰', color: 'from-orange-500 to-red-500' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-200/10 to-yellow-200/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-4"
              >
                <SparklesIcon className="w-16 h-16 text-blue-500 mx-auto" />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-8xl font-bold mb-8 relative"
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-300% animate-gradient"
                style={{ backgroundSize: '300% 300%' }}
              >
                Diabetes Risk
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-gray-800 relative"
              >
                Assessment
                <motion.div
                  animate={{
                    scaleX: [0, 1],
                  }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                />
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Advanced AI-powered diabetes risk prediction with personalized health insights
              and nutrition recommendations. Get your assessment in seconds.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/assessment"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative z-10">Start Assessment</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-3 relative z-10"
                  >
                    <ArrowRightIcon className="h-6 w-6" />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center px-10 py-5 bg-white/30 backdrop-blur-lg text-gray-700 font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/40 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>📚</span>
                  <span className="ml-2">Field Guide</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/20 backdrop-blur-lg relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="text-center relative group"
              >
                <motion.div
                  className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                >
                  {/* Animated background glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-20 blur-xl`}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="text-4xl mb-4 relative z-10"
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div
                    className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative z-10`}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-gray-700 font-semibold text-lg relative z-10">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <HeartIcon className="w-12 h-12 text-red-500 mx-auto" />
            </motion.div>
            
            <motion.h2
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              style={{ backgroundSize: '300% 300%' }}
            >
              Why Choose DiabetesAI?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Advanced machine learning meets healthcare to provide accurate, 
              personalized diabetes risk assessments.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <motion.div
                  className={`p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl group-hover:shadow-2xl transition-all duration-500 text-center relative overflow-hidden ${feature.bgColor}/20`}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10 blur-2xl`}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="text-5xl mb-6 relative z-10 group-hover:scale-125 transition-transform duration-300"
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent relative z-10`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed text-lg relative z-10">
                    {feature.desc}
                  </p>
                  
                  {/* Hover effect border */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className={`absolute inset-0 rounded-3xl border-2 bg-gradient-to-r ${feature.color} opacity-50`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-lg relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-yellow-300/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-8"
            >
              <ChartBarIcon className="w-16 h-16 text-green-500 mx-auto" />
            </motion.div>
            
            <motion.h2
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              style={{ backgroundSize: '300% 300%' }}
            >
              Ready to Check Your Risk?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Take our comprehensive diabetes risk assessment and get personalized 
              health recommendations in just a few minutes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/assessment"
                className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3 text-2xl relative z-10"
                >
                  🚀
                </motion.span>
                
                <span className="relative z-10">Start Your Assessment</span>
                
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-4 relative z-10"
                >
                  <ArrowRightIcon className="h-6 w-6" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;