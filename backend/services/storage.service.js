const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file) {
    // console.log(imagekit);

    const result = await imagekit.files.upload({
        file: file.buffer.toString("base64"),
        fileName: `${Date.now()}-${file.originalname}`,
    });

    return result;
}

async function deleteFile(fileId) {
    const result = await imagekit.files.delete(fileId)

    return result;
}

module.exports = {uploadFile, deleteFile};