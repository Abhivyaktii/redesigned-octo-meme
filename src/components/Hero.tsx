import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDocker, FaGit } from 'react-icons/fa';
import { SiExpress, SiNestjs, SiMongodb, SiPostgresql, SiGraphql, SiRabbitmq } from 'react-icons/si';
import { DiRedis } from 'react-icons/di';
import { IoLogoJavascript } from 'react-icons/io';

export const Hero = () => {
  const skills = [
    { name: "ReactJS", icon: <FaReact className="text-4xl text-blue-600" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-4xl text-green-600" /> },
    { name: "Express.js", icon: <SiExpress className="text-4xl text-gray-600" /> },
    { name: "Nest.js", icon: <SiNestjs className="text-4xl text-red-600" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-4xl text-green-600" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-4xl text-blue-600" /> },
    { name: "Redis", icon: <DiRedis className="text-4xl text-red-600" /> },
    { name: "RabbitMQ", icon: <SiRabbitmq className="text-4xl text-purple-600" /> },
    { name: "GraphQL", icon: <SiGraphql className="text-4xl text-indigo-600" /> },
    { name: "Docker", icon: <FaDocker className="text-4xl text-blue-600" /> },
    { name: "TypeScript", icon: <IoLogoJavascript className="text-4xl text-blue-600" /> },
    { name: "Git", icon: <FaGit className="text-4xl text-gray-800" /> },
    // { name: "Jest", icon: <FaJest className="text-4xl text-red-600" /> },
    { name: "Microservices", icon: <FaDocker className="text-4xl text-green-600" /> },
    // { name: "API Integration", icon: <FaNodeJs className="text-4xl text-orange-600" /> }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-[length:200%_200%] opacity-40"
      ></motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Hi, I'm <span className="text-blue-600">Abhinav</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-xl mx-auto">
            A full-stack developer focused on building clean, efficient, and scalable web applications.
          </p>

          {/* Call to Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="px-6 py-3 mt-6 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = '/contact'}
          >
            Get in Touch
          </motion.button>

          {/* Skills Section */}
          <section className="mt-12 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Skills, Tools, and Stack</h3>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="bg-blue-100 text-center p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                  <div className="mb-4">{skill.icon}</div>
                  <p className="text-lg font-medium text-blue-600">{skill.name}</p>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};
