$(document).ready(function() {


/* initialize the external events
	-----------------------------------------------------------------*/

	$('#external-events .fc-event').each(function() {

		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			title: $.trim($(this).text()), // use the element's text as the event title
			stick: true // maintain when user navigates (see docs on the renderEvent method)
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});

	});

	/* initialize the calendar
	-----------------------------------------------------------------*/

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		editable: true,
		events: [
				{
					title: 'All Day Event',
					start: '2017-08-01'
				},
				{
					title: 'Long Event',
					start: '2017-08-07',
					end: '2017-08-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-08-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-08-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2017-08-11',
					end: '2017-08-13'
				},
				{
					title: 'Meeting',
					start: '2017-08-12T10:30:00',
					end: '2017-08-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2017-08-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2017-08-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2017-08-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2017-08-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2017-08-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2017-08-28'
				},
				{
					title: 'All Day Event',
					start: '2017-08-01'
				},
				{
					title: 'Long Event',
					start: '2017-08-04',
					end: '2017-08-12'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-09-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-09-16T16:00:00'
				},
				{
					title: 'Meeting',
					start: '2017-09-12T10:30:00',
					end: '2017-09-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2017-09-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2017-09-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2017-09-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2017-09-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2017-09-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2017-09-28'
				},

			],
		droppable: true, // this allows things to be dropped onto the calendar
		drop: function() {
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
		}
	});
});