import boto3
import json

dynamodb = boto3.resource("dynamodb")
resume_visitor_count_table = dynamodb.Table("ResumeVisitorCount")
connection_id_table = dynamodb.Table("ConnectionIDs")
apigw_client = boto3.client("apigatewaymanagementapi", endpoint_url=f"https://6puia97db8.execute-api.eu-west-1.amazonaws.com/dev/")

def lambda_handler(event, context):
    route = event["requestContext"]["routeKey"]
    connection_id = event["requestContext"]["connectionId"]
    print(f"Route: {route}, ConnectionId: {connection_id}")

    if route == "$connect":
        print("Client connected")

        response = resume_visitor_count_table.update_item(
            Key={"id": "view"},
            UpdateExpression="ADD Quantity :inc",
            ExpressionAttributeValues={":inc": 1},
            ReturnValues="UPDATED_NEW"
        )
        updated_count = response["Attributes"]["Quantity"]
        print(f"Visitor count updated to {updated_count}")

        connection_id_table.put_item(Item={"id": connection_id})
        print(f"Saved connection ID {connection_id}")



        # Check if other users are online
        response = connection_id_table.scan()
        active_connections = [c["id"] for c in response["Items"] if c["id"] != connection_id]

        # If there are other users online, send a "presence" message to them
        if active_connections:
            message = json.dumps({
                "type": "presence",
                "msg": "There's someone else viewing this together with you"
            })

            for conn in active_connections:
                try:
                    apigw_client.post_to_connection(
                        ConnectionId=conn,
                        Data=message.encode("utf-8")
                    )
                except apigw_client.exceptions.GoneException:
                    connection_id_table.delete_item(Key={"id": conn})

        return {"statusCode": 200, "body": "Connected"}
        

    elif route == "$disconnect":
        print("Client disconnected")

        connection_id_table.delete_item(Key={"id": connection_id})
        print(f"Deleted connection ID {connection_id}")

        return {"statusCode": 200, "body": "Disconnected"}

    else:
        print("Unknown route")
        return {"statusCode": 400, "body": "Unknown route"}
