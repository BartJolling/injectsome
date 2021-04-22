var injectsome = (function (injectsomeInstance, undefined) {

	/**
	 * Contains functions to inject blocks of content into the HTML page
	 */
	injectsomeInstance.content = (function(contentInstance) {
		/**
		 * Injects a block of javascript into a new script tag in the HEAD of a document.
		 * @param {string} jsContent - javascript code to inject.
		 * @param {string} scriptId - Id of the script tag that will be injected.
		 */
		contentInstance.script = function(jsContent, scriptId) {
			var existingElement = document.getElementById(scriptId);

			if(existingElement !== null && existingElement !== undefined) {
				console.log("[injectsome][content] Element with id " + scriptId + " already exists. Skipping.");
				return;
			}

			var scriptElement = document.createElement('script');
			scriptElement.setAttribute("type", "text/javascript");
			scriptElement.setAttribute("id", scriptId);
			scriptElement.innerHTML = jsContent;
			document.head.appendChild(scriptElement);
		}

		/**
		 * Appends a block of HTML to the body tag
		 * @param {string} htmlContent - HTML to inject.
		 */
		contentInstance.html = function(htmlContent) {
			var div = document.createElement('div');
			div.innerHTML = htmlContent;

			while (div.children.length > 0) {
				document.body.appendChild(div.children[0]);
			}
		}

		/**
		 * Appends a block of css to the head tag
		 * @param {string} cssContent - CSS to inject.
		 * @param {string} cssId - Id of the style tag that will be injected.
		 */
		contentInstance.css = function(cssContent, cssId) {
			var existingElement = document.getElementById(cssId);

			if(existingElement !== null && existingElement !== undefined) {
				console.log("[injectsome][content] Element with id " + cssId + " already exists. Skipping.");
				return;
			}			

			var styleElement = document.createElement('style');
			styleElement.setAttribute("id", cssId);
			styleElement.innerHTML = cssContent;
			document.head.appendChild(styleElement);
		}		

		return contentInstance;
	}(injectsomeInstance.content || {}));

	/**
	 * Contains functions to inject links to external content into the HTML page
	 */
	injectsomeInstance.links = (function(linksInstance) {

		/**
		 * Injects a link to a javascript file in the HEAD of a document.
		 * @param {string} url - location of the javascript file to inject.
		 */
		linksInstance.script = function(url, mimetype) {
			var scriptElement = document.createElement('script');
			scriptElement.setAttribute("type", mimetype);
			scriptElement.setAttribute("src", url);

			document.head.appendChild(scriptElement);
		};

		/**
		 * Injects a link to a stylesheet in the HEAD of a document.
		 * @param {string} url - location of the javascript file to inject.
		 */
		linksInstance.stylesheet = function(url, mimetype) {
			var linkElement = document.createElement("link");
			linkElement.setAttribute("rel", "stylesheet");
			linkElement.setAttribute("type", mimetype);
			linkElement.setAttribute("href", url);

			document.head.appendChild(linkElement);
		};
		return linksInstance;

	}(injectsomeInstance.links || {}));

	return injectsomeInstance;
}(injectsome || {}));
