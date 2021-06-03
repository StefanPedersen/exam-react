import React, { Component } from 'react';

function Post(context) {

    let props = context.props

    let postOutput = <div className="postwrapper"><div className="row"> <h1 dangerouslySetInnerHTML={ { __html:props.title.rendered}}></h1><article className ="entry-content" dangerouslySetInnerHTML={ { __html:props.content.rendered}} /></div></div>
        
    
    return(
        
        <>
            {postOutput}
     
       
            
        </>
    );
}

export default Post;