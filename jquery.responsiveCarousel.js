;(function($) {
	$.fn.gelEvoCarousel = function () {     
		//warp UL in correct mask wrappers
		this.wrap("<div class='carousel'><div class='carousel-inner'>");

		//Carousels
		var self = this,
			itemWidth = $("li",self).outerWidth( true ),
			carouselWidth = itemWidth * ($("li.visible",self).size() + 1);

		//set carousel width first here
		self.css({width:carouselWidth});	

		var	visibleCarouselWidth = self.closest(".carousel-inner").innerWidth(),
			itemsPerPage = Math.floor(visibleCarouselWidth/itemWidth),
			pageWidth = itemsPerPage * itemWidth,
			pages = Math.round(carouselWidth/pageWidth),
			currentPage = 0;

		//append pagination and next prev controls
		//do it here
		self.parent().append("<span class='previous'></span><span class='next'></span>");
		self.parent().parent().prepend("<ul class='pagination'></ul>");
		
		//hide at first because we always start on page 1 in this plugin
		$('.previous',self.parent()).addClass('disabled');

		//add pagination
		for(var i=0; i<pages;i++){
			if(i==0){
				$(".pagination",self.parent().parent()).append("<li class='active' data-index='"+i+"'></li>");
			}else{
				$(".pagination",self.parent().parent()).append("<li data-index='"+i+"'></li>");
			}
		}

		function reinitializeCarousel(){
			itemWidth = $("li",self).outerWidth( true );
			carouselWidth = itemWidth * ($("li.visible",self).size() + 1);
			self.css({width:carouselWidth});
			visibleCarouselWidth = self.closest(".carousel-inner").innerWidth();
			itemsPerPage = Math.floor(visibleCarouselWidth/itemWidth);
			pageWidth = itemsPerPage * itemWidth;
			pages = Math.round(carouselWidth/pageWidth);
			
			if(pages <= 1){
				$('.next',self.parent()).addClass('disabled');
				$('.previous',self.parent()).addClass('disabled');
			}else{
				$('.next',self.parent()).removeClass('disabled');
				$('.previous',self.parent()).removeClass('disabled');
			}

			//disable previous because it ALWAYS goes to first page on re init
			$('.previous').addClass('disabled');

			currentPage = 0;

			$(".pagination li").remove();
			for(var i=0; i<pages;i++){
				if(i==0){
				$(".pagination").append("<li class='active' data-index='"+i+"'></li>");
				}else{
					$(".pagination").append("<li data-index='"+i+"'></li>");
				}
			}

			//move carousel to correct paged posisiton
			$(".carousel-inner ul").animate({left:-(currentPage*pageWidth)},'slow');
		}

		//next prev functions
		$('.next',self.parent()).click(function(){
			if(currentPage < pages-1){
				currentPage++;
			}
			console.log("currentPage: " + currentPage);
			//move carousel to correct paged posisiton
			$(self).animate({left:-(currentPage*pageWidth)},'slow')

			//update pagingation
			$('.pagination li.active',self.parent().parent()).removeClass('active');
			$('.pagination li:nth-child('+ (currentPage + 1) +')',self.parent().parent()).addClass('active');

			//if on first page and theres more than one page
			if(currentPage == 0 && pages > 1){
				$('.next',self.parent()).removeClass('disabled');
				$('.previous',self.parent()).addClass('disabled');
			}
			//if not first page and theres more than one page
			if(currentPage != 0 && pages > 1){
				$('.next',self.parent()).removeClass('disabled');
				$('.previous',self.parent()).removeClass('disabled');
			}
			//if at last page and theres more than one page
			if(currentPage == pages-1 && pages > 1){
				$('.next',self.parent()).addClass('disabled');
				$('.previous',self.parent()).removeClass('disabled');
			}

		});

		$('.previous',self.parent()).click(function(){
			if(currentPage > 0){
				currentPage--;
			}
			console.log("currentPage: " + currentPage);

			//move carousel to correct paged posisiton
			self.animate({left:-(currentPage*pageWidth)},'slow');

			//update pagingation
			$('.pagination li.active',self.parent().parent()).removeClass('active');
			$('.pagination li:nth-child('+ (currentPage + 1) +')',self.parent().parent()).addClass('active');

			//if on first page and theres more than one page
			if(currentPage == 0 && pages > 1){
				$('.next',self.parent()).removeClass('disabled');
				$('.previous',self.parent()).addClass('disabled');
			}
			//if not first page and theres more than one page
			if(currentPage != 0 && pages > 1){
				$('.next',self.parent()).removeClass('disabled');
				$('.previous',self.parent()).removeClass('disabled');
			}
			//if at last page and theres more than one page
			if(currentPage == pages-1 && pages > 1){
				$('.next',self.parent()).addClass('disabled');
				$('.previous',self.parent()).removeClass('disabled');
			}		
			
		});

		$(".pagination li",self.parent().parent()).click(function(){
			currentPage = $(this).attr('data-index');
			$('.pagination li.active',self.parent().parent()).removeClass('active');
			$(this).addClass('active');
			self.animate({left:-(currentPage*pageWidth)},'slow');
			//if on first page and theres more than one page
			if(currentPage == 0 && pages > 1){
				$('.next',self.parent().parent()).removeClass('disabled');
				$('.previous',self.parent().parent()).addClass('disabled');
			}
			//if not first page and theres more than one page
			if(currentPage != 0 && pages > 1){
				$('.next',self.parent().parent()).removeClass('disabled');
				$('.previous',self.parent().parent()).removeClass('disabled');
			}
			//if at last page and theres more than one page
			if(currentPage == pages-1 && pages > 1){
				$('.next',self.parent().parent()).addClass('disabled');
				$('.previous',self.parent().parent()).removeClass('disabled');
			}
		});

	};
})(jQuery);