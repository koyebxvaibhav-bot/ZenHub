/* Main JS for site interactions and simple animations
   - Mobile nav toggle
   - Scroll reveal for elements with .reveal
   - Simple local-storage contact save (placeholder for future backend)
*/

document.addEventListener('DOMContentLoaded', function(){
  // set years
  var y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // nav toggle for small screens
  var navToggle = document.querySelector('.nav-toggle');
  navToggle && navToggle.addEventListener('click', function(){
    var nav = document.querySelector('.nav');
    if(!nav) return;
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // basic reveal on scroll
  var revealEls = Array.from(document.querySelectorAll('.reveal'));
  function revealOnScroll(){
    var top = window.innerHeight;
    revealEls.forEach(function(el){
      var rect = el.getBoundingClientRect();
      if(rect.top < top - 60){
        el.classList.add('active');
      }
    });
  }
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, {passive:true});

  // contact local storage save
  var saveBtn = document.getElementById('saveBtn');
  if(saveBtn){
    saveBtn.addEventListener('click', function(){
      var name = document.getElementById('name').value || '';
      var msg = document.getElementById('message').value || '';
      if(!name || !msg){
        alert('Please fill name and message before saving locally.');
        return;
      }
      var saved = {name:name, message:msg, date:new Date().toISOString()};
      localStorage.setItem('kalr_contact', JSON.stringify(saved));
      var notice = document.getElementById('saved');
      if(notice){ notice.hidden = false; setTimeout(()=> notice.hidden = true, 3500); }
    });
  }
  var clearBtn = document.getElementById('clearBtn');
  if(clearBtn){ clearBtn.addEventListener('click', function(){ document.getElementById('contactForm').reset(); localStorage.removeItem('kalr_contact');}); }

  // lightweight progressive enhancement: enable keyboard nav focus effect
  document.body.addEventListener('keyup', function(e){
    if(e.key === 'Tab'){
      document.documentElement.classList.add('keyboard-nav');
    }
  });
});
