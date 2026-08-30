// Initial Data Store
const defaultData = {
  categories: [
    { id: 1, name: "Web Development", icon: "fa-code", projectCount: 1240 },
    { id: 2, name: "Graphic Design", icon: "fa-pen-nib", projectCount: 850 },
    { id: 3, name: "Digital Marketing", icon: "fa-bullhorn", projectCount: 620 },
    { id: 4, name: "Content Writing", icon: "fa-feather", projectCount: 430 }
  ],
  projects: [
    {
      id: 101,
      title: "Full-Stack E-Commerce Dashboard",
      category: "Web Development",
      budget: 1200,
      description: "Looking for an experienced dev to build a responsive admin panel using React, Node.js, and MongoDB.",
      skills: ["React", "Node.js", "MongoDB", "Tailwind"],
      deadline: "15 Days",
      client: "TechCorp Inc."
    },
    {
      id: 102,
      title: "Brand Identity & UI Design System",
      category: "Graphic Design",
      budget: 450,
      description: "Create modern logo variations, typography guides, and mobile UI kits in Figma for a fintech app.",
      skills: ["Figma", "UI/UX", "Branding", "Illustrator"],
      deadline: "7 Days",
      client: "Nexus Studio"
    },
    {
      id: 103,
      title: "SEO Campaign & Social Media Growth",
      category: "Digital Marketing",
      budget: 650,
      description: "Drive targeted organic traffic, manage Meta ad campaigns, and provide weekly performance analytics.",
      skills: ["SEO", "Meta Ads", "Google Analytics"],
      deadline: "30 Days",
      client: "Bloom Health"
    },
    {
      id: 104,
      title: "Technical Blog Articles on Cloud & AI",
      category: "Content Writing",
      budget: 300,
      description: "Write 5 engaging, SEO-optimized technical articles explaining modern cloud architecture and AI integrations.",
      skills: ["Tech Writing", "SEO", "Copywriting"],
      deadline: "10 Days",
      client: "DataFlow Media"
    },
    {
      id: 105,
      title: "Cross-Platform Mobile Fitness Tracker",
      category: "Web Development",
      budget: 1800,
      description: "Build a responsive mobile application with workout logs, progress charts, and offline storage support.",
      skills: ["Flutter", "Firebase", "REST APIs"],
      deadline: "20 Days",
      client: "FitPulse App"
    }
  ],
  freelancers: [
    {
      id: 201,
      name: "Ahmed Hassan",
      role: "Frontend Engineer",
      rating: 4.9,
      reviewsCount: 48,
      hourlyRate: 40,
      bio: "Expert in creating clean, fast, and responsive user interfaces with modern React ecosystems.",
      skills: ["React", "TypeScript", "Tailwind", "Next.js"],
      img: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 202,
      name: "Sarah Jenkins",
      role: "Product Designer",
      rating: 5.0,
      reviewsCount: 62,
      hourlyRate: 45,
      bio: "Crafting engaging wireframes, design systems, and mobile prototypes for SaaS products.",
      skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
      img: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 203,
      name: "Omar Tarek",
      role: "Full-Stack Developer",
      rating: 4.8,
      reviewsCount: 35,
      hourlyRate: 50,
      bio: "Building scalable backend architectures and API-first web applications using Node.js and MongoDB.",
      skills: ["Node.js", "Express", "MongoDB", "JavaScript"],
      img: "https://i.pravatar.cc/150?img=68"
    },
    {
      id: 204,
      name: "Elena Rostova",
      role: "Digital Strategist & Copywriter",
      rating: 4.7,
      reviewsCount: 29,
      hourlyRate: 30,
      bio: "Helping tech businesses communicate clearly and scale their digital footprint with optimized content.",
      skills: ["SEO", "Content Strategy", "Email Marketing"],
      img: "https://i.pravatar.cc/150?img=47"
    }
  ],
  userProposals: JSON.parse(localStorage.getItem('userProposals')) || [
    {
      id: 1,
      projectTitle: "Full-Stack E-Commerce Dashboard",
      bidAmount: 1100,
      submissionDate: "2026-08-27",
      status: "Under Review"
    }
  ]
};

// 1. Render Categories
function renderCategories() {
  const container = document.querySelector('#categoriesContainer');
  if (!container) return;

  const colors = ['primary', 'success', 'warning', 'danger'];
  container.innerHTML = defaultData.categories.map((cat, idx) => `
    <div class="col-md-6 col-lg-3">
      <div class="card h-100 border text-center p-4 category-card" onclick="filterByCategory('${cat.name}')">
        <div class="icon-circle bg-${colors[idx % colors.length]}-subtle text-${colors[idx % colors.length]} mx-auto mb-3">
          <i class="fa-solid ${cat.icon} fa-xl"></i>
        </div>
        <h5 class="fw-bold mb-1">${cat.name}</h5>
        <small class="text-muted">${cat.projectCount} Projects</small>
      </div>
    </div>
  `).join('');
}

// 2. Render Projects
function renderProjects(projectsToRender = defaultData.projects) {
  const container = document.querySelector('#projectsContainer');
  if (!container) return;

  if (projectsToRender.length === 0) {
    container.innerHTML = `<div class="col-12 text-center py-5"><h5 class="text-muted">No projects found matching your criteria.</h5></div>`;
    return;
  }

  container.innerHTML = projectsToRender.map(project => `
    <div class="col-md-6 col-lg-4">
      <div class="card project-card h-100 border-0 shadow-sm p-4 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">${project.category}</span>
          <span class="fw-bold text-success fs-5">$${project.budget}</span>
        </div>
        <h5 class="fw-bold text-dark mb-2">${project.title}</h5>
        <p class="text-muted flex-grow-1 small">${project.description}</p>
        <div class="d-flex flex-wrap gap-1 mb-3">
          ${project.skills.map(skill => `<span class="badge bg-light text-secondary border">${skill}</span>`).join('')}
        </div>
        <div class="border-top pt-3 d-flex justify-content-between small text-muted mb-3">
          <span><i class="fa-regular fa-clock me-1"></i> ${project.deadline}</span>
          <span><i class="fa-regular fa-user me-1"></i> ${project.client}</span>
        </div>
        <button class="btn btn-primary w-100 fw-semibold" onclick="openProposalModal(${project.id})">Apply Now</button>
      </div>
    </div>
  `).join('');
}

// 3. Render Freelancers
function renderFreelancers() {
  const container = document.querySelector('#freelancersContainer');
  if (!container) return;

  container.innerHTML = defaultData.freelancers.map((freelancer, index) => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 border text-center p-4 shadow-sm">
        <img src="${freelancer.img}" alt="${freelancer.name}" class="rounded-circle mx-auto mb-3 border p-1" width="90" height="90" style="object-fit: cover;">
        <h5 class="fw-bold mb-0">${freelancer.name}</h5>
        <small class="text-primary fw-semibold mb-2 d-block">${freelancer.role}</small>
        <div class="text-warning small mb-3">
          <i class="fa-solid fa-star"></i>
          <span class="text-dark fw-bold ms-1">${freelancer.rating}</span>
          <span class="text-muted">(${freelancer.reviewsCount} reviews)</span>
        </div>
        <p class="text-muted small mb-3">${freelancer.bio}</p>
        <div class="d-flex justify-content-center flex-wrap gap-1 mb-4">
          ${freelancer.skills.map(skill => `<span class="badge bg-light text-secondary border">${skill}</span>`).join('')}
        </div>
        <button class="btn btn-outline-primary w-100 fw-semibold" onclick="DisplayProfile(${index})">View Profile</button>
      </div>
    </div>
  `).join('');
}

// 4. Render Proposals Table & Dashboard Counter
function renderProposals() {
  const tbody = document.querySelector('#proposalsTableBody');
  const countBadge = document.querySelector('#dashProposalsCount');
  if (!tbody) return;

  countBadge.textContent = defaultData.userProposals.length;

  tbody.innerHTML = defaultData.userProposals.map(item => `
    <tr>
      <td class="fw-semibold">${item.projectTitle}</td>
      <td class="text-success fw-bold">$${item.bidAmount}</td>
      <td>${item.submissionDate}</td>
      <td><span class="badge ${item.status === 'Accepted' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} border px-2 py-1">${item.status}</span></td>
    </tr>
  `).join('');
}

// 5. Open Freelancer Profile Modal
function DisplayProfile(index) {
  const freelancer = defaultData.freelancers[index];
  if (!freelancer) return;

  document.querySelector('#modalProfileImg').src = freelancer.img;
  document.querySelector('#modalProfileName').textContent = freelancer.name;
  document.querySelector('#modalProfileRole').textContent = freelancer.role;
  document.querySelector('#modalProfileRating').textContent = freelancer.rating;
  document.querySelector('#modalProfileReviews').textContent = `(${freelancer.reviewsCount} reviews)`;
  document.querySelector('#modalProfileRate').textContent = `$${freelancer.hourlyRate}/hr`;
  document.querySelector('#modalProfileBio').textContent = freelancer.bio;

  const skillsContainer = document.querySelector('#modalProfileSkills');
  skillsContainer.innerHTML = freelancer.skills.map(skill => `<span class="badge bg-light text-dark border px-3 py-2">${skill}</span>`).join('');

  const profileModal = new bootstrap.Modal(document.getElementById('freelancerProfileModal'));
  profileModal.show();
}

// 6. Open Proposal Modal
function openProposalModal(projectId) {
  const project = defaultData.projects.find(p => p.id === projectId);
  if (!project) return;

  document.querySelector('#modalProjectId').value = project.id;
  document.querySelector('#modalProjectName').textContent = `Applying for: ${project.title}`;
  document.querySelector('#bidAmount').value = project.budget;

  const modal = new bootstrap.Modal(document.getElementById('proposalModal'));
  modal.show();
}

// 7. Handle Proposal Submission
document.querySelector('#proposalForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const projectId = parseInt(document.querySelector('#modalProjectId').value);
  const project = defaultData.projects.find(p => p.id === projectId);
  const bidAmount = document.querySelector('#bidAmount').value;

  const newProposal = {
    id: Date.now(),
    projectTitle: project ? project.title : "Custom Project",
    bidAmount: Number(bidAmount),
    submissionDate: new Date().toISOString().split('T')[0],
    status: "Under Review"
  };

  defaultData.userProposals.unshift(newProposal);
  localStorage.setItem('userProposals', JSON.stringify(defaultData.userProposals));

  renderProposals();
  this.reset();

  const modalEl = document.getElementById('proposalModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  alert("Proposal submitted successfully!");
});

// 8. Search & Filters Logic
function applyFilters() {
  const searchTerm = document.querySelector('#mainSearchInput')?.value.toLowerCase().trim() || "";
  const selectedCat = document.querySelector('#categoryFilter')?.value || "all";
  const selectedBudget = document.querySelector('#budgetFilter')?.value || "all";

  const filtered = defaultData.projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm) ||
                          proj.description.toLowerCase().includes(searchTerm) ||
                          proj.skills.some(s => s.toLowerCase().includes(searchTerm)) ||
                          proj.client.toLowerCase().includes(searchTerm);

    const matchesCategory = (selectedCat === "all") || (proj.category === selectedCat);

    let matchesBudget = true;
    if (selectedBudget === "low") matchesBudget = proj.budget < 500;
    else if (selectedBudget === "medium") matchesBudget = proj.budget >= 500 && proj.budget <= 1500;
    else if (selectedBudget === "high") matchesBudget = proj.budget > 1500;

    return matchesSearch && matchesCategory && matchesBudget;
  });

  renderProjects(filtered);
}

function filterByCategory(catName) {
  const catSelect = document.querySelector('#categoryFilter');
  if (catSelect) {
    catSelect.value = catName;
    applyFilters();
    location.href = '#projects';
  }
}

// Event Listeners for Filters
document.querySelector('#mainSearchInput')?.addEventListener('input', applyFilters);
document.querySelector('#categoryFilter')?.addEventListener('change', applyFilters);
document.querySelector('#budgetFilter')?.addEventListener('change', applyFilters);

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProjects();
  renderFreelancers();
  renderProposals();
});