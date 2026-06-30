import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../../services/auth.service';
import { useAuth } from '../../hooks/useAuth';

import './Login.css';

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    async function handleLogin(
        e: React.FormEvent,
    ) {

        e.preventDefault();

        setLoading(true);

        setError('');

        try {

            const response =
                await authService.login({

                    email,

                    password,

                });

            const loggedInUser = response.data.data.user;

            login(
                response.data.data.accessToken,
                loggedInUser,
            );

            if (loggedInUser.role === 'ADMIN') {
                navigate('/');
            } else {
                navigate('/meetings');
            }

        }

        catch (err: unknown) {

            const message =
                err &&
                typeof err === 'object' &&
                'response' in err
                    ? (err as {
                        response?: {
                            data?: {
                                message?: string;
                            };
                        };
                    }).response?.data?.message
                    : undefined;

            setError(

                message ||

                'Invalid email or password',

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-container">

            <div className="login-card">

                <h2>

                    Teams Action Tracker

                </h2>

                <form onSubmit={handleLogin}>

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value,
                            )
                        }

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value,
                            )
                        }

                        required

                    />

                    {

                        error &&

                        <div className="error">

                            {error}

                        </div>

                    }

                    <button
                        disabled={loading}
                    >

                        {

                            loading ?

                                'Signing In...' :

                                'Login'

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}
