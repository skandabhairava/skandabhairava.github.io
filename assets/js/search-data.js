// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of my cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-path-to-raytracing-pun-intended-101",
        
          title: "Path to Raytracing(Pun intended) 101",
        
        description: "from “Hello World!” to “Hello 3D World!”",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/raytracing/";
          
        },
      },{id: "projects-custom-uri-scheme-golang",
          title: 'Custom URI Scheme (Golang)',
          description: "Golang Library to build executables which can startup by visiting a custom URL",
          section: "Projects",handler: () => {
              window.location.href = "/projects/custom_uri_scheme/";
            },},{id: "projects-gravball",
          title: 'GravBall',
          description: "Fun Game based on Gravity Simulation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/gravball/";
            },},{id: "projects-leaf-disease-detection",
          title: 'Leaf Disease Detection',
          description: "Wrote my own CNN in Pytorch",
          section: "Projects",handler: () => {
              window.location.href = "/projects/leaf_disease_detection/";
            },},{id: "projects-mcworldgen",
          title: 'MCWorldGen',
          description: "Custom World Generation engine built from scratch using perlin noise. Uses minecraft as the main world building interface.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mcworldgen/";
            },},{id: "projects-obbattu",
          title: 'Obbattu',
          description: "Kannada based wordle like game",
          section: "Projects",handler: () => {
              window.location.href = "/projects/obbattu/";
            },},{id: "projects-p5js-simulations",
          title: 'P5JS Simulations',
          description: "Simple simulations using P5JS as the rendering engine.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/p5js/";
            },},{id: "projects-raytracer",
          title: 'Raytracer',
          description: "A Custom raytracing engine in C++ developed from scratch, with little to no references.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/raytracer/";
            },},{id: "projects-rejex-python",
          title: 'Rejex (Python)',
          description: "Python Library to build Regex expressions",
          section: "Projects",handler: () => {
              window.location.href = "/projects/rejex/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/SkandaBhairava_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%6B%61%6E%64%61%62%68%61%69%72%61%76%61@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=QzN7t74AAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0004-4144-2291", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/skandabhairava", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/skandabhairava", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/skandabhairava", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
