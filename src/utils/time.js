//计算持续时长 timeDifference单位: 秒
export function calcContinueTime(timeDifference) {
    if (timeDifference < 0) {
        timeDifference = 0;
    }
    let days,hours,minutes,seconds
    days = Math.floor(timeDifference / (24 * 3600));
    let leave1 = timeDifference % (24 * 3600);
    hours = Math.floor(leave1 / 3600);
    let leave2 = leave1 % 3600;
    minutes = Math.floor(leave2 / 60);
    let leave3 = leave2 % 60;
    seconds = Math.round(leave3);
    if (!days) {
        if (hours) {
            return minutes?`${hours}小时${minutes}分`:`${minutes}分`;
        } else {
            return `${minutes}分`;
        }
    } else {
        return hours?`${days}天${hours}小时`:`${days}天`;
    }
}

