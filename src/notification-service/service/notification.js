export const ProcessNotification = (msg) => {
    const messageJson = JSON.parse(msg.content.toString())

    console.log(`New Message: ${msg.content.toString()}`)
}