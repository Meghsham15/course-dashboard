const courses = [
  {
    id: 1,
    rating: 1,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:700/1*C3kxjCrJy-aWSMpe2chfaA.png',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.',
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.',
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com',
      },
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com',
      },
      // Additional enrolled students...
    ],
  },
  {
    id: 2,
    rating: 2,
    name: 'Web Development Crash Course',
    instructor: 'Jane Doe',
    description: 'Learn the fundamentals of web development and build a simple website using HTML, CSS, and JavaScript.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1200/1*V-Jp13LvtVc2IiY2fp4qYw.jpeg',
    duration: '4 weeks',
    schedule: 'Saturdays, 10:00 AM - 12:00 PM',
    location: 'Online',
    prerequisites: ['Basic computer literacy'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Web Development',
        content: 'Overview of web development technologies and tools.'
      },
      {
        week: 2,
        topic: 'HTML Fundamentals',
        content: 'Learning HTML structure and creating basic web pages.'
      },
      {
        week: 3,
        topic: 'Styling with CSS',
        content: 'Adding style and layout to your web pages using CSS.'
      },
      {
        week: 4,
        topic: 'Introduction to JavaScript',
        content: 'Adding interactivity to your web pages with JavaScript.'
      },
    ],
    students: [] // Replace with actual student IDs
  },
  {
    id: 3,
    rating: 3,
    name: 'Python for Data Science',
    instructor: 'John Smith',
    description: 'Master the Python programming language and its libraries for data analysis and visualization.',
    enrollmentStatus: 'Closed',
    thumbnail: 'https://imarticus.org/blog/wp-content/uploads/2021/12/learn-Python-for-data-science.jpg',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 7:00 PM - 9:00 PM',
    location: 'In-Person (Classroom A)',
    prerequisites: ['Basic programming experience'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Python',
        content: 'Learning Python syntax and data structures.'
      },
      {
        week: 2,
        topic: 'NumPy for Numerical Computing',
        content: 'Using NumPy for array operations and numerical computations.'
      },
      {
        week: 3,
        topic: 'Pandas for Data Analysis',
        content: 'Learning data manipulation and analysis with Pandas library.'
      },
      {
        week: 4,
        topic: 'Matplotlib for Data Visualization',
        content: 'Creating informative visualizations using Matplotlib.'
      },
      // Include additional weeks and topics related to data science with Python
    ],
    students: [] // Replace with actual student IDs
  },
  // Additional courses
  {
    id: 4,
    rating: 4,
    name: 'JavaScript Fundamentals',
    instructor: 'Alice Smith',
    description: 'Learn the basics of JavaScript programming language.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:800/1*PmUTWiNpLP-Qult2tuUtWw.jpeg',
    duration: '6 weeks',
    schedule: 'Mondays and Wednesdays, 5:00 PM - 7:00 PM',
    location: 'Online',
    prerequisites: [],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to JavaScript',
        content: 'Overview of JavaScript, data types, and variables.'
      },
      {
        week: 2,
        topic: 'Control Flow and Functions',
        content: 'Conditional statements, loops, and function basics.'
      },
      // Additional weeks and topics...
    ],
    students: [] // Replace with actual student IDs
  },
  {
    id: 5,
    rating: 5,
    name: 'React.js Advanced Techniques',
    instructor: 'Sarah Brown',
    description: 'Master advanced React.js techniques and best practices.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://reactjs.org/logo-og.png',
    duration: '10 weeks',
    schedule: 'Tuesdays and Thursdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['Intermediate React.js knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'React Hooks',
        content: 'Understanding and using React Hooks for state management.'
      },
      {
        week: 2,
        topic: 'Advanced Component Patterns',
        content: 'Advanced component patterns and composition techniques.'
      },
      // Additional weeks and topics...
    ],
    students: [] // Replace with actual student IDs
  },
  // Add more courses as needed...
];

export default courses;
