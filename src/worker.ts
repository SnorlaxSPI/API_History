import { consume } from './rabbitmq-server copy';
import { HistoryGeneratorService } from './services/HistoryGeneratorService';

//worker.js
console.log("worker started");

consume("myQueue", async (message: { content: string; })  => {
    //process the message
    console.log("processing " + message.content.toString());
    
    const historyGeneratorService = new HistoryGeneratorService();
    const test = JSON.parse(message.content);
    const historyGenerate = await historyGeneratorService.execute(test.companyId, test.clientKey, test.dateFrom, test.dateTo);
})