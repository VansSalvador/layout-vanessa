

$(function() {
    $( "select.ui-input" ).selectmenu();
});
$(document).ready(function() {
    $('.dropitmenu').dropit();
});
$(function() {
  $( ".alldialog" ).dialog({
     autoOpen: false, 
     modal: true,
     hide: "puff",
  });
  $( "#geraRelatorio" ).click(function() {
     $( "#dialogRelatorio" ).dialog( "open" );
  });
  $( ".editUser" ).click(function() {
     $( "#dialogUser" ).dialog( "open" );
  });
  $( ".deleteUser" ).click(function() {
     $( "#dialogDeleteUser" ).dialog( "open" );
  });
  $( ".editCat" ).click(function() {
     $( "#dialogCat" ).dialog( "open" );
  });
  $( ".deleteCat" ).click(function() {
     $( "#dialogDeleteCat" ).dialog( "open" );
  });
  $( ".openCham" ).click(function() {
     $( "#dialogOpenCham" ).dialog( "open" );
  });
});
$(function() {
    $( ".tool" ).tooltip();
});
$(function() {
  $('#datepick').datepick({ 
    rangeSelect: true, monthsToShow: 2, showTrigger: '#calImg', renderer: $.datepick.weekOfYearRenderer, onShow: $.datepick.highlightWeek});
});