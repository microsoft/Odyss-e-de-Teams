const crypto = require('crypto');

const Crypto = {};
const CRYPTO_ALGORITHM="aes-256-ctr"
const CRYPTO_SECRET_KEY="suite de charactère aléatoire"

Crypto.encrypt = (str) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, CRYPTO_SECRET_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

Crypto.decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM,CRYPTO_SECRET_KEY, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = Crypto;