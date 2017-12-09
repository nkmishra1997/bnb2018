( function ( $ ) {
    "use strict";

	$(function() {
		mobileSearch();
		bottomNavBorder();
		navMoreBox();
		count();
		closeCard();
		ticketsBox();
		employeesBox();
		taskBox();
		serverBox();
		favoritesBox();
		similarProfiles();
		userSkills();
		triggerAlert();
		triggerAnimations();
	});

	function mobileSearch() {
		//Show and hide mobile serach input
		$('.mobile-search-trigger').on('click', function(){
	        $('.mobile-search-active').css("display", "block");
	        return false;
	    });

	    $('.close').on('click', function(){
	        $('.mobile-search-active').css("display", "none");
	        return false;
	    });
	}

	function bottomNavBorder() {
		//Toggle .current class 
		$('.nav-dash, .nav-inbox, .nav-myProfile, .nav-calendar, .nav-users, .nav-more').on('mouseover', function(){
			$(this).addClass('currentPageHover');
		});

		$('.nav-dash, .nav-inbox, .nav-myProfile, .nav-calendar, .nav-users, .nav-more').on('mouseout', function(){
			$(this).removeClass('currentPageHover');
		});
	}

	function navMoreBox() {
		//Show and hide box with more pages
		$('.nav-more').on('click', function(){
	        $('#box').css("display", "block");
	        return false;
	    });

		$(document).on('click',function(e) {
		    if (e.target.id !== 'box' && !$('#box').find(e.target).length) {
		        $("#box").hide();
		    }
		});
	}

	function count() {
		$('.count').each(function () {
		    $(this).prop('Counter',0).animate({
		        Counter: $(this).text()
		    }, {
		        duration: 1500,
		        easing: 'swing',
		        step: function (now) {
		            $(this).text(Math.ceil(now));
		        }
		    });
		});	
	}

	function closeCard() {
		//Closing Cards
		$('.salesBox').on('click', function(){
			$('.card-sales').fadeOut();
		});

		$('.rateBox').on('click', function(){
			$('.card-stats').fadeOut();
		});

		$('.usersBox').on('click', function(){
			$('.card-users').fadeOut();
		});

		$('.visitsBox').on('click', function(){
			$('.card-visits').fadeOut();
		});

		$('.chartBox').on('click', function(){
			$('#chartBox').fadeOut();
		});

		$('.closeTickets').on('click', function(){
			$('.ticketBox').fadeOut();
		});

		$('.closeEmoloyess').on('click', function(){
			$('.employees').fadeOut();
		});

		$('.tasksBox').on('click', function(){
			$('.tasks').fadeOut();
		});

		$('.closeServer').on('click', function(){
			$('.server-load').fadeOut();
		});
		$('.closeModal').on('click', function(){
			$('.modal').fadeOut();
		});
		$('.closeProfile').on('click', function(){
			$('.profiles').fadeOut();
		});
		$('.users-close').on('click', function(){
			$(this).closest('div').fadeOut(500, function (){
				$(this).remove();
			});
		});
	}

	function ticketsBox() {
		$('.hideTickets').on('click', function(){
			$(".ticket-body").fadeToggle();
		});

		//Remove Ticket
		$('.ticketBox').on("click", ".deleteTicket", function(event){
			$(this).closest('tr').fadeOut(500, function (){
				$(this).remove();
			});
			event.stopPropagation();
		});
	 
	 	//Close ticket 
		$('.closeTicket').on('click', function(){
			$(this).closest('td')
			.children('div:nth-child(2)')
			.hide()
			.html('<h4><span class="ticket-closed">Closed</span></h4>')
			.fadeIn(600);
		});
	}

	function employeesBox() {
		$('.hideEmoloye').on('click', function(){
			$("#employe").fadeToggle();
		});
	}

	function taskBox() {
		// Check off Specific Task By Clicking
		$('#task-list').on("click", "li", function() {
			$(this).toggleClass("completed");
		});

		//Remove Task
		$('#task-list').on("click", "span", function(event){
			$(this).parent().fadeOut(500, function (){
				$(this).remove();
			});
			event.stopPropagation();
		});

		$("input[type='text'").keypress(function(event){
			if(event.which === 13){
				//grabing new task text from input
				var taskText = $(this).val();
				//crate a new li and add to ul
				$('#task-list').append("<li><span><i class='fa fa-trash'></i></span> " + taskText + "</li>");
			}
		});

		$(".hideTasks").on('click', function(){
			$("#task").fadeToggle();
		});
	}

	function serverBox() {
		$(".hideServer").on('click', function(){
			$(".server-items").fadeToggle();
		});	
	}

	function favoritesBox() {
		$(".fav").on('click', function(){
			//Check if element has the class .favorites-uncheck
			if( $(this).hasClass("favorites-uncheck")) {

				$(this).removeClass('favorites-uncheck')
					   .addClass('favorites-check')
					   .html('<i class="fa fa-heart" aria-hidden="true"></i>');
			
			//Check if element has the class .favorites-check
			} else if ( $(this).hasClass("favorites-check")) {
				
				$(this).removeClass('favorites-check')
					   .addClass('favorites-uncheck')
					   .html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
			}
			//Count how many favorites is selected
			var numFav = $('.favorites-check').length
			$('#fav-num').css("color", "#fff").html('(' + numFav + ')');
		});
	}

	function similarProfiles() {
		$('.hideProfile').on('click', function(){
			$("#similarProfile").fadeToggle();
		});
	}

	function userSkills() {
		//Grab value from input and add
		$('#skill').keypress(function (e) {
		  if (e.which === 13) {
			//Get
			var s = $('#skill').val();
			if(s !== '') {
				$('.skills').append('<span>' + s + ' <i class="skill add-skill fa fa-times" aria-hidden="true"></i></span>');	   
			}

		  }
		  $('.skill').on('click', function() {
			$(this).parent().remove();
			});
		});

	}

	function triggerAlert() {
		//On click trigger alert message
		$('.btn-trigger').on('click', function(){
			$('.alert-message').html('<div class="alert alert-success alert-dismissable animated swing"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Indicates a successful or positive action.</div>');
	    });
	}

	function triggerAnimations() {
		$('.animation-btn').on('click', function(){
			var button_text = $(this).text();
			$(this).parent().parent().parent().find('img').addClass(button_text)
				.delay(1500)
				.queue(function( next ){
				    $(this).removeClass(button_text); 
				    next();
				});
	    });
	}

})(jQuery);





