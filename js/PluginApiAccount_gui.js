function PluginApiAccount_gui(){
  var self = this;
  this.interval = null;
  this.event = new Event('api_account_gui_success');
  this.data = {}
  this.url = 'http://localhost';
  this.api = 'api_v2';
  this.sign_check = function(){
    clearInterval(this.interval);
    this.ajax('account_sign_check', {});
    this.interval = setInterval(function(){
      /**
       * 
       */
      if(self.get_time()-self.data.request.ajax_time > 1000*60*10){
        self.sign_check();
      }
      /**
       * 
       */
      self.data.request.ajax_interval = self.get_time()-self.data.request.ajax_time;
      document.dispatchEvent(PluginApiAccount_gui.event);
    }, 1000*1);
  }
  this.sign_form = function(){
    $('#plubin_api_account_gui_signinModal').modal('show');
  }
  this.sign_in = function(){
    var email = document.getElementById('plubin_api_account_gui_signinEmail').value;
    var password = document.getElementById('plubin_api_account_gui_signinPassword').value;
    this.ajax('account_sign_in', {email: email, password: password});
    if(PluginApiAccount_gui.data.user.role.client){
      $('.modal').modal('hide');
    }
  }
  this.sign_out = function(){
    this.ajax('account_sign_out', {});
  }
  this.get_time = function(as_text){
    var d = new Date();
    if(as_text){
      return d.toString();
    }else{
      return d.getTime();
    }
  }
  this.ajax = function(page, data){
    $.ajax(this.url+"/"+this.api+"/"+page+'?xurl='+window.location.origin, {
      dataType: 'json',
      method: 'POST',
      data: data,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      success: this.success,
      error: this.error,
      async: false
   });
  }
  this.alert_data = function(){
    alert( JSON.stringify(this.data, null, 2));
  }
  this.success = function(data){
    /**
     * theme version
     */
    if(PluginApiAccount_gui.data.theme && PluginApiAccount_gui.data.theme.version!=data.theme.version){
      alert('New theme version. Application must restart');
      location.reload();
    }
    /**
     * data
     */
    PluginApiAccount_gui.data = data;
    /**
     * 
     */
     PluginApiAccount_gui.data.request.ajax_time = self.get_time();
     PluginApiAccount_gui.data.request.ajax_time_text = self.get_time(true);
     /**
     * btn, modal
     */
    if(PluginApiAccount_gui.data.user.role.client){
      $('.plubin_api_account_gui_btn_sign_in').hide();
      $('.plubin_api_account_gui_btn_sign_out').show();
      $('#plubin_api_account_gui_signinModal').modal('hide');
    }else{
      $('.plubin_api_account_gui_btn_sign_in').show();
      $('.plubin_api_account_gui_btn_sign_out').hide();
    }
    /**
     * error
     */
    $('.plugin_api_account_gui_error').remove();
    if(PluginApiAccount_gui.data.request.method=='account_sign_in' && PluginApiAccount_gui.data.error.length){
      for(var i=0; i<PluginApiAccount_gui.data.error.length; i++){
        var element = document.createElement('div');
        element.className='alert alert-warning plugin_api_account_gui_error';
        element.innerHTML = PluginApiAccount_gui.data.error[i]['message'];
        $('#plubin_api_account_gui_signinModal .modal-body').append(element);
      }
    }
    /**
     * event
     */
    document.dispatchEvent(PluginApiAccount_gui.event);
}
  this.error = function(data){
    alert('error...');
  }
}
