// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Form submission
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your form submission logic here
    
    // Clear form input fields
    this.reset();
  });
  
  // Toggle navigation menu
  document.getElementById('nav-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('nav-menu').classList.toggle('active');
  });

  // Function to fetch testimonials from the server
async function fetchTestimonials() {
    try {
      const response = await fetch('/api/testimonials'); // Replace with the appropriate API endpoint
      const testimonials = await response.json();
  
      // Clear existing testimonials
      const testimonialContainer = document.getElementById('testimonialContainer');
      testimonialContainer.innerHTML = '';
  
      // Append testimonials to the testimonial container
      testimonials.forEach((testimonial) => {
        testimonialContainer.innerHTML += `
          <div class="testimonial">
            <h3>${testimonial.name}</h3>
            <p>${testimonial.content}</p>
          </div>
        `;
      });
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  }
  
  // Function to handle form submission
  async function submitTestimonial(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('nameInput');
    const testimonialInput = document.getElementById('testimonialInput');
    const testimonialForm = document.getElementById('testimonialForm');
  
    // Create a testimonial object
    const testimonial = {
      name: nameInput.value,
      content: testimonialInput.value,
    };
  
    try {
      // Send the testimonial data to the server
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonial),
      });
  
      if (response.ok) {
        // Testimonial submitted successfully
        nameInput.value = '';
        testimonialInput.value = '';
        fetchTestimonials(); // Refresh the testimonials section
      } else {
        console.error('Failed to submit testimonial');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  }
  
  // Add event listener to the testimonial form
  const testimonialForm = document.getElementById('testimonialForm');
  testimonialForm.addEventListener('submit', submitTestimonial);
  
  // Fetch testimonials when the page loads
  fetchTestimonials();

//contact
function validateForm() {
  var name = document.getElementById("name").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var mobilePattern = /^0\d{9}$/;

  if (!mobile.match(mobilePattern)) {
    alert("Please enter a 10-digit number starting with 0.");
    return false;
  }

  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Please fill in all the required information.");
    return false;
  }

  var whatsappLink =
    "https://api.whatsapp.com/send?phone=+27642152212&text=" +
    "Name: " +
    encodeURIComponent(name) +
    "%0A" +
    "Mobile: " +
    encodeURIComponent(mobile) +
    "%0A" +
    "Email: " +
    encodeURIComponent(email) +
    "%0A" +
    "Message: " +
    encodeURIComponent(message);

  window.open(whatsappLink);

  return true;
}