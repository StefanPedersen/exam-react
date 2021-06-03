import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

export class PageItem extends Component {
    
  

   render() {
       const { title } = this.props.page;
       
       return (
           <div>
              <h2 id={this.props.page.id}>{title.rendered}</h2>
        
           </div>
       )
   }
}

export default PageItem
