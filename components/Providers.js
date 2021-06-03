import React, { Component } from 'react';
import UdbyderFeed from './UdbyderFeed';

function Providers(context) {

    let props = context.props
    const allpages = context.data
   
    //Only serve feed on specific pages
    let feed = ''
    feed = <UdbyderFeed data={allpages}/>

    let pageOutput = <div><div className="row content">{feed}<article className ="entry-content" dangerouslySetInnerHTML={ { __html:props.content.rendered}} /></div></div>

   let schemaReview = <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: `{
    "@context": "https://schema.org/",
    "@type": "Review",
    "itemReviewed": {
        "@type": "Game",
        "name": "Internetmatch"
    },
    "author": {
        "@type": "Person",
        "name": "Trustpilot"
    },
    "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4,5",
        "bestRating": "5"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Stefan"
        }

    }`}} />

    let schemaFAQ = <script type="application/ld+json" dangerouslySetInnerHTML={ {__html: `{  "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Hvem er min internetudbyder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hvis du ikke kender din internetudbyder, kan du slå din ISP (Internet Service Provider) op på https://www.whoismyisp.org/, her vil du med det samme få at vide hvem din internetudbyder er."
        }
      },
      {
        "@type": "Question",
        "name": "Hvilken internetudbyder kan jeg få?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hvem du kan få som internetudbyder afhænger i høj grad af, hvor i landet du bor. Bor du langt ude på landet, er det ikke alle udbyder som du kan få. Langt de fleste udbydere benytter dog TDC’s netværk, hvorfor du som regel ville kunne vælge mellem de fleste på denne side. Der kan dog findes flere lokale udbydere, som ikke alle kan få, disse vil ikke være til stede på siden her."
        }
      },
      {
        "@type": "Question",
        "name": "Hvordan skifter man internetudbyder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dette foregår helt automatisk, når du takker ja til et tilbud fra en anden udbyder. Det klarer din nye udbyder nemlig for dig, det eneste du bør være opmærksom på, er hvis du har lejet en router eller andet, som skal leveres tilbage til din forrige internetudbyder. Du vil som regel leje en router, dog er det nogle som udbyder som tilbyder at man kan købe routeren."
        }
      }
    ]
  }}`}} />
    
    return(
        <>
            {pageOutput} 
            {schemaFAQ}
            {schemaReview}
        </>
    );
}

export default Providers;