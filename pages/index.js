import Head from 'next/head';
import axios from 'axios';
import { Fragment } from 'react';
import React, { Component } from 'react'
import Feed from '../components/Feed';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';


export default class extends Component {
  // Resolve promise and set initial props. 
  
  //getInitialProps enables server-side rendering in a page and allows you to do initial data population, 
  //it means sending the page with the data already populated from the server. This is especially useful for SEO.
  static async getInitialProps() {
  
          const slug = '/'
  
          // Make requests for pages.
          const response = await axios.get(`https://internet.stefanpedersen.dk/wp-json/wp/v2/pages/?slug=internet`)
          //const metaResponse = await axios.get(`https://internet.stefanpedersen.dk/wp-json/yoast/v1/get_head?url=https://internet.stefanpedersen.dk/`)
          //const adservice = await axios.get(`https://feed.ascontentcloud.com/cgi-bin/publisher/tools/comparisonFeed.pl?categoryId=167&pid=13737`) This breaks the reload function, other way around?
         
          // Return our only item in the array from response to posts object in props.
          return {
              post: response.data[0]//,
             // metapost: metaResponse.data.head
             // adservice_feed: adservice
          }
      }

      render(){
        //let feed = this.props.adservice_feed.data;
        //console.log(feed);
  
        function regex(string){
        var arr = string.match(/\d{1,4} GB/) || ["Ubegrænset"]; //Look for GB in Mobile name, return if present else 'ubegrænset'
        return arr[0];
        }
        //Create function to get name and extract Type "coax", "fiber","mobile" can we do an IF statement on these for filtering?
        //
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

        

        let featuredImage = this.props.post.fimg_url;
        let doFeaturedImage = '';
            if(featuredImage){
                doFeaturedImage = <div><div className="topbanner-box">
                    <div className="topbanner" style={{backgroundImage: `url( ${this.props.post.fimg_url} )`}}></div>
                    <div className="overlay"></div></div>{ctaRow}</div>
            }
  
        let yoastHead = this.props.metapost;
  
        let finalTitle = 'test';
        let finaldescription = 'test';
      
  
        if(yoastHead){
        let title = yoastHead.split('<title>')[1];
        if(title){finalTitle = title.split("</title>")[0];}
        let description = yoastHead.split('"description" content="')[1];
        if(description){finaldescription = description.split('" />')[0];}
      }
      
        
        //Only serve feed on specific pages
        let feed = ''
        
        feed = <div className='feed'><Feed /></div>
        
  
        //<h1>{this.props.post.title.rendered}</h1>
  
      return ( 
          <Fragment>
              <Navigation />
              <Head>
                <base href="/" />
                {this.props.metapost}
                <title>Internet - Find det billigste og bedste internet - Internetmatch.dk</title>
                <meta name="description" content={finaldescription} />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" defer></link>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" rel="stylesheet"></link>
                 <script async src="https://www.googletagmanager.com/gtag/js?id=UA-96461996-1" />

              <script dangerouslySetInnerHTML={{__html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-96461996-1');
                    `,
                }}
              />
              </Head>
              
              {doFeaturedImage}
              {feed}
      
              <article className ="entry-content" dangerouslySetInnerHTML={ { __html:this.props.post.content.rendered}} />
              <Footer />
          </Fragment>
        )
      }
}
