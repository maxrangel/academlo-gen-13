const { BlobServiceClient } = require('@azure/storage-blob');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const blobClient = BlobServiceClient.fromConnectionString(
	process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobClient.getContainerClient('blogs-imgs');

containerClient
	.createIfNotExists()
	.then(res => {
		console.log(res);
	})
	.catch(err => console.log(err));

module.exports = { containerClient };
