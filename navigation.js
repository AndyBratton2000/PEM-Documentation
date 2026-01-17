/**
 * PEM Documentation Navigation
 * Adds breadcrumbs and auto-generated table of contents
 */
(function() {
  'use strict';

  // Document structure definitions
  const ROOT_DOCS = [
    { id: '00', name: 'README', file: '00-README.html' },
    { id: '01', name: 'Master Plan', file: '01-AZURE-PEM-MASTER-PLAN.html' },
    { id: '02', name: 'Azure Architecture', file: '02-AZURE-ARCHITECTURE.html' },
    { id: '03', name: 'Feature Specification', file: '03-PEM-FEATURE-SPECIFICATION.html' },
    { id: '04', name: 'Data Model', file: '04-DATA-MODEL.html' },
    { id: '05', name: 'API Design', file: '05-API-DESIGN.html' },
    { id: '06', name: 'Infrastructure', file: '06-INFRASTRUCTURE.html' },
    { id: '07', name: 'Development Guide', file: '07-DEVELOPMENT-GUIDE.html' },
    { id: '08', name: 'Testing Strategy', file: '08-TESTING-STRATEGY.html' },
    { id: '09', name: 'Bundle Calculation', file: '09-BUNDLE-CALCULATION-SPECIFICATION.html' },
    { id: '10', name: 'Security & Compliance', file: '10-SECURITY-AND-COMPLIANCE.html' }
  ];

  const REPRICING_DOCS = [
    { id: '00', name: 'README', file: '00-README.html' },
    { id: '01', name: 'Repricing Master Plan', file: '01-REPRICING-MASTER-PLAN.html' },
    { id: '02', name: 'Current State Analysis', file: '02-CURRENT-STATE-ANALYSIS.html' },
    { id: '03', name: 'Containerization Strategy', file: '03-CONTAINERIZATION-STRATEGY.html' },
    { id: '04', name: 'Cloud-Native Architecture', file: '04-CLOUD-NATIVE-ARCHITECTURE.html' },
    { id: '05', name: 'Integration with PEM', file: '05-INTEGRATION-WITH-PEM.html' },
    { id: '06', name: 'Scaling & Performance', file: '06-SCALING-AND-PERFORMANCE.html' },
    { id: '07', name: 'Core Data Structures', file: '07-CORE-DATA-STRUCTURES.html' },
    { id: '08', name: 'DLL Dependency Inventory', file: '08-DLL-DEPENDENCY-INVENTORY.html' },
    { id: '09', name: 'Groupers & Pricers', file: '09-GROUPERS-AND-PRICERS.html' },
    { id: '10', name: 'TAC Engine Extraction', file: '10-TAC-ENGINE-EXTRACTION.html' },
    { id: '11', name: 'Database Requirements', file: '11-DATABASE-REQUIREMENTS.html' },
    { id: '12', name: 'Caching Strategy', file: '12-CACHING-STRATEGY.html' },
    { id: '13', name: 'Testing & Observability', file: '13-TESTING-AND-OBSERVABILITY.html' }
  ];

  // Detect current page context
  function getPageContext() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const isRepricing = path.includes('PEM Repricing in Azure') || path.includes('PEM%20Repricing%20in%20Azure');
    
    return {
      filename: filename,
      isRepricing: isRepricing,
      docs: isRepricing ? REPRICING_DOCS : ROOT_DOCS,
      basePath: isRepricing ? '../' : '',
      repricingPath: isRepricing ? '' : 'PEM%20Repricing%20in%20Azure/'
    };
  }

  // Get current document info
  function getCurrentDoc(ctx) {
    return ctx.docs.find(d => d.file === ctx.filename) || { id: '??', name: document.title, file: ctx.filename };
  }

  // Create breadcrumb navigation
  function createBreadcrumb(ctx, currentDoc) {
    const nav = document.createElement('nav');
    nav.className = 'breadcrumb-nav';
    nav.setAttribute('aria-label', 'Breadcrumb');

    // Menu toggle for mobile
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.onclick = toggleSidebar;
    nav.appendChild(menuToggle);

    // Breadcrumb list
    const ol = document.createElement('ol');
    ol.className = 'breadcrumb-list';

    // Home link
    const homeLi = document.createElement('li');
    const homeLink = document.createElement('a');
    homeLink.href = ctx.basePath + '00-README.html';
    homeLink.textContent = '🏠 PEM Azure';
    homeLi.appendChild(homeLink);
    ol.appendChild(homeLi);

    // Repricing section link (if in repricing)
    if (ctx.isRepricing) {
      const sepLi1 = document.createElement('li');
      sepLi1.innerHTML = '<span class="separator">›</span>';
      ol.appendChild(sepLi1);

      const repricingLi = document.createElement('li');
      const repricingLink = document.createElement('a');
      repricingLink.href = '00-README.html';
      repricingLink.textContent = 'Repricing';
      repricingLi.appendChild(repricingLink);
      ol.appendChild(repricingLi);
    }

    // Current page
    const sepLi = document.createElement('li');
    sepLi.innerHTML = '<span class="separator">›</span>';
    ol.appendChild(sepLi);

    const currentLi = document.createElement('li');
    currentLi.innerHTML = '<span class="current">' + currentDoc.name + '</span>';
    ol.appendChild(currentLi);

    nav.appendChild(ol);
    return nav;
  }

  // Create sidebar with TOC
  function createSidebar(ctx, currentDoc) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'toc-sidebar';
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', 'Table of contents');

    // Document navigation section
    const docNav = document.createElement('div');
    docNav.className = 'doc-nav';

    const docNavTitle = document.createElement('h2');
    docNavTitle.className = 'doc-nav-title';
    docNavTitle.textContent = ctx.isRepricing ? 'Repricing Docs' : 'PEM Azure Docs';
    docNav.appendChild(docNavTitle);

    const docNavList = document.createElement('ul');
    docNavList.className = 'doc-nav-list';

    ctx.docs.forEach(doc => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = doc.file;
      a.textContent = doc.id + ' - ' + doc.name;
      if (doc.file === ctx.filename) {
        a.className = 'active';
      }
      li.appendChild(a);
      docNavList.appendChild(li);
    });

    docNav.appendChild(docNavList);
    sidebar.appendChild(docNav);

    // Link to other section
    const otherSection = document.createElement('div');
    otherSection.className = 'doc-nav';
    otherSection.style.paddingTop = '0';

    const otherTitle = document.createElement('h2');
    otherTitle.className = 'doc-nav-title';
    otherTitle.textContent = ctx.isRepricing ? 'Main PEM Docs' : 'Repricing Docs';
    otherSection.appendChild(otherTitle);

    const otherList = document.createElement('ul');
    otherList.className = 'doc-nav-list';

    const otherLi = document.createElement('li');
    const otherLink = document.createElement('a');
    otherLink.href = ctx.isRepricing ? '../00-README.html' : 'PEM%20Repricing%20in%20Azure/00-README.html';
    otherLink.textContent = ctx.isRepricing ? '← Back to PEM Azure' : '→ PEM Repricing in Azure';
    otherLi.appendChild(otherLink);
    otherList.appendChild(otherLi);

    otherSection.appendChild(otherList);
    sidebar.appendChild(otherSection);

    // Page TOC section
    const pageToc = document.createElement('div');
    pageToc.className = 'page-toc';

    const pageTocTitle = document.createElement('h2');
    pageTocTitle.className = 'page-toc-title';
    pageTocTitle.textContent = 'On This Page';
    pageToc.appendChild(pageTocTitle);

    const pageTocList = document.createElement('ul');
    pageTocList.className = 'page-toc-list';
    pageTocList.id = 'page-toc-list';
    pageToc.appendChild(pageTocList);

    sidebar.appendChild(pageToc);

    return sidebar;
  }

  // Generate page TOC from headings
  function generatePageTOC() {
    const tocList = document.getElementById('page-toc-list');
    if (!tocList) return;

    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    const headings = mainContent.querySelectorAll('h2, h3, h4');
    
    headings.forEach((heading, index) => {
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + heading.id;
      a.textContent = heading.textContent;
      a.className = 'toc-' + heading.tagName.toLowerCase();
      
      // Smooth scroll
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(heading.id);
        if (target) {
          const offset = 70; // Account for fixed header
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          history.pushState(null, '', '#' + heading.id);
        }
        // Close sidebar on mobile after click
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });

      li.appendChild(a);
      tocList.appendChild(li);
    });

    // Highlight active section on scroll
    setupScrollSpy(headings);
  }

  // Scroll spy for active section highlighting
  function setupScrollSpy(headings) {
    const tocLinks = document.querySelectorAll('.page-toc-list a');
    
    function updateActiveSection() {
      const scrollPos = window.scrollY + 100;
      let activeIndex = 0;

      headings.forEach((heading, index) => {
        if (heading.offsetTop <= scrollPos) {
          activeIndex = index;
        }
      });

      tocLinks.forEach((link, index) => {
        link.classList.toggle('active', index === activeIndex);
      });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  }

  // Toggle sidebar (mobile)
  function toggleSidebar() {
    const sidebar = document.querySelector('.toc-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
    if (overlay) {
      overlay.classList.toggle('visible');
    }
  }

  function closeSidebar() {
    const sidebar = document.querySelector('.toc-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) {
      sidebar.classList.remove('open');
    }
    if (overlay) {
      overlay.classList.remove('visible');
    }
  }

  // Main initialization
  function init() {
    const ctx = getPageContext();
    const currentDoc = getCurrentDoc(ctx);

    // Add navigation class to body
    document.body.classList.add('has-navigation');

    // Get all body content
    const bodyContent = document.body.innerHTML;

    // Create new structure
    const wrapper = document.createElement('div');
    wrapper.className = 'page-wrapper';

    // Create breadcrumb
    const breadcrumb = createBreadcrumb(ctx, currentDoc);

    // Create sidebar
    const sidebar = createSidebar(ctx, currentDoc);

    // Create main content container
    const mainContent = document.createElement('main');
    mainContent.className = 'main-content';
    mainContent.innerHTML = bodyContent;

    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = closeSidebar;

    // Clear body and add new structure
    document.body.innerHTML = '';
    document.body.appendChild(breadcrumb);
    document.body.appendChild(overlay);
    document.body.appendChild(wrapper);
    wrapper.appendChild(sidebar);
    wrapper.appendChild(mainContent);

    // Generate page TOC
    generatePageTOC();

    // Handle hash navigation on load
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const offset = 70;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
