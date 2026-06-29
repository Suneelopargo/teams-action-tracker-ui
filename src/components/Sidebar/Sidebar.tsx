import {
    Link,
    useLocation,
} from 'react-router-dom';

import { useAuth }
    from '../../hooks/useAuth';

import './Sidebar.css';

export default function Sidebar() {

    const location = useLocation();

    const { user } = useAuth();

    const isActive = (path: string) => {

        if (path === '/' && location.pathname === '/') {

            return true;

        }

        return location.pathname.startsWith(path);

    };

    return (

        <div className="sidebar-root">

            <div className="sidebar-header">

                <div className="sidebar-logo">

                    📊

                </div>

                <h3>

                    Teams

                </h3>

            </div>

            <nav>

                {user?.role === 'ADMIN' && (
                    <Link
                        to="/"
                        className={`sidebar-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                )}

                <Link
                    to="/meetings"
                    className={`sidebar-link ${isActive('/meetings') ? 'active' : ''}`}
                >

                    Meetings

                </Link>

                <Link
                    to="/action-items"
                    className={`sidebar-link ${isActive('/action-items') ? 'active' : ''}`}
                >

                    {user?.role === 'ADMIN'
                        ? 'Action Items'
                        : 'My Action Items'}

                </Link>

                {

                    user?.role === 'ADMIN' && (

                        <>

                            <Link
                                to="/upload-transcript"
                                className={`sidebar-link ${isActive('/upload-transcript') ? 'active' : ''}`}
                            >

                                Upload Transcript

                            </Link>

                            <Link
                                to="/email-logs"
                                className={`sidebar-link ${isActive('/email-logs') ? 'active' : ''}`}
                            >

                                Email Logs

                            </Link>

                        </>

                    )

                }

            </nav>
            {/* <div className="sidebar-footer">

                <div>

                    Signed in

                </div>

                <strong>

                    {user?.name}

                </strong>

                <div>

                    {user?.role}

                </div>

            </div> */}

        </div>

    );

}