import mitt from "mitt";
const live2dEventName = "send_message_to_live2d";
const emitter = mitt();
export const live2dEmitter = emitter.emit.bind(null, live2dEventName);
export default emitter;
