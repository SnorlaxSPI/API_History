import { consume } from './rabbitmq-server';
import { HistoryGeneratorService } from './services/HistoryGeneratorService';

//worker.js
console.log("🚀🚀 Worker started");

consume("myQueue", async (message: { content: string; })  => {
    //process the message
    
    const historyGeneratorService = new HistoryGeneratorService();
    const test = JSON.parse(message.content);
    const historyGenerate = await historyGeneratorService.execute(test.companyId, test.clientKey, test.dateFrom, test.dateTo);
    
    console.log("processing " + message.content.toString());
})