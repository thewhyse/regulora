<?php  
defined('_VALID_AI') or die('Direct Access to this location is not allowed.');

    aiPostboxOpen("id-advanced-parameters", "Url parameter handling", $closedArray); 
?>  	  
    <p>
<?php _e('Advanced iframe is able to forward parameter from the parent to the iframe url. In the pro version you are also able to map parameters and add the iframe url as parameter to the parent url. Also check the documentation at "Url". For pro users are many additional options to add Wordpress or url data to the iframe url.', 'advanced-iframe');
echo '<table class="form-table">';
    printTextInput(false,$devOptions, __('URL forward parameters', 'advanced-iframe'), 'url_forward_parameter', __('Define the parameters that should be passed from the browser url to the iframe url. Please separate the parameters by \',\'. Using "ALL" does forward every parameter.<br />GET and POST parameters are supported!<br />Pro users can also map incoming parameters to a different parameter. Wordpress has a couple of <a href="https://codex.wordpress.org/Reserved_Terms" target="_blank">reserved words</a> which can\'t be used in urls. So if you want to pass the parameter "name" (reserved word) to your iframe you can do a mapping with "ainame|name". Than the parameter "ainame=hallo" will be passed as "name=hallo" to the iframe. This can also be used if the parameters of the 2 pages do not match. Several mappings can be separated with \',\' like normal parameters. In e.g. TinyWebGallery this enables you to jump directly to an album or image although TinyWebGallery is included in an iframe. If your parameters contain [] you can use {{ }} which will internally replaced. Since Wordpress 5.5 the "page" parameter also causes a 301 redirect. If you still like/need to use it. Go to "Options -> Technical options -> Fix WordPress 5.5 page parameter change" and set it to "Yes". Shortcode attribute: url_forward_parameter=""', 'advanced-iframe'));
if ($evanto || $isDemo) {        
    printTextInput(true, $devOptions, __('Map parameter to url/ Use parameter value as iframe url', 'advanced-iframe'), 'map_parameter_to_url', __('You can map an url parameter value pair to an url or pass the url directly which should be opened in the iframe. If you e.g. have a page with the iframe and you like to have different content in the iframe depending on an url parameter than this is the setting you have to use. You have to specify this setting in the following syntax "parameter|value|url" e.g. "show|1|https://www.tinywebgallery.com". If you than open the parent page with ?show=1 than https://www.tinywebgallery.com is opened inside the iframe. You can also specify several mappings by separating them by \',\'.<br />GET and POST parameters are supported!<br />You can also only specify 1 parameter here! The value of this parameter is than used as iframe url. e.g. show=http%3A%2F%2Fwww.tinywebgallery.com%3Fparam=value. You need to encode the url if you pass it in the url. Especially ? (%3F) and & (%26)! Please note that because of security reason only whitelisted chars [a-zA-Z0-9/:?&.] are allowed. Encoded parameters in the passed urls are not supported because all input is decoded and checked. See the next setting how to update this url dynamically. If no parameter/value pair does match the normal src attribute of the configuration is used. Shortcode attribute: map_parameter_to_url=""', 'advanced-iframe'));
    printSameRemote($devOptions, __('i-20-Add iframe URL as param', 'advanced-iframe'), 'add_iframe_url_as_param', __('With this setting the URL of the iframe is added as parameter to the current URL. The parameter can be defined in the setting before. If this is not set the default "iframe" is used (be aware of <a href="https://codex.wordpress.org/Reserved_Terms" target="_blank">reserved words</a>!). This feature is only enabled for the remote domain if you also enable auto height for remote domains because the URL of the iframe is sent with the same request. This enables bookmarkable URLs where you go directly to the last page in the iframe. The history api which enables the change of the URL is only supported by modern browsers. For older browsers the URL is simply not changed. See https://caniuse.com/?search=pushstate. Shortcode attribute: add_iframe_url_as_param="same", add_iframe_url_as_param="remote" or add_iframe_url_as_param="false" ', 'advanced-iframe'),'//www.tinywebgallery.com/blog/advanced-iframe/advanced-iframe-pro-demo/add-iframe-url-to-parent',true);
    
	printTrueFalse(true, $devOptions, __('i-40-Add params directly', 'advanced-iframe'), 'add_iframe_url_as_param_direct', __('Enabling this does not add the full iframe URL but only the parameters of the iframe. You need also to configure either "URL forward parameters" or use URL placeholders (see basic tab). This works on the <a target="_blank"  href="//www.tinywebgallery.com/blog/advanced-iframe/advanced-iframe-pro-demo/add-iframe-params-to-parent">same</a> and for <a target="_blank"  href="//www.tinywebgallery.com/blog/advanced-iframe/advanced-iframe-pro-demo/add-iframe-params-to-parent-remote">remote</a> domains. Please go there for a detailed description. Shortcode attribute: add_iframe_url_as_param_direct="true" or add_iframe_url_as_param_direct="false" ', 'advanced-iframe'), 'false', '//www.tinywebgallery.com/blog/advanced-iframe/advanced-iframe-pro-demo/add-iframe-params-to-parent', false);
	
	
    // $cleanHashButton = 'Delete the hash/URL cache by clicking <a class="confirmation-hash post" href="options-general.php?page=advanced-iframe.php&remove-url-hash-cache=true">here</a>. Deleting the cache can be useful during setup and if you have changed URLs. It should not be done afterwards if defaults ids are used for the URLs as they are generated in order and already bookmarked URLs might change.';
   
    $cleanHashButton = "";
	
	printTextInput(true,$devOptions, __('i-40-Prefix/id/urlrewrite for iframe URL', 'advanced-iframe'), 'add_iframe_url_as_param_prefix', __('With this setting you can define a prefix which all (most) of your pages in the iframe have. This prefix is than not added to the URL but added internally. This does reduce the length of the parameter value. The prefix has to be without http:// or https://. So a prefix could be www.tinywebgallery.com/examples/. If your pages are e.g. at www.tinywebgallery.com/examples/example1.htm and www.tinywebgallery.com/examples/example2.htm than the page parameter is only page=example2.htm and not page=www.tinywebgallery.com%2Fexamples%2Fexample2.htm.<br> <br>Additionally this setting has 2 special keywords: "hash" and "hashrewrite". If you enter "hash" then the URL is stored in the database and only an id is used. So the URL is extended by e.g. ?iframe=4. "hashrewrite" additionally does a URL rewrite. So the URL is extended by /iframe/4. The parameter is set at "Map parameter to URL" and is "iframe" by default. IMPORTANT: if you want to use "hashrewrite" you need to set this and "Map parameter to URL" here as well (and in the shortcode) because in the shortcode alone it is loaded too late! As other plugins also can rewrite the URL please check if they are compatible! First use "hash" and then try "hashrewrite"! "hashrewrite" is only possible if you do not use "plain" as "Permalink Settings" (pagename is the one tested the most!). Also it takes a little bit until the id is read from the database. So the URL is changed with a small delay! See the demos for a working examples. Shortcode attribute: add_iframe_url_as_param_prefix=""', 'advanced-iframe') . $cleanHashButton,'text','//www.tinywebgallery.com/blog/advanced-iframe/advanced-iframe-pro-demo/add-iframe-url-to-parent', false);
    
	printSameRemote($devOptions, __('Use the iframe title for the parent', 'advanced-iframe'), 'use_iframe_title_for_parent', __('Enabling this does set the title of the iframe on the parent page once available. This feature works on the same and the remote domain. The original title is shown until the new one is loaded. The original title cannot be hidden as this would be a global setting and also affecting all pages of a website. Shortcode attribute: use_iframe_title_for_parent="same". For the external workaround you need to set it to "Remote Domain" or use use_iframe_title_for_parent="remote" in the ai_external.js settings.', 'advanced-iframe'), '//www.tinywebgallery.com/blog/advanced-iframe/advanced-iframe-pro-demo/add-iframe-url-to-parent', true);
	
}   
echo '</table>';

aiPostboxClose();
?>