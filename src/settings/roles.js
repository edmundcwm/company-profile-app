import CompanyProfile from '../components/CompanyProfile/CompanyProfile';
import UserDashboard from '../components/UserDashboard/UserDashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DashboardIcon from '@material-ui/icons/Dashboard';

const roles = {
  administrator: {
    homePath: '/app/admin-dashboard',
    routes: [
      {
        id: 'adminDashboard',
        component: 'AdminDashboard',
        path: '/admin-dashboard',
        title: 'Admin Dashboard'
      },
      {
        id: 'adminProfile',
        component: 'AdminProfile',
        path: '/admin-profile',
        title: 'Admin Profile'
      }
    ]
  },
  portal_customer: {
    homePath: '/app/dashboard',
    routes: [
      {
        id: 'userDashboard',
        component: UserDashboard,
        path: '/dashboard',
        title: 'Dashboard',
        icon: DashboardIcon,
        exact: true
      },
      {
        id: 'companyProfile',
        component: CompanyProfile,
        path: '/company-profile',
        title: 'Company Profile',
        icon: SupervisorAccountIcon,
        exact: true
      }
    ]
  }
};

export default roles;
