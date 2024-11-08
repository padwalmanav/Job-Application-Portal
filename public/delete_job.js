document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const jobCard = button.parentElement;
        const jobId = jobCard.getAttribute('data-id');
  
        if (confirm('Are you sure you want to delete this job?')) {
          deleteJob(jobId);
          jobCard.remove();
        }
      });
    });
  
    function deleteJob(jobId) {
      // Get the existing jobs from local storage
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  
      // Find the index of the job to delete
      const jobIndex = jobs.findIndex(job => job.id === jobId);
  
      if (jobIndex !== -1) {
        // Remove the job from the array
        jobs.splice(jobIndex, 1);
  
        // Update the local storage with the modified jobs array
        localStorage.setItem('jobs', JSON.stringify(jobs));
  
        console.log('Job', jobId, 'deleted');
      }
    }
  });