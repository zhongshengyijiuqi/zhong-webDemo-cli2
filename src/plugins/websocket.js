// 长连接配置
import Vue from 'vue'
const signalR = require("@microsoft/signalr");
// access_token: tokenBar.access_token
async function createWebSocket(access_token) {
    const signalRConnection = new signalR.HubConnectionBuilder()
        .withUrl(process.env.VUE_APP_WEBSOCKET_HOST, {
            accessTokenFactory: () => access_token,
        })
        .build();
    const start = async () => {
        try {
            await signalRConnection.start();
            return signalRConnection
        } catch (error) {
            setTimeout(async () => {
                return await start();
            }, 5000)
        }
    };
    return await start();
}
Vue.prototype.$createWebSocket = createWebSocket