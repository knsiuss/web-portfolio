'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, CheckCircle, ExternalLink, GraduationCap } from 'lucide-react';
import useReducedMotion from '@/hooks/useReducedMotion';

const stanfordCourses = [
  {
    title: "Supervised Machine Learning",
    topics: ["Linear & Logistic Regression", "Gradient Descent", "Regularization", "Recommender Systems"],
    project: "Housing price prediction with 90% R² score",
  },
  {
    title: "Advanced Learning Algorithms",
    topics: ["Decision Trees", "Random Forest", "XGBoost", "Ensemble Methods"],
    project: "Multi-class classification with F1: 0.94",
  },
  {
    title: "Unsupervised Learning",
    topics: ["K-Means Clustering", "PCA", "Anomaly Detection", "Recommender Systems"],
    project: "Movie recommendation system",
  },
];

const certifications = [
  {
    title: "Machine Learning Specialization",
    org: "Stanford University • DeepLearning.AI",
    date: "January 2026",
    badge: "Stanford",
    badgeColor: "bg-[#8C1515]",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Comprehensive ML curriculum covering supervised, unsupervised, and advanced algorithms with mathematical foundations.",
    courses: stanfordCourses,
    skills: ["Python", "NumPy", "Scikit-learn", "Pandas", "Mathematical Optimization"],
    links: [
      { label: "Course 1", href: "/assets/certificates/stanford-supervised-learning-2026.pdf" },
      { label: "Course 2", href: "/assets/certificates/stanford-advanced-algorithms-2026.pdf" },
      { label: "Course 3", href: "/assets/certificates/stanford-unsupervised-learning-2026.pdf" },
    ],
    featured: true,
  },
  {
    title: "Python for Data Science",
    org: "IBM • Coursera",
    date: "August 2025",
    badge: "IBM",
    badgeColor: "bg-[#DFFF00]",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Data analysis, visualization, and machine learning with Python. Pandas, NumPy, and Scikit-learn fundamentals.",
    skills: ["Pandas", "Matplotlib", "Seaborn", "Data Analysis", "SQL"],
    download: "/assets/certificates/ibm-python-data-science-2025.pdf",
  },
  {
    title: "Gemini Certified Educator",
    org: "Google for Education",
    date: "September 2025",
    badge: "Google",
    badgeColor: "bg-[#4285F4]",
    icon: <Award className="w-5 h-5" />,
    description: "Advanced training in Google's Gemini AI tools for educational contexts and workshop facilitation.",
    skills: ["AI Education", "Prompt Engineering", "Workshop Design"],
    download: "/assets/certificates/google-gemini-educator-2025.pdf",
  },
  {
    title: "Gemini Certified Student",
    org: "Google for Education",
    date: "October 2025",
    badge: "Google",
    badgeColor: "bg-[#4285F4]",
    icon: <CheckCircle className="w-5 h-5" />,
    description: "Comprehensive understanding of Gemini AI capabilities for learning and productivity enhancement.",
    skills: ["AI Literacy", "Productivity Tools", "Research Methods"],
    download: "/assets/certificates/google-gemini-educator-2025.pdf",
  },
];

export default function CertificationsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="relative bg-black py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="font-tech text-xs uppercase tracking-[0.3em] text-[#DFFF00] mb-4 block">
            Continuous Learning
          </span>
          <h2 className="font-lando text-4xl md:text-6xl uppercase mb-4">
            Certifications & <span className="text-[#DFFF00]">Credentials</span>
          </h2>
          <p className="font-tech text-white/50 max-w-xl mx-auto">
            Stanford ML Specialization, IBM Data Science, and Google AI certifications with
            hands-on projects and measurable outcomes.
          </p>
        </motion.div>

        {/* Featured: Stanford */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-br from-[#8C1515]/20 to-black border border-[#8C1515]/30 rounded-2xl md:rounded-3xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#8C1515] rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-tech text-xs uppercase tracking-wider text-[#8C1515]">Featured</span>
                </div>
                <h3 className="font-lando text-2xl md:text-3xl uppercase mb-1">Machine Learning Specialization</h3>
                <p className="font-tech text-white/60">Stanford University • DeepLearning.AI • January 2026</p>
              </div>
              <div className="flex gap-2">
                {certifications[0].links?.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    download
                    className="inline-flex items-center gap-1.5 border border-white/20 text-white font-tech text-xs uppercase px-4 py-2 rounded-full hover:bg-[#8C1515] hover:border-[#8C1515] transition-all"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <p className="font-tech text-white/70 mb-6 max-w-3xl">
              {certifications[0].description} Built production-ready models with focus on
              vectorization and optimization techniques used in real-world ML systems.
            </p>

            {/* Course Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stanfordCourses.map((course, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-lando text-lg text-[#8C1515]">{String(index + 1).padStart(2, '0')}</span>
                    <h4 className="font-tech text-sm text-white font-medium">{course.title}</h4>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {course.topics.map((topic, i) => (
                      <li key={i} className="font-tech text-xs text-white/50 flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-[#8C1515] rounded-full" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-white/10">
                    <span className="font-tech text-[10px] uppercase text-white/40">Project:</span>
                    <p className="font-tech text-xs text-[#8C1515]">{course.project}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {certifications[0].skills?.map((skill) => (
                <span
                  key={skill}
                  className="font-tech text-xs uppercase px-3 py-1 bg-[#8C1515]/20 text-white/80 rounded-full border border-[#8C1515]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Other Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.slice(1).map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#111] border border-white/10 rounded-xl p-5 hover:border-[#DFFF00]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${cert.badgeColor} rounded-lg flex items-center justify-center`}>
                  {cert.icon}
                </div>
                <span className={`font-tech text-[10px] uppercase px-2 py-1 ${cert.badgeColor} text-white rounded-full`}>
                  {cert.badge}
                </span>
              </div>

              <h3 className="font-lando text-lg uppercase mb-1 group-hover:text-[#DFFF00] transition-colors">
                {cert.title}
              </h3>
              <p className="font-tech text-xs text-white/50 mb-3">{cert.org} • {cert.date}</p>
              <p className="font-tech text-sm text-white/60 mb-4">{cert.description}</p>

              {cert.skills && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-tech text-[10px] uppercase px-2 py-0.5 bg-white/5 text-white/60 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {cert.download && (
                <a
                  href={cert.download}
                  download
                  className="inline-flex items-center gap-1.5 font-tech text-xs uppercase text-[#DFFF00] hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Download Certificate
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
