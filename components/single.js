import React, { Component } from 'react'
import axios from 'axios';
import PageItem from './PageItem';
import Navigation from './Navigation';
import { Fragment } from 'react'
import { render } from 'react-dom';
import { useRouter } from 'next/router'

export default class extends Component {
// Resolve promise and set initial props. 

//getInitialProps enables server-side rendering in a page and allows you to do initial data population, 
//it means sending the page with the data already populated from the server. This is especially useful for SEO.
static async getInitialProps( context ) {

        const slug = context.query.slug

        // Make requests for posts.

        const response = await axios.get(`https://internet.stefanpedersen.dk/wp-json/wp/v2/pages/?slug=${slug}`)

        // Return our only item in the array from response to posts object in props.
        return {
            post: response.data[0]
        }
    }
    render(){
    let build;

    let featuredImage = this.state.page.fimg_url;

    let doFeaturedImage = '';
        if(featuredImage){
            doFeaturedImage = <img src={this.state.page.fimg_url} alt={this.state.page.title.rendered} />
        }

    return ( 

        <Fragment>
         
            <h1>{this.state.page.title.rendered}</h1>
            <article className ="entry-content" dangerouslySetInnerHTML={ { __html:this.props.page.content.rendered}} />


        </Fragment>



    )
    }
}
