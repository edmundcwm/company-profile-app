import CompanyProfile from '../components/CompanyProfile/CompanyProfile';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

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
    homePath: '/app/company-profile',
    routes: [
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
