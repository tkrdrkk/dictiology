import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || "";

const dbclient = new DynamoDBClient({ region: "ap-northeast-1" });

export const handler = async (): Promise<any> => {
  const params: ScanCommandInput = {
    TableName: TABLE_NAME,
  };

  const command = new ScanCommand(params);

  try {
    const response = await dbclient.send(command);

    return { statusCode: 200, body: JSON.stringify(response.Items) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};
