import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

// super admin

const NewOnlineClients = React.lazy(() => import('../pages/SuperAdmin/ClientList/NewOnlineClients'));
const AllClients = React.lazy(() => import('../pages/SuperAdmin/ClientList/AllClients'));
const AdminClients = React.lazy(() => import('../pages/BranchAdmin/myClients'));
const AllBranches = React.lazy(() => import('../pages/SuperAdmin/BranchCoach/AllBranches'));
const AllCoaches = React.lazy(() => import('../pages/SuperAdmin/BranchCoach/AllCoaches'));
const AllAdmins = React.lazy(() => import('../pages/SuperAdmin/AllAdmins'));
const AllAnswerDetails = React.lazy(() => import('../pages/SuperAdmin/AllAnswerDetails'))
const AllDisease = React.lazy(() => import('../pages/SuperAdmin/AllDisease'));

const AllQuestions = React.lazy(() => import('../pages/SuperAdmin/AllQuestions'));
const AllAnswers = React.lazy(() => import('../pages/SuperAdmin/AllAnswers'));

const AllMyBranches = React.lazy(() => import('../pages/BranchAdmin/MyBranches.js'));

const BranchCoachAllClients = React.lazy(() => import('../pages/BranchCoach/BranchCoachAllClients'));

const ClientDetails = React.lazy(() => import('../pages/coach/clientDetails'));

const AllOrders = React.lazy(() => import('../pages/SuperAdmin/AllOrders'))

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    return (<Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />)
}

// const usertype = localStorage.getItem('usertype');

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    header: 'Navigation',
    badge: {
        variant: 'success',
        text: '1',
    },
    component: Dashboard,

    route: PrivateRoute,
};

const superAdminRoutesNew = {
    path: '/superadmin/',
    name: 'Master Admin ',
    icon: FeatherIcon.Inbox,
    children: [
        {
            path: '/superadmin/newclients',
            name: 'New Online Clients',
            component: NewOnlineClients,
            route: PrivateRoute,

        },
        {
            path: '/superadmin/allclients',
            name: 'All Clients',
            component: AllClients,
            route: PrivateRoute,

        },
        {
            path: '/superadmin/branch/allbranches',
            name: 'All Branches',
            component: AllBranches,
            route: PrivateRoute,

        },
        {
            path: '/superadmin/branch/allcoaches',
            name: 'All Coaches',
            component: AllCoaches,
            route: PrivateRoute,
        },
        {
            path: '/superadmin/branch/allAdmins',
            name: 'All Admins',
            component: AllAdmins,
            route: PrivateRoute,
        },
        {
            path: '/superadmin/allDisease',
            name: 'All Disease',
            component: AllDisease,
            route: PrivateRoute,

        },
        {
            path: '/superadmin/questionnaire',
            name: 'Questionnaire',
            component: AllQuestions,
            route: PrivateRoute,

        },
        {
            path: '/superadmin/AllAnswer',
            name: 'Client Response ',
            component: AllAnswers,
            route: PrivateRoute,

        },
        {
            path: '/superadmin/orders',
            name: 'All Orders',
            component: AllOrders,
            route: PrivateRoute,

        },

    ],
};


const superAdminAllQuestionsRoute = {
    path: '/superadmin/AllAnswerDetails',
    name: '',
    component: AllAnswerDetails,
    route: PrivateRoute,
    roles: ['Admin'],
    exact:true
};


const branchAdminRoutesNew = {
    path: '/admin/',
    name: 'Branch Admin ',
    icon: FeatherIcon.Inbox,
    children: [
        {
            path: '/admin/dashboard',
            name: 'My Online Clients',
            component: AdminClients,
            route: PrivateRoute,

        },
        {
            path: '/admin/branches',
            name: 'All My Branches',
            component: AllMyBranches,
            route: PrivateRoute,
        },
        {
            path: '/admin/allcoaches',
            name: 'All Coaches',
            component: AllCoaches,
            route: PrivateRoute,
        },
    ],
};







// branch admin



// branch coach


const BranchCoachClientRoutes = {
    path: '/branchcoach/client',
    name: 'Client',
    icon: FeatherIcon.Inbox,
    header: 'Coach',
    component: BranchCoachAllClients,
    route: PrivateRoute,
    roles: ['Admin'],
};

const BranchCoachClientDetailsRoutes = {
    path: '/branchcoach/clientdetails',
    name: '',
    component: ClientDetails,
    route: PrivateRoute,
    roles: ['Admin'],
};

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

const superadmin = [rootRoute, dashboardRoutes, superAdminRoutesNew, superAdminAllQuestionsRoute,authRoutes];

const superadminAuthRoutes = [rootRoute, dashboardRoutes, superAdminRoutesNew];

const branchadmin = [rootRoute, dashboardRoutes, branchAdminRoutesNew, authRoutes];

const branchadminAuthRoutes = [rootRoute, dashboardRoutes, branchAdminRoutesNew];

const coach = [BranchCoachClientDetailsRoutes, rootRoute, dashboardRoutes, BranchCoachClientRoutes, authRoutes];

const branchcoachAuthRoutes = [dashboardRoutes, BranchCoachClientRoutes];

// All routes


let authProtectedRoutes = [];
let allRoutes = []
const usertype = localStorage.getItem('usertype')
if (usertype === 'superadmin') {
    allRoutes = superadmin;
    authProtectedRoutes = superadminAuthRoutes;
} else if (usertype === 'branchadmin') {
    allRoutes = branchadmin;
    authProtectedRoutes = branchadminAuthRoutes;
} else if (usertype === 'coach') {
    allRoutes = coach;
    authProtectedRoutes = branchcoachAuthRoutes;
} else {
    allRoutes = [rootRoute, authRoutes, dashboardRoutes]
}

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
