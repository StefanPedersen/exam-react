import Link from 'next/link';
import { render } from 'react-dom';

function Footer() {
    return <div className="site-footer">
    <footer>
    
         <div className="row">
                <div className="col-md-3 footer">
                    <h3>Seneste Artikler</h3>
                    <ul>
                    <li><Link href="/lan-local-area-network">LAN – Local Area Network</Link></li>
                    <li><Link href="/hvad-er-4g">Hvad er 4G?</Link></li>
                    <li><Link href="/mbit">Mbit</Link></li>
                    <li><Link href="/100-mbit-bredbaand">100 Mbit – Bredbånd</Link></li>
                    </ul>
                </div>
                <div className="col-md-3 footer">
                    <h3>Hurtige Links</h3>
                    <ul>
                        <li><Link href="/">Internet</Link></li>
                        <li><Link href="/bredband">Bredbånd</Link></li>
                        <li><Link href="/mobilt-bredband">Mobilt bredbånd</Link></li>
                        <li><Link href="/internetudbydere">Internetudbydere</Link></li>
                    </ul>
                </div>
                <div className="col-md-3 footer">
                    <h3>Information</h3>
                    <ul>
                        <li><Link href="/artikler">Artikler</Link></li>
                        <li><Link href="/om-os">Om os</Link></li>
                        <li><Link href="/privatlivspolitik">Privatlivspolitik</Link></li>
                   
                    </ul>
                </div>

                <div className="col-md-3 footer">
                    <div className="footer-info">
                        <a href="https://internetmatch.dk" /><img src="https://internet.stefanpedersen.dk/wp-content/uploads/2017/03/Internetmatch.png" alt="internet" />  
                        <div className="rating-box">
                            <p>Brugerbedømmelse: </p><span itemprop="ratingValue">4.9</span>/<span itemprop="bestRating">5</span>
                                <p><small>Baseret på <span itemprop="ratingCount">21</span> anmeldelser</small></p>
                        </div>
                    </div>
                </div>
                </div>
   
</footer> </div>
  }
  
  export default Footer