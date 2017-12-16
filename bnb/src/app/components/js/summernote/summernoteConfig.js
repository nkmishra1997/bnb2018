( function ( $ ) {
    "use strict";

	$(document).ready(function() {

		$('#summernote').summernote({
		  height: 150,                 // set editor height
		  minHeight: 150,             // set minimum height of editor
		  maxHeight: 200,             // set maximum height of editor
		  focus: true                  // set focus to editable area after initializing summernote
		});

	});

})(jQuery);