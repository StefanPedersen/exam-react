import React, { Component } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { render } from 'react-dom';


export class UdbyderFeed extends Component {
    state = {
        elements: [],
        isLoaded: false,

    } 
    

    componentDidMount () {
        axios.get(`https://feed.ascontentcloud.com/cgi-bin/publisher/tools/comparisonFeed.pl?categoryId=167&pid=13737`)
            .then(res => this.setState({
                elements: res.data
            }))
            .catch(err => console.log(err))
    }

   render() {

    const pageData = this.props.data

    console.log(pageData)

    function providerLink(string){

      let providerName = string.replace(/\/\#.*/g, '').replace(/http:\/\/(www\.)?/g, '').replace(/\.\w{2,3}/g,'');

      if(providerName == 'fiberignet'){
        providerName = 'bolignet'
      }

      if(providerName == '3'){
        providerName = '3-mobil'
      }
      
      const providerlink = '/internetudbydere/' + providerName

      return providerlink
    }

    function cleanName(string){
      let provider = string.replace(/\/\#.*/g, '').replace(/http:\/\/(www\.)?/g, '').replace(/\.\w{2,3}/g,'');
      return provider
    }

    function capitalize(string){

      let providerName = string
      if(providerName == 'fiberignet'){
        providerName = 'Bolignet'
      }
      
      if(providerName == 'ok'){
        providerName = 'OK'
      }


      return providerName.charAt(0).toUpperCase() + providerName.slice(1)
    }

    const {elements, isLoaded } = this.state;

    let allElements = elements
  

    const output = [...new Map(elements.map(o => [cleanName(o.cleanUrl), o])).values()]
    let uniqueElements = output.map(element =>
      <div>
        <div className="provider-wrapper">
          <div className="provider-img"><img src={element.imageUrl}/></div>
          <div>{capitalize(cleanName(element.cleanUrl))}</div>
          <div>
            <img src='https://internet.stefanpedersen.dk/wp-content/uploads/2021/04/yellowstar.svg'/>
            <img src='https://internet.stefanpedersen.dk/wp-content/uploads/2021/04/yellowstar.svg'/>
            <img src='https://internet.stefanpedersen.dk/wp-content/uploads/2021/04/yellowstar.svg'/>
            <img src='https://internet.stefanpedersen.dk/wp-content/uploads/2021/04/yellowstar.svg'/>
            <img src='https://internet.stefanpedersen.dk/wp-content/uploads/2021/04/yellowstar.svg'/>
          </div>
          <div className="provider-rating">Fremragnende: 100/100</div>
          <span className="seller"><a href={element.trackingUrl} className="button">Gå til udbyder</a></span>
          <div className="provider-info"><Link href={providerLink(element.cleanUrl)}>Læs mere</Link></div>
        </div>
      </div>
      )
       
    return (

        <div className="row">
    
        <div className="intro"><h1>Internetudbydere</h1>
        <p>Få det fulde overblik over internetudbydere i Danmark.</p></div>
        <h2>Bedste internetudbydere i 2021</h2>
          <div className="provider-feed">
          {uniqueElements}
          </div>

        </div>
 
    );
   }

}
export default UdbyderFeed
