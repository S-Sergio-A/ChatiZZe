import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './NavLink.css';

export default function NavLink({ to, children }: { to: string; children: any }) {
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === to) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname, to]);

  return (
    <React.Fragment>
      <Link to={to} className="btn-nav btn-sm f-w h6-s">
        {children}
      </Link>
      <span className={active ?'active-link' : ''}/>
    </React.Fragment>
  );
}
