import React from 'react';

const Communaute = () => {
    return (
        <section className="communaute-section" id="communaute">
            <div className="container">
                <h2 className="section-title">La Communauté</h2>
                <p className="section-subtitle">Ils ont déjà rejoint la résistance</p>
                
                <div className="communaute-content">
                    <div className="testimonial-card">
                        <div className="testimonial-avatar">🏫</div>
                        <div className="testimonial-content">
                            <p className="testimonial-text">"Grâce à NIRD, nous avons pu équiper deux classes supplémentaires avec des ordinateurs que nous pensions jeter. Les élèves adorent utiliser Linux !"</p>
                            <p className="testimonial-author">Lycée Jean Jaurès, Paris</p>
                        </div>
                    </div>
                    
                    <div className="testimonial-card">
                        <div className="testimonial-avatar">🏛️</div>
                        <div className="testimonial-content">
                            <p className="testimonial-text">"Une économie de 15 000€ sur notre budget informatique cette année. C'est du bon sens pour nos finances et pour la planète."</p>
                            <p className="testimonial-author">Mairie de Saint-Denis</p>
                        </div>
                    </div>
                    
                    <div className="cta-communaute">
                        <h3>Prêt à rejoindre le mouvement ?</h3>
                        <div className="cta-buttons">
                            <a href="#" className="cta-btn primary">Rejoindre le Discord</a>
                            <a href="#" className="cta-btn secondary">Nous Contacter</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Communaute;

