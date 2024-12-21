import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Traya Health",
    position: "Full Stack Developer",
    period: "Nov 2023 - Present",
  },
  {
    company: "MountBlue",
    position: "Software Developer",
    period: "July 2018 - Oct 2023",
  },
];

export const Experience = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <section className="bg-gray-50 flex items-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">Work Experience</h2>
            <p className="mt-6 text-lg text-gray-600">
              Experienced Full Stack Developer with 2+ years of expertise in building scalable web applications, automating workflows, and collaborating on impactful projects.
            </p>
          </div>
        </section>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-blue-600 text-lg font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm">{exp.period}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <section className="mt-12 text-center">
          <h3 className="text-3xl font-extrabold text-gray-900">Skills & Tech Stack</h3>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-blue-100 text-center p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-blue-600">{skill}</p>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </section>
  );
};
