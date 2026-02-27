import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Link, NavLink,
  useNavigate, useParams, useLocation, useMatch, withRouter
} from 'react-router-dom';

// withRouter HOC usage (removed in v6)
class BreadcrumbBase extends React.Component {
  render() {
    const { location } = this.props;
    const parts = location.pathname.split('/').filter(Boolean);
    return (
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        {parts.map((part, i) => (
          <span key={i}> / <Link to={'/' + parts.slice(0, i + 1).join('/')}>{part}</Link></span>
        ))}
      </nav>
    );
  }
}
const Breadcrumb = withRouter(BreadcrumbBase);

function Layout({ children }) {
  const history = useNavigate();
  return (
    <div>
      <header>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/projects" activeClassName="active">Projects</NavLink>
        <NavLink to="/team" activeClassName="active">Team</NavLink>
        <button onClick={() => history.push('/settings')}>Settings</button>
      </header>
      <Breadcrumb />
      <main>{children}</main>
    </div>
  );
}

function Home() {
  return <div><h1>Welcome</h1></div>;
}

// Nested routing with useMatch
function Dashboard() {
  const { path, url } = useMatch();

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to={`${url}/overview`}>Overview</Link>
        <Link to={`${url}/analytics`}>Analytics</Link>
        <Link to={`${url}/reports`}>Reports</Link>
      </nav>
      <Routes>
        <Route exact path={path}>
          <Navigate to={`${path}/overview`} />
        </Route>
        <Route path={`${path}/overview`} component={DashboardOverview} />
        <Route path={`${path}/analytics`} component={DashboardAnalytics} />
        <Route path={`${path}/reports`} component={DashboardReports} />
      </Routes>
    </div>
  );
}

function DashboardOverview() { return <div><h2>Overview</h2></div>; }
function DashboardAnalytics() { return <div><h2>Analytics</h2></div>; }
function DashboardReports() { return <div><h2>Reports</h2></div>; }

function ProjectList() {
  const history = useNavigate();
  const projects = ['alpha', 'beta', 'gamma'];
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(p => (
          <li key={p} onClick={() => history.push(`/projects/${p}`)}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const { path, url } = useMatch();
  const history = useNavigate();

  return (
    <div>
      <h1>Project: {projectId}</h1>
      <nav>
        <Link to={`${url}/tasks`}>Tasks</Link>
        <Link to={`${url}/files`}>Files</Link>
        <Link to={`${url}/settings`}>Settings</Link>
      </nav>
      <Routes>
        <Route exact path={path}>
          <p>Select a tab</p>
        </Route>
        <Route path={`${path}/tasks`}>
          <div><h2>Tasks for {projectId}</h2></div>
        </Route>
        <Route path={`${path}/files`}>
          <div><h2>Files for {projectId}</h2></div>
        </Route>
        <Route path={`${path}/settings`}>
          <div><h2>Settings for {projectId}</h2></div>
        </Route>
      </Routes>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}

function TeamList() {
  return <div><h1>Team</h1></div>;
}

function TeamMember() {
  const { memberId } = useParams();
  const location = useLocation();
  return (
    <div>
      <h1>Member: {memberId}</h1>
      <p>Path: {location.pathname}</p>
    </div>
  );
}

function Settings() {
  const history = useNavigate();
  const handleSave = () => {
    history.replace('/dashboard', { saved: true });
  };
  return (
    <div>
      <h1>Settings</h1>
      <button onClick={handleSave}>Save & Go Back</button>
    </div>
  );
}

function Login() { return <div><h1>Login</h1></div>; }
function NotFound() { return <div><h1>404 Not Found</h1></div>; }

// Protected route using render prop
function PrivateRoute({ component: Component, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  );
}

function App() {
  const isAuth = true;
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} isAuth={isAuth} />
          <Route exact path="/projects" component={ProjectList} />
          <Route path="/projects/:projectId" component={ProjectDetail} />
          <Route exact path="/team" component={TeamList} />
          <Route path="/team/:memberId" component={TeamMember} />
          <PrivateRoute path="/settings" component={Settings} isAuth={isAuth} />
          <Route path="/login" component={Login} />
          <Navigate from="/home" to="/" />
          <Navigate from="/old-dashboard" to="/dashboard" />
          <Route component={NotFound} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
export {
  Breadcrumb, Layout, Home, Dashboard, DashboardOverview, DashboardAnalytics,
  DashboardReports, ProjectList, ProjectDetail, TeamList, TeamMember,
  Settings, Login, NotFound, PrivateRoute
};
