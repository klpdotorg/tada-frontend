import TadaStore from '../stores/TadaStore';

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (sessionStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    sendLoginToServer(email, pass, (res) => {
      if (res.authenticated) {
        sessionStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return sessionStorage.token
  },

  logout(cb) {
    delete sessionStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!sessionStorage.token
  },

  onChange() {}
}

function sendLoginToServer(email, pass, cb)
{
  $.ajax({
        type: "POST",
        url: "http://tadadev.klp.org.in/auth/login/",
        data: {username:email, password: pass},
        success: function(data)
        {
          if(data.auth_token)
          {
            //Store the auth token in the stores.
            TadaStore.setAuthToken(data.auth_token);
            fetchuserData(data.auth_token);
            cb({authenticated: true, auth_token: data.auth_token});
          }
          else
            cb({authenticated: false});
        },
        error: function(data){
          cb({authenticated: false});
        }
      });
}

function fetchuserData(token)
{
  $.ajax({
        type: "GET",
        url: "http://tadadev.klp.org.in/auth/me/",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token ' + token);},
        success: function(data){
          TadaStore.setUserData(data);
          sessionStorage.userData = data;
        }       
      });

}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'tada@klp.org.in' && pass === 'tada') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}