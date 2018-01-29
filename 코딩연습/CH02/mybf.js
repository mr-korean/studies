var ctx;
var canvas1;
var stuff = []; // 인스턴스를 담아 두는 배열

function init() {
    canvas1 = document.getElementById('canvas');
    canvas1.onmousedown = function () {
        return false;
    }; // 커서 모양을 변하지 않게 함

        canvas1.addEventListener('dblclick', makenewitem, false); // 더블 클릭하는 경우 객체를 복제한다.
    canvas1.addEventListener('mousedown', startdragging, false); // 객체를 선택하고 이동하기 위함. 이벤트가 발생하면 startdragging 함수로 전달된다.
    ctx = canvas1.getContext("2d");
    // 박스 생성자 함수 만들기
    // 매개변수 x, y, width, height, color를 Rect() 생성자 함수에 전달하여 사각형 인스턴스를 만든다.

    var r1 = new Rect(2, 10, 50, 50, "red");
    // var r2 = new Rect(30, 30, 10, 10, "black");
    stuff.push(r1);
    // stuff.push(r2);

    // stuff에 담아 둔 객체를 화면에 뿌려준다.
    drawstuff();
}


// 박스 생성자 함수(세부설정)
function Rect(x, y, w, h, c) {
    this.x = x; // x축 위치
    this.y = y; // y축 위치
    this.w = w; // 너비
    this.h = h; // 높이
    this.draw = drawrect; // 사각형 그리기 함수
    this.color = c; // 사각형 그리기 함수에 색깔 대입
    this.overcheck = overrect; // 영역 포함 확인 함수
}

// 사각형 그리기 함수
function drawrect() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

// 사각형의 경우 마우스를 클릭한 영역이 자신의 영역에 포함되는지 확인하기 위해 4개의 꼭지점에 포함여부를 확인한다. 포함되면 true를 반환한다.
// 즉 x는 좌상단, x+w는 우상단, y는 좌하단, y+h는 우하단이다. (xy만큼 0,0에서 떨어지고 wh만큼 커졌으므로)
function overrect(mx, my) {
    if ((mx >= this.x) && (mx <= (this.x + this.w)) && (my >= this.y) && (my <= (this.y + this.h))) {
        return true;
    } else {
        return false;
    }
}

// 생성된 객체를 화면에 뿌려주는 함수 (초기화에 필요)
// 객체는 속성과 메서드로 구성이 되며 각 객체의 속성이 바뀔때마다 화면을 지우고 새로 그려주어야 한다.
function drawstuff() {
    ctx.clearRect(0, 0, 600, 400); // 캔버스를 지운다.
    // (캔버스의 기본 속성은 CSS에서 처리하니 해당 파일을 참고)
    // 초기화나 사용자 작업에 의해 만들어진 객체를 stuff에 담고 하나씩 꺼내서 화면에 그려준다.
    for (var i = 0; i < stuff.length; i++) {
        // 각 인스턴스에는 draw 속성이 있고 객체의 종류에 따라 다른 draw함수를 가진다. 사각형의 경우는 drawrect이다.
        stuff[i].draw();
    }
}

// 이벤트가 발생하면 실행되는 함수
function startdragging(ev) {
    var mx; // 마우스의 현재 좌표를 얻는다.
    var my;
    if (ev.layerX || ev.layerY == 0) { // 파이어폭스, ???
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetY == 0) { // 오페라, ???
        mx = ev.offsetX;
        my = ev.offsetY;
    } else if (ev.clientX || ev.clientY == 0) { // 오페라, ???
        mx = ev.clientX;
        my = ev.clientY;
    }

    // 작업내용 1. stuff를 순회하면서 선택된 객체를 찾는다. 2. 선택한 객체가 있으면 이동한다.
    var endpt = stuff.length - 1;
    for (var i = endpt; i >= 0; i--) { // 역 순서
        // 객체의 속성중에 overcheck 속성은 자신의 영역에 마우스 클릭이 발생했는지를 확인하는 함수이다. 객체의 종류에 따라 다른 함수를 가지면 사각형의 경우 overrect이다.
        if (stuff[i].overcheck(mx, my)) {
            // offset은 마우스 클릭한 부분와 사각형 기준점과의 거리
            offsetx = mx - stuff[i].x;
            offsety = my - stuff[i].y;
            // 이 항목을 맨 위로 이동
            var item = stuff[i];
            thingInMotion = stuff.length - 1;
            stuff.splice(i, 1);
            stuff.push(item);
            canvas1.style.cursor = "pointer"; // 커서를 드래그 중에 손가락 모양으로 바꿈
            canvas1.addEventListener('mousemove', moveit, false); // 마우스 이동에 따라 객체를 옮긴다.
            canvas1.addEventListener('mouseup', dropit, false); // 마우스가 업되면 이동을 멈춘다.
            break;
        }
    }
}

// 선택한 객체를 이동시켜주는 역할을 한다.
function moveit(ev) {
    var mx;
    var my;
    if (ev.layerX || ev.layerX == 0) { // 파이어폭스, ???
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // 오페라, ???
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    stuff[thingInMotion].x = mx - offsetx; // 파리잡이 끈끈이 효과를 위한 조절
    stuff[thingInMotion].y = my - offsety;
    drawstuff(); // 객체의 속성이 바뀔때 마다 화면을 다시 그린다.
}

// moveit에서 이동하는 객체에 mouseup이 발생하면 이동을 멈춘다. 모든 이벤트 리스너를 삭제한다. 반드시 removeEventListener는 addEventListener와 동일한 내용으로 적용해야 한다.
function dropit(ev) {
    canvas1.removeEventListener('mousemove', moveit, false);
    canvas1.removeEventListener('mouseup', dropit, false);
    canvas1.style.cursor = "crosshair"; // 커서를 십자 모양으로 되돌림
}



// -----------------------------------------
// 객체를 복제합니다.
// 복제한 객체를 stuff에 추가합니다.

function makenewitem(ev) {
    var mx;
    var my;
    if (ev.layerX || ev.layerX == 0) { // 파이어폭스, ???
        mx = ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // 오페라, ???
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var endpt = stuff.length - 1;
    var item;
    for (var i = endpt; i >= 0; i--) { // 역 순서
        // 더블 클릭이 발생하면 대상 객체를 찾고
        // clone 함수에서 복제를 진행합니다.
        if (stuff[i].overcheck(mx, my)) {
            item = clone(stuff[i]);
            item.x += 20;
            item.y += 20;
            stuff.push(item);
            break;
        }
    }
    drawstuff();
}

// 선택된 객체를 전달 받아 새 객체에 속성을 복사합니다.
function clone(obj) {
    var item = new Object();
    // for in는 객체의 속성을 반환합니다.
    for (var info in obj) {
        console.log(info);
        item[info] = obj[info];
    }
    console.log(item);
    return item;
}


//-------------------------------------
// 마지막 선택한 객체를 삭제합니다.

// makenewitem이나 startdragging에서 마지막 이동한 객체를 push를 이용해 배열의 끝에 놓습니다.
// 이제 pop로 배열의 끝을 제거하고 화면을 다시 그리면 삭제가 됩니다.
function removeobj() {
    stuff.pop();
    drawstuff();
}


// ----------------------------------------
// 완성본을 이미지로 저장합니다.

function saveasimage() {
    try {
        window.open(canvas1.toDataURL("image/png"));
    } catch (err) {
        alert("다른 브라우저를 사용하든지, 파일을 서버에 올려야 합니다.");
    }
}