# inject-some

inject-some is Javascript helper library to assist in injecting scripts, styles and html from userscripts. Tested with the Greasemonkey extension on Firefox and with the TamperMonkey extension on Google Chrome and Microsoft Edge.

## Examples
These examples show how to inject additional javascript, html and/or css from the user.js file itself or from resource files, when creating userscripts for Tampermonkey or Greasemonkey.

### script injects itself.
The 'jira-issue-clone' user script for JIRA is an example of how a user script can inject itself into a page:

https://github.com/BartJolling/jira-issue-clone/blob/master/jira-issue-clone.user.js

The `scriptToInject( )` function is serialized to a string and then embedded in a `<script>` tag. Note that in the example below, `window.AJS.$` is the jQuery namespace in JIRA which is the target application for jira-issue-clone.

```javascript
// ==UserScript==
// @require     https://raw.githubusercontent.com/BartJolling/inject-some/master/inject-some.js
// @grant       none
// @run-at      document-end
// ==/UserScript==

/**
 * Script to be injected directly into the page
 */
var scriptToInject = function ($) {

  //... snipped ...

};

/**
 *Main function to inject the code of the jira-issue-clone extension into the JIRA website
 */
(function (callback) {
    'use strict';
    try {
        var scripts = "(" + callback.toString() + ")(window.AJS.$);";
        injectsome.content.script(scripts);
    } catch (err) {
        console.log('[jira-issue-clone] ' + err.message);
    }
})(scriptToInject);
```

### inject scripts from other files.
The 'delegarity' user script for the Clarity web application has examples on inserting additional content, taken from resource files included in the 'delegarity' script, into the target page:

https://github.com/BartJolling/delegarity/blob/master/delegarity.user.js

Note that the example below uses the `GM_getResourceText` extension method to load 'content' that's included with the extension. You could just as well load literal HTML, CSS or javascript or use the 'links' API to insert references to external files.

```javascript
// ==UserScript==
// @require      https://raw.githubusercontent.com/BartJolling/inject-some/master/inject-some.js
// @resource     delegaritycss    delegarity.css
// @resource     delegaritycorejs delegarity.core.js
// @resource     timesheetsjs     timeadmin.timesheet.js
// @resource     timesheetshtml   timeadmin.timesheet.html
// @run-at       document-idle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';
    
    //... snipped ...
    
    //inject css and html templates
    injectsome.content.css(GM_getResourceText("delegaritycss", "delegaritycss"));
    injectsome.content.html(GM_getResourceText("timesheetshtml"));

    //inject delegarity scripts
    injectsome.content.script(GM_getResourceText("delegaritycorejs"), "delegaritycorejs");
    injectsome.content.script(GM_getResourceText("timesheetsjs"), "timesheetsjs");
    
    //... snipped ...
    
})();    
```


## content API
The `injectsome.content` API allows injecting the full literal content into a target page.

### injectsome.content.script (jsContent, scriptId)
Injects a block of javascript into a new script tag in the HEAD of a document.
- {string} jsContent - javascript code to inject.
- {string} scriptId - Id of the script tag that will be injected. Used for duplicate check.

### injectsome.content.html (htmlContent)
Appends a block of HTML to the body tag.
- {string} htmlContent - HTML to inject.

### injectsome.content.css (cssContent, cssId)
Appends a block of css to the head tag.
- {string} cssContent - CSS to inject.
- {string} cssId - Id of the style tag that will be injected. Used for duplicate check.

## links API
The `injectsome.links` API allows injecting links to script or css files into a target page.

### injectsome.links.script (url, mimetype)
Injects a link to a javascript file in the HEAD of a document.
- {string} url - location of the javascript file to inject.
- {string} mimetype - sets the value of the 'type' attribute of the script tag.

### injectsome.links.stylesheet (url, mimetype)		
Injects a link to a stylesheet in the HEAD of a document.
- {string} url - location of the stylesheet file to inject.
- {string} mimetype - sets the value of the 'type' attribute of the script tag.
