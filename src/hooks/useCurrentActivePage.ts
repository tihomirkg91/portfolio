import { useLocation } from 'react-router-dom';

export const useCurrentActivePage = () => {
  const location = useLocation();

  // Function to check if navigation item is active
  const isActive = (
    item: string,
    itemType: 'desktop' | 'mobile' = 'desktop'
  ) => {
    let itemPath: string;

    if (itemType === 'desktop') {
      itemPath =
        item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
    } else {
      itemPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
    }

    return location.pathname === itemPath;
  };

  // Get the current active page name
  const getActivePage = () => {
    const routes = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About' },
      { path: '/projects', name: 'Projects' },
      { path: '/contact', name: 'Contact' },
    ];

    const activeRoute = routes.find(
      (route) => route.path === location.pathname
    );
    return activeRoute ? activeRoute.name : 'Home';
  };

  return {
    isActive,
    getActivePage,
    currentPath: location.pathname,
  };
};
