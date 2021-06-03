import React, { Component } from 'react'
import axios from 'axios';
import Link from 'next/link';

export class Articles  extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pages: []
        };
      }
  
 componentDidMount () {
   axios.get('https://internet.stefanpedersen.dk/wp-json/wp/v2/posts?per_page=100')
       .then(pages => this.setState({
           pages: pages.data
       }))
       .catch(err => console.log(err))
   }
   render() {
    function excerpt(string){
        let arr = string
        let cleanText = arr.replace(/<\/?[^>]+(>|$)/g, "")
        let text = cleanText.substring(0,325)
        return text+"..." 
        }
    let allPage = this.state.pages.map(page => (
            <div className="col-md-4" id="post">
                <div class="article-box">
                    <Link href={`/${page.slug}`}  key={page.id} >
                        <div key={page.id}>
                        
                            <h3 className="article-heading" key={page.id} dangerouslySetInnerHTML={ { __html:page.title.rendered}}></h3>
                            <div className="heading-seperator"></div>
                            <div className="article-excerpt" >
                            {excerpt(page.content.rendered)}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
    ))
     return (
           <div>
               <div className="row post">
              {allPage}
              </div>
           </div>
       );
    }
}
export default Articles;