// 버튼을 누를 때마다 사이트가 바뀌게 변경
document.getElementById('form').site_language.onchange = function() {
	location.href = document.getElementById('form').site_language.value;
}
// form에서 name(id와 비슷함)이 site_language(인 select)가 '바뀌면',
// site_language의 값(ex. index-ko.html)을 location.href(현재 표시 중인 페이지의 URL)에 대입

// =======================================================================================
// 다른 문서로 바꿀 경우 자동 새로고침

var lang = document.querySelector('html').lang;
// (script.js를 부른) 문서의 html 태그의 lang 속성 값(index-ko.html 문서의 경우 "ko")을 변수 lang에 대입

var opt;
if(lang === 'ko')
	{
		opt = document.querySelector('option[value="index-ko.html"]')
		// lang이 "ko"라면, (script.js를 부른) 문서 내 value가 index-ko.html인 option을 opt에 대입한다.
	}
else if(lang === 'en')
	{
		opt = document.querySelector('option[value="index-en.html"]')
	}
else if(lang === 'ja')
	{
		opt = document.querySelector('option[value="index-ja.html"]')
	}
opt.selected = true;
// 이 변수 opt에 selected라는 불 속성을 추가하기 위해 true라고 적은 것이다. (삭제하려면 false)
// selected가 추가된 option은 페이지를 여는 시점에 해당 option이 기본값이 되게 한다.

// ※ 불 속성에 관해서는 W3스쿨에서 Booleans를 검색하시오. (간단히 말해 예/아니오 2가지 값만 있는 데이터)
// ※ 위의 lang이 "ko"인지, "en"인지를 묻는 조건문은 switch로도 작성할 수 있다. W3스쿨에서 Switch를 검색하시오.