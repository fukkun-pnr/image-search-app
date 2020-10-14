import React from "react";
import { Link } from 'react-router-dom';

const MainLayout: React.FC<{}> = React.memo((props) => (
    <>
        <header className="header">
            <div className="header__wrapper">
                <ul className="header__wrapper__nav">
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                </ul>
            </div>
        </header>
        <main className="main">
            {props.children}
        </main>
    </>
));

export default MainLayout;