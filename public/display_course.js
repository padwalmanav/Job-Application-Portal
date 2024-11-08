document.addEventListener('DOMContentLoaded', function() {
    const coursesContainer = document.querySelector('.container');
  
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
  
    courses.forEach(function(course) {
      const courseCard = document.createElement('div');
      courseCard.classList.add('job-card');
      courseCard.innerHTML = `
        <h2 class="job-title">${course.name}</h2>
        <p class="job-description">${course.description}</p>
        <a href="registration.html" class="job-button">Apply Now</a>
        <button class="delete-button" data-id="${course.id}">Delete</button>
      `;
      coursesContainer.appendChild(courseCard);

    });
  });