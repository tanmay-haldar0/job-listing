import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Building, DollarSign, Clock, Wifi, ChevronDown, Filter, X } from 'lucide-react'
import JobCard from './JobCard'
import { filterOptions } from '../data/jobs'

const JobListings = ({ jobs, onJobClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    remote: [],
    category: []
  })
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [dropdownDirection, setDropdownDirection] = useState('down')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const categoryButtonRef = useRef(null)
  const dropdownRef = useRef(null)

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCategoryOpen &&
        categoryButtonRef.current &&
        dropdownRef.current &&
        !categoryButtonRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCategoryOpen])

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search filter
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())

      // Type filter
      const matchesType = selectedFilters.type.length === 0 || 
        selectedFilters.type.includes(job.type)

      // Remote filter
      const matchesRemote = selectedFilters.remote.length === 0 || 
        (selectedFilters.remote.includes('Remote') && job.remote) ||
        (selectedFilters.remote.includes('On-site') && !job.remote)

      // Category filter
      const matchesCategory = selectedFilters.category.length === 0 || 
        selectedFilters.category.includes(job.category)

      return matchesSearch && matchesType && matchesRemote && matchesCategory
    })
  }, [jobs, searchTerm, selectedFilters])

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }))
  }

  const handleCategorySelect = (category) => {
    if (category === '') {
      setSelectedFilters(prev => ({
        ...prev,
        category: []
      }))
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        category: [category]
      }))
    }
    setIsCategoryOpen(false)
  }

  const clearFilters = () => {
    setSelectedFilters({
      type: [],
      remote: [],
      category: []
    })
  }

  const toggleCategoryDropdown = () => {
    if (!isCategoryOpen && categoryButtonRef.current) {
      // Check available space when opening
      const buttonRect = categoryButtonRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - buttonRect.bottom
      const spaceAbove = buttonRect.top
      const dropdownHeight = 280 // Approximate height of dropdown with all options
      
      setDropdownDirection(spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'up' : 'down')
    }
    setIsCategoryOpen(!isCategoryOpen)
  }

  const selectedCategory = selectedFilters.category[0] || 'All Categories'

  // Filter sidebar content component
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${isMobile ? '' : 'sticky top-6'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileFiltersOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-6 w-6" />
          </motion.button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Type Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Job Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.type.map(type => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFilter('type', type)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilters.type.includes(type)
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Remote Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Work Location</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.remote.map(option => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFilter('remote', option)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                  selectedFilters.remote.includes(option)
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {option === 'Remote' && <Wifi className="h-3 w-3" />}
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
          <div className="relative">
            <motion.button
              ref={categoryButtonRef}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={toggleCategoryDropdown}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 cursor-pointer flex items-center justify-between"
            >
              <span className={selectedCategory === 'All Categories' ? 'text-gray-500' : 'text-gray-700'}>
                {selectedCategory}
              </span>
              <motion.div
                animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ 
                    opacity: 0, 
                    y: dropdownDirection === 'up' ? 10 : -10, 
                    scale: 0.95 
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: dropdownDirection === 'up' ? 10 : -10, 
                    scale: 0.95 
                  }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden ${
                    dropdownDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
                  }`}
                >
                  <div className="py-1">
                    <motion.button
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      onClick={() => handleCategorySelect('')}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                        selectedCategory === 'All Categories' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      All Categories
                    </motion.button>
                    {filterOptions.category.map((category, index) => (
                      <motion.button
                        key={category}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                          selectedCategory === category 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedFilters.type.length > 0 || selectedFilters.remote.length > 0 || selectedFilters.category.length > 0) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Clear all filters
          </motion.button>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsMobileFiltersOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200"
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm">Filters</span>
          {(selectedFilters.type.length > 0 || selectedFilters.remote.length > 0 || selectedFilters.category.length > 0) && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded-full">
              {selectedFilters.type.length + selectedFilters.remote.length + selectedFilters.category.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Desktop Sidebar - Filters */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-80 flex-shrink-0"
      >
        <FilterSidebar />
      </motion.div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSidebar isMobile={true} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Section - Search and Job Cards */}
      <div className="flex-1">
        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search jobs, companies, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 mb-6"
        >
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </motion.div>

        {/* Job Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6"
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <JobCard job={job} onClick={() => onJobClick(job)} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg">No jobs found matching your criteria</div>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default JobListings 