(function ( $ ) {
	$.fn.yearMonthDay = function( options ) {

		var currentYear = new Date().getFullYear();

		// defualt options
		var settings = $.extend({
			displayFormat: "ymd",         // format of year, month, day selects e.g. [mdy] [m - d - y] [ymd]
			targetFormat:  "y-m-d",       // format of original field e.g. [d-m-y] [m/d/y] [y-m-d]
			yearStart:     currentYear,   // first year in list default to today's year
			yearCount:     10,            // number of years to show, use negative for reverse order
			monthStart:    1,             // first month
			monthCount:    12,            // number of months to show, use negative for reverse order
			dayStart:      1,             // first day
			dayCount:      31,            // number of days to show, use negative for reverse day
			hideTarget:    true,          // hide the 
		}, options );

		var range = function(start, count) {
			if(arguments.length == 1) {
				count = start;
				start = 0;
			}

			var array = [];
			var count_abs = Math.abs(count);

			for (var i = 0; i < count_abs; i++) {
				if (count < 0) {
					array.push(start - i);
				}
				else {
					array.push(start + i);
				}
			}
			return array;
		};

		var get_options_html = function (items) {
			var html  = '';
			$.each(items, function(index, value) {
				html += '<option value="value">value</option>'.replace(/value/g, value);
			});
			return html;
		};

		// Greenify the collection based on the settings variable.
		return this.each(function() {
			var el     = this;
			var years  = range(settings.yearStart, settings.yearCount);
			var months = range(settings.monthStart, settings.monthCount);
			var days   = range(settings.dayStart, settings.dayCount);

			var options = {};
			options.y = $('<select class="y"><option>Year</option>'  + get_options_html(years)  + '</select>');
			options.m = $('<select class="m"><option>Month</option>' + get_options_html(months) + '</select>');
			options.d = $('<select class="d"><option>Day</option>'   + get_options_html(days)   + '</select>');

			var displayFormat = settings.displayFormat.split('');
			var yearMonthDay  = $('<div class="yearMonthDay"></div>');

			$.each(displayFormat, function(index, value) {
				if (typeof options[value] !== 'undefined') {
					$(yearMonthDay).append(options[value]);
				}
				else {
					$(yearMonthDay).append(value);
				}
			});
			$(el).after(yearMonthDay);

			// hide target
			if (settings.hideTarget) {
				$(el).hide();
			}

			// set value to target
			var targetFormat = settings.targetFormat.split('');
			$('select', yearMonthDay).on('change', function(e) {
				var targetValue = '';
				$.each(targetFormat, function(index, value) {
					if (typeof options[value] !== 'undefined') {
						targetValue += $(options[value]).val();
					}
					else {
						targetValue += value;
					}
				});
				$(el).val(targetValue);
			});
		});
	};
}( jQuery ));
