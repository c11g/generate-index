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
		'outFileName': setting.outFileName || '@index.html'
	}

	var projectName = option.projectName,
		author = option.author,
		srcDir = option.srcDir,
		outDir = option.outDir,
		outFileName = option.outFileName;

	// html 과 page title 리스트
	var htmlList = [],
		titleList = [];
	
	getHtmlList(srcDir);
	getTitleList(htmlList, srcDir);
	createIndex(outDir + outFileName);

	// html 리스트 추출
	function getHtmlList(srcDir){
		var _allFiles = fs.readdirSync(srcDir);

		for(var index in _allFiles){
			var _list = _allFiles[index];

			// html파일인지 확인 후 htmlList에 추가
			var _check = _list.indexOf('.html');

			if( _check !== -1 ) {
				htmlList.push(_list);
			}
		}
	}

	// page title 추출
	function getTitleList(htmlList, srcDir){
		for ( var i=0 ; i < htmlList.length ; i++ ) {
			var _data = fs.readFileSync(srcDir + htmlList[i], 'utf-8');

			// <title> 추출 후 titleList에 추가
			var pattern = /<title>([\s\S]*)<\/title>/i,
				title = pattern.exec(_data)[1];
				
				titleList.push(title);
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

		// 마지막 수정
		$('#date').text(time)
		
		// 인덱스 리스트
		for (var i = 0; i < htmlList.length; i++ ) {
			$('#list').append('<li><a href='+ srcDir + htmlList[i] +'>' + titleList[i] + '<span>/ ' + htmlList[i] + '</span>' + '</a></li>');
		}

		// 변경 내용 쓰기
		fs.writeFileSync(file, $.html(), 'utf-8')
	}
}

module.exports = gulpIndxing;