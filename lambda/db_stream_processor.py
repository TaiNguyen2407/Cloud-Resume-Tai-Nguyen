import boto3
import json

dynamodb = boto3.resource("dynamodb")
connection_id_table = dynamodb.Table("ConnectionIDs")
apigw_client = boto3.client("apigatewaymanagementapi", endpoint_url=f"https://6puia97db8.execute-api.eu-west-1.amazonaws.com/dev/")
def lambda_handler(event, context):
    try:
        for record in event.get("Records", []):
            if record["eventName"] == "MODIFY":
                new_count = int(record["dynamodb"]["NewImage"]["Quantity"]["N"])
                print(f"Detected updated visitor count: {new_count}")

                response = connection_id_table.scan()
                items = response.get("Items", [])
                print(f"Active connections: {len(items)}")
        

                message = json.dumps({
                    "type": "updatedCount",
                    "count": new_count
                })


            for conn in items:
                connection_id = conn["id"]
                try:
                    apigw_client.post_to_connection(
                        ConnectionId=connection_id,
                        Data=message.encode("utf-8")
                    )
                except apigw_client.exceptions.GoneException:
                    print(f"Connection {connection_id} is gone, deleting...")
                    connection_id_table.delete_item(Key={"id": connection_id})
                except Exception as e:
                    print(f"Error sending to {connection_id}: {e}")

        return {"statusCode": 200, "body": "Messages sent"}

    except Exception as e:
        print(f"Error in DBStreamProcessor: {e}")
        return {"statusCode": 500, "body": str(e)}
