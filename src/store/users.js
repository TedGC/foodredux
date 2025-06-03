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
    await writeData(storedData)
    return ({ email, id: userId, password: hashedPw })
}

async function get(email) {
    const storedData = await readData()
    if (!storedData.users || storedData.users.length === 0) {
        throw new NotFoundError('could not find the user')
    }

    const user = storedData.users.find(ev => ev.email === email)
    if (!user) {
        throw new NotFoundError('could not find the user')
    }

    return user

}