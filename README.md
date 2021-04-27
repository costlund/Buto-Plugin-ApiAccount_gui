# Buto-Plugin-ApiAccount_gui
GUI to hande request for plugin api/account.

## Javascript
Create object with url and api params. Use event to listen for changes from other plugins in application.

### Create object
Create object an run sign_check.
```
var PluginApiAccount_gui = new PluginApiAccount_gui();
PluginApiAccount_gui.url = 'http://localhost';
PluginApiAccount_gui.api = 'api_v2';
PluginApiAccount_gui.sign_check();
```

### Event
Listen for changes.
```
document.addEventListener('api_account_gui_success', function (e) {
  console.log(PluginApiAccount_gui.data.user.role.client); 
}, false);
```

### Methods
```
PluginApiAccount_gui.alert_data()
PluginApiAccount_gui.sign_check()
PluginApiAccount_gui.sign_form()
PluginApiAccount_gui.sign_out()
```

## Buttons
One could use this widget to add buttons

### btn_data
Show data stored from last request.
```
type: widget
data:
  plugin: api/account_gui
  method: btn_data
```

### btn_sign_check
Make a request to check if user are authenticated.
```
type: widget
data:
  plugin: api/account_gui
  method: btn_sign_check
```

### btn_sign
Two buttons. Sign in and Sign out. Only one is visible.
```
type: widget
data:
  plugin: api/account_gui
  method: btn_sign
```
