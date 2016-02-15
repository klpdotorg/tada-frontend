module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    sendLoginToServer(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function sendLoginToServer(email, pass, cb)
{
  $.ajax({
        type: "POST",
        url: "http://tadadev.klp.org.in/auth/login/",
        data: {username:email, password: pass},
        success: function(data){
          if(data.auth_token)
            cb({authenticated: true, auth_token: data.auth_token});
          else
            cb({authenticated: false});
        },
        error: function(data){
          cb({authenticated: false});
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