import './index.css';
import { Router } from './router/router';
import { Theme } from './utils/theme';
import { Header } from './components/header';
import { Footer } from './components/footer';

// Initialize theme
const theme = new Theme();
theme.init();

// Initialize router
const router = new Router();
router.init();

// Add header and footer
document.body.insertAdjacentHTML('afterbegin', Header.render());
document.body.insertAdjacentHTML('beforeend', Footer.render());

// Initialize event listeners
Header.addEventListeners();

// Handle navigation clicks
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest('[data-route]') as HTMLElement;

  if (link) {
    e.preventDefault();
    const route = link.getAttribute('data-route');
    if (route) {
      router.navigate(route);
    }
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  router.handleRouteChange();
});