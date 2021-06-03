import React, { Component } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { render } from 'react-dom';

export class ProviderFeed extends Component {
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
    const {elements, isLoaded } = this.state;

    let props = this.props.props

    function cleanName(string){
        let provider = string.replace(/\/\#.*/g, '').replace(/http:\/\/(www\.)?/g, '').replace(/\.\w{2,3}/g,'');
        return provider
      }

    function fixname(string){
        let fix = string
        let realname = fix
        if(fix === '3-mobil'){
            realname = '3'
        }
        if(fix === 'fiberignet'){
            realname = 'bolignet'
        }
        return realname
      }

    let providerTitle = fixname(props.title.rendered)
    

    function regex(string){
      let arr = string.match(/\d{1,4}.{0,2}(?:GB|TB)/) || ["Ubegrænset"] //Look for GB in Mobile name, return if present else ubegrænset
        return arr[0];
        }

        function months(months){
          let nomonths = months
          
          if(nomonths){
              nomonths = nomonths
          }else{
              nomonths = 0
          }
          let monthOutput = nomonths+' mdr'
          return monthOutput
      }
      function type(name){
        let type = name.match(/mobil|gb|tb|adsl|telefon|kabel|coax|fiber/gi) || 'Telefonstik (ADSL)'
        let firstType = type[0]
        let lowerType = firstType.toString().toLowerCase()
    
        if(lowerType == 'coax' || lowerType == 'kabel'){
            type = 'TV-Kabel (COAX)'
        }
        if(lowerType == 'telefon' || lowerType == 'adsl'){
            type = 'Telefonstik (ADSL)'
        }
        if(lowerType == 'fiber'){
            type = 'Fiber'
        }
        if(lowerType == 'gb' || lowerType == 'tb'|| lowerType == 'mobil'|| lowerType == 'mobilgb'|| lowerType == 'gbmobil'){
            type = 'Mobilt bredbånd'
        }
        return type    
      }

      function providerLink(string){

        let providerName = string.replace(/\/\#.*/g, '').replace(/http:\/\/(www\.)?/g, '').replace(/\.\w{2,3}/g,'');
  
        if(providerName == 'fiberignet'){
          providerName = 'bolignet'
        }
        
        const providerlink = '/test-internetudbydere/' + providerName
  
        return providerlink
      }

      
      const feedOutput = elements.filter(element => fixname(cleanName(element.cleanUrl)).toLowerCase().includes(providerTitle.toLowerCase())).map(element =>  
 
        <div className="feed-element">
            <div className="element-info">
            <div className="element-upper">
              <div className="img-area">
                <img src={element.imageUrl} alt={element.campaign} />          
              </div>
              <div className="element-name">
                <h3 className="name">{element.name}</h3>
                <small className="desc">{element.Comment}</small>
              </div>
            </div>
              <div className="element-lower">
                <div className="element-wrapper"><h4>Hastighed</h4><span>{element.downloadSpeed}<small> Mbit/s</small></span></div>
                <div className="element-wrapper"><h4>Forbrug</h4><span>{regex(element.name)}</span></div>
                <div className="element-wrapper"><h4>Type</h4><span>{type(element.name)}</span></div>
              </div>
            </div>
              <div className="element-right">
                <li className="element-list"><div className="element-label">Oprettelse</div><span className="element-value">{element.minStartUpFee}<small> DKK</small></span></li>
                <li className="element-list"><div className="element-label">Bindingsperiode</div><span className="element-value">{months(element.minContractPeriodInMonths)}</span></li>
                <li className="element-list"><div className="element-label">Pr. måned</div><span className="element-value">{element.monthlyPrice}<small> DKK.</small></span></li>
                <div className="element-price"><span className="element-months"><small>Pris (6.måneder)</small></span><span className="element-fullprice"><h3>{element.totalPriceForFirst6months}<small> DKK</small></h3></span></div>
                <span className="seller"><a href={element.trackingUrl} className="button">Gå til udbyder</a></span>
              </div>         
          </div>  
            );
       
    return (
    <div className="feed">
        <div className="row">
        
        <div className="offer-wrapper">
        {feedOutput}
        </div>
        </div>
    </div>
    );
   }

}
export default ProviderFeed