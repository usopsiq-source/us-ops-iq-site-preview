// This is a matching reference, not authorization. Every submission needs a paid-record check.
(function () {
  var field = document.getElementById('purchase_ref');
  var ref = new URLSearchParams(location.search).get('ref');
  if (ref && /^[A-Za-z0-9_-]{1,64}$/.test(ref)) {
    field.value = ref;
    document.getElementById('ref-status').textContent = 'Your purchase reference is filled in from your welcome link. We will match it to your verified payment.';
  }
  // Remove the reference from the visible URL after reading it; no answers enter URLs/storage.
  if (location.search) history.replaceState(null, '', location.pathname);
  field.setAttribute('pattern', '[A-Za-z0-9_-]{1,64}');
  document.getElementById('intake-form').addEventListener('submit', function (e) {
    var error = document.getElementById('form-error');
    for (var i=1;i<=2;i++) for (var j=1;j<=10;j++) {
      var lo=document.getElementById('p'+i+'_s'+j+'_low');
      var hi=document.getElementById('p'+i+'_s'+j+'_high');
      if (lo.value !== '' && hi.value !== '' && Number(hi.value) < Number(lo.value)) {
        e.preventDefault(); hi.closest('details').open=true;
        error.hidden=false; error.textContent='Process '+i+', step '+j+': high minutes must be at least low minutes.';
        hi.focus(); return;
      }
    }
    error.hidden=true;
  });
})();
