# generate-index
마크업 리스트 출력

***
## v4.0.1
인덱스 리스트는 해당 폴더(srcDir)에 생성

***
## 사용
```js
// 실행
indexList({
	"projectName": "My Project",
	"author": "c11g",
	"srcDir": "demo/"
});
```
## options
- `projectName`: *optional*, default: `"Enter a project"`
- `author`: *optional*, default: `"Enter a author"`
- `srcDir`: *required*, source directory, ex) `"demo/"`
- `ext`: *optional*, extention, default: `".html"`
- `output`: *optional*, output file name, default: `"@index.html"`

***
### todo
- search 기능