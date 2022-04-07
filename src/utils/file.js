//根据文件路径拿到文件后缀名
export function getFileType(fileUrl) {
    if (!fileUrl.includes('.')) {
        return fileUrl
    }
    let splitArr = fileUrl.split('.')
    return splitArr[splitArr.length - 1].toLocaleLowerCase()
}

//图片404转文字
export function imgError(e, size) {
    let size_number = '24px'
    if (size) {
        size_number = `${size}px`
    }
    let word = e.target.alt.slice(0, 1)
    let dom = document.createElement("div")
    dom.innerText = word
    dom.style.height = size_number
    dom.style.width = size_number
    dom.style.borderRadius = '50%'
    dom.style.backgroundColor = 'grey'
    dom.style.color = '#ffffff'
    dom.style.textAlign = 'center'
    dom.style.lineHeight = size_number
    if (e.target.parentElement)
        e.target.parentElement.replaceChild(dom, e.target)
}
//图片为空
export function imgOnNull(url, type) {
    //有type代表头像   
    if (type) {
        if (!url) {
            return "https://dl-yiyunappclient.effio.cn/resource/common/avatar.png"
        } else {
            return url
        }
    } else {
        if (!url) {
            return "https://dl-yiyunappclient.effio.cn/resource/common/imageNull.png"
        } else {
            return url
        }
    }
}