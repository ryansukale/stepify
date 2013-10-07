(function ($){

	console.log('Init stepify');
	
	$.fn.stepify = function(options){
		
		//Options
		var defaultOptions = {
			distribution : [this.length/2, this.length-this.length/2] //By default, divide into two parts.
		}
		
		var settings = $.extend(defaultOptions, options);
		
		
	}
	
	
})(jQuery);