m = require('mithril');
v = require('velocity-animate');
$ = require('jquery');

mysite = {};


mysite.modules = {};

mysite.anim = {};

mysite.utils = {};

mysite.anim.rollIn = function(el, init, context){

    if(!init){
        $(el).addClass('animated flipInX')
    }
}


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
            "mouseleave" : function(){ $(el).animate({height: is_closed + "px"}, 500); $('.navigation').hide()},
            "mouseenter" : function(){ $(el).animate({height: is_open + "px"}, 500); $('.navigation').show()}
        })

        // if(px_nav_height < 69){$('.navigation').hide()}
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

mysite.utils.submitForm = function(el, init, context){

    if(!init){

        $('.error').hide();

        var first_name = $("input#firstname").val(),
            last_name = $("input#lastname").val(),
            email = $("input#email").val(),
            phone = $("input#phone").val(),
            comments = $("input#comments").val();

        $(el).click(function(e){
             e.preventDefault();
              var dataString = 'name='+ first_name + ' '+ last_name + '&email= ' + email + '&phone= ' + phone + '&comments= ' + comments,
                  url = "https://docs.google.com/document/d/1E1OPzBRy2MLPzvQrnlAgzCX9OJqa1t0XrWGNGHl2O9Y/pub";


            //  if (first_name == "") {
            //     $("label#firstname_error").show();
            //     $("input#firstname").focus();
            //     return false;
            // }


            // if (last_name == "") {
            //     $("label#lastname_error").show();
            //     $("input#lastname").focus();
            //     return false;
            // }


            // if (email == "") {
            //     $("label#email_error").show();
            //     $("input#email").focus();
            //     return false;
            // }


            // if (phone == "") {
            //     $("label#phone_error").show();
            //     $("input#phone").focus();
            //     return false;
            // }


            // if (comments == "") {
            //     $("label#comments_error").show();
            //     $("input#comments").focus();
            //     return false;
            // }

            $.ajax({
              type: "POST",
              crossDomain: true,
              url: url,
              data: dataString,
              dataType: 'jsonp',
              // headers: {Access-Control-Allow-Origin: *},
              success: function() {
                $('#contact_form').html("<div id='message'></div>");
                $('#message').html("<h2>Contact Form Submitted!</h2>")
                .append("<p>We will be in touch soon.</p>")
                .hide()
                .fadeIn(1500, function() {
                  $('#message').append("<img id='checkmark' src='../images/about-img.jpg' />");
                });
              }
            });
            return false;
        })
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
                m("ul.navigation",
                     m("li", m("a[href='/']", {config: m.route, class: "nav-link"}, "Home")),
                    m("li", m("a[href='/about']", {config: m.route, class: "nav-link"}, "About")),
                    m("li", m("a[href='/portfolio']", {config: m.route, class: "nav-link"}, "Portfolio")),
                    m("li", m("a[href='/contact']", {config: m.route, class: "nav-link"}, "Contact"))
                )
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
         console.log("yooo")
         var ctrl = this ;
    },
    view: function (ctrl){
         console.log(ctrl)
        return[
            m("div.container#home",[
                m("div.title",{config:mysite.anim.rollIn}, "angelina marie"),
                m("div.subtitle", {config:mysite.anim.rollIn},"front end web developer")
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
                    m("div#contact_form",[
                        m("form[name='contact']",[
                            m("input",{
                                class:'input_one',
                                placeholder: 'first name',
                                value:"",
                                id: "firstname"},
                                "first name"),
                            m("label",{
                                class:"error",
                                for:"firstname",
                                id:"firstname_error"},"how can we be friends if i don't know your first name?"),
                            m("input", {
                                class:'input_one',
                                placeholder: 'last name',
                                value:"",
                                id: "lastname"},
                                "last name"),
                             m("label",{
                                class:"error",
                                for:"lastname",
                                id:"lastname_error"},"i need your last name to stalk you on facebook!"),
                            m("input",{
                                class:'input_one',
                                placeholder: 'email',
                                value:"",
                                id: "email"}
                                , "email"),
                            m("label",{
                                class:"error",
                                for:"email",
                                id:"email_error"},"i promise not to send you (<i>too</i> much) spam@"),
                            m("input",{
                                class:'input_one',
                                placeholder: 'phone',
                                value:"",
                                id: "phone"}
                                , "phone"),

                            m("input",{
                                class:'input_two',
                                placeholder: 'comments, suggestions, secrets',
                                value:"",
                                id: "comments"}
                                , "comments"),
                            m("button[type='submit']",{
                                class: "submit",
                                value : "send",
                                name : "submit",
                                id: "submit",
                                config: mysite.utils.submitForm
                            }, "submit")

                        ])
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


