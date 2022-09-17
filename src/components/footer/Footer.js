import React from "react";
import classes from './Footer.module.css';

const Footer=()=>{
    return(
        <div>
            <div className={classes.footer}>
                <div className={classes.footersub}>
                    <div className={classes.footerLeft}>
                         <div>
                             <ul>
                                 <p>About redBus</p>
                                 <li><a href="">About Us</a></li>
                                 <li><a href="">Contact Us</a></li>
                                 <li><a href="">Mobile Version</a></li>
                                 <li><a href="">redBus on Mobile</a></li>
                                 <li><a href="">Sitemap</a></li>
                                 <li><a href="">Offers</a></li>
                                 <li><a href="">Careers</a></li>
                                 <li><a href="">Values</a></li>
                             </ul>
                         </div>
                         <div>
                             <ul>
                                 <p>About redBus</p>
                                 <li><a href="">T & C</a></li>
                                 <li><a href="">Privacy Policy</a></li>
                                 <li><a href="">FAQ</a></li>
                                 <li><a href="">Blog</a></li>
                                 <li><a href="">Bus Operator Registration</a></li>
                                 <li><a href="">Agent Registration</a></li>
                                 <li><a href="">Insurance Partner</a></li>
                                 <li><a href="">User Agreement</a></li>
                             </ul>
                         </div>
                         <div>
                             <ul>
                                 <p> Global Sites</p>
                                 <li><a href="">India</a></li>
                                 <li><a href="">Singapore</a></li>
                                 <li><a href="">Malaysia</a></li>
                                 <li><a href="">redBus on Mobile</a></li>
                                 <li><a href="">Indonesia</a></li>
                                 <li><a href="">Peru</a></li>
                                 <li><a href="">Colombia</a></li>
                                
                             </ul>
                         </div>
                         <div>
                             <ul>
                                 <p>Our Partners</p>
                                 <li><a href="">Goibibo</a></li>
                                 <li><a href="">Makemytrip</a></li>
                            
                            
                             </ul>
                         </div>
                    </div>
                    <div className={classes.footerRight}>
                           
                           <div className="footer-right-details">BusBook is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. redBus offers bus ticket booking through its website,iOS and Android mobile apps for all major routes.</div>
                           <div>
                               <a href="https://www.facebook.com/profile.php?id=100015957766172">
                                   <span ><img style={{width:"86px"}} src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg" alt="" /></span>
                               </a>
                               <a href="https://www.facebook.com/profile.php?id=100015957766172">
                                   <span  ><img style={{width:"50px" ,color:"#d7d7d7"}} src="https://www.svgrepo.com/show/11841/twitter.svg" alt="" /></span>
                               </a>
                           </div>
                           <div style={{float:"left" ,marginTop:"15px"}}>
                               <span>Ⓒ</span>
                               <span>2021 ibibogroup All rights reserved</span>
                           </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Footer;