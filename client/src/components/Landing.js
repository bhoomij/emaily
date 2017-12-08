import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Emaily!</h1>

            <div class="card-panel grey darken-1 container" style={{ margin: '0 auto', fontSize: '16px' }}>
                <span class="white-text">
                    Thinking of reaching you business to new heights?<br />
                    We will be happy to be part of your success<br /><br />
                    With <i>Emaily</i>, collect feedback from your users <br />
                    Do checkout out <Link to="/surveys">here</Link> for more info...
                </span>
            </div>
        </div>
    );
};

export default Landing;