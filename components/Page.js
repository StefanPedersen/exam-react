import React, { Component } from 'react';

import FiberFeed from '../components/FiberFeed';
import MobiltFeed from '../components/MobiltFeed';
import BredbandFeed from '../components/BredbandFeed';


function Page(context) {

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

   
    //Only serve feed on specific pages
    let feed = ''
    if(props.slug == 'bredband' ){feed = <div className='feed'><BredbandFeed /></div>}
    if(props.slug == 'fiber-internet'){feed = <div className='feed'><FiberFeed /></div>}
    if(props.slug == 'mobilt-bredband'){feed = <div className='feed'><MobiltFeed /></div>}

    let pageOutput = <div>{doFeaturedImage}{feed}<article className ="entry-content" dangerouslySetInnerHTML={ { __html:props.content.rendered}} /></div>
    
    return(
        
        <>
            {pageOutput}
        </>
    );
}

export default Page;