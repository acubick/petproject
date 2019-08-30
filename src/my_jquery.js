import $ from 'jquery'
import './scss/pages/jquery.scss'
console.log('hi I am jquery page')


var mybutton = $('.button-primary').text();
console.log( mybutton )


$("#btnAddProfile").prop('value', 'Save'); //versions newer than 1.6
$('.SeeMore2').click(function(){
	var $this = $('.button-primary');
//	$this.toggleClass('SeeMore2');
	if($this.text() === 'my text'){
		$this.text('See More');
	} else {
		$this.text('my text');
	}
});
