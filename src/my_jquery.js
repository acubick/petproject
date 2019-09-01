import $ from 'jquery'
import './scss/pages/jquery.scss'
import Attribute from 'less/lib/less/tree/attribute'

console.log( 'hi I am jquery page' )

var mybutton = $( '.button-primary' ).text()
console.log( mybutton )

$( '#btnAddProfile' ).prop( 'value', 'Save' ) //versions newer than 1.6
$( '.SeeMore2' ).click( function() {
	var $this = $( '.button-primary' )
//	$this.toggleClass('SeeMore2');
	if( $this.text() === 'my text' ) {
		$this.text( 'See More' )
	} else {
		$this.text( 'my text' )
	}
} )

$( document ).ready( function() {
	$( 'h1' ).text( 'Быть верстальщиком!' )
} )

$( function() {
	$( 'h2' ).text( 'Быть верстальщиком!' ).css( {
		'color': 'green '
	} )
} )

//** tag, class, id
$( 'h1' ).css( { 'color': 'red' } )
$( '.first' ).css( { 'color': 'blue' } )
$( '#second' )
	.css(
		{ 'display': 'inline-block', 'backgroundColor': 'yellow', 'margin': 0 } )
$( 'h3, h4' ).css( { 'color': 'magenta' } )
//  ================ data-(id) .data() ==================  //
const dataId   = $( 'h1' ).data( 'id' )
const dataName = $( 'h1' ).data( 'name' )
console.log( dataId, dataName )

//** Attributes
$( `h2[title="test-word"]` ).css( {
	'backgroundColor': 'pink',
	'display':         'inline-block'
} )
//** All
//$('*').css({color : 'red'})
// !
/*$(`[title!="test-word"]`).css({
	'backgroundColor' : 'pink',
	'display' : 'inline-block'
})*/
$( 'ul li:even' ).css( { color: 'green' } )
$( 'ul li:odd' ).css( { color: 'blue' } )
$( 'ul li:first' ).css( { color: 'red' } )
$( 'ul li:last' ).css( { color: 'yellow' } )
$( 'ul li:nth-child(8)' ).css( { color: 'purple' } )

//** :contains(), :empty, :parent, :has

$( 'h5:contains("Hello")' ).css( {
	'color': 'orange'
} )
$( 'ul li:has(\' span\')' ).css( {
	backgroundColor: 'yellow'
} )

$( 'table tr td:parent' ).css( {
	backgroundColor: 'red'
} )
$( 'table tr td:empty' ).css( {
	backgroundColor: 'black'
} )
// ** click(), dbclick, mouseenter, mouseleave
// click - не работает с элементами которые были
// добавлены в DON дерево программно

//$( 'button' ).click( function() {
//	console.log( 'test' )
//} )

// .on(click) работает с динамическим контентом
$( '.cl' ).on( 'click', function() {
	console.log( 'test on click' )
} )
$( '.dblcl' ).on( 'dblclick', function() {
	console.log( 'dbclick' )
} )
$( '.msen' ).on( 'mouseenter', function() {
	console.log( 'mouseenter' )
} ).on( 'mouseleave', function() {
	console.log( 'mouseleave' )
} )

// ? EVENTS

// ** keypress, keydown, keyup

$( 'input[name="key"]' ).keyup( function(event) {
	event.preventDefault()
	const val = $( this ).val()
	$( 'input[name="keyup"]' ).val( val )
} )

//** change
$( 'input[name="name"]' ).change( function(event) {
	event.preventDefault()
	const val = $( this ).val()
	$( 'input[name="submit"]' ).val( val )
} )

//** submit
$( '.subm' ).submit( function(event) {
	event.preventDefault()
	console.log( 'submit' )
} )

//** focus

// ============ hide() show()
$( '.testHide' )
	.hover( function() {
		$( this ).hide( 10000 )
	} )
	.delay( 1000 )
	.click( function() {
		$( this ).show( 5000 )
	} )

// ============= animate()
$( '#jj' )
	.animate( { width: '50px' }, 2000 )
	.animate( { width: '250px' }, 1500 )
// === fadeIn() fadeOut()
$( '#fifo' ).fadeOut( 3000 )
            .fadeIn( 3000 )

//? ======== Attribute ==============
//** value, alt, type, name
console.log( 'alt', $( 'input[name="send"]' ).attr( 'alt' ) )
console.log( 'value', $( 'input[name="send"]' ).attr( 'value' ) )
console.log( 'title', $( 'input[name="send"]' ).attr( 'title' ) )
console.log( 'type', $( 'input[name="send"]' ).attr( 'type' ) )
console.log( 'id', $( 'input[name="send"]' ).attr( 'id' ) )
console.log( 'data-id', $( 'input[name="send"]' ).attr( 'data-id' ) )
console.log( 'data-id', $( 'input[name="send"]' ).data( 'id' ) )

//? ======== resize(), scroll() ==============

$( window ).resize( function() {
	const width  = $( this ).width()
	const height = $( this ).height()
	console.log( width, height )
} )
$( window ).scroll( function() {
	const scrollTop  = $( this ).scrollTop()
	const scrollLeft = $( this ).scrollLeft()
	console.log( 'scrollTop: = ', scrollTop )
	console.log( 'scrollLeft: = ', scrollLeft )
} )

//? ========= addClass(), removeClass() toggleClass() =========

$( '.subm' ).addClass( 'addedClass' )
$( '.subm' ).removeClass( 'subm' )
$( '.tgl' ).hover( function() {
	$( this ).toggleClass( 'blue' )
} )

//? ========= text(), html() =========

const textCont = $( '.text' ).text()
console.log( textCont )
$( '.text' ).text( 'новый текст' )

console.log( $( 'ul' ).html() )
const newHtml = '\n'
                + '\t<li style="color: red; background-color: yellow;"><span>ttt</span></li>\n'
                + '\t<li style="color: blue; background-color: yellow;"><span>Second</span></li>\n'
                + '\t<li style="color: green;">Third</li>\n'
                + '\t<li style="color: green; background-color: yellow;"><span>Fifth</span></li>\n'
                + '\t<li style="color: purple; background-color: yellow;"><span>Fifth</span></li>\n'
                + '\t<li style="color: green; background-color: yellow;"><span>Fifth</span></li>\n'
                + '\t<li style="color: blue; background-color: yellow;"><span>Fifth</span></li>\n'
                + '\t<li style="color: green; background-color: yellow;"><span>Fifth</span></li>\n'
                + '\t<li style="color: blue; background-color: yellow;"><span>Fifth</span></li>\n'
                + '\t<li style="color: green;">Fifth</li>\n'
                + '\t<li style="color: blue;">Fifth</li>\n'
                + '\t<li style="color: yellow;">Fifth</li>'
console.log( $( 'ul' ).html( newHtml ) )

//? ======= append(), prepend() =========
$( 'ul' ).append( '\t<li style="color: #0a450a;">новая лишка</li>' )
$( 'ul' ).prepend( '\t<li style="color: #0a450a;">новая лишка</li>' )

//? ======= remove(), empty() =========
$( 'ul' ).empty() // опустошает список но оставляет элемент на странице
$( 'ul' ).remove() // удаляет  текущий объект со страницы

//? ======= after() =========

$( 'table' ).after( '<hr><span>hello</span><hr>' )

//? ======= wrap(), unwrap() =========

$( '.tgl' ).wrap( '<div class="red"></div>' )
$( '#fifo' ).unwrap()

