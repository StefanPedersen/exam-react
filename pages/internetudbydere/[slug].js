import Navigation from '../../components/Navigation';
import Head from 'next/head';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router'

import React, { Component } from 'react'

import axios from 'axios';

import { Fragment } from 'react'
import ProviderFeed from '../../components/ProviderFeed';

export default class extends Component {

  // Resolve promise and set initial props.

  static async getInitialProps(context) {

 

      const slug = context.query.slug

    // Make requests for pages.
    const page = await axios.get(`https://internet.stefanpedersen.dk/wp-json/wp/v2/pages/?slug=${slug}`)
    const metaResponse = await axios.get(`https://internet.stefanpedersen.dk/wp-json/yoast/v1/get_head?url=https://internet.stefanpedersen.dk/internetudbydere/${slug}/`) 
       

    // Return our only item in the array from response to posts object in props.
    return {
        page: page.data[0],
        metapost: metaResponse.data.head
   
    }

  }

  render(){
    let yoastHead = this.props.metapost;
    let finalTitle = 'test';
    let finaldescription = 'test';
    if(yoastHead){
      let title = yoastHead.split('<title>')[1];
      if(title){finalTitle = title.split("</title>")[0];}
      let description = yoastHead.split('"description" content="')[1];
      if(description){finaldescription = description.split('" />')[0];}
    }

    let providerSolutions = <ProviderFeed props={this.props.page} />
    //Output hvis der ikke er noget skrevet til provider:
    const title = this.props.page.title.rendered
    let content = <div><h1>Om {title}</h1><div><p>På denne side, kan du finde alle typer internettilbud, som Internetmatch formidler for {title}.</p>
    <p>Vi håber du finder en løsning, som du finder attraktiv, såfremt der ikke findes en løsning for dig fra {title}, så kan du tage et kig på vores oversigt og finde en anden <a href="../internetudbydere">internetudbyder</a>.</p>
      <h2>Internetløsninger fra {title}:</h2>
      {providerSolutions}
      
      </div>
      </div>

    
    if(this.props.page.content.rendered){
      content = <div><article className="entry-content" dangerouslySetInnerHTML={ {__html:this.props.page.content.rendered}} /><div>{providerSolutions}</div></div>
    }

  return (

 <Fragment>
    <Head>
      {this.props.metapost}
      <title>{finalTitle}</title>
      <meta name="description" content={finaldescription} />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" defer></link>
    </Head>
   <Navigation/>
    
   <div className="bodywrapper">
     <div className="row">
    {content}
    </div>
    </div>
    <Footer />

 </Fragment>
  )

    }
}
