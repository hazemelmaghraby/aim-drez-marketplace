import React from 'react';
import './Heading.css';
import mainImg from './../../assets/mainBackk.jpg';
import { websiteName } from '../../constants/Website/BasicInfo';


const Heading = () => {
    return (
        <section className='heading'>
            <header>
                <div
                    className="header-bg"
                    style={{
                        backgroundImage: `url(${mainImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover', // Ensure the image covers the entire section
                        backgroundPosition: 'center',
                        color: '#ffdf28' // Center the image
                    }}
                >
                    <div className="header-mask">
                        <div className="header-content">
                            <h1 className="heading-title" style={{ color: '#ffdf28' }}>{websiteName}</h1>
                            <h4 className="subheading">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt dolore iure dignissimos</h4>
                            <a className="btn btn-light" href="#!" role="button">Call to action</a>
                        </div>
                    </div>
                </div>
            </header>
        </section>
    );
}

export default Heading;
