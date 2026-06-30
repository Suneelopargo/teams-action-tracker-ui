import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './Dashboard.css';
import { useAuth } from '../../hooks/useAuth';

interface Stats {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
  blocked: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    open: 0,
    inProgress: 0,
    completed: 0,
    blocked: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    let active = true;

    api.get('/action-items/stats')
      .then((response) => {
        if (active) {
          setStats(response.data);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="dashboard-page">
      <div
        className="dashboard-header"
      >

        <h1>

          Welcome back,

          {user?.name} 👋

        </h1>

        {/* <p>

You are logged in as

<b>

{user?.role}

</b>

</p> */}

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Action Items</h3>
          <h2>{stats.total}</h2>
        </div>

        <div className="stat-card">
          <h3>Open</h3>
          <h2>{stats.open}</h2>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <h2>{stats.inProgress}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>{stats.completed}</h2>
        </div>

        <div className="stat-card">
          <h3>Blocked</h3>
          <h2>{stats.blocked}</h2>
        </div>

      </div>
    </div>
  );
}
