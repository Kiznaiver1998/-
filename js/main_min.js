/*
思路：
	鼠标点击时：
		*获取鼠标当前位置-> event.pageX, event.pageY;
		*获取元素初始位置值
		*绑定移动和松开事件
	鼠标移动时：计算位置
	鼠标松开时，解除监听
*/

/*缺陷：
	1.如果有transform的话，会错乱
	2.如果要再加一个的话，要再写一遍函数，很麻烦
*/
var oElem = document.getElementById('target1');

var startX = 0;
var startY = 0;

var sourceX = 0;
var sourceY = 0;

oElem.addEventListener('mousedown', start, false);

/* 事件处理 */
function start(event) {
	startX = event.pageX;
	startY = event.pageY;
	//获取目标元素初始值
	var pos = getPosition(oElem);
	sourceX = pos.x;
	sourceY = pos.y;
	document.addEventListener('mousemove', move, false);
	document.addEventListener('mouseup', end, false);
}

function move(event) {
	// body...
	var currentX = event.pageX;
	var currentY = event.pageY;

	var distanceX = currentX - startX;
	var distanceY = currentY - startY;
	setTargetPos(oElem, {
		x: (sourceX + distanceX).toFixed(),
		y: (sourceY + distanceY).toFixed()
	});
}

function end(event) {
	document.removeEventListener('mousemove', move);
	document.removeEventListener('mouseup', end);
}

/* 通用函数 */
function getPosition(elem) {
	var pos = {x: 0, y: 0};
	if (getStyle(elem, 'position') === 'static') {
		elem.style.position = 'relative';
		return pos;
	}else{
		var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
		var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);
		return pos = {
			x: x,
			y: y
		}
	}
	return pos;
}

function setTargetPos(elem, pos) {
	elem.style.left = pos.x + 'px';
	elem.style.top = pos.y + 'px';
	return elem;
}

function getStyle(elem, property) {
	return window.getComputedStyle ? window.getComputedStyle(elem, false)[property] : elem.currentStyle[property];//兼容IE
}