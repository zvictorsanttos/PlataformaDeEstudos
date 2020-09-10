const express = require('express')
const nunjucks = require('nunjucks')

const routes = require('./Routes')

class App {
  constructor(){
    this.server = express();
    this.server.use(express.urlencoded({extended: true})).use(express.static("public"));

    this.views();
    this.routes();
  }

  views() {
    nunjucks.configure('src/views',{
      express: this.server,
      noCacche: true,
    })
  }
  
  routes(){
    this.server.use(routes)
    
  }
}

module.exports = new App().server;