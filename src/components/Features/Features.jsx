import React, { useEffect } from 'react';
import './Features.css';
// import img from './../../assets/logo.jpg';

const Features = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        });

        const cards = document.querySelectorAll('.featuresCard');
        cards.forEach((card) => observer.observe(card));

        return () => {
            cards.forEach((card) => observer.unobserve(card));
        };
    }, []);

    return (
        <section className='Features bg-black text-white py-5'>
            <div className="container">
                <h1 className='text-center text-white mb-5'>Features</h1>
                <div className="row">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="col-lg-4 col-md-6 mb-4">
                            <div className={`card featuresCard featuresCard${num}`}>
                                {/* <img src={img} className="card-img-top" alt={`Card Image ${num}`} /> */}
                                <div className="card-body">
                                    <h5 className="card-title text-center mb-3">Card Title {num}</h5>
                                    <p className="card-text mainPagePara mb-4 text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus dolorum error repellat praesentium asperiores, facilis tempora voluptatibus autem facere amet esse ullam. Autem consequatur optio ipsam amet quaerat deleniti error?</p>
                                    <button type="button" class="btn btn-warning cardsBtns">Warning</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
