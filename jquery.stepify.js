(function ($){

	console.log('Init stepify');
	
	$.fn.stepify = function(options){
		
		//Options
		var defaultOptions = {
			distribution : [this.length/2, this.length-this.length/2], //By default, divide the elements into two parts.
			stepContainerClass : 'step-container',
			nextBtnClass : 'next-step',
			prevBtnClass : 'prev-step',
			nextBtnText : 'Next &gt;',
			prevBtnText : '&lt; Prev',
			navBtnContainerClass : 'nav-btn-container',
			mainContainerClass : 'stepify'
		}
		
		var settings = $.extend(defaultOptions, options);
		
		var stepContainerStr = '<div class="'+settings.stepContainerClass+'"></div>';
		var btnContainerStr = '<div class="'+settings.navBtnContainerClass+'"></div>';
		
		var prevBtnStr = '<div class="btn '+settings.prevBtnClass+'">'+settings.prevBtnText+'</div>';
		var nextBtnStr = '<div class="btn '+settings.nextBtnClass+'">'+settings.nextBtnText+'</div>';
		var divStr = '<div></div>';
		
		var stepContainers = 0;
		var $originalSet = this;
		var $parent = $originalSet.parent();
		
		var currentElement = 0;
		
		$.each(settings.distribution, function(index, numberOfElements){
			
			var $btnContainer = $(btnContainerStr);
			var $stepContainer = $(stepContainerStr);
			var $div = $(divStr);
			
			$div.addClass(settings.mainContainerClass);
			$btnContainer.append(prevBtnStr + nextBtnStr);
			
			for(var i=0;i<numberOfElements;i++){
				$div.append($originalSet[currentElement]);
				currentElement++;
			}
			
			$stepContainer.append($div);
			$stepContainer.append($btnContainer);
			
			console.log(index);
			
			if(index===0){
				$stepContainer.children().find('.'+settings.prevBtnClass).remove();
			}else{
				if(index===settings.distribution.length-1){
					$stepContainer.children().find('.'+settings.nextBtnClass).remove();
				}
			}
			
			//Set the id of the stepContainer
			$stepContainer.attr('id','step-'+stepContainers);
			stepContainers = stepContainers+1;
			
			$parent.append($stepContainer);
			
		});
		
		$('.'+settings.stepContainerClass).addClass('hidden').eq(0).removeClass('hidden');
		
		
	}
	
	
})(jQuery);