var blockwords = [
	'贊助',
	'回答了 1 個問題',
	'為你推薦',
	'已留言回應',
	'回覆了 1 則留言'
];

function selectPosts() {
	var posts = document.querySelectorAll('.userContentWrapper');
	var ret = [];
	posts.forEach(function test(p) {
		blockwords.forEach(function test2(word) {
			if ( p.textContent.includes(word) ) { ret.push(p); }
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
  }
  ticking = true;
});

console.log('loaded!');
