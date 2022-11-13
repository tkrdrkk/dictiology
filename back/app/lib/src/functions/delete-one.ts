import {
  DeleteItemCommand,
  DeleteItemInput,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";

const TABLE_NAME = process.env.TABLE_NAME || "";
const PRIMARY_KEY = process.env.PRIMARY_KEY || "";

const dbclient = new DynamoDBClient({ region: "ap-northeast-1" });

export const handler = async (event: any = {}): Promise<any> => {
  const requestedItemId = event.pathParameters.id;
  if (!requestedItemId) {
    return {
      statusCode: 400,
      body: `Error: You are missing the path parameter id`,
    };
  }

  const params: DeleteItemInput = {
    TableName: TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: requestedItemId,
    },
  };

  const command = new DeleteItemCommand(params);

  try {
    const response = await dbclient.send(command);
    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};
