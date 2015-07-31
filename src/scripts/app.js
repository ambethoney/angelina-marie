var m = require('mithril'),
$ = jQuery = require('jquery');
require('../vendors/js/jquery.panelSnap.js');

mysite = {};

var url = "../cockpit/rest/api/collections/get/"+ page +"?token=5e33744e5a42d77878db9c30 ",
    page;

mysite.modules = {};

mysite.subModules = {};

mysite.anim = {};

mysite.utils = {};





mysite.anim.rollIn = function(el, init, context){

    if(!init){
        $(el).addClass('animated flipInX')
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

mysite.anim.greeting = function(el, init, context){

    var canvas = document.getElementById("hello"),
        ctx = canvas.getContext("2d"),
        dashLen = 220, dashOffset = dashLen, speed = 5,
        txt = "oh, hello!", x = canvas.width / 3.66, i = 0;

    if(ctx != null){


        ctx.font = "140px cursive, TSCu_Comic, sans-serif";
        ctx.lineWidth = 5; ctx.lineJoin = "round"; ctx.globalAlpha = 2/3;
        ctx.strokeStyle = ctx.fillStyle = "#99CC99";
        ctx.textBaseline = "middle";

        (function loop() {
          ctx.clearRect(x, 0, 60, 150);
          ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
          dashOffset -= speed;                                         // reduce dash length
          ctx.strokeText(txt[i], x, 90);                               // stroke letter

          if (dashOffset > 0) requestAnimationFrame(loop);             // animate
          else {
            ctx.fillText(txt[i], x, 90);                               // fill final letter
            dashOffset = dashLen;                                      // prep next char
            x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
            ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
            ctx.rotate(Math.random() * 0.005);                         // random rotation
            if (i < txt.length) requestAnimationFrame(loop);
          }
        })();
    }
}


mysite.anim.rollSections = function(el, init, context){

    if(!init){

        $(el).panelSnap();
    }
}











mysite.utils.grid = function(el, init, context){
    if(!init){
        $(el).masonry()
    }
}
mysite.utils.hideNav = function(el, init, context){
    if(!init){
        if(m.route() ==='/'){
            $('nav').hide();
            // $('.navigation').show();
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
                  $('#message').append("<img id='checkmark'  />");
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
            m("nav",{config: mysite.utils.hideNav},[
                m("span.left",m("a[href='/']", {config: m.route, class: "nav-link"}, "angelina marie")),
                m("ul.navigation",
                    m("li", m("a[href='/about']", {config: m.route, class: "nav-link"}, "About")),
                    m("li", m("a[href='/portfolio']", {config: m.route, class: "nav-link"}, "Portfolio")),
                    m("li", m("a[href='/contact']", {config: m.route, class: "nav-link"}, "Contact"))
                )
            ])
        ];
    }
};

mysite.modules.Page = function(subModule){
    return {
        controller: function() {
            return {
                subCtrl: new subModule.controller,

            }
        },
        view : function(ctrl){
            return [ mysite.modules.Nav.view(), m(".page",[subModule.view(ctrl.subCtrl)] ) ];
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
                m("canvas#hello",{
                    "width":"1200px",
                    "height":"250px",
                    config:mysite.anim.greeting
                }, "oh, hello!"),
                m("div.title",{config:mysite.anim.rollIn}, "I'm Angelina"),
                m("img[src='../img/about-img.jpg']",{class: "about-img",config:mysite.anim.rollIn}),
                m("div.subtitle", {config:mysite.anim.rollIn},"I like to build interesting, thoughtful interfaces for businesses, non-profits, and you."),
                m("div.home-nav",
                    m("ul",{config:mysite.anim.rollIn},
                        m("li", m("a[href='/about']", {config: m.route}, "Learn More", m('i',{class:'icon-arrow_right'}))),
                        m("li", m("a[href='/portfolio']", {config: m.route}, "My Work", m('i',{class:'icon-arrow_right'}))),
                        m("li", m("a[href='/contact']", {config: m.route}, "I'm Hireable!", m('i',{class:'icon-arrow_right'})))
                    )
                )
            ])
        ]
    }
};


mysite.subModules.About ={
    controller: function (){
         var me = this ;
    },
    view: function (ctrl){
        return[
           m("div.container#about",[
                m("div.page-title", "welcome! "),
                m("div.left.bio", m.trust("<p>Hi, I'm Angelina. I've found myself in the Big Apple by way of Boston, Providence, and Charleston, SC. I take a lot of pride in building websites that <del> no one but me and my mom uses</del> promotes businesses, entertains, or lets me play with new technologies.</p>")),

                m("div.right.skills", m.trust("<p>What, you want to know more? When I finally pull away from my computer, I love arts & crafts of all varieties, lounging on the beach, and asking people what their new favorite library is at tech meetups across NYC.</p>"))
            ])
        ]
    }
};

mysite.subModules.Portfolio ={


    controller: function (){

        var table = $('.table-portfolio');

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
                m(".computer fixed", m("img",{src:'../img/mac.svg', class:'computer-icon'})),
                m("section",
                 m("div.page-title", "Here's what I've been building")
                ),

                $.map(ctrl.projects(), function( val, i ) {
                    return m("section",
                        m("img",{src: "http://www.angelina-marie.com/"+val.image[0].path.split(":").pop()+"", class:"portfolio-img left" }),
                        m(".detail right",
                             m("h4", val.title),
                            m("p", val.content)
                        )
                    )
                })


            ])
        ]
    }

};

mysite.subModules.Blog = {

    controller: function (){

        two = function(subject) {
            var output = [];
            for (var i = 0; i < 2; i++) output.push(subject(i));
            return output;
        };


        four = function(subject) {
            var output = [];
            for (var i = 0; i < 4; i++) output.push(subject(i));
            return output;
        };
    },


    view: function (controller){

         return[
           m("div.container#portfolio",[
                m("div.page-title", "portfolio"),
                m("div.portfolio-sub", m.trust("I'm still working on this page! In the mean time, bask in the cuteness of the kittehs and check out my <a href='http://www.github.com/ambethoney'> github!</a>")),
                 m("table.portfolio-table", two(function(){
                    return m("tr", four(function(){
                      return m("td",{config:mysite.anim.rollIn}, [m("img[src='http://placekitten.com/g/200/300']")])
                    }))
                 }))
            ])
        ]
    }

};




mysite.subModules.Contact = {
    controller: function (){
         var me = this;

    },
    view: function (ctrl){

         return[
           m("div.container#contact",[
                // m("div.page-title", "I'm hireable!"),
                m("div.contact-sub", "I'm currently looking for full time work in NYC. Have a project in mind? I love collaborating with inspiring people!"),
                m("div#icons",[
                    m('i', m('a',{class:'icon-mail', href:'mailto:hello@angelina-marie.com'})),
                    m('i', m('a',{class:'icon-git_circle', href:'https://www.github.com/ambethoney', target:'_blank'})),
                    m('i', m('a',{class:'icon-twitter_circle', href:'https://www.twitter.com/oxangiemarie', target:'_blank'})),
                    m('i', m('a',{class:'icon-linked_in_circle', href:'https://www.linkedin.com/in/ambethoney', target:'_blank'}))
                ])
                // m("div#contact_form",[
                //     m("form[name='contact']",[
                //         m("input",{
                //             class:'input_one',
                //             placeholder: 'first name',
                //             value:"",
                //             id: "firstname"},
                //             "first name"),
                //         m("label",{
                //             class:"error",
                //             for:"firstname",
                //             id:"firstname_error"},"how can we be friends if i don't know your first name?"),
                //         m("input", {
                //             class:'input_one',
                //             placeholder: 'last name',
                //             value:"",
                //             id: "lastname"},
                //             "last name"),
                //          m("label",{
                //             class:"error",
                //             for:"lastname",
                //             id:"lastname_error"},"i need your last name to stalk you on facebook!"),
                //         m("input",{
                //             class:'input_one',
                //             placeholder: 'email',
                //             value:"",
                //             id: "email"}
                //             , "email"),
                //         m("label",{
                //             class:"error",
                //             for:"email",
                //             id:"email_error"},"i promise not to send you (<i>too</i> much) spam@"),
                //         m("input",{
                //             class:'input_one',
                //             placeholder: 'phone',
                //             value:"",
                //             id: "phone"}
                //             , "phone"),

                //         m("input",{
                //             class:'input_two',
                //             placeholder: 'comments, suggestions, secrets',
                //             value:"",
                //             id: "comments"}
                //             , "comments"),
                //         m("button[type='submit']",{
                //             class: "submit",
                //             value : "send",
                //             name : "submit",
                //             id: "submit",
                //             config: mysite.utils.submitForm
                //         }, "submit")

                //     ])
                // ])

            ])
        ]
    }
};

m.route.mode = "search";
m.route(document.body, "/", {
    "/": mysite.modules.Page(mysite.subModules.Home),
    "/about": mysite.modules.Page(mysite.subModules.About),
    "/portfolio": mysite.modules.Page(mysite.subModules.Portfolio),
    "/portfolio/:project": mysite.modules.Page(mysite.subModules.Portfolio),
    "/blog": mysite.modules.Page(mysite.subModules.Blog),
    "/blog/:post": mysite.modules.Page(mysite.subModules.Blog),
    "/contact": mysite.modules.Page(mysite.subModules.Contact),
});


