// External Dependancies
const boom = require('boom')

// Get Data Models
const Subscribe = require('../models/Sub')

const crypto = require('crypto');

// encrypt base64 text

const encrypt = (base64text, password) => {
  const algorithm = 'aes-256-cbc';

  const key = crypto.scryptSync(password, 'saltsalt', 32);
  const iv = 'dce4ac80ccf52262'; // Initialization vector.

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(base64text, 'utf8','hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

const decrypt = (encryptedText, password) => {
  const algorithm = 'aes-256-cbc';
    
  const key = crypto.scryptSync(password, 'saltsalt', 32);
  // The IV is usually passed along with the ciphertext.
  const iv = 'dce4ac80ccf52262'; // Initialization vector.

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted
}

// Get all subs
exports.getSubscribes = async (req, reply) => {
  try {
    const subs = await Subscribe.find()
    return subs
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single sub by ID
exports.getSingleSubscribe = async (req, reply) => {
  try {
    const id = req.params.id
    const sub = await Subscribe.findById(id)
    reply.send( decrypt(sub.encrypted, sub.pwd) ) ;
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.checkSubscribe = async(req, reply) => {
  try {
    const sub = await Subscribe.find({user: req.body.user, pwd: req.body.pwd})
    return sub;
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new sub
exports.addSubscribe = async (req, reply) => {
  try {
    const sub = new Subscribe({ ...req.body, "encrypted": encrypt(req.body.encrypted, req.body.pwd)})
    return sub.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing sub
exports.updateSubscribe = async (req, reply) => {
  try {
    const id = req.params.id
    const obj = await Subscribe.findById(id)
    const sub = { ...req.body, "encrypted": encrypt(req.body.encrypted, obj.pwd)}
    const { ...updateData } = sub
    const update = await Subscribe.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a sub
exports.deleteSubscribe = async (req, reply) => {
  try {
    const id = req.params.id
    const sub = await Subscribe.findByIdAndRemove(id)
    return sub
  } catch (err) {
    throw boom.boomify(err)
  }
}