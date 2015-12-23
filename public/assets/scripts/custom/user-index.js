var OT = OT || {};

OT.UserIndexWizard = function() {
  this.initialize();
}

OT.UserIndexWizard.prototype = {
  initialize : function(){
    this.initializeData();
//    this.clearBookingsTable();
    this.setTable();
  },
  setTable:function(){
    // NOTE: $.tablesorter.theme.bootstrap is ALREADY INCLUDED in the jquery.tablesorter.widgets.js
    // file; it is included here to show how you can modify the default classes


    // call the tablesorter plugin and apply the uitheme widget
    $("#student-table").tablesorter({
      // this will apply the bootstrap theme if "uitheme" widget is included
      // the widgetOptions.uitheme is no longer required to be set
      theme : "bootstrap",

      widthFixed: true,

      headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

      // widget code contained in the jquery.tablesorter.widgets.js file
      // use the zebra stripe widget if you plan on hiding any rows (filter widget)
      widgets : [ "uitheme", "filter", "zebra" ],

      widgetOptions : {
        // using the default zebra striping class name, so it actually isn't included in the theme variable above
        // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
        zebra : ["even", "odd"],

        // reset filters button
        filter_reset : ".reset",

        // extra css class name (string or array) added to the filter element (input or select)
        filter_cssFilter: "form-control"

        // set the uitheme widget to use the bootstrap theme class names
        // this is no longer required, if theme is set
        // ,uitheme : "bootstrap"

      }
    })
      .tablesorterPager({

        // target the pager markup - see the HTML block below
        container: $(".ts-pager"),

        // target the pager page select dropdown - choose a page
        cssGoto  : ".pagenum",

        // remove rows from the table to speed up the sort of large tables.
        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
        removeRows: false,

        // output string - default is '{page}/{totalPages}';
        // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
        output: '{startRow} - {endRow} / ({totalRows})'

      });
  },
  initializeData : function(){
    var self=this;
    var http_verb = "GET";
    var url = "/users";
    $.ajax({
      url: url,
      type: http_verb,
      format: "JSON",
      success: function (data, textStatus, jqXHR) {
        var data=JSON.stringify(data);
        var json_data=JSON.parse(data);
        var table = document.getElementById("student-table");
        $.each(json_data, function(i, item) {
            cloned_row = $("#student-row-template").clone(true, true);
            cloned_row.attr('id', 'booking-row-template-' + (item.id));
            cloned_row.find('.student-row-id').html(item.id);
            cloned_row.find('.student-row-name').html(item.name);
            cloned_row.find('.student-row-email').html(item.email);
            cloned_row.find('.student-row-cgpa').html(item.percentile);
          cloned_row.find('.student-row-total-attempts').html(item.get_total_attempts);
          cloned_row.find('.student-row-correct').html(item.get_correct_answer);
          cloned_row.find('.student-row-test-percentile').html((item.get_correct_answer)/45*100);


            cloned_row.removeClass('hidden');
            $("#student-table > tbody").append(cloned_row);

          $('.tablesorter').trigger("update");

        });
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  }

}


var ot = new OT.UserIndexWizard();

