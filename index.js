const { DynamoDBClient,CreateTableCommand,DeleteTableCommand } = require("@aws-sdk/client-dynamodb")
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb")

const client = new DynamoDBClient({region:'us-east-1'})
const db = DynamoDBDocumentClient.from(client)

const tableName = 'example-table'
const table2Name = 'example-table-2'



const createTable = async(table) => {
    try{
    
      const tb = new CreateTableCommand({TableName:table,
        KeySchema:[
        {AttributeName:'pk',KeyType:'HASH'},
        {AttributeName:'fk',KeyType:'RANGE'}
      ],
      AttributeDefinitions:[
        {AttributeName:'pk',AttributeType:'S'},
        {AttributeName:'fk',AttributeType:'S'},
        {AttributeName:'data',AttributeType:'S'}
      ],
      ProvisionedThroughput:{
        ReadCapacityUnits:5,
        WriteCapacityUnits:5
      },
    
    })


      await client.send(tb)
      console.log('Table Created')
    }catch(ex){
        console.error(ex)
    }
}


const deleteTable = async(table)=>{
    try{
       await client.send(new DeleteTableCommand({TableName:table}))
       console.log('Table deleted')
    }catch(ex){
        console.error(ex)
    }
}


const putItem = async(table,item)=>{
    try{
        await db.send(new PutCommand({
            TableName:table,
            Item:item
        }))

        console.log('item created')
    }catch(ex){
        console.error(ex)
    }
}


const getItem = async(table,key)=>{
    try{
      let item =  await db.send(new GetCommand({
        TableName:table,
        key:key,
      }))
      return item.Item;
    }catch(ex){
        console.error(ex)
    }
}


const updateItem = async(table,key,updateExp,expAttr) =>{
    try{
     await db.send(new UpdateCommand({
        Key:key,
        TableName:table,
        UpdateExpression:updateExp,
        ExpressionAttributeValues:expAttr,
     }))
     console.log('updated')
    }catch(ex){
        console.error(ex)
    }
}

const deleteItem = async(table,key)=>{
    try{
     await db.send(new DeleteCommand({
        TableName:table,
        Key:key,
     }))
     console.log('Deleted!')
    }catch(ex){
        console.error(ex)
    }
}