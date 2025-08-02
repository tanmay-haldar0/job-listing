# JobHub - Job Listing Application

A modern, responsive job listing application built with React, Vite, TailwindCSS, and Framer Motion. This project demonstrates a clean, professional UI with smooth animations and interactive features.

## Features

### 🎯 Core Functionality
- **Job Listings**: Display jobs in a responsive grid layout
- **Search & Filter**: Search by job title, company, or location
- **Advanced Filtering**: Filter by job type, remote work, and category
- **Job Details**: Detailed view with comprehensive job information
- **Application Form**: Interactive form for job applications

### 🎨 UI/UX Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Hover Effects**: Subtle animations on job cards and interactive elements
- **Modern Design**: Clean, professional interface with TailwindCSS
- **Accessibility**: Proper focus states and keyboard navigation

### 🔧 Technical Features
- **React 18**: Latest React features and hooks
- **Vite**: Fast development and build tooling
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **Lucide React**: Beautiful, customizable icons

## Screenshots

### Job Listings Screen
- Clean grid layout with job cards
- Search bar with real-time filtering
- Filter chips for job type, remote work, and category
- Responsive design that adapts to screen size

### Job Detail Modal
- Comprehensive job information display
- Company details and requirements
- Benefits and salary information
- Interactive application form

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanmay-haldar0/job-listing.git
   cd job-listing-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── JobCard.jsx          # Individual job card component
│   ├── JobDetailModal.jsx   # Modal for job details and application
│   └── JobListings.jsx      # Main listings page with search/filters
├── data/
│   └── jobs.js              # Mock job data and filter options
├── App.jsx                  # Main application component
├── index.css               # Global styles and TailwindCSS imports
└── main.jsx                # Application entry point
```

## Features in Detail

### Search and Filtering
- **Real-time Search**: Search across job titles, companies, and locations
- **Multi-filter Support**: Combine multiple filters for precise results
- **Filter Categories**:
  - Job Type: Full-time, Part-time, Contract, Internship
  - Work Location: Remote, On-site, Hybrid
  - Category: Tech, Design, Product, Marketing, Sales, Content

### Job Cards
- **Hover Animations**: Scale and lift effects on hover
- **Information Display**: Title, company, location, salary, type, and category
- **Remote Indicator**: Visual indicator for remote positions
- **Interactive Elements**: Smooth transitions and feedback

### Job Detail Modal
- **Comprehensive Information**: Full job description, requirements, and benefits
- **Application Form**: Name, email, and resume upload fields
- **Form Validation**: Required field validation and file type restrictions
- **Smooth Transitions**: Animated modal entry and exit

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Grid Layout**: Responsive grid that adapts to screen size
- **Touch Friendly**: Proper touch targets and interactions
- **Cross-browser**: Compatible with modern browsers

## Technologies Used

- **React 18**: Component-based UI library
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library
- **JavaScript (ES6+)**: Modern JavaScript features

## Customization

### Adding New Jobs
Edit `src/data/jobs.js` to add new job listings:

```javascript
{
  id: 9,
  title: "New Job Title",
  company: "Company Name",
  location: "Location",
  salary: "Salary Range",
  type: "Full-time",
  remote: true,
  category: "Tech",
  description: "Job description...",
  requirements: ["Requirement 1", "Requirement 2"],
  benefits: ["Benefit 1", "Benefit 2"]
}
```

### Styling Customization
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Edit component classes for specific styling

### Animation Customization
- Adjust Framer Motion variants in components
- Modify transition durations and easing
- Add new animation effects as needed

## Performance Optimizations

- **Memoized Filtering**: Efficient job filtering with useMemo
- **Lazy Loading**: Components load only when needed
- **Optimized Animations**: Hardware-accelerated animations
- **Responsive Images**: Optimized for different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Demo

The application includes 8 sample job listings across various categories:
- Senior Frontend Developer (Tech, Remote)
- UI/UX Designer (Design, On-site)
- Product Manager (Product, Remote)
- Backend Engineer (Tech, Remote)
- Marketing Specialist (Marketing, On-site)
- DevOps Engineer (Tech, Remote)
- Content Writer (Content, Remote)
- Sales Representative (Sales, On-site)

Each job includes realistic descriptions, requirements, and benefits to demonstrate the full functionality of the application. 