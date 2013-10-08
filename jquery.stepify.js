(function ($){

	console.log('Init stepify');
	
	$.fn.stepify = function(options){
		
		//Options
		var defaultOptions = {
			distribution : [this.length/2, this.length-this.length/2], //By default, divide the elements into two parts.
			stepContainerClass : 'step-container',
			nextBtnClass : 'next-step btn',
			prevBtnClass : 'prev-step btn',
			nextBtnText : 'Next &gt;',
			prevBtnText : '&lt; Prev',
			navBtnContainerClass : 'nav-btn-container',
			mainContainerClass : 'stepify'
		}
		
		var settings = $.extend(defaultOptions, options);
		
		var stepContainerStr = '<div class="'+settings.stepContainerClass+'"></div>';
		var btnContainerStr = '<div class="'+settings.navBtnContainerClass+'"></div>';
		
		var prevBtnStr = '<div class="'+settings.prevBtnClass+'">'+settings.prevBtnText+'</div>';
		var nextBtnStr = '<div class="'+settings.nextBtnClass+'">'+settings.nextBtnText+'</div>';
		
		var stepContainers = 0;
		
		$.each(settings.distribution, function(index, elem){
			
			var $btnContainer = $(btnContainerStr);
			var $stepContainer = $(stepContainerStr);
			
			$btnContainer.append(prevBtnStr + nextBtnStr);
			$stepContainer.append($btnContainer);
			
			//Set the id of the stepContainer
			$stepContainer.attr('id','step-'+stepContainers);
			stepContainers = stepContainers+1;
			
			console.log($stepContainer);
			
		});
		
	}
	
	
})(jQuery);