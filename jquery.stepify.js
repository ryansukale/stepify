(function ($){

	console.log('Init stepify');
	
	$.fn.stepify = function(options){
		
		//Options
		var defaultOptions = {
			distribution : [this.length/2, this.length-this.length/2], //By default, divide the elements into two parts.
			stepContainerClass : 'stepify-container',
			nextBtnClass : 'next-step',
			prevBtnClass : 'prev-step',
			nextBtnText : 'Next &gt;',
			prevBtnText : '&lt; Prev',
			submitBtn : {
				text:'Submit',
				cssclass:'btn-submit'
			},
			navBtnContainerClass : 'nav-btn-container',
			mainContainerClass : 'stepify-elem-container',
			btnAlign:'center', //Specified positioning of the buttons. Accepts values 'left', 'right', and 'center'.
			prevHooks : {}, //An map of functions that you want to get executed on clicking prev for a step.
			nextHooks : {}, //An map of functions that you want to get executed on clicking next for a step
		}
		
		function bindHooks(){
		
			var prevHooks = settings.prevHooks;
			var nextHooks = settings.nextHooks;
			
			var $steps = $('.'+settings.stepContainerClass);
			
			if(!_.isEmpty(prevHooks)){
				
				$.each(prevHooks, function(stepId, hookFunctions){
					$steps.eq(stepId).data('hooks-prev',hookFunctions);
				});
				
			}
			
			if(!_.isEmpty(nextHooks)){
				
				$.each(nextHooks, function(stepId, hookFunctions){
					$steps.eq(stepId).data('hooks-next',hookFunctions);
				});
				
			}
		
		}
		
		
		function bindHandlers(){
		
			$('.'+settings.nextBtnClass).on('click',function(event){
				var $this = $(this);
				var $target = $(event.target);
				
				var $sequenceStep = $this.parents('.'+settings.stepContainerClass);
				
				var hooks = $sequenceStep.data('hooks-next');
				
				var proceed = true;
				
				if(hooks){
				
					$.each(hooks, function(index, hookFunction){
						proceed = hookFunction($sequenceStep);
						
						//This will cause further methods to stop
						//executing if a method in the chain fails
						//Useful for validation scenarios
						return proceed;
						
					});
				}
				
				if(proceed){
					$sequenceStep.animate({'opacity':0},500,function(){
						$sequenceStep.addClass('hidden')
							.css({'opacity':1})
							.next().removeClass('hidden');
					});
				}
				
				
				//Need to figure out whether scroll to top is required or not
				//$("html, body").animate({ scrollTop: 0 }, "fast");
				
				
			
			});
		
			$('.'+settings.prevBtnClass).on('click',function(event){
				var $this = $(this);
				var $target = $(event.target);
				
				var $sequenceStep = $this.parents('.'+settings.stepContainerClass);
				
				var hooks = $sequenceStep.data('hooks-prev');
				
				var proceed = true;
				
				if(hooks){
					$.each(hooks, function(index, hookFunction){
					
						proceed = hookFunction($sequenceStep);
						return proceed;
						
					});
				}
				
				if(proceed){
					$sequenceStep.animate({'opacity':0},500,function(){
						$sequenceStep.addClass('hidden')
							.css({'opacity':1})
							.prev().removeClass('hidden');					
					});
				}
				
				//Need to figure out whether scroll to top is required or not
				//$("html, body").animate({ scrollTop: 0 }, "fast");
				
				
			});
		}
		
		
		var settings = $.extend(defaultOptions, options);
		
		var stepContainerStr = '<div class="'+settings.stepContainerClass+'"></div>';
		var btnContainerStr = '<div class="'+settings.navBtnContainerClass+'"></div>';
		
		var prevBtnStr = '<div class="btn '+settings.prevBtnClass+'">'+settings.prevBtnText+'</div>';
		var nextBtnStr = '<div class="btn '+settings.nextBtnClass+'">'+settings.nextBtnText+'</div>';
		var submitBtnStr = '<input type="submit" class="btn btn-info '+settings.submitBtn.cssClass+'" value="'+settings.submitBtn.text+'" ></input>';
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
					
					//This is the last step in the process
					$stepContainer.children().find('.'+settings.nextBtnClass).remove();
					$stepContainer.children('.nav-btn-container').append(submitBtnStr);
					
				}
			}
			
			//Set the id of the stepContainer
			$stepContainer.attr('id','step-'+stepContainers);
			stepContainers = stepContainers+1;
			
			$parent.append($stepContainer);
			
		});
		
		$('.'+settings.stepContainerClass).addClass('hidden').eq(0).removeClass('hidden');
		
		$('.nav-btn-container','.'+settings.stepContainerClass).addClass('stepify-ba-'+settings.btnAlign);
		
		bindHandlers();
		bindHooks();
		
		
	}
	
	
})(jQuery);