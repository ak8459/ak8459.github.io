
$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 100) {
      $("#nav-menu").css("background", "white");
      let k = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px"
      $("#nav-menu").css("box-shadow", k);
      $("#nav-menu > a").css("color", "#00A4BD");
    }

    else {
      $("#nav-menu").css("background", "");
      // $("#nav-menu > a").css("color", "white");
      // $("#nav-menu > a").css("hover", "#00A4BD");
    }

  })
})


let max_particles = 2500;
let particles = [];
let frequency = 10;
let init_num = max_particles;
let max_time = frequency * max_particles;
let time_to_recreate = false;

// Enable repopolate
setTimeout(function () {
  time_to_recreate = true;
}.bind(this), max_time);

// Popolate particles
popolate(max_particles);

var tela = document.createElement('canvas');
tela.width = $(window).width();
tela.height = $(window).height();
$("#canvas").append(tela);

var canvas = tela.getContext('2d');

class Particle {
  constructor(canvas) {
    let random = Math.random();
    this.progress = 0;
    this.canvas = canvas;
    this.center = {
      x: $(window).width(),
      y: $(window).height() / 2
    };

    this.point_of_attraction = {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    };




    if (Math.random() > 0.5) {
      this.x = $(window).width() * Math.random();
      this.y = Math.random() > 0.5 ? -Math.random() - 100 : $(window).height() + Math.random() + 100;
    } else {
      this.x = Math.random() > 0.5 ? -Math.random() - 100 : $(window).width() + Math.random() + 100;
      this.y = $(window).height() * Math.random();

    }

    this.s = Math.random() * 2;
    this.a = 0;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
    this.color = random > .2 ? "#694FB9" : "#9B0127";
    this.radius = random > .8 ? Math.random() * 2.2 : this.radius;
    this.color = random > .8 ? "#3CFBFF" : this.color;
  }

  calculateDistance(v1, v2) {
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt(x * x + y * y);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {

    let p1 = {
      x: this.x,
      y: this.y
    };


    let distance = this.calculateDistance(p1, this.point_of_attraction);
    let force = Math.max(100, 1 + distance);

    let attr_x = (this.point_of_attraction.x - this.x) / force;
    let attr_y = (this.point_of_attraction.y - this.y) / force;

    this.x += Math.cos(this.a) * this.s + attr_x;
    this.y += Math.sin(this.a) * this.s + attr_y;
    this.a += Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2;

    if (distance < 30 + Math.random() * 100) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}


function popolate(num) {
  for (var i = 0; i < num; i++) {
    setTimeout(
      function (x) {
        return function () {
          // Add particle
          particles.push(new Particle(canvas));
        };
      }(i),
      frequency * i);
  }
  return particles.length;
}

function createSphera() {
  let radius = 180;
  let center = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
  };

}

function clear() {
  canvas.globalAlpha = 0.07;
  canvas.fillStyle = '#110031';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

/*
 * Function to update particles in canvas
 */
function update() {
  particles = particles.filter(function (p) { return p.move(); });
  // Recreate particles
  if (time_to_recreate) {
    if (particles.length < init_num) { popolate(1); console.log("Ricreo"); }
  }
  clear();
  requestAnimationFrame(update.bind(this));
}
update();





// tec section
let techArray = [{
  name: "HTML",
  icon: "./images/html-logo.png"
},
{
  name: "CSS",
  icon: "./images/css-logo.png"
},
{
  name: "JavaScript",
  icon: "./images/js-logo.png"
},
{
  name: "React",
  icon: "./images/react-logo.png"
},
{
  name: "npm",
  icon: "./images/npm-logo.png"
},
{
  name: "GitHub",
  icon: "./images/github-logo.png"
},
  // {
  //     name: "C",
  //     icon: "./images/c-logo.png"
  // }
]

const skill_container = document.querySelector("#skills");


function createElement() {
  skill_container.innerHTML = '';
  techArray.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("skills-card");

    let image = document.createElement("img");
    image.src = element.icon;
    image.classList.add("skills-card-img");

    let name = document.createElement("p");
    name.textContent = element.name;
    name.classList.add("skills-card-name");

    card.append(image, name);
    skill_container.append(card);
  })
}

createElement();



// Projects section

let projectsArray = [
  {
    image: "./project-assest/edukin.png",
    Title: "Edukin",
    description: "Edukin is an online learning skill-enhancing website. This is a collaborative project built by a team of four members in five days.",
    techStack: "HTML||CSS||JavaScript",
    githubLink: "https://github.com/ak8459/mushy-apparatus-2910",
    liveLink: "https://gleaming-rabanadas-c8636b.netlify.app/"
  },
  {
    image: "./project-assest/growskill.png",
    Title: "Grow Skill",
    description: "Grow Skill is an online learning website. It has diverse range of subjects available for people to learn and grow.This is an individual project build within 5 days.",
    techStack: "HTML||CSS||JavaScript||React",
    githubLink: "https://github.com/ak8459/casual-insurance-3102/tree/main",
    liveLink: "https://64cbd52977969a1a2e5ce78f--comfy-alpaca-588b63.netlify.app/",

  }, {
    image: "./project-assest/skin-store.png",
    Title: "Skin Store",
    description: "SkinStore offers premium beauty products like lipstick, Eyeliners, and many more products with the latest in innovative clinical skincare and luxury spa products.",
    techStack: "HTML ||CSS||JavaScript",
    githubLink: "https://github.com/ak8459/skin-store",
    liveLink: "https://skinstoreclone.netlify.app/"
  }



]

const projects_container = document.querySelector("#projects");

function createProjectsCards() {
  projects_container.innerHTML = '';
  projectsArray.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    let image = document.createElement("img");
    image.src = element.image;

    let title = document.createElement("h3");
    title.textContent = element.Title;
    title.classList.add("project-title");

    let description = document.createElement("p");
    description.textContent = element.description;
    description.classList.add("project-description");

    let tech_stack = document.createElement("p");
    tech_stack.textContent = element.techStack;
    tech_stack.classList.add("project-tech-stack");

    let projectLink = document.createElement("a");
    projectLink.href = element.liveLink;
    projectLink.textContent = "Live";
    projectLink.target = "_blank";
    projectLink.classList.add("project-deployed-link");

    let githubLink = document.createElement("a");
    githubLink.href = element.githubLink;
    githubLink.textContent = "Github";
    githubLink.target = "_blank";
    githubLink.classList.add("project-github-link");

    card.append(image, title, description, tech_stack, projectLink, githubLink);
    projects_container.append(card);
  })
}

createProjectsCards()

