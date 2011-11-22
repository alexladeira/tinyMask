/*
Tiny Mask plugin for jQuery
http://github.com/alexladeira/tinyMask
Copyright (c) 2011 Alexandre Ladeira
Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
Version: 0.1
*/
(function($) {
	$(function() {
		function isNumber(code){
			return (code > 47 && code < 58) || (code > 95 && code < 106);
		}

		return $(".tinyMask").each(function() {
			$(this).data("mask", $(this).attr("title"));
			$(this).attr("title", "");
			$(this).keyup(function(event) {
				var keycode = event.keyCode ? event.keyCode : event.which;
				var mask = $(this).data("mask");
				var maskArray = new Array();
				var idx = 0;
				for (var i = 0; i < mask.length; i++) {
					if (mask.charAt(i) != "9") {
						maskArray[idx] = i;
						idx++;
					}
				}

				for (var j = 0; j < maskArray.length; j++) {
					if ($(this).val().length == maskArray[j]) {
						if (keycode != 8) {
							$(this).val($(this).val() + mask.charAt(maskArray[j]));
						} else {  // backspace
							$(this).val($(this).val().substring(0, $(this).val().length - 1));
						}
					}
				}
			}).keydown(function(event) {
				var keycode = event.keyCode ? event.keyCode : event.which;
				if ($(this).val().length == $(this).data("mask").length) { // control mask length
					if (keycode != 8) { // backspace
						event.preventDefault();
					}
				} else if (!isNumber(keycode)) { // control if is a valid character
					if (keycode != 8) { // backspace
						event.preventDefault();
					}
				}
			});
		});
	});
})(jQuery);
