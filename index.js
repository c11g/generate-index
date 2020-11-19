const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const getTitle = filepath => {
	const data = fs.readFileSync(filepath, "utf-8");
	const pattern = /<title>([\s\S]*)<\/title>/i;
	return pattern.exec(data)[1];
}

const render = (projectName, author, srcDir, output) => {
	const htmlTemplate = fs.readFileSync(path.join(__dirname, "template/@temp.html"), "utf-8");
	fs.writeFileSync(output, htmlTemplate, "utf8");

	const $ = cheerio.load(htmlTemplate, { decodeEntities: false });
	$("#title").text(projectName);
	$("#admin").text("작업자 : " + author);

	const date = new Date();
	const time = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()<10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()} 수정됨`;
	$("#date").text(time);
	
	for (const folder in data) {
		$(".content").append(`<h2>${folder}</h2>`);
		$(".content").append(`<ul class="list">${
			data[folder].reduce((acc, menu) => acc + `<li><a href="./${folder.slice(srcDir.length)}${menu[0]}">${menu[1]}<span>:${menu[0]}</span></a></li>`, "")
		}</ul>`);
	}
	fs.writeFileSync(output, $.html(), "utf-8");
}

const scrap = (srcDir, ext) => {
	data[srcDir] = [];
	fs.readdirSync(srcDir, {withFileTypes: true}).forEach(item => {
		if (item.isDirectory()) {
			const dir = item.name;
			scrap(`${srcDir}${dir}/`, ext);
		} else if (item.isFile()) {
			const name = item.name;
			if (name.indexOf(ext) === -1) return;
			const title = getTitle(`${srcDir}${name}`);
			data[srcDir].push([name, title]);
		}
	});
}

const indexList = ({
	srcDir = null,
	ext = ".html",
	projectName = "프로젝트명을 입력하세요",
	author = "작업자를 입력하세요.",
	output = "@index.html"
}) => {
	if (!srcDir) return console.log("\"srcDir\"이 없습니다.");
	scrap(srcDir, ext);
	render(projectName, author, srcDir, `${srcDir}${output}`);
}

const data = {};

module.exports = indexList;

// 테스트용 코드
indexList({
	"projectName": "Enter a project",
	"author": "Enter a author",
	"srcDir": "demo/"
});