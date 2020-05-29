

/* MODIFICT last !!!!!!!!!!!!  */
var clickedMenu = 'home';      //implicit home
var curentLanguage  = 'rom';   //implicit rom
var first = true;              //prima incarcare
var queryString = '';

var loadPageContent = function(url){
    $( "#contentcontainer" ).load( url, function() {
    });
}

var  cleanBigMenu = function(){
          document.getElementById('desprenoi').style.borderColor = 'transparent';
          $('#desprenoi').removeClass('my-drop-shadow-med-border');

          document.getElementById('sah').style.borderColor = 'transparent';
          $('#sah').removeClass('my-drop-shadow-med-border');

          document.getElementById('activitati').style.borderColor = 'transparent';
          $('#activitati').removeClass('my-drop-shadow-med-border');

          document.getElementById('implica').style.borderColor = 'transparent';
          $('#implica').removeClass('my-drop-shadow-med-border');

          document.getElementById('media').style.borderColor = 'transparent';
          $('#media').removeClass('my-drop-shadow-med-border');         
}

var  cleanLittleMenu = function(){
          document.getElementById('legal').style.borderColor = 'transparent';
          document.getElementById('sitemap').style.borderColor = 'transparent';
          document.getElementById('brosura').style.borderColor = 'transparent';
          document.getElementById('contact').style.borderColor = 'transparent';
}

var cleanMenu = function(){
     cleanBigMenu();
     cleanLittleMenu();
}

var hideComponents = function(){
   $('#loading').fadeIn('fast');
   document.getElementById('piese_holder').style.display = 'none';
   document.getElementById('logo_holder').style.display = 'none';
   document.getElementById('menu_holder').style.display = 'none';
   document.getElementById('menu_holder_mic').style.display = 'none';
   document.getElementById('flags').style.display = 'none';
   //document.getElementById('search').style.display = 'none';
   document.getElementById('homeicon').style.display = 'none';
}

var showComponents = function(){
   document.getElementById('piese_holder').style.display = 'block';
   document.getElementById('logo_holder').style.display = 'block';
   document.getElementById('menu_holder').style.display = 'block';
   document.getElementById('menu_holder_mic').style.display = 'block';
   document.getElementById('flags').style.display = 'block';
   //document.getElementById('search').style.display = 'block';
   if(clickedMenu != 'home'){
      document.getElementById('homeicon').style.display = 'block';
   }
}

var  random_string = function(size){
        var _random_character = function(){
           var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
           return chars.substr( Math.floor(Math.random() * 62), 1);
        };
        var str = "";
        for (var i = 0; i < size; i++){
            str += _random_character();
        }
        return str;
}


var preloadImage = function (url) {
        try {
            var _img = new Image();
            _img.src = url;
        } catch (e) { }
}  


var firstAction = function(){
/*
 * prima oara cand se incarca site-ul
 */
  $('#maincontainer').fadeIn('fast', function(){
          $('#menu_holder').fadeIn('fast', function(){
             $('#logo_holder').fadeIn('fast', function(){
                 $('#piese_holder').fadeIn('fast', function(){
                     $('#menu_holder_mic').fadeIn('fast');
                     $('#flags').fadeIn('fast');
                     $('#contentcontainer').fadeIn('fast', function(){ $('#footer').fadeIn('fast')});
                 });
             })
          });
      });            
}

var showHome = function(lan){
  /*
   * incarca in backgroud header imaginea home (aceiasi pentru toate limbile)
   * incarca in content container continutul home
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('home') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'block';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ 
               $("#headerimage").attr("src", 'images/slides/home.jpg?'+random_string(10));
          });
          $("#search").css('display','block');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese.png';  //piese pentru home
          loadPageContent('content/'+curentLanguage+'/home.php');
     }
}
var showSah = function(lan){
  /*
   * incarca in backgroud header imaginea sah  (specifi de limba)
   * incarca in content container continutul sah
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('sah') == -1  ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
           $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/sah.jpg?'+random_string(10)); } );
           $("#search").css('display','none');
           document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';  //piese pentru restul
           loadPageContent('content/'+curentLanguage+'/sah.php');
     }
}

var showDespre = function(lan){
  /*
   * incarca in backgroud header imaginea despre
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('despre') == -1  ||  typeof(lan) != 'undefined' ) {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/despre.jpg?'+random_string(10)); } );
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
     }
}

var showDespreMenues = function(optionmenu){
  /*
   * incarca in backgroud header imaginea despre
   * incarca in content container continutul istoric
   */
   showDespre();
   var file = optionmenu.split('_')[1]+'.php';
   loadPageContent('content/'+curentLanguage+'/'+file);
}




var showActivitati = function(lan){
  /*
   * incarca in backgroud header imaginea activitati
   * incarca in content container continutul activitati
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('activitati') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          //$("#searchbox").css('top','480px');
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/activitati.jpg?'+random_string(10)); } );
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
          loadPageContent('content/'+curentLanguage+'/activitati.php');
     }
}


var showImplica = function(lan){
  /*
   * incarca in backgroud header imaginea sah
   * incarca in content container continutul sah
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('implica') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/implica.jpg?'+random_string(10)); } );
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
     }
}

var showImplicaMenues = function(optionmenu){
  /*
   * incarca in backgroud header imaginea despre
   * incarca in content container continutul istoric
   */
   showImplica();
   var file = optionmenu.split('_')[1]+'.php';
   loadPageContent('content/'+curentLanguage+'/'+file);
}


var showMedia = function(lan){
  /*
   * incarca in backgroud header imaginea sah
   * incarca in content container continutul sah
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('media') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/media.jpg?'+random_string(10)); } ); 
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
          loadPageContent('content/'+curentLanguage+'/media.php');
     }
}

var showLegal = function(lan){
  /*
   * incarca in backgroud header imaginea legal
   * incarca in content container continutul legal
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('legal') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/legal.jpg?'+random_string(10)); } ); 
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
          loadPageContent('content/'+curentLanguage+'/legal.php');
     }
}

var showSitemap = function(lan){
  /*
   * incarca in backgroud header imaginea sitemap
   * incarca in content container continutul sitemap
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('sitemap') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/sitemap.jpg?'+random_string(10)); } ); 
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
          loadPageContent('content/'+curentLanguage+'/sitemap.php');
     }
}


var showContact = function(lan){
  /*
   * incarca in backgroud header imaginea contact
   * incarca in content container continutul contact
   */
     var csrc = $("#headerimage").attr('src');
     if(  csrc.indexOf('contact') == -1 ||  typeof(lan) != 'undefined') {    //stupid chrome
          document.getElementById('homeicon').style.display = 'none';
          hideComponents();
          $('#headerimage').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 'fast', function(){ $("#headerimage").attr("src", 'images/slides/'+curentLanguage+'/contact.jpg?'+random_string(10)); } ); 
          $("#search").css('display','none');
          document.getElementById('piese_holder').firstChild.src = 'images/slides/piese2.png';
          loadPageContent('content/'+curentLanguage+'/contact.php');
     }
}

var replaceRom = function(){
    document.getElementById('flagsrc1').src = 'images/eng.png';
    document.getElementById('flagsrc2').src = 'images/hun.png';
    PutMenuRom();
}

var replaceEng = function(){
   document.getElementById('flagsrc1').src = 'images/rom.png';
   document.getElementById('flagsrc2').src = 'images/hun.png';  
   PutMenuEng();
}

var replaceHun = function(){
    document.getElementById('flagsrc1').src = 'images/rom.png';
    document.getElementById('flagsrc2').src = 'images/eng.png';
}


var PutMenuRom = function(){
  document.getElementById('desprenoi').firstChild.firstChild.src = 'images/menu/rom/despre.png';
  document.getElementById('sah').firstChild.firstChild.src = 'images/menu/rom/sah.png';
  document.getElementById('activitati').firstChild.firstChild.src = 'images/menu/rom/activitati.png';
  document.getElementById('implica').firstChild.firstChild.src = 'images/menu/rom/implica.png';
  document.getElementById('media').firstChild.firstChild.src = 'images/menu/rom/media.png';

  document.getElementById('legal').firstChild.firstChild.src   = 'images/menu/rom/legal.png';
  document.getElementById('sitemap').firstChild.firstChild.src = 'images/menu/rom/sitemap.png';
  document.getElementById('brosura').firstChild.firstChild.src = 'images/menu/rom/brosura.png';
  document.getElementById('contact').firstChild.firstChild.src = 'images/menu/rom/contact.png';

  document.getElementById('desprenoi').style.left = '0px';     document.getElementById('desprenoi').style.width = '17%'
  document.getElementById('sah').style.left = '24.87%';        document.getElementById('sah').style.width = '6%';
  document.getElementById('activitati').style.left = '39.5%';  document.getElementById('activitati').style.width = '15%';
  document.getElementById('implica').style.left = '63%';       document.getElementById('implica').style.width = '17%';
  document.getElementById('media').style.left = '87%';         document.getElementById('media').style.width = '8.3%';

  document.getElementById('legal').style.left   = '20%';       document.getElementById('legal').style.width = '7.5%'
  document.getElementById('sitemap').style.left = '34.5%';     document.getElementById('sitemap').style.width = '10.25%';
  document.getElementById('brosura').style.left = '51.5%';     document.getElementById('brosura').style.width = '30%';
  document.getElementById('contact').style.left = '87%';       document.getElementById('contact').style.width = '12.25%';
  document.getElementById('drop1_text').firstChild.src='images/menu/rom/drop1_text.png'; 
  document.getElementById('drop2_text').firstChild.src='images/menu/rom/drop2_text.png'; 

  document.getElementById('footer_home').innerHTML = 'home';
  document.getElementById('footer_sah').innerHTML = 'șah';
  document.getElementById('footer_activitati').innerHTML = 'activitati';
  document.getElementById('footer_media').innerHTML = 'media';
  document.getElementById('footer_legal').innerHTML = 'legal';
  document.getElementById('footer_sitemap').innerHTML = 'sitemap';
  document.getElementById('footer_contact').innerHTML = 'contact';
  document.getElementById('copyright').innerHTML = 'CHESS-START - copyright ©2015 - Toate drepturile rezervate.';


}

var PutMenuEng = function(){
  document.getElementById('desprenoi').firstChild.firstChild.src = 'images/menu/eng/despre.png';
  document.getElementById('sah').firstChild.firstChild.src = 'images/menu/eng/sah.png';
  document.getElementById('activitati').firstChild.firstChild.src = 'images/menu/eng/activitati.png';
  document.getElementById('implica').firstChild.firstChild.src = 'images/menu/eng/implica.png';
  document.getElementById('media').firstChild.firstChild.src = 'images/menu/eng/media.png';

  document.getElementById('desprenoi').style.left = '0px';     document.getElementById('desprenoi').style.width = '17%';
  document.getElementById('sah').style.left = '19%';           document.getElementById('sah').style.width = '8.86%';
  document.getElementById('activitati').style.left = '33%';    document.getElementById('activitati').style.width = '15%';
  document.getElementById('implica').style.left = '54%';       document.getElementById('implica').style.width = '21.8%';
  document.getElementById('media').style.left = '83%';         document.getElementById('media').style.width = '12.2%';


  document.getElementById('legal').firstChild.firstChild.src = 'images/menu/eng/legal.png';
  document.getElementById('sitemap').firstChild.firstChild.src = 'images/menu/eng/sitemap.png';
  document.getElementById('brosura').firstChild.firstChild.src = 'images/menu/eng/brosura.png';
  document.getElementById('contact').firstChild.firstChild.src = 'images/menu/eng/contact.png';

  document.getElementById('legal').style.left   = '20%';       document.getElementById('legal').style.width = '7.5%';
  document.getElementById('sitemap').style.left = '33.5%';     document.getElementById('sitemap').style.width = '10.25%';
  document.getElementById('brosura').style.left = '49.5%';     document.getElementById('brosura').style.width = '30%';
  document.getElementById('contact').style.left = '85%';       document.getElementById('contact').style.width = '12.25%';
  document.getElementById('drop1_text').firstChild.src='images/menu/eng/drop1_text.png';
  document.getElementById('drop2_text').firstChild.src='images/menu/eng/drop2_text.png';  

  document.getElementById('footer_home').innerHTML = 'home';
  document.getElementById('footer_sah').innerHTML = 'chess';
  document.getElementById('footer_activitati').innerHTML = 'activities';
  document.getElementById('footer_media').innerHTML = 'gallery';
  document.getElementById('footer_legal').innerHTML = 'legal';
  document.getElementById('footer_sitemap').innerHTML = 'sitemap';
  document.getElementById('footer_contact').innerHTML = 'contact';
  document.getElementById('copyright').innerHTML = 'CHESS-START - copyright ©2015 - All right reserved.';

}

var PutMenuHun = function(){
  document.getElementById('desprenoi').firstChild.firstChild.src = 'images/menu/hun/despre.png';
  document.getElementById('sah').firstChild.firstChild.src = 'images/menu/hun/sah.png';
  document.getElementById('activitati').firstChild.firstChild.src = 'images/menu/hun/activitati.png';
  document.getElementById('implica').firstChild.firstChild.src = 'images/menu/hun/implica.png';
  document.getElementById('media').firstChild.firstChild.src = 'images/menu/hun/media.png';

  document.getElementById('desprenoi').style.left = '0px';     document.getElementById('desprenoi').style.width = '11.8%';
  document.getElementById('sah').style.left = '14%';           document.getElementById('sah').style.width = '16%';
  document.getElementById('activitati').style.left = '33%';    document.getElementById('activitati').style.width = '23.5%';
  document.getElementById('implica').style.left = '59%';       document.getElementById('implica').style.width = '23.5%';
  document.getElementById('media').style.left = '86%';         document.getElementById('media').style.width = '9.2%';



  document.getElementById('legal').firstChild.firstChild.src = 'images/menu/hun/legal.png';
  document.getElementById('sitemap').firstChild.firstChild.src = 'images/menu/hun/sitemap.png';
  document.getElementById('brosura').firstChild.firstChild.src = 'images/menu/hun/brosura.png';
  document.getElementById('contact').firstChild.firstChild.src = 'images/menu/hun/contact.png';

  document.getElementById('legal').style.left   = '0px';       document.getElementById('legal').style.width = '21.6%';
  document.getElementById('sitemap').style.left = '26%';     document.getElementById('sitemap').style.width = '18.6%';
  document.getElementById('brosura').style.left = '47%';       document.getElementById('brosura').style.width = '32.7%';
  document.getElementById('contact').style.left = '82%';       document.getElementById('contact').style.width = '15.5%';

  document.getElementById('drop1_text').firstChild.src='images/menu/hun/drop1_text.png'; 
  document.getElementById('drop2_text').firstChild.src='images/menu/hun/drop2_text.png'; 

  document.getElementById('footer_home').innerHTML = 'főoldal';
  document.getElementById('footer_sah').innerHTML = 'a sakkról';
  document.getElementById('footer_activitati').innerHTML = 'tevékenységek';
  document.getElementById('footer_media').innerHTML = 'media';
  document.getElementById('footer_legal').innerHTML = 'jogi nyilatkozat';
  document.getElementById('footer_sitemap').innerHTML = 'webhelytérkép';
  document.getElementById('footer_contact').innerHTML = 'elérhetőség';
  
  document.getElementById('copyright').innerHTML = 'CHESS-START - copyright ©2015 – Minden jog fenntartva.';

}

var hideDrops = function(){
    $('#drop1').fadeOut('fast');
    $('#drop2').fadeOut('fast');
}


var switchLanguage = function(flag){
  var thisrc = document.getElementById(flag).src;
  if(  thisrc.indexOf('rom.png') != -1){
       curentLanguage = 'rom';
       replaceRom();
       PutMenuRom();

  }
  else{
    if(  thisrc.indexOf('eng.png') != -1){
         curentLanguage = 'eng';
         replaceEng();
         PutMenuEng();

    }
    else{
      if(  thisrc.indexOf('hun.png') != -1){
          curentLanguage = 'hun';
          replaceHun();
          PutMenuHun();
      }
      else{
        alert('language error !')
      }
    }
  }
}


preloadImage('images/slides/home.jpg');
preloadImage('images/menu/'+curentLanguage+'/despre.png');
preloadImage('images/menu/'+curentLanguage+'/sah.png');
preloadImage('images/menu/'+curentLanguage+'/activitati.png');
preloadImage('images/menu/'+curentLanguage+'/implica.png');
preloadImage('images/menu/'+curentLanguage+'/media.png');
preloadImage('images/menu/'+curentLanguage+'/legal.png');
preloadImage('images/menu/'+curentLanguage+'/sitemap.png');
preloadImage('images/menu/'+curentLanguage+'/brosura.png');
preloadImage('images/menu/'+curentLanguage+'/contact.png');
preloadImage('images/menu/rom/drop1_text.png');
preloadImage('images/menu/rom/drop2_text.png');
preloadImage('images/menu/eng/drop1_text.png');
preloadImage('images/menu/eng/drop2_text.png');
preloadImage('images/menu/hun/drop1_text.png');
preloadImage('images/menu/hun/drop2_text.png');



  $(window).load(function(){
        var _dispatcher = function(){
           switch (clickedMenu){
              case 'home':
                    showHome(true);
                    break;
              case 'drop1_istoric':
              case 'drop1_misiune':
              case 'drop1_scop':
              case 'drop1_obiective':
              case 'drop1_principii':
              case 'drop1_resurse':
              case 'drop1_dosar':
              case 'drop1_bilanturi':
              case 'drop1_coordonate':
                    showDespreMenues(clickedMenu);
                    break;
              case 'sah':
                    showSah(true);
                    break;
              case 'activitati':
                    showActivitati(true);
                    break;
              case 'drop2_membru':
              case 'drop2_doneaza':
              case 'drop2_sgenerali':
              case 'drop2_sactivitati':
              case 'drop2_voluntar':
                    showImplicaMenues(clickedMenu);
                    break;
              case 'media':
                    showMedia(true);
                    break;                    
              case 'legal':
                    showLegal(true);
                    break;
              case 'sitemap':
                    showSitemap(true);
                    break;
              case 'brosura':
                    break;
              case 'contact':
                    showContact(true);
                    break;
          }
        }

        

         $('#logo_holder').click(function(){
          cleanMenu();
          showHome();
          clickedMenu = 'home';
          //load home
       })        


       $('#flag1').click(function(){
          switchLanguage('flagsrc1');
          _dispatcher();
      })

      $('#flag2').click(function(){
          switchLanguage('flagsrc2');
          _dispatcher();
       })                


      $('#homeicon').click(function(){
          cleanMenu();
          showHome();
          clickedMenu = 'home';
       })        


       $('#desprenoi').mouseover(function(){
          this.style.borderColor = '#f9853b'
          $(this).addClass('my-drop-shadow-med-border');
          $('#drop1').fadeIn('fast');
          $('#drop2').fadeOut('fast');
          
       })   
       $('#desprenoi').mouseout(function(){
          if(clickedMenu !== 'desprenoi'){
             this.style.borderColor = 'transparent';
             $(this).removeClass('my-drop-shadow-med-border');
          }
       })
      
       
       $('#sah').mouseover(function(){
          this.style.borderColor = '#f9853b'
          $(this).addClass('my-drop-shadow-med-border');
          hideDrops()
       })   
       $('#sah').mouseout(function(){
           if(clickedMenu !== 'sah'){
               this.style.borderColor = 'transparent';
               $(this).removeClass('my-drop-shadow-med-border');
              
           }
       })  
       $('#sah').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          $(this).addClass('my-drop-shadow-med-border');
          showSah();
          clickedMenu = this.id;
          //load sah
      })  

      $('#activitati').mouseover(function(){
          this.style.borderColor = '#f9853b';
          $(this).addClass('my-drop-shadow-med-border');
          hideDrops()
       })   
       $('#activitati').mouseout(function(){
          if(clickedMenu !== 'activitati'){
             this.style.borderColor = 'transparent';
             $(this).removeClass('my-drop-shadow-med-border');
          }
       })
       $('#activitati').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          $(this).addClass('my-drop-shadow-med-border');
          clickedMenu = this.id;
          showActivitati();
          //load activitati
       })

      $('#implica').mouseover(function(){
          this.style.borderColor = '#f9853b';
          $(this).addClass('my-drop-shadow-med-border');
          $('#drop1').fadeOut('fast');
          $('#drop2').fadeIn('fast');
       })   
       $('#implica').mouseout(function(){
          if(clickedMenu !== 'implica'){
             this.style.borderColor = 'transparent';
             $(this).removeClass('my-drop-shadow-med-border');
          }
       })
       

       $('#media').mouseover(function(){
          this.style.borderColor = '#f9853b';
          $(this).addClass('my-drop-shadow-med-border');
          hideDrops()
       })   
       $('#media').mouseout(function(){
          if(clickedMenu !== 'media'){
             this.style.borderColor = 'transparent';
             $(this).removeClass('my-drop-shadow-med-border');
          }
       })
       $('#media').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          $(this).addClass('my-drop-shadow-med-border');
          $(this).removeClass('my-drop-shadow-med-border');
          clickedMenu = this.id;
          showMedia();
          //load media
       })

       $('#legal').mouseover(function(){
          this.style.borderColor = '#f9853b'
           hideDrops()
       })   
       $('#legal').mouseout(function(){
          if(clickedMenu !== 'legal'){
             this.style.borderColor = 'transparent'
          }
       })
       $('#legal').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          clickedMenu = this.id;
          showLegal();
          //load legal
       })    

      $('#sitemap').mouseover(function(){
          this.style.borderColor = '#f9853b'
           hideDrops()
       })   
       $('#sitemap').mouseout(function(){
          if(clickedMenu !== 'sitemap'){
             this.style.borderColor = 'transparent';
          }
       })
       $('#sitemap').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          clickedMenu = this.id;
          showSitemap();
          //load sitemap
       })  

      $('#brosura').mouseover(function(){
          this.style.borderColor = '#f9853b';
          hideDrops()
       })   
       $('#brosura').mouseout(function(){
          if(clickedMenu !== 'brosura'){
             this.style.borderColor = 'transparent';
          }
       })
       $('#brosura').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          clickedMenu = this.id;
          //load brosura
       })      


       $('#contact').mouseover(function(){
          this.style.borderColor = '#f9853b';
           hideDrops()
       })   
       $('#contact').mouseout(function(){
          if(clickedMenu !== 'contact'){
             this.style.borderColor = 'transparent';
          }
       })
       $('#contact').click(function(){
          cleanMenu()
          this.style.borderColor = '#f9853b';
          clickedMenu = this.id;
          showContact();
          //load contact
       })

       $('#footer_home').click(function(){
           location.replace('http://www.chess-start.ro/index.php?home&'+curentLanguage);
           return false;
          //load home via reload page
       })

       $('#footer_sah').click(function(){
           location.replace('http://www.chess-start.ro/index.php?sah&'+curentLanguage);
           return false;
          //load sah via reload page
       })

       $('#footer_activitati').click(function(){
           location.replace('http://www.chess-start.ro/index.php?activitati&'+curentLanguage);
           return false;
          //load activitati via reload page
       })

       $('#footer_media').click(function(){
           location.replace('http://www.chess-start.ro/index.php?media&'+curentLanguage);
           return false;
          //load media via reload page
       })

       $('#footer_legal').click(function(){
           location.replace('http://www.chess-start.ro/index.php?legal&'+curentLanguage);
           return false;
          //load legal via reload page
       })

        $('#footer_sitemap').click(function(){
           location.replace('http://www.chess-start.ro/index.php?sitemap&'+curentLanguage);
           return false;
          //load sitemap via reload page
       })

        $('#footer_contact').click(function(){
           location.replace('http://www.chess-start.ro/index.php?contact&'+curentLanguage);
           return false;
          //load contact via reload page
       })



       $('#drop1').mouseout(function(){
           $('#drop1').fadeOut('fast');
       })
       $('#drop2').mouseout(function(){
           $('#drop2').fadeOut('fast');
       })

       document.getElementById('headerimage').onload = function(){
           $('#headerimage').css({opacity: 1, visibility: "visible"})
           $('#headerimage').fadeIn(2000, function(){
              if(first){
                first = false;   firstAction();
              }
              else{
                 showComponents();
              }
              $('#loading').fadeOut('fast');
           });
       }

       document.getElementById('headerimage').onerror = function(){
           $('#headerimage').fadeIn(1000, function(){
              $('#headerloading').fadeOut('fast');
              //alert('Imagine background inexistenta !')
           });
       }


      
      $("#drop1_holder").on('mousemove',function(e){
          var nrElements = 10;
          var currentHeight = $('#drop1_holder').height();
          var currentElementHeight = currentHeight / nrElements;
          var parentOffset = $(this).parent().offset();
          var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
          var relativeYPosition = (e.pageY - parentOffset.top);
          var updateActive = function(elements, state){
             for(var i=0; i< elements.length; i++){
                //fara ransparenta
                if(i != 6){
                  if(state[i] == 1){
                    document.getElementById(elements[i]).firstChild.src= 'images/drop1_element_bg.png';  
                  }
                  else{
                   document.getElementById(elements[i]).firstChild.src= 'images/pixel.png';  
                  }
                }
             }
          }
          if(relativeYPosition > 0*currentElementHeight && relativeYPosition < 1*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[1,0,0,0,0,0,0,0,0,0])
          }
          if(relativeYPosition > 1*currentElementHeight && relativeYPosition < 2*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,1,0,0,0,0,0,0,0,0])
          }
          if(relativeYPosition > 2*currentElementHeight && relativeYPosition < 3*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,1,0,0,0,0,0,0,0])
          }  
          if(relativeYPosition > 3*currentElementHeight && relativeYPosition < 4*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,1,0,0,0,0,0,0])
          }   
          if(relativeYPosition > 4*currentElementHeight && relativeYPosition < 5*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,1,0,0,0,0,0])
          }    
          if(relativeYPosition > 5*currentElementHeight && relativeYPosition < 6*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,1,0,0,0,0])
          }
          if(relativeYPosition > 6*currentElementHeight && relativeYPosition < 7*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,1,0,0,0])
          }  
          if(relativeYPosition > 7*currentElementHeight && relativeYPosition < 8*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,0,1,0,0])
          }
          if(relativeYPosition > 8*currentElementHeight && relativeYPosition < 9*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,0,0,1,0])
          }  
         if(relativeYPosition > 9*currentElementHeight && relativeYPosition < 10*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,0,0,0,1])
          }            
      })


      $("#drop1_holder").on('click',function(e){
          var nrElements = 10;
          var currentHeight = $('#drop1_holder').height();
          var currentElementHeight = currentHeight / nrElements;
          var parentOffset = $(this).parent().offset();
          var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
          var relativeYPosition = (e.pageY - parentOffset.top);
          var updateActive = function(elements, state){
            
             for(var i=0; i< elements.length; i++){
                //fara transparenta
                if(i != 6){
                  if(state[i] == 1){  
                    cleanMenu();
                    showDespreMenues(elements[i]);
                    clickedMenu = elements[i];
                    //$('#drop1').fadeOut(500);
                    break;
                  }
                }
             }
          }
          if(relativeYPosition > 0*currentElementHeight && relativeYPosition < 1*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[1,0,0,0,0,0,0,0,0,0])
          }
          if(relativeYPosition > 1*currentElementHeight && relativeYPosition < 2*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,1,0,0,0,0,0,0,0,0])
          }
          if(relativeYPosition > 2*currentElementHeight && relativeYPosition < 3*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,1,0,0,0,0,0,0,0])
          }  
          if(relativeYPosition > 3*currentElementHeight && relativeYPosition < 4*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,1,0,0,0,0,0,0])
          }   
          if(relativeYPosition > 4*currentElementHeight && relativeYPosition < 5*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,1,0,0,0,0,0])
          }    
          if(relativeYPosition > 5*currentElementHeight && relativeYPosition < 6*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,1,0,0,0,0])
          }
          if(relativeYPosition > 6*currentElementHeight && relativeYPosition < 7*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,1,0,0,0])
          }  
          if(relativeYPosition > 7*currentElementHeight && relativeYPosition < 8*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,0,1,0,0])
          }
          if(relativeYPosition > 8*currentElementHeight && relativeYPosition < 9*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,0,0,1,0])
          }  
          if(relativeYPosition > 9*currentElementHeight && relativeYPosition < 10*currentElementHeight){
             updateActive(['drop1_istoric','drop1_misiune','drop1_scop','drop1_obiective','drop1_principii','drop1_resurse','drop1_transparenta','drop1_dosar','drop1_bilanturi','drop1_coordonate'],[0,0,0,0,0,0,0,0,0,1])
          }            
      })


      $("#drop2_holder").on('mousemove',function(e){
          var nrElements = 6;
          var currentHeight = $('#drop2_holder').height();
          var currentElementHeight = currentHeight / nrElements;
          var parentOffset = $(this).parent().offset();
          var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
          var relativeYPosition = (e.pageY - parentOffset.top);
          var updateActive = function(elements, state){
             for(var i=0; i< elements.length; i++){
                 //fara sustinatori
                if(i != 2){
                   if(state[i] == 1){
                    document.getElementById(elements[i]).firstChild.src= 'images/drop1_element_bg.png';  
                   }
                   else{
                    document.getElementById(elements[i]).firstChild.src= 'images/pixel.png';  
                   }
                }
             }
          }
          if(relativeYPosition > 0*currentElementHeight && relativeYPosition < 1*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[1,0,0,0,0,0])
          }
          if(relativeYPosition > 1*currentElementHeight && relativeYPosition < 2*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,1,0,0,0,0])
          }
          if(relativeYPosition > 2*currentElementHeight && relativeYPosition < 3*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,1,0,0,0])
          }  
          if(relativeYPosition > 3*currentElementHeight && relativeYPosition < 4*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,0,1,0,0])
          }   
          if(relativeYPosition > 4*currentElementHeight && relativeYPosition < 5*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,0,0,1,0])
          }    
          if(relativeYPosition > 5*currentElementHeight && relativeYPosition < 6*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,0,0,0,1])
          }
        
      })

      $("#drop2_holder").on('click',function(e){
          var nrElements = 6;
          var currentHeight = $('#drop2_holder').height();
          var currentElementHeight = currentHeight / nrElements;
          var parentOffset = $(this).parent().offset();
          var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
          var relativeYPosition = (e.pageY - parentOffset.top);
          var updateActive = function(elements, state){
             for(var i=0; i< elements.length; i++){
                //fara sustinatori
                if(i != 2){
                  if(state[i] == 1){
                    cleanMenu();
                    showImplicaMenues(elements[i]);
                    clickedMenu = elements[i];
                    //$('#drop2').fadeOut(500);
                  }
                }
             }
          }
          if(relativeYPosition > 0*currentElementHeight && relativeYPosition < 1*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[1,0,0,0,0,0])
          }
          if(relativeYPosition > 1*currentElementHeight && relativeYPosition < 2*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,1,0,0,0,0])
          }
          if(relativeYPosition > 2*currentElementHeight && relativeYPosition < 3*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,1,0,0,0])
          }  
          if(relativeYPosition > 3*currentElementHeight && relativeYPosition < 4*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,0,1,0,0])
          }   
          if(relativeYPosition > 4*currentElementHeight && relativeYPosition < 5*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,0,0,1,0])
          }    
          if(relativeYPosition > 5*currentElementHeight && relativeYPosition < 6*currentElementHeight){
             updateActive(['drop2_membru','drop2_doneaza','drop2_sustinatori','drop2_sgenerali','drop2_sactivitati','drop2_voluntar'],[0,0,0,0,0,1])
          }
      })
      //and go !
       queryString = self.location.search.substring(1);
       var inputParams = queryString.split('&');
       if(inputParams.length == 2){
           clickedMenu = inputParams[0];
           //numai daca exista corect
           if(inputParams[1] === 'rom' || inputParams[1] === 'eng' || inputParams[1] === 'hun'){
                 curentLanguage = inputParams[1];
           }
           _dispatcher();
           switch (curentLanguage){
                case 'rom':
                    replaceRom();
                    PutMenuRom();
                   break;
                case 'eng':
                    replaceEng();
                    PutMenuEng();
                   break;
                case 'hun':
                    replaceHun();
                    PutMenuHun();
                   break;
           }
       }
       else{
         showHome(true);
       }                                           
 })
