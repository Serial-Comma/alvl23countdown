// Function to handle checkbox changes
function handleCheckboxChange() {
    // Get all selected subjects
    const selectedSubjects = Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(checkbox => checkbox.value);
  
    // Loop through all iframes and show/hide them based on selection
    const iframes = document.querySelectorAll('.iframe-container iframe');
    iframes.forEach(iframe => {
      const subjectName = iframe.getAttribute('data-subject');
  
      if (selectedSubjects.includes(subjectName)) {
        iframe.style.display = 'block'; // Show the iframe
      } else {
        iframe.style.display = 'none'; // Hide the iframe
      }
    });
  
    // Store the selected subjects in a cookie
    document.cookie = `selectedSubjects=${selectedSubjects.join(',')}`;
  }
  
  // Attach event listener to checkboxes
  const checkboxes = document.querySelectorAll('input[name="subject"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
  
  // Retrieve previously selected subjects from the cookie
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)selectedSubjects\s*=\s*([^;]*).*$)|^.*$/, '$1');
  if (cookieValue) {
    const selectedSubjects = cookieValue.split(',');
    selectedSubjects.forEach(subject => {
      const checkbox = document.querySelector(`input[name="subject"][value="${subject}"]`);
      if (checkbox) {
        checkbox.checked = true; // Check the checkbox if the subject was previously selected
      }
    });
  }
  
  // Trigger initial handling of checkboxes
  handleCheckboxChange();
  