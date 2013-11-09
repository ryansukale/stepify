(function ($){

	console.log('Init stepify');
	
	$.fn.stepify = function(options){
		
		//Options
		var defaultOptions = {
			distribution : [this.length/2, this.length-this.length/2], //By default, divide the elements into two parts.
			stepContainerClass : 'stepify-container',
			nextBtn : {
				text : 'Next &gt;',
				cssClass : 'next-step'
			},
			prevBtn : {
				text : '&lt; Prev',
				cssClass : 'prev-step'
			},
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
		
			var prevHooks = opt.prevHooks;
			var nextHooks = opt.nextHooks;
			
			var $steps = $('.'+opt.stepContainerClass);
			
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
		
			$('.'+opt.nextBtn.cssClass).on('click',function(event){
				var $this = $(this);
				var $target = $(event.target);
				
				var $sequenceStep = $this.parents('.'+opt.stepContainerClass);
				
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
		
			$('.'+opt.prevBtn.cssClass).on('click',function(event){
				var $this = $(this);
				var $target = $(event.target);
				
				var $sequenceStep = $this.parents('.'+opt.stepContainerClass);
				
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
		
		
		var opt = $.extend(defaultOptions, options);
		
		var stepContainerStr = '<div class="'+opt.stepContainerClass+'"></div>';
		var btnContainerStr = '<div class="'+opt.navBtnContainerClass+'"></div>';
		
		var prevBtnStr = '<div class="btn '+opt.prevBtn.cssClass+'">'+opt.prevBtn.text+'</div>';
		var nextBtnStr = '<div class="btn '+opt.nextBtn.cssClass+'">'+opt.nextBtn.text+'</div>';
		var submitBtnStr = '<input type="submit" class="btn btn-info '+opt.submitBtn.cssClass+'" value="'+opt.submitBtn.text+'" ></input>';
		var divStr = '<div></div>';
		
		var stepContainers = 0;
		var $originalSet = this;
		var $parent = $originalSet.parent();
		
		var currentElement = 0;
		
		$.each(opt.distribution, function(index, numberOfElements){
			
			var $btnContainer = $(btnContainerStr);
			var $stepContainer = $(stepContainerStr);
			var $div = $(divStr);
			
			$div.addClass(opt.mainContainerClass);
			$btnContainer.append(prevBtnStr + nextBtnStr);
			
			for(var i=0;i<numberOfElements;i++){
				$div.append($originalSet[currentElement]);
				currentElement++;
			}
			
			$stepContainer.append($div);
			$stepContainer.append($btnContainer);
			
			console.log(index);
			
			if(index===0){
				$stepContainer.children().find('.'+opt.prevBtn.csslass).remove();
			}else{
				if(index===opt.distribution.length-1){
					
					//This is the last step in the process
					$stepContainer.children().find('.'+opt.nextBtn.cssClass).remove();
					$stepContainer.children('.nav-btn-container').append(submitBtnStr);
					
				}
			}
			
			//Set the id of the stepContainer
			$stepContainer.attr('id','step-'+stepContainers);
			stepContainers = stepContainers+1;
			
			$parent.append($stepContainer);
			
		});
		
		$('.'+opt.stepContainerClass).addClass('hidden').eq(0).removeClass('hidden');
		
		$('.nav-btn-container','.'+opt.stepContainerClass).addClass('stepify-ba-'+opt.btnAlign);
		
		bindHandlers();
		bindHooks();
		
		
	}
	
	
})(jQuery);