import React, { Component } from 'react'
import axios from 'axios';
import Head from 'next/head';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import Post from '../components/Post';
import Page from '../components/Page';
import { Fragment } from 'react';
import Articles from '../components/Articles';
import Providers from '../components/Providers';
import Speedtest from '../components/Speedtest';

export default class extends Component {
// Resolve promise and set initial props. 

//getInitialProps enables server-side rendering in a page and allows you to do initial data population, 
//it means sending the page with the data already populated from the server. This is especially useful for SEO.
static async getInitialProps( context ) {

        const slug = context.query.slug

        // Make requests for pages.
        const page = await axios.get(`https://internet.stefanpedersen.dk/wp-json/wp/v2/pages/?slug=${slug}`)
        const post = await axios.get(`https://internet.stefanpedersen.dk/wp-json/wp/v2/posts/?slug=${slug}`)
        const metaResponse = await axios.get(`https://internet.stefanpedersen.dk/wp-json/yoast/v1/get_head?url=https://internet.stefanpedersen.dk/${slug}/`)  
        //https://internet.stefanpedersen.dk/wp-json/wp/v2/posts?url=https://internet.stefanpedersen.dk/${}

        // Return our only item in the array from response to posts object in props.
        return {
            page: page.data[0],
            post: post.data[0],
            metapost: metaResponse.data.head,
            allpages: page.data
        }
    }


    render(){
      //Create function to get name and extract Type "coax", "fiber","mobile" can we do an IF statement on these for filtering?
      let yoastHead = this.props.metapost;
      let finalTitle = 'test';
      let finaldescription = 'test';
      if(yoastHead){
        let title = yoastHead.split('<title>')[1];
        if(title){finalTitle = title.split("</title>")[0];}
        let description = yoastHead.split('"description" content="')[1];
        if(description){finaldescription = description.split('" />')[0];}
      }

    let content = 'Hey'
    console.log(this.props.page)
      
    if(this.props.page != undefined){
      content =  <div><Page props={this.props.page} /></div>
    }

    if(this.props.page != undefined && this.props.page.slug === 'artikler'){
      content =  <div><Articles props={this.props.page} /></div>
    }

    if(this.props.page != undefined && this.props.page.slug === 'internetudbydere'){
      content =  <div><Providers props={this.props.page}/></div>
    }

    if(this.props.page != undefined && this.props.page.slug === 'hastighedstest'){
      content =  <div><Speedtest props={this.props.page} /></div>
    }

    if(this.props.post != undefined){
      content =  <div><Post props={this.props.post} /></div>
    }

    return ( 
        <Fragment>
            <Navigation />
            <Head>
              {this.props.metapost}
              <title>{finalTitle}</title>
              <meta name="description" content={finaldescription} />
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" defer></link>
                 <script async src="https://www.googletagmanager.com/gtag/js?id=UA-96461996-1" />

                  <script dangerouslySetInnerHTML={{
                      __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'UA-96461996-1');
                        `,
                    }}
                  />
            </Head>
            <div className="bodywrapper">
            {content}
            </div>
            <Footer />
        </Fragment>
      )
    }
}
