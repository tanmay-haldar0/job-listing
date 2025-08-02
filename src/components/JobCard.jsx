import { motion } from 'framer-motion'
import { MapPin, Building, DollarSign, Clock, Wifi } from 'lucide-react'

const JobCard = ({ job, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
    >
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600">
            <Building className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{job.company}</span>
          </div>
        </div>

        {/* Location and Remote */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 min-w-0 flex-1">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{job.location}</span>
          </div>
          {job.remote && (
            <div className="flex items-center text-green-600 ml-2 flex-shrink-0">
              <Wifi className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium hidden sm:inline">Remote</span>
              <span className="text-sm font-medium sm:hidden">R</span>
            </div>
          )}
        </div>

        {/* Salary and Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 min-w-0 flex-1">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600 ml-2 flex-shrink-0">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{job.type}</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {job.category}
          </span>

          {/* View Details Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
          >
            View Details →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity sm:hidden"
          >
            →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default JobCard 