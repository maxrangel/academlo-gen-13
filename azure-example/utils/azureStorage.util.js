const { BlobServiceClient } = require('@azure/storage-blob');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const blobClient = BlobServiceClient.fromConnectionString(
	process.env.AZURE_STORAGE_CONNECTION_STRING
);

const getContainerClient = async () => {
	const containerClient = blobClient.getContainerClient('blogs-imgs');

	await containerClient.createIfNotExists();

	return containerClient;
};

const uploadImage = async (img, blobName) => {
	const containerClient = await getContainerClient();

	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	await blockBlobClient.upload(img.buffer, img.buffer.length);
};

const getImage = async blobName => {
	const containerClient = await getContainerClient();
	const blobClient = containerClient.getBlobClient(blobName);

	return await blobClient.download();
};

module.exports = { uploadImage, getImage };
