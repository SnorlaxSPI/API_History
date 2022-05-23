import { Request, Response} from "express"
//import {HistoryGeneratorService} from "../services/HistoryGeneratorService"
import { sendToQueue } from "../rabbitmq-server";

class HistoryGeneratorController {
  /* 
  * Called HistoryGeneratorService
  *
  * @Param companyId, clientKey, dateFrom, dateTo
  *
  * @return object
  */
  async handle(request: Request, response: Response) {
    //const {companyId, clientKey, dateFrom, dateTo} = request.body;
    
    sendToQueue("myQueue", request.body);

    //const historyGeneratorService = new HistoryGeneratorService();
    //const historyGenerate = await historyGeneratorService.execute(companyId, clientKey, dateFrom, dateTo)
       
    return response.json();
  }

}

export { HistoryGeneratorController }