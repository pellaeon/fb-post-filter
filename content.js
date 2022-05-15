var blockwords = [
	'贊助',
	'回答了 1 個問題',
	'為你推薦',
	'已留言回應',
	'回覆了 1 則留言',
	'邀請你參與'
];

var blockpatterns = [
	/贊.{0,20}助/
];

function selectPosts() {
	var posts = document.querySelectorAll('[data-pagelet^="FeedUnit"');
	var ret = [];
	posts.forEach(function test(p) {
		blockwords.forEach(function test2(word) {
			if ( p.textContent.includes(word) ) {
				ret.push(p);
				continue;
			}
		});
		blockpatterns.forEach(function test2(pattern) {
			if ( p.textContent.match(word) ) { ret.push(p); }
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
	remove_right_sidebar_ad();
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

function remove_right_sidebar_ad() {
	var el = document.querySelectorAll("[data-pagelet='RightRail']");
	if ( el[0].textContent.includes('贊助') ) {
		el[0].removeChild(el[0].firstElementChild);
	}
}


console.log('loaded!');
