var blockwords = [
	'贊助',
	'回答了 1 個問題',
	'為你推薦',
	'已留言回應',
	'回覆了 1 則留言',
	'邀請你參與',
	'追蹤',
	'加入',
];

var blockpatterns = [
	/贊.{0,20}助/
];

function selectPosts() {
	/* Heuristics:
	 * 1. the post div is always a sibling of another post div
	 * 2. it has span and a
	 * 3. it has svg (the "sharing scope", usually a globe icon)
	 */
	var roughselection1 = document.querySelectorAll('div + div:has(span):has(a):has(svg)');
	//var roughselection1 = document.querySelectorAll('div + div:has(span)');
	// select further filter the divs that are larger than 300x300 but smaller than the window
	var roughselection2 = Array.from(roughselection1).filter(a => a.clientWidth > 300 && a.clientHeight > 300 && a.clientWidth < window.innerWidth && a.clientHeight < window.innerHeight);
	var ret = [];
	roughselection2.forEach(function test(p) {
		blockwords.forEach(function test2(word) {
			if ( p.textContent.includes(word) ) {
				ret.push(p);
			}
		});
		blockpatterns.forEach(function test2(pattern) {
			if ( p.textContent.match(pattern) ) { ret.push(p); }
		});
	});
	return ret;
}

// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var ticking = false;

function filterPosts(scroll_pos) {
	var should_remove = selectPosts();
	should_remove.forEach( function (el) {
		var text = el.textContent;
		console.log('removed '+text);
		el.parentElement.removeChild(el);
	});
}

window.addEventListener('scroll', function(e) {
	last_known_scroll_position = window.scrollY;
	if (!ticking) {
		window.requestAnimationFrame(function() {
			console.log('filtering...');
			filterPosts(last_known_scroll_position);
			ticking = false;
		});
		//ticking = true;
	}
});

console.log('loaded!');
