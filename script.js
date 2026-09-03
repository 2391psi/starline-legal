(function(){
  var supported = ['en','ru','de','fr','pl','uk'];
  function pickInitial(){
    try{
      var langs = navigator.languages || [navigator.language || 'en'];
      for (var i=0;i<langs.length;i++){
        var code = (langs[i]||'').slice(0,2).toLowerCase();
        if (supported.indexOf(code) !== -1) return code;
      }
    }catch(e){}
    return 'en';
  }
  function activate(code){
    supported.forEach(function(c){
      var btn = document.getElementById('btn-'+c);
      var doc = document.getElementById('doc-'+c);
      if (btn) btn.classList.toggle('active', c===code);
      if (doc) doc.classList.toggle('active', c===code);
    });
    try{ localStorage.setItem('starline-legal-lang', code); }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', function(){
    var stored = null;
    try{ stored = localStorage.getItem('starline-legal-lang'); }catch(e){}
    var initial = (stored && supported.indexOf(stored) !== -1) ? stored : pickInitial();
    activate(initial);
    supported.forEach(function(c){
      var btn = document.getElementById('btn-'+c);
      if (btn) btn.addEventListener('click', function(){ activate(c); });
    });
  });
})();
