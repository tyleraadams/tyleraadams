$(document).ready(function(){
	// setInterval(function(){
	// 	// console.log()
	// 	if( $('.pane').index($('.active'))<$('.pane').length||$('.pane').index($('.active'))>=0 ){
	// 		$($('.pane')[ $('.pane').index($('.active'))+1]).addClass('active');
	// 		$('.active').first().removeClass('active');
	// 	}else{
	// 		$('.actve').removeClass('active');
	// 		$('.pane').first().addClass('active');
	// 	}
		
	// }, 5000);


$('.carousel').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
  dots:true
});
	
	
});