//declaring various variables for use globally
var cookieSelectorCount = 0;
var buyers = [{},{}];
var buyersCounter = 0;
var types = []
var fName = "This is why it doesn't work."
//set up JQTouch
var jQT = $.jQTouch({
    icon: 'img/CookiePlus.png',
    icon4: 'img/CookiePlus4.png',
    startupScreen: 'img/CookiePlusSplash2.png',
    startupScreen4: 'img/CookiePlusSplash.png',
    statusBar: 'black',
    fixedViewport: 'true'
});
$(function() {
	jQT.addAnimation({
		name: 'mySlide',
		selector: '.mySlide'
	});
});
$(document).ready(function(){
    $('#settings form').submit(saveSettings);
    $('#addBuyer form').submit(addBuyer);
    $('#settings').on('pageAnimationStart', loadSettings);
    $('#cookieAdd a').tap(addCookieSelector);
    deleteHandler()
    $('#customers a').tap(populateCustomerInfo);
    $(document).on('pageAnimationStart', hideDeleteButton)
    $('a[target="_blank"]').bind('click', function() {
	       	if (confirm('This link opens in a new window.')) {
	            return true;
	        } else {
	            return false;
	        }
	    });
});
function addCookieSelector() {
	$('#cookieAdd').before('<li class="arrow" id="cookieSelector' + cookieSelectorCount + '"><select placeholder="Cookies" id="selectorContainer' + cookieSelectorCount + '"><optgroup label="Cookies" id="selectorGroup'+cookieSelectorCount + '"></optgroup></select></li>');
	$('#cookieSelector' + cookieSelectorCount).after('<li><input type="number" id="cookieQuant' + cookieSelectorCount + '" placeholder="Quantity" /></li>')
	var cookieInput = localStorage.cookies;
	String(cookieInput);
	console.log(cookieInput); //log for debugging
	types = cookieInput.split(",");
	console.log(types); //ditto
	for (var i=0;i<types.length;i++) {
		$('#selectorGroup' + cookieSelectorCount).append('<option value="' + types[i] + '">' + types[i] + '</option>');
	}
	cookieSelectorCount++;
	return false; //prevent the link from linking.
}
//temporary function to let me see it's doing something, will fix l8r
function addBuyer() {
	var lName = $('#lName').val();
	var fName = $('#fName').val();
	buyers[buyersCounter][lName] = lName;
	buyers[buyersCounter][fName] = fName;
	applyBuyer(fName,lName);
	jQT.goBack();
	return false;
}
//Debug, may keep and use elsewhere
function applyBuyer(fName, lName) {
	$('#buyerList').prepend('<li class="arrow swipeDelete"><a class="swipeDelete" href="#customerInfo">' + fName + ' ' + lName + '</a></li>');
	deleteHandler()

	return true;
}
//see function name
function saveSettings() {
	console.log("Running Settings Saver...");
	localStorage.price = $('#price').val();
    localStorage.cookies = $('#cookies').val();
    jQT.goBack();
    return false;
}
//load settings when the form animation starts
function loadSettings() {
	console.log("Loading settings...");
    $('#price').val(localStorage.price);
    $('#cookies').val(localStorage.cookies);
}
function populateCustomerInfo() {
	$('#customerName').append()
}
function writeToLocal() {
	//code
}
function deleteButton(toDelete) {
	//alert(toDelete);
	$('#deleteButton').remove();
	$(this).append('<a id="deleteButton" style="text-overflow:clip; z-index:100;" class="deleteButton mySlide" href="_blank">Delete</a>');
	$('#deleteButton').tap(destroyCustomer);

}
function hideDeleteButton() {
	$('#deleteButton').removeClass("mySlide");
	$('#deleteButton').addClass("mySlide.out");
	$('#deleteButton').remove();
}
//lets me resize the window to iPhone sizes when I test on a desktop
function desktopResize(type) {
	console.log("Resizing window...");
	if (type == 4) {
		window.resizeTo(320,480);
	}
	else if (type == "retina") {
		window.resizeTo(640,960);
	}
	else if (type == 5) {
		window.resizeTo(640,1136);
	}
}
function destroyCustomer() {
	alert("NO!");
	hideDeleteButton();

	return false;
}
function deleteHandler() {
	$('.swipeDelete').swipeLeft(deleteButton);
	$('.swipeDelete').swipeRight(hideDeleteButton);
}
//regex to find comments: //[A-z .',0-9]*\n