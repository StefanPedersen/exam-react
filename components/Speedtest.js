import React, { Component } from 'react';
import Iframe from 'react-iframe';
import Head from 'next/head';

function Speedtest(context) {

    let props = context.props
    let ctaRow = '';
      ctaRow = <div>
                  <div className="cta-row">
                      <div className="cta-icons">
                        <div className="col-md-4 left"><span className="glyphicon glyphicon-search iconcta"></span>Find dit behov</div>
                        <div className="col-md-4 center"><span className="glyphicon glyphicon-list iconcta"></span>Sammenlign tilbud</div>
                        <div className="col-md-4 right"><span className="glyphicon glyphicon-heart iconcta"></span>Vælg det helt rigtige</div>
                      </div>
                    </div>
                  </div>

      let featuredImage = props.fimg_url;
      let doFeaturedImage = '';
      if(featuredImage){
        doFeaturedImage = <div><div className="topbanner-box">
            <div className="topbanner" style={{backgroundImage: `url( ${props.fimg_url} )`}}></div>
            <div className="overlay"></div></div>{ctaRow}</div>
    }

   
 
    let feed = <div><Iframe url="https://internetmatch.speedtestcustom.com" width="100%" height="650px" frameborder="0" /></div>

    let pageOutput = <div>{doFeaturedImage}{feed}<article className ="entry-content" dangerouslySetInnerHTML={ { __html:props.content.rendered}} /></div>
    
    return(
        <>
        <Head>
        <script src="https://c.speedtestcustom.com/static/js/testBundle.js?v=1618359412710" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        </Head>
        <div>
            {pageOutput}
        </div>
        </>
    );
}

export default Speedtest;
