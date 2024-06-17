/*
file: script.js
GUI Assignment: HW4 enhancing interactive multiplication table
Jasmeet Kaur, UMass Lowell Computer Science, jasmeet_kaur@student.uml.edu
Copyright (c) 2024 by Jasmeet. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
*/
$(document).ready(function() 
{
    // format tabs
    $("#tabs").tabs();

    // format sliders w/ 2 way binding
    initializeSlider("#startHorizontal", "#startHorizontalSlider", -50, 50, 0);
    initializeSlider("#endHorizontal", "#endHorizontalSlider", -50, 50, 5);
    initializeSlider("#startVertical", "#startVerticalSlider", -50, 50, 0);
    initializeSlider("#endVertical", "#endVerticalSlider", -50, 50, 5);

    // validate form follows the rules
    $('#multiplicationForm').validate(
    {
        rules: 
        {
            startHorizontal: 
            {
                required: true,
                number: true
            },
            endHorizontal: 
            {
                required: true,
                number: true
            },
            startVertical: 
            {
                required: true,
                number: true
            },
            endVertical: 
            {
                required: true,
                number: true
            }
        },
        messages: 
        {
            startHorizontal: "Please enter a valid number for the start of the horizontal range (numbers can also be negative): ",
            endHorizontal: "Please enter a valid number for the end of the horizontal range (numbers can also be negative): ",
            startVertical: "Please enter a valid number for the start of the vertical range (numbers can also be negative): ",
            endVertical: "Please enter a valid number for the end of the vertical range (numbers can also be negative): "
        },
        submitHandler: function(form) 
        {
            generateTable();
        }
    });

    // start slider
    function initializeSlider(inputSelector, sliderSelector, min, max, value) 
    {
        $(sliderSelector).slider(
        {
            min: min,
            max: max,
            value: value,
            slide: function(event, ui) 
            {
                $(inputSelector).val(ui.value);
                generateTable();
            }
        });
        $(inputSelector).val(value);
        $(inputSelector).on("input", function() 
        {
            $(sliderSelector).slider("value", $(this).val());
            generateTable();
        });
    }

    // create table and add to tab
    function generateTable() {
        var startHorizontal = parseInt($('#startHorizontal').val());
        var endHorizontal = parseInt($('#endHorizontal').val());
        var startVertical = parseInt($('#startVertical').val());
        var endVertical = parseInt($('#endVertical').val());

        if (isNaN(startHorizontal) || isNaN(endHorizontal) || isNaN(startVertical) || isNaN(endVertical)) 
        {
            $('#error-message').text('ERROR: Please enter valid numbers!');
            return;
        }

        if (startHorizontal > endHorizontal || startVertical > endVertical) 
        {
            $('#error-message').text('ERROR: Start values must be less than or equal to end values!');
            return;
        }

        $('#error-message').text('');
        var tableHTML = '<thead><tr><th></th>';

        for (var h = startHorizontal; h <= endHorizontal; h++) 
        {
            tableHTML += '<th>' + h + '</th>';
        }
        tableHTML += '</tr></thead><tbody>';

        for (var v = startVertical; v <= endVertical; v++) 
        {
            tableHTML += '<tr><th>' + v + '</th>';
            for (var h = startHorizontal; h <= endHorizontal; h++) 
            {
                tableHTML += '<td>' + (v * h) + '</td>';
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</tbody>';

        // add table to new tab
        var tabID = "tab-" + ($("#tabs ul li").length + 1);
        var tabTitle = startHorizontal + ' to ' + endHorizontal + ' by ' + startVertical + ' to ' + endVertical;
        
        //append tab
        $("#tabs ul").append('<li><a href="#' + tabID + '">' + tabTitle + '</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>');
        //append tab content
        $("#tabs").append('<div id="' + tabID + '"><div class="table-container"><table>' + tableHTML + '</table></div></div>');
        //refresh to create more tabs
        $("#tabs").tabs("refresh");

        // remove ONE tab ability
        $("#tabs").on("click", "span.ui-icon-close", function() 
        {
            var panelID = $(this).closest("li").remove().attr("aria-controls");
            $("#" + panelID).remove();
            $("#tabs").tabs("refresh");
        });
    }

    // remove ALL tab ability
    $("#removeAllTabs").on("click", function() 
    {
        console.log("Remove All Tabs button clicked"); // debug message
        $("#tabs ul li").not(':first').each(function() 
        {
            var panelID = $(this).remove().attr("aria-controls");
            $("#" + panelID).remove();
        });
        $("#tabs").tabs("refresh");
    });
});
