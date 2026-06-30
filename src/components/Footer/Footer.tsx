import Link from '@mui/material/Link';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
        Teams Action Tracker
      </div>

      <div className="footer-center">
        © 2026-2027{' '}
        <Link
          href="https://www.solventek.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
        >
          Solventek Pvt. Ltd.
        </Link>{' '}
        All rights reserved.
      </div>

      <div className="footer-right">
        Version 1.0.0
      </div>

    </footer>
  );
}