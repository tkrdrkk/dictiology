import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
const TABLE_NAME = process.env.TABLE_NAME || "";
const PRIMARY_KEY = process.env.PRIMARY_KEY || "";

const dbclient = new DynamoDBClient({ region: "ap-northeast-1" });

const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
  DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;

export const handler = async (event: any = {}): Promise<any> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: "invalid request, you are missing the parameter body",
    };
  }
  const item =
    typeof event.body == "object" ? event.body : JSON.parse(event.body);
  item[PRIMARY_KEY] = { S: uuidv4() };
  const params: PutItemCommandInput = {
    TableName: TABLE_NAME,
    Item: item,
  };
  const command = new PutItemCommand(params);

  try {
    console.log(JSON.stringify(command.input));
    const response = await dbclient.send(command);
    return { statusCode: 201, body: JSON.stringify(response) };
  } catch (dbError) {
    console.error("error >> ", JSON.stringify(dbError));
    const dbErrorWithInfo = dbError as { code: string; message: string };
    const errorResponse =
      dbErrorWithInfo.code === "ValidationException" &&
      dbErrorWithInfo.message.includes("reserved keyword")
        ? DYNAMODB_EXECUTION_ERROR
        : RESERVED_RESPONSE;
    return { statusCode: 500, body: errorResponse };
  }
};
