jQuery(document).ready(function(){
  // Get elements
  const btnLogin = document.getElementById('login-button');
  const btnLogout = document.getElementById('logout-button');

  // Add logout event listener
  btnLogout.addEventListener('click', e=> {
    firebase.auth().signOut();
  });

  // Initialize onAuthStateChange
  initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        user.getIdToken().then(function(accessToken) {
          document.getElementById('sign-in-welcome').textContent = welcome;
          document.getElementById('sign-in-name').textContent = displayName;
          btnLogin.classList.add('hide');
          btnLogout.classList.remove('hide');

        });
      } else {
        // User is signed out.
        document.getElementById('sign-in-welcome').textContent = '';
        document.getElementById('sign-in-name').textContent = '';
        btnLogin.classList.remove('hide');
        btnLogout.classList.add('hide');
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });

});
