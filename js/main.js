var portfolioItems = document.querySelectorAll('#portfolio li');
for (var i=0; i < portfolioItems.length; i++){
var portfolioItem = portfolioItems[i];
portfolioItem.addEventListener('click', function(event){
  this.querySelector('.teaser').classList.toggle('hidden');
  this.querySelector('.fa-angle-right').classList.toggle('fa-angle-down');
  //this.querySelector('.fa-angle-down').classList.toggle('fa-angle-right');


});
}