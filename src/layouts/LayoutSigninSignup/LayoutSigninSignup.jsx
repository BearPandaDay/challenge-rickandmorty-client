import PropTypes from 'prop-types';
import { backgroundcontentsigninsignup } from '../../assets/';

import './LayoutSigninSignup.scss';

export function LayoutSigninSignup(props) {
    const {children} = props;
    
    return (
        <div className="content-signin-signup">
            <div className='content-component-signin-signup'>
                <div className="content-left-image">
                    <h4>Rick and Morty</h4>
                    <img src={backgroundcontentsigninsignup} alt="alt-image" />
                </div>
                <div className="content-right-form">
                    {children}
                </div>
            </div>
        </div>
    )
}

LayoutSigninSignup.propTypes = {
    children: PropTypes.any,
}