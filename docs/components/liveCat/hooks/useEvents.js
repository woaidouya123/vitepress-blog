import mitt from "mitt";
export const EVENT_NAME = "send_message_to_live2d";
export let emitter = mitt();

export const useEvents = (callback, externalMitt) => {
    emitter = externalMitt || emitter;
    emitter.on(EVENT_NAME, callback);
}
