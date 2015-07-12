m = require('mithril');
v = require('velocity-animate');
$ = require('jquery');

mysite = {};


mysite.modules = {};

mysite.anim = {};

mysite.anim.rollIn = function(el, init, context){}


mysite.anim.easeNav = function(el, init, slide_up){
    var px_nav_height = $('nav').height(),
        is_open =  70,
        is_closed = 20,
        is_sliding = ! is_open && ! is_closed;

     if(!init){

         // if(slide_up){
         //    $(el).animate({height: is_closed + "px"}, 500)


         // };

        $(el).on({
            "mouseout" : function(){ $(el).animate({height: is_closed + "px"}, 500)},
            "mouseover" : function(){ $(el).animate({height: is_open + "px"}, 500)}
        })
     }
}

mysite.anim.pageSlideIn = function(el, init, context) {

    if (!init) {

        el.onclick = function(e) {

            e.preventDefault()


                $('.page').v("fadeIn", { delay: 200, duration: 1000 }, {

                complete: function() {

                    m.route(el.getAttribute('href'), true)

                }
            })
        }
    }
}


mysite.modules.Nav = {

    controller: function(){

        function link(name, route){
            var isCurrent = (m.route() === route);
            var click = function(){ m.route(route); };
            return m("button"+(isCurrent ? ".success" : ""), {onclick: click}, name);
        }
    },

    view: function(ctrl){
        return [
            m("nav",{config: mysite.anim.easeNav},[
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
    this.controller = subModule.controller,
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
                m("div.page-title", "welcome! "),
                m("div.left.bio", m.trust("<p>Hi, I'm Angelina. I've found myself in the Big City by way of Boston, Providence, and Charleston, SC. I build random websites to play around with new or interesting technologies, and <a href='/portfolio'>make others' dreams come true</a>. When I'm not staring at the computer, I like to <del> read</del> cut up magazines and make funky art. I guess I like to hike and eat ice cream, too.</p>")),
                m("img[src='../img/about-img.jpg']",{class: "about-img"}),
                m("div.right.skills", m.trust("<p>some more stuff here</p>"))
            ])
        ]
    }
});

mysite.modules.Portfolio = new mysite.modules.Page({
    controller: function (){
        var chain = {};
        chain.seven = function(subject) {
            var output = [];
            for (var i = 0; i < 7; i++) output.push(subject(i));
            return output;
        };
    },

    view: function (ctrl){
         console.log(ctrl)
         return[
           m("div.container#portfolio",[
                m("div.page-title", "portfolio "),
                 // m("table", chain.seven(function(){
                 //    return m("tr", chain.seven(function(){
                 //      return m("td", "hello")
                 //    }))
                 // }))
            ])
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
           m("div.container#contact",[
                m("div.page-title", "i'm hireable!"),
                m("div.contact-sub", "i'm currently looking for full time work in NYC. have a project in mind? i love collaborating with inspiring people!"),
                m("form[name='contact']",[
                    m("input",{
                        class:'input_one',
                        placeholder: 'first name',
                        value:""},
                        "first name"),
                    m("input", {
                        class:'input_one',
                        placeholder: 'last name',
                        value:""},
                        "last name"),
                    m("input",{
                        class:'input_one',
                        placeholder: 'email',
                        value:""}
                        , "email"),
                    m("input",{
                        class:'input_one',
                        placeholder: 'phone',
                        value:""}
                        , "phone"),
                    m("input",{
                        class:'input_two',
                        placeholder: 'comments, suggestions, secrets',
                        value:""}
                        , "comments"),
                    m("button[type='submit']", "submit"),

                ])
            ])
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


