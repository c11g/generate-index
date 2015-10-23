'use strict';

var fs = require('fs'),
	path = require('path'),
	cheerio = require('cheerio');

// 사용자 옵션
var setting = {};

var gulpIndxing = function(setting) {

	// 사용자 옵션 정의 || 기본값
	var option = {
		'projectName': setting.projectName || '프로젝트명을 입력하세요',
		'author': setting.author || '작업자를 입력하세요.',
		'srcDir': setting.srcDir || 'demo/',
		'outDir': setting.outDir || '',
		'extention': setting.extention || '.html',
		'outFileName': setting.outFileName || '@index.html'
	}

	var projectName = option.projectName,
		author = option.author,
		srcDir = option.srcDir,
		outDir = option.outDir,
		extention = option.extention,
		outFileName = option.outFileName;

	// pageList 와 page title 리스트
	var pageList = {
			'base': [] // 폴더 없는 경우 기본 배열
		},
		titleList = {
			'base': []
		};

	getList(srcDir);
	createIndex(outDir + outFileName);

	// 페이지, 타이틀 리스트 추출
	function getList(srcDir){

		var _all = fs.readdirSync(srcDir);
		// srcDir 탐색
		for (var index in _all){
			var _list = _all[index];

			// 폴더인지 파일인지 확인
			var _checkType = fs.statSync(srcDir + _list);
			
			if (_checkType.isDirectory()){
				// 폴더이면..
				// 우선 pageList에 폴더이름의 배열을 생성
				pageList[_list] = [],
				titleList[_list] = [];
				
				var _pages = fs.readdirSync(srcDir + _list);
				// 해당 폴더를 탐색
				for (var index in _pages){
					// 확장자를 확인 후 배열에 추가
					var _checkExtention = _pages[index].indexOf(extention);

					if( _checkExtention !== -1 ) {
						pageList[_list].push(_pages[index]);

						// <title> 추출
						var _data = fs.readFileSync(srcDir + _list + '/' + _pages[index], 'utf-8');
						var pattern = /<title>([\s\S]*)<\/title>/i,
							title = pattern.exec(_data)[1];

						// titleList 배열에 추가
						titleList[_list].push(title);
					}
				}
			} else if (_checkType.isFile()){
				// 파일이라면..
				// 확장자를 확인 후 기본배열에 추가
				var _checkExtention = _list.indexOf(extention);

				if (_checkExtention !== -1){
					pageList.base.push(_list);

					// <title> 추출
					var _data = fs.readFileSync(srcDir + _list, 'utf-8');
					var pattern = /<title>([\s\S]*)<\/title>/i,
						title = pattern.exec(_data)[1];

					// titleList 기본 배열에 추가
					titleList.base.push(title);
				}
			}
		}
	}

	// @index.html
	function createIndex(file){
		// htmlTemplate 파일 참조
		var templatePath = path.join(__dirname, 'template/@temp.html'),
			htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

		// @index.html에 템플릿 코드 생성
		fs.writeFileSync(file, htmlTemplate, 'utf8');

		// DOM 내용 변경
		var $ = cheerio.load(htmlTemplate, {
			decodeEntities: false // 한글 인코딩 문제
		});

		// 프로젝트명
		$('#title').text(projectName);

		// 작업자
		$('#admin').text('작업자 : ' + author);

		// 현재 시간
		var _t = new Date(),
			time = _t.getFullYear() + '년 ' +
					(_t.getMonth() + 1) + '월 ' + 
					_t.getDate() + '일 ' +
					_t.getHours() + '시 ' +
					( _t.getMinutes() < 10 ? '0' : '' ) + _t.getMinutes() + '분 수정됨';

		// 마지막 수정시간 출력
		$('#date').text(time);
		
		// 리스트 작성
		for(var key in pageList){
			for (var i = 0; i < pageList[key].length; i++){
				$('#list').append('<li><a href='+ srcDir + pageList[key][i] +'>' + titleList[key][i] + '<span>/ ' + pageList[key][i] + '</span>' + '</a></li>\n');
			}
		}

		// 변경 내용 쓰기
		fs.writeFileSync(file, $.html(), 'utf-8');
	}
}

module.exports = gulpIndxing;

gulpIndxing({
    'projectName': '네이버',
    'author': '메시'
});