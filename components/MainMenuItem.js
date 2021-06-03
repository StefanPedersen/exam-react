import React, { Component } from 'react'
import Link from 'next/link';
import axios from 'axios';
import PropTypes from 'prop-types';
//import RenderedPage from './RenderedPage';

export class MainMenuItem extends Component {

  
   render() {

        const {element } = this.props
        const { title } = this.props.element;
        const { content } = this.props.element;

        
//<RenderedPage pageid = {this.props.id} />
       return (
           <div>
            
            
       
           </div>
       )
   }
}

export default MainMenuItem
