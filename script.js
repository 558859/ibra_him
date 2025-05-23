$(document).ready(function () {
  // Sticky Navbar & Active Link highlighting
  const navbar = document.getElementById("navbar-top");
  const navLinks = document.querySelectorAll("#navbarNav .nav-link");
  const sections = document.querySelectorAll("section[id]");

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

  if (window.pageYOffset > 0) {
    updateActiveLink();
  }

  window.onscroll = function () {
    if (navbar) {
      if (window.pageYOffset > 100) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    }
    updateActiveLink();
    scrollFunction();
  };

  // Smooth scrolling for all anchor links with href starting with #
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .not('[data-bs-toggle]')
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
              scrollTop: target.offset().top - ($('#navbar-top').outerHeight() || 0)
            },
            800,
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
  $('.filter-item[data-filter="all"]').addClass('active btn-primary').removeClass('btn-outline-primary');

  // Circular Skill Progress Bars Animation
  const skillSection = document.querySelector(".skill-with-progress");
  const progressBars = document.querySelectorAll(".circular-progress");

  function animateProgressBars() {
    progressBars.forEach((progressBar) => {
      let progressValueElement = progressBar.querySelector(".progress-value");
      let startValue = 0;
      let endValue = parseInt(progressBar.getAttribute("data-value")) || 0;
      let speed = 20;

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
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (skillSection) {
    observer.observe(skillSection);
  }

  // Back to Top Button
  let mybutton = document.getElementById("btn-back-to-top");

  function scrollFunction() {
    if (mybutton) {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }

  if (mybutton) {
    mybutton.addEventListener("click", backToTop);
  }

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
