const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes() 
.add('frontpage', '/index.js')                      // ----   ----      -----                                    // about  about     /about
.add('[slug]','slug')                               // page   pages     /pages/:slug
.add('artikler', '/artikler')
                    // articles   articles     /pages/:slug                       // provider   provider     /internetudbyder/:provider
.add('user', '/user/:id', 'profile')                // user   profile   /user/:id
.add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
.add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3


//.add( 'provider', '/internetudbydere/:slug' )   