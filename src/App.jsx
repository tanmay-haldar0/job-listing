import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import JobListings from './components/JobListings'
import JobDetailModal from './components/JobDetailModal'
import { jobs } from './data/jobs'

function App() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl font-bold text-blue-600"
              >
                JobHub
              </motion.div>
            </div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-sm sm:text-base hidden sm:block"
            >
              Find your dream job
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <JobListings jobs={jobs} onJobClick={handleJobClick} />
      </main>

      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <JobDetailModal
            job={selectedJob}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App 