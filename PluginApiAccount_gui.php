<?php
class PluginApiAccount_gui{
  public function widget_include_js(){
    $file = '/plugin/api/account_gui/js/PluginApiAccount_gui.js';
    $widget = wfDocument::createWidget('wf/embed', 'embed', array('type' => 'script', 'file' => $file));
    wfDocument::renderElement(array($widget));  
  }
  public function widget_modal(){
    $element = new PluginWfYml(__DIR__.'/element/'.__FUNCTION__.'.yml');
    wfDocument::renderElement($element);
  }
  public function widget_btn_data(){
    $element = new PluginWfYml(__DIR__.'/element/'.__FUNCTION__.'.yml');
    wfDocument::renderElement($element);
  }
  public function widget_btn_sign_check(){
    $element = new PluginWfYml(__DIR__.'/element/'.__FUNCTION__.'.yml');
    wfDocument::renderElement($element);
  }
  public function widget_btn_sign(){
    $element = new PluginWfYml(__DIR__.'/element/'.__FUNCTION__.'.yml');
    wfDocument::renderElement($element);
  }
}
