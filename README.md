# generate-index

### v4.0.1
```sh
npm i -D generate-index
```

### 사용
```js
indexList({
	srcDir: "demo/",
	projectName: "My Project",
	author: "c11g"
});
```
### options
- `srcDir`: *required*, source directory, ex) `"demo/"`
- `projectName`: *optional*, default: `"Enter a project"`
- `author`: *optional*, default: `"Enter a author"`
- `ext`: *optional*, extention, default: `".html"`
- `output`: *optional*, output file name, default: `"@index.html"`

### todo
- search 기능