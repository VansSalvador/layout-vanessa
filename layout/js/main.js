$(function() {
    $( "select.ui-input" ).selectmenu();
    $( "#datepicker" ).datepicker({
    dateFormat: 'dd/mm/yy',
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    nextText: 'Próximo',
    prevText: 'Anterior',
    closeText : 'Aplicar',
    numberOfMonths: 2,
    showButtonPanel:true,
    beforeShow: function( input ) {  
 setTimeout(function() {  
   var buttonPane = $( input )  
     .datepicker( "widget" )  
     .find( ".ui-datepicker-buttonpane" );  
  
   var btn = $('<ul><li><button type="button" class="ui-datepicker-current ui-state-default ui-corner-all">Personalizado</button></li><li><button type="button" class="ui-datepicker-current ui-state-default ui-corner-all">Hoje</button></li><li><button type="button" class="ui-datepicker-current ui-state-default ui-corner-all">Ontem</button></li><li><button type="button" class="ui-datepicker-current ui-state-default ui-corner-all">Ultimos 7 dias</button></li><li><button type="button" class="ui-datepicker-current ui-state-default ui-corner-all">Ultimos 30 dias</button></li><li><button type="button" class="ui-datepicker-current ui-state-default ui-corner-all">Mês passado</button></li></ul>');  
   btn  
    .unbind("click")  
   .bind("click", function () {  
    $.datepicker._clearDate( input );  
  });  
  
   btn.prependTo( buttonPane );  
  
 }, 1 );  
      }  
});
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
});
$(function() {
    $( document ).tooltip();
});