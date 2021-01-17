import React, { Component } from 'react';

import { Link, withRouter } from "react-router-dom";

class Navigation extends Component {
    render() {
      return (
        <div>
          <nav>
            <ul>
                <li>
                  <Link to="/">
                      <div className="navButton">
                        Home
                      </div>
                  </Link>
                </li>
                <li>
                  <Link to="/beanies">
                      <div className="navButton">
                        Beanies
                      </div>
                  </Link>
                </li>
                <li>
                  <Link to="/gloves">
                      <div className="navButton">
                        Gloves
                      </div>
                  </Link>
                </li>
                <li>
                  <Link to="/facemasks">
                      <div className="navButton">
                        Facemasks
                      </div>
                  </Link>
                </li>
            </ul>
          </nav>
        </div>
      );
    }
  }

export default withRouter(Navigation);