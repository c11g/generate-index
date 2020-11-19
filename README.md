# generate-index

## v4.0.1
```sh
npm i -D generate-index
```

---
## 사용
```js
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

---
### todo
- search 기능