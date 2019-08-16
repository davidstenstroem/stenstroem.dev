import * as React from 'react'
import { Link } from '@reach/router'
import { Logo } from './Logo'

export const Nav: React.FunctionComponent = (): JSX.Element => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Logo />
      <a
        aria-label="menu"
        aria-expanded="false"
        className="navbar-burger burger"
        role="button"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start"></div>
    </div>
  </nav>
)
