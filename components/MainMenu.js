import React, { Component } from 'react'
import axios from 'axios';
import Link from 'next/link';

export class MainMenu  extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pages: []
        };
      }
  
 componentDidMount () {
   axios.get('https://internet.stefanpedersen.dk/wp-json/wp/v2/pages?per_page=100')
       .then(pages => this.setState({
           pages: pages.data
       }))
       .catch(err => console.log(err))
   }



   render() {

    let allPage = this.state.pages.map(page => (
        <Link to={`/${page.slug}`} key={page.id} >
            <div key={page.id}>
                <h3 key={page.id}>{page.title.rendered}</h3>
            </div>
        </Link>
    ))

     return (
           <div>
              {allPage}
            
           </div>
       );
    }
}
export default MainMenu;
