# gulp-indexing
gulp html 마크업 리스트 출력

***
## v2.2
 - @index.html 템플릿 모바일 뷰포트 추가
 - @index.html 템플릿 li 개행

***
## v2.0
 - 마지막 수정 시간 분이 한자리일 경우 두자리 형식으로 수정

***
## 사용
```javascript
// 옵션설명(기본값)
setting = {
	'projectName': // 프로젝트 명 ('프로젝트명을 입력하세요')
	'author': // 작업자 ('작업자를 입력하세요.')
	'srcDir': // 리스트업할 페이지가 있는 폴더 ('demo/'')
	'outDir': // 마크업 리스트 파일 저장할 폴더 ('')
	'outFileName': // 생성할 마크업 리스트 파일 이름 (@index.html)
}

// 실행
gulpIndxing({
	'projectName': '미디어젠',
	...
});
```

***
### todo
- 안정화 및 코드 리팩토링
	- 리스트의 path 부분 확인
- 카테고리별 그룹핑 및 정렬 기능
- 다운로드 기능