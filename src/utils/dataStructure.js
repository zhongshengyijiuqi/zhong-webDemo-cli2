let pinyin = require('pinyin')
function tree(data, id, fatherId) {
	let list = [];
	data.forEach(item => {
		item.children = [];
		data.forEach(child => {
			if (child[fatherId] === item[id]) {
				item.children.push(child);
			}
		});
		if (!item[fatherId]) {
			list.push(item);
		}
	})
	return list
}
function treeToList(nodes) {
	if (!Array.isArray(nodes)) {
		console.error('请传入数组')
		return
	}
	var r = [];
	for (var i = 0, l = nodes.length; i < l; i++) {
		r.push(nodes[i]); // 取每项数据放入一个新数组
		if (Array.isArray(nodes[i]["children"]) && nodes[i]["children"].length > 0)
			// 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
			r = r.concat(this.treeToList(nodes[i]["children"]));
		// delete nodes[i]["children"]
	}
	return r;
}
/* 数组根据指定key去重 例:[{id:1},{id:1},{id:2}] => [{id:1},{id:2}] */
function removeRepeatByKey(list, key) {
	if (!key) {
		throw Error("removeRepeatByKey error： please pass parameters of key")
	}
	let result = [];
	let obj = {};
	for (let i in list) {
		if (!obj[list[i][key]]) {
			result.push(list[i]);
			obj[list[i][key]] = true;
		}
	}
	return result
}

//通讯录名称排序a-z
function sortAddressBook(arr, attribute_name) {
	//arr 数组   attribute_name需要排序的属性名   
	let letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
	let letterArray = letterString.split("").map(v => {
		return {
			letter: v,
			data: []
		};
	});
	let wordRegular = /^[\u4e00-\u9fa5]{0,}$/; //中文正则
	let letterRegular = /^[A-Za-z]+$/; //字母正则
	for (let item of arr) {
		if (letterRegular.test(item[attribute_name].slice(0, 1))) {
			//如果开头是字母
			for (let i in letterArray) {
				if (65 <= item[attribute_name].charCodeAt() <= 90) {
					//A-Z
					if (item[attribute_name].charCodeAt() - 65 == i) {
						letterArray[i].data.push(item);
					}
				}
				if (97 <= item[attribute_name].charCodeAt() <= 122) {
					//a-z
					if (item[attribute_name].charCodeAt() - 97 == i) {
						letterArray[i].data.push(item);
					}
				}
			}
		} else if (wordRegular.test(item[attribute_name].slice(0, 1))) {
			//如果开头是中文
			for (let i in letterArray) {
				if (
					97 <=
					pinyin(item[attribute_name], {
						style: pinyin.STYLE_NORMAL
					})[0][0].charCodeAt() <=
					122
				) {
					//a-z
					if (
						pinyin(item[attribute_name], {
							style: pinyin.STYLE_NORMAL
						})[0][0].charCodeAt() -
						97 ==
						i
					) {
						letterArray[i].data.push(item);
					}
				}
			}
		} else {
			//开头不是中文也不是字母
			letterArray[26].data.push(item);
		}
	}
	return letterArray;
}
function formatInvalidString(string) {
	return string ? string : "-"
}
function formatInvalidNumber(number) {
	return [null, undefined, NaN, Infinity, -Infinity].includes(number) ? "-" : number
}
export {
	tree,
	treeToList,
	removeRepeatByKey,
	sortAddressBook,
	formatInvalidString,
	formatInvalidNumber,
}
