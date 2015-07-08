m = require('mithril');
$ = require('jquery-latest');

mysite = {};

mysite.modules = {};

mysite.modules.Nav = {

    controller: function(){

        // function link(name, route){
        // var isCurrent = (m.route() === route);
        // var click = function(){ m.route(route); };
        // return m("button"+(isCurrent ? ".success" : ""), {onclick: click}, name);
        // }
    },

    view: function(ctrl){
        return [
            m("ul.navigation",[
                m("li", m("a[href='/']", {config: m.route}, "Home",{
                    class: "nav-link"})),
                m("li", m("a[href='/about']", {config: m.route}, "About",{
                    class: "nav-link"})),
                m("li", m("a[href='/portfolio']", {config: m.route}, "Portfolio",{
                    class: "nav-link"})),
                m("li",  m("a[href='/contact']", {config: m.route}, "Contact",{
                    class: "nav-link"})),
            ])
        ];
    }
};

mysite.modules.Page = function(content, placePlugin){
    this.view = function(){
        return [ mysite.modules.Nav.view(), m(".page", content ) ];
    }
}


mysite.modules.Home = new mysite.modules.Page("Home");


mysite.modules.About = new mysite.modules.Page("About");


mysite.modules.Portfolio = new mysite.modules.Page("Portfolio");


mysite.modules.Contact = new mysite.modules.Page("Contact");

m.route.mode = "search";
m.route(document.body, "/", {
    "/": mysite.modules.Home,
    "/about": mysite.modules.About,
    "/portfolio": mysite.modules.Portfolio,
    "/portfolio/:project": mysite.modules.Portfolio,
    "/contact": mysite.modules.Contact
});


