import store from '.';


const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');



async function add(data) {
    const storedData = await readData()
    const userId = generateId()
    const hashedPw = hash(data.password, 12)

    if (!storedData.users) {
        storedData.users = []
    }

    storedData.users.push({ ...data, id: userId, password: hashedPw })
    const
}