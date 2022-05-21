import client, { Connection, Channel, ConsumeMessage } from 'amqplib';

//queue.js
function connect(){
  return require('amqplib').connect("amqp://username:password@localhost:5672").then(conn => conn.createChannel());
}
 
function createQueue(channel: Channel, queue){
  return new Promise((resolve, reject) => {
    try{
      channel.prefetch(1);
      channel.assertQueue(queue, { durable: true });
      resolve(channel);
    }
    catch(err){ reject(err) }
  });
}
 
export function sendToQueue(queue, message){
  connect()
    .then(channel => createQueue(channel, queue))
    .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))))
    .catch(err => console.log(err))
}
 
export function consume(queue, callback){
  connect()
    .then(channel => createQueue(channel, queue))
    .then(channel => channel.consume(queue, callback, { noAck: true }))
    .catch(err => console.log(err));
}
 
module.exports = {
  sendToQueue,
  consume
}