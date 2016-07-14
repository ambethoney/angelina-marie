var m = require('mithril'),
$ = jQuery = require('jquery');
var GITheWall = require('../vendors/js/jquery-gi-thewall.min.js');



mysite = {};

var url = "../cockpit/rest/api/collections/get/"+ page +"?token=5e33744e5a42d77878db9c30 ",
    page;

mysite.modules = {};

mysite.subModules = {};

mysite.anim = {};

mysite.utils = {};


// Animations


mysite.anim.rollIn = function(el, init, context){
  if(!init){
      $(el).addClass('animated flipInX')
  }
}


mysite.anim.pageSlideOut = function(el, init, context) {
  if (!init) {
    // el.onclick = function(e) {
    //   e.preventDefault()
    //   $('.page').velocity("fadeOut",{
    //     complete: function() {
    //       m.route(el.getAttribute("href"))
    //     }
    //   })
    // }
  }
}


mysite.anim.pageSlideIn = function(el, init, context){
  if (!init) {
    // $('.page').velocity("fadeIn")
  }
}

// Utils
mysite.utils.hideNav = function(el, init, context){
  if(!init){
    if(m.route() ==='/'){
        $('nav').hide();
        // $('.navigation').show();
    }
  }
}

mysite.utils.mobileNav = function(el, init, context){
  if(!init){
    $('.burger').click(function() {
      $(this).toggleClass('open');
      if($(this).hasClass('open')){
        $('.mobile-navigation').slideDown('slow');
      }else{
        $('.mobile-navigation').slideUp('slow');
      }
    })
  }
}

mysite.utils.githewall = function(el, init, context){
  if(!init){
    $(el).GITheWall();
    // $('.GI_TW_expander').append('')
  }
}

// Modules
mysite.modules.Nav = {
  controller: function(){
    function link(name, route){
      var isCurrent = (m.route() === route);
      var click = function(){ m.route(route); };
      return m("button"+(isCurrent ? ".success" : ""), {onclick: click}, name);
    }
  },
  view: function(ctrl){
    return[
      m("nav",[
        m("span.left",
          m("a[href='#/']", {config: mysite.anim.pageSlideOut, class: "nav-link"}, "angelina marie"
        )),
        m("ul.navigation",
          m("li",
            m("a[href='#/about']", {config: mysite.anim.pageSlideOut, class: "nav-link"}, "About"
          )),
          m("li",
            m("a[href='#/portfolio']", {config: mysite.anim.pageSlideOut, class: "nav-link"}, "Portfolio"))
        )
      ]),
      m(".mobile-nav",
        m("span.left",
          m("a[href='#/']", {config: mysite.anim.pageSlideOut, class: "nav-link"}, "angelina marie"
        )),
        m(".burger",{config:mysite.utils.mobileNav},[
          m("span"),
          m("span"),
          m("span"),
          m("span"),
          m("span"),
          m("span")
        ]),
        m("ul.mobile-navigation",
          m("li", m("a[href='#/about']", {config: mysite.anim.pageSlideOut, class: "nav-link"}, "About")),
          m("li", m("a[href='#/portfolio']", {config: mysite.anim.pageSlideOut, class: "nav-link"}, "Portfolio"))
        )
      )
    ]
  }
};

mysite.modules.Page = function(subModule){
  return {
    controller: function() {
      return {
        navCtrl: new mysite.modules.Nav.controller,
        subCtrl: new subModule.controller,
      }
    },
    view : function(ctrl){
      return  [m(".page",[mysite.modules.Nav.view(ctrl.navCtrl), subModule.view(ctrl.subCtrl)] )]
    }
  }
}

mysite.subModules.Home = {
  controller: function (){
    var ctrl = this ;
  },
  view: function (ctrl){
    return[
      m("div.container#home",[
        m("div.bg",
          m("div.title", "Hi, I'm Angelina!"),
          m("img[src='../img/about-img.jpg'].about-img")
        ),
        m("div.subtitle", "I like to build unique web experiences for businesses, non-profits, and you."),
        m("div.home-nav",
          m("ul",{config:mysite.anim.rollIn},
              m("li", m("a[href='#/about']",
              // {config: mysite.anim.pageSlideOut},
              "Learn More", m('i',{class:'icon-arrow_right'}))),
              m("li", m("a[href='#/portfolio']",
              // {config: mysite.anim.pageSlideOut},
               "My Work", m('i',{class:'icon-arrow_right'})))
          )
        )
      ])
    ]
  }
};


mysite.subModules.About ={
  controller: function (){
    var About = function(data) {
      data: m.prop(data)
    }
  About.list = function() {
    return m.request({
      method: "GET",
      url: "http://www.angelina-marie.com/cockpit/rest/api/collections/get/About?token=5e33744e5a42d77878db9c30"
    });
  }
 this.about = About.list();
  },
  view: function (ctrl){
    return[
      m("div.container#about",[
        $.map(ctrl.about(), function( val, i ) {
          return[
            m(".detail",
              m("p",{config: mysite.anim.rollIn}, m.trust(val.Bio))
            )
          ]
        }),
        m("div#icons",[
          m('i', m('a',{class:'icon-mail', href:'mailto:hello@angelina-marie.com'})),
          m('i', m('a',{class:'icon-git_circle', href:'https://www.github.com/ambethoney', target:'_blank'})),
          m('i', m('a',{class:'icon-twitter_circle', href:'https://www.twitter.com/oxangiemarie', target:'_blank'})),
          m('i', m('a',{class:'icon-linked_in_circle', href:'https://www.linkedin.com/in/ambethoney', target:'_blank'}))
        ])
      ])
    ]
  }
};

mysite.subModules.Portfolio ={
  controller: function (){
    var Project = function(data) {
       data: m.prop(data)
    }
    Project.list = function() {
      return m.request({
          method: "GET",
          url: "http://www.angelina-marie.com/cockpit/rest/api/collections/get/Portfolio?token=5e33744e5a42d77878db9c30"
      });
    }
    this.projects = Project.list();
  },
  view : function (ctrl){
    return[
      m("div.container#portfolio",{config:mysite.anim.rollSections},[
        m(".detail",
            m(".project-title first", "Here's what I've been building")
        ),
        m(".folio",{config:mysite.utils.githewall},
          m("ul",
            $.map(ctrl.projects(), function( val, i ) {
              return[
                m("li.img-border",
                  m("img",{
                    src: "http://www.angelina-marie.com/"+val.image[0].path.split(":").pop()+"", class:"portfolio-img"
                  })
                )

              ]
            })
          )
        )
      ])
    ]
  }
};

m.route.mode = "hash";
m.route(document.body, "/", {
  "/": mysite.modules.Page(mysite.subModules.Home),
  "/about": mysite.modules.Page(mysite.subModules.About),
  "/portfolio": mysite.modules.Page(mysite.subModules.Portfolio),
  "/portfolio/:project": mysite.modules.Page(mysite.subModules.Portfolio)
});
