document.addEventListener('DOMContentLoaded', function () {
    const opacityButtons = document.querySelectorAll('.opacityButton');
  
    opacityButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Reduce the opacity of the blog box
        document.getElementById('blogBox').style.opacity = '0.2';
  
        // Set the opacity of the clicked button's parent container to 1
        this.parentElement.style.opacity = '1';
      });
    });
  });
  