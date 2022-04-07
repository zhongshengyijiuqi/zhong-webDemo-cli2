/* 
	mode: 0：数值，1：时间(分钟数)；
	data: 数据集,如：[1,2,3,4,5]
	unit: 单位
*/
function echartsHandler({ mode, data, unit }) {
	if(mode !==0 && mode !== 1) {
		console.error("yAxisHandler error: invalid mode:",mode)
		return	
	}
	if(!data || !data.length || Math.max(...data) < 0) {
		console.error("yAxisHandler error: invalid data:",data)
		return		
	}
	const max = Math.max(...data) || 5
	let yAxisUnit = unit
	let yAxisMax = 5
	//y轴分成5段后 每段间隔值
	let yAxisInterval = 1
	let changedData = []
	if (mode === 0) {
		if (max > 500000000) {
			yAxisMax = Math.ceil(max / 100000000 / 5) * 5
			yAxisUnit = `亿${unit}`
			changedData = data.map(v => Number((v / 100000000).toFixed(2)))
		} else if (max > 50000 && max <= 500000000) {
			yAxisMax = Math.ceil(max / 10000 / 5) * 5
			yAxisUnit = `万${unit}`
			changedData = data.map(v => Number((v / 10000).toFixed(2)))
		} else {
			yAxisMax = Math.ceil(max / 5) * 5 < 5 ? 5 : Math.ceil(max / 5) * 5
			yAxisUnit = unit
			changedData = data.map(v => v)
		}
	} else {
		if (max > 60 * 24 * 5) {
			yAxisMax = Math.ceil(max / (60 * 24) / 5) * 5
			yAxisUnit = '天'
			changedData = data.map(v => Number((v / 60 / 24).toFixed(2)))
		} else if (max > 60 * 5 && max <= 60 * 24 * 5) {
			yAxisMax = Math.ceil(max / 60 / 5) * 5
			yAxisUnit = '小时'
			changedData = data.map(v => Number((v / 60).toFixed(2)))
		} else {
			yAxisMax = Math.ceil(max / 5) * 5 ? 5 : Math.ceil(max / 5) * 5
			yAxisUnit = unit
			changedData = data.map(v => v)
		}
	}
	yAxisInterval = yAxisMax / 5
	return {
		yAxisUnit,
		yAxisMax,
		yAxisInterval,
		changedData,
	}
}
export {
	echartsHandler,
}