import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Emaily!</h1>

            <div class="card-panel grey darken-1 container" style={{ margin: '0 auto', fontSize: '16px' }}>
                <span className="white-text">
                    Wondering to take your business to new heights?<br />
                    We'll be happy to be part of your success<br /><br />
                    With <i>Emaily</i>, collect feedback from your users abour your services <br />
                    For more info, please login
                </span>
            </div>
        </div>
    );
};

export default Landing;