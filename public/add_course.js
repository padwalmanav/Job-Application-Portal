document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.getElementById('courseForm');
  
    courseForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const courseName = document.getElementById('courseName').value;
      const courseDescription = document.getElementById('courseDescription').value;
  
      if (courseName && courseDescription) {
        const courseData = { name: courseName, description: courseDescription };
        saveCourse(courseData);
      }
    });
  
    function saveCourse(course) {
      const courses = JSON.parse(localStorage.getItem('courses')) || [];
      courses.push(course);
      localStorage.setItem('courses', JSON.stringify(courses));
      alert('Course added successfully!');
    }
  });