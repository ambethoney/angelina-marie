m = require('mithril');

mysite = {};


mysite.modules = {};

mysite.anim = {};

mysite.anim.rollIn = function(el, init, context){}

mysite.modules.Nav = {

    controller: function(){

        function link(name, route){
            var isCurrent = (m.route() === route);
            var click = function(){ m.route(route); };
            return m("button"+(isCurrent ? ".success" : ""), {onclick: click}, name);
        }

        function hideNav(){

        }
    },

    view: function(ctrl){
        return [
            m("nav",[
                m("ul.navigation",[
                    m("li", m("a[href='/']", {config: m.route, class: "nav-link"}, "Home")),
                    m("li", m("a[href='/about']", {config: m.route, class: "nav-link"}, "About")),
                    m("li", m("a[href='/portfolio']", {config: m.route, class: "nav-link"}, "Portfolio")),
                    m("li", m("a[href='/contact']", {config: m.route, class: "nav-link"}, "Contact"))
                ])
            ])
        ];
    }
};

mysite.modules.Page = function(subModule){
    this.controller = function(){},
    this.view = function(ctrl){
        return [ mysite.modules.Nav.view(), m(".page",[subModule.view()] ) ];
    }
}


mysite.modules.Home = new mysite.modules.Page({
    controller: function (){
        // console.log("yooo"),
         var me = this ;
    },
    view: function (ctrl){
        // console.log(ctrl)
        return[
            m("div.container#home",[
                m("div.title", "angelina marie"),
                m("div.subtitle", "front end web developer")
            ])
        ]
    }
});


mysite.modules.About = new mysite.modules.Page({
    controller: function (){
        // console.log("yooo"),
         var me = this ;
    },
    view: function (ctrl){
        // console.log(ctrl)
        return[
           m("div.container#about",[
                m("div.bio-title", "i make cool shit"),
                m("div.bio-subtitle", "and stuff!")
            ])
        ]
    }
});

mysite.modules.Portfolio = new mysite.modules.Page({
    controller: function (){
        // console.log("yooo"),
         var me = this ;
    },
    view: function (ctrl){
        // console.log(ctrl)
        return[
            m("div", ['hello from portfolio view'])
        ]
    }
});

mysite.modules.Contact = new mysite.modules.Page({
    controller: function (){
        // console.log("yooo"),
         var me = this ;
    },
    view: function (ctrl){
        // console.log(ctrl)
        return[
            m("div", ['hello from contact view'])
        ]
    }
});

m.route.mode = "search";
m.route(document.body, "/", {
    "/": mysite.modules.Home,
    "/about": mysite.modules.About,
    "/portfolio": mysite.modules.Portfolio,
    "/portfolio/:project": mysite.modules.Portfolio,
    "/contact": mysite.modules.Contact
});


