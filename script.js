// script.js
$(document).ready(function () {
  // Sticky Navbar & Active Link highlighting
  const navbar = document.getElementById("navbar-top");
  const navLinks = document.querySelectorAll("#navbarNav .nav-link");
  const sections = document.querySelectorAll("section[id]"); // Ensure sections have IDs

  function updateActiveLink() {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });
  }
  
  // Initial call if page loads scrolled
  if (window.pageYOffset > 0) {
     updateActiveLink();
  }


  window.onscroll = function () {
    // Sticky navbar logic (already handled by Bootstrap 'sticky-top' but you can add more)
    if (navbar) { // Check if navbar element exists
        if (window.pageYOffset > 100) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }
    // Update active link on scroll
    updateActiveLink();
    // Back to top button visibility
    scrollFunction();
  };


  // Smooth scrolling for all anchor links with href starting with #
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[data-bs-toggle]') // Exclude Bootstrap toggle elements like modals, tabs, carousel controls
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top - ($('#navbar-top').outerHeight() || 0) // Adjust for fixed navbar height
            },
            800, // Duration
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });

  // Portfolio Item Filtering
  $(".filter-item").click(function () {
    const filterValue = $(this).attr("data-filter");

    // Remove active class from all filter buttons and add to the clicked one
    $(".filter-item").removeClass("active btn-primary").addClass("btn-outline-primary");
    $(this).removeClass("btn-outline-primary").addClass("active btn-primary");


    if (filterValue == "all") {
      $(".post").show("slow");
    } else {
      $(".post")
        .not("." + filterValue)
        .hide("slow");
      $(".post")
        .filter("." + filterValue)
        .show("slow");
    }
  });
  // Set the first filter item ("All") as active by default
  $('.filter-item[data-filter="all"]').addClass('active btn-primary').removeClass('btn-outline-primary');


  // Circular Skill Progress Bars Animation
  const skillSection = document.querySelector(".skill-with-progress");
  const progressBars = document.querySelectorAll(".circular-progress");

  function animateProgressBars() {
    progressBars.forEach((progressBar) => {
      let progressValueElement = progressBar.querySelector(".progress-value");
      let startValue = 0;
      let endValue = parseInt(progressBar.getAttribute("data-value")) || 0;
      let speed = 20; // Lower is faster

      let progress = setInterval(() => {
        startValue++;
        if (progressValueElement) {
            progressValueElement.textContent = `${startValue}%`;
        }
        progressBar.style.background = `conic-gradient(
          var(--orange-color) ${startValue * 3.6}deg,
          #ededed ${startValue * 3.6}deg
        )`;
        if (startValue == endValue) {
          clearInterval(progress);
        }
      }, speed);
    });
  }

  // Use Intersection Observer to trigger animation when skill section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  if (skillSection) { // Check if skillSection element exists
    observer.observe(skillSection);
  }


  // Back to Top Button
  let mybutton = document.getElementById("btn-back-to-top");

  function scrollFunction() {
    if (mybutton) { // Check if mybutton element exists
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
        } else {
        mybutton.style.display = "none";
        }
    }
  }

  if (mybutton) { // Check if mybutton element exists
    mybutton.addEventListener("click", backToTop);
  }

  function backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) { // Check if currentYearElement element exists
    currentYearElement.textContent = new Date().getFullYear();
  }

});

// ...existing code inside $(document).ready(function () { ... )

  // Gestion de l'envoi du formulaire de contact
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/contact', // L'URL de ton backend Node.js
      method: 'POST',
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        message: $('#message').val()
      },
      success: function() {
        $('#form-message').html('<div class="alert alert-success">Merci, votre inscription a bien été envoyée !</div>');
        $('#contactForm')[0].reset();
      },
      error: function() {
        $('#form-message').html('<div class="alert alert-danger">Erreur lors de l\'envoi. Essayez encore.</div>');
      }
    });
  });

// ...dans $(document).ready(function () { ...
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/contact',
      method: 'POST',
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        message: $('#message').val()
      },
      success: function() {
        $('#form-message').html('<div class="alert alert-success">Merci, votre inscription a bien été envoyée !</div>');
        $('#contactForm')[0].reset();
      },
      error: function() {
        $('#form-message').html('<div class="alert alert-danger">Erreur lors de l\'envoi. Essayez encore.</div>');
      }
    });
  });
  document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-message').textContent = "Message envoyé avec succès !";
  document.getElementById('form-message').style.color = "green";
  this.reset();
});

// ...existing code...