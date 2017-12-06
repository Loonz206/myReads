import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundGif from '../../icons/notFound.gif';

const NotFound = (props) => {
    return (
        //Notfound shows a user message and has back-arrow to take user to the Main view
        <div className="not-found">
            <Link className="close-search" to="/">Close</Link>
            <h1>Page Not Found</h1>
            <p>Sorry, but the page you are were trying to view does not exist.</p>
            <picture>
                <img src={ NotFoundGif } alt="This page does not exist"/>
            </picture>
        </div>
    )
}

export default NotFound;