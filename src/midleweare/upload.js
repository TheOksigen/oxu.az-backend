const { S3Client, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const deleteImage = async (req, res) => {
    const { filename } = req.params;
    const bucketName = 'telefonclubb';
    try {
        const deleteParams = {
            Bucket: bucketName,
            Key: filename,
        };

        await s3.send(new DeleteObjectCommand(deleteParams));

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
};
const listAllImages = async (req, res) => {
    const bucketName = 'telefonclubb';

    try {
        const data = await s3.send(new ListObjectsV2Command({
            Bucket: bucketName,
        }));

        const imageKeys = data.Contents.map(item => item.Key);
        res.send(imageKeys)
        return imageKeys;
    } catch (error) {
        console.error("Error fetching images: ", error);
        throw new Error("Error fetching images");
    }
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'telefonclubb',
        key: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

module.exports = { upload, deleteImage, listAllImages }
