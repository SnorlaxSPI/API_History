import { consume } from './rabbitmq-server';
import { HistoryGeneratorService } from './services/HistoryGeneratorService';

//worker.ts
console.log("🚀🚀 Worker started");

consume("myQueue", async (message: { content: string; })  => {
    
    console.log("processing " + message.content.toString());   

    //process the message
    const test = await JSON.parse(message.content);
    const historyGeneratorService = new HistoryGeneratorService();
    const historyGenerate = await historyGeneratorService.execute(test.companyId, test.clientKey, test.dateFrom, test.dateTo);  
    
});
