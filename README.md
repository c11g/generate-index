# generate-index
마크업 리스트 출력

***

## v2.1
outDir 삭제

***
## 사용
```javascript
// 옵션설명(기본값)
setting = {
	'projectName': // 프로젝트 명 ('프로젝트명을 입력하세요')
	'author': // 작업자 ('작업자를 입력하세요.')
	'srcDir': // 리스트업할 페이지가 있는 폴더 ('demo/'')
	'extention': // 확장자 지정 ('.html')
	'outFileName': // 생성할 마크업 리스트 파일 이름 (@index.html)
}

// 실행
generateIndxing({
	'projectName': '미디어젠',
	...
});
```

***
### todo
- 안정화 및 코드 리팩토링
- 다운로드 기능