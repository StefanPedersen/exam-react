import React, { Component } from 'react'
import axios from 'axios';
import PageItem from '../PageItem';

export class Pages  extends Component {
   state = {
       pages: [],
       isLoaded: false
   }
 componentDidMount () {
   axios.get('https://internet.stefanpedersen.dk/wp-json/wp/v2/pages?per_page=100')
       .then(res => this.setState({
           pages: res.data,
           isLoaded: true
       }))
       .catch(err => console.log(err))
   }
   render() {
      const {pages, isLoaded } = this.state;
       return (
           <div>
              {pages.map(page=>
                <PageItem key={page.id} page={page} />
                )}
           </div>
       );
   }
}

export default Pages
