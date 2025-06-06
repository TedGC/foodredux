import fs from 'node:fs'
import slugify from slugify
import xss from xss
import sql from 'better-sqlite3'

const db = sql('meals.db')


export async function getMeasl() {

    await new Promise((resolve) => setTimeout(resolve, 5000))

    return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(slug) {

    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

// the purpose of this function is to build a briadge between the buffered iamge iamge and integrate it into
// the fileanme specified for each folder defined by 'slug' in NextJS 
// this is naother feature from NodeJs but also usable in NextJS as it wa sbuilt on top of NodeJs using React

export async function saveMeals(meal) {
    // these are additional features to add values to the function as security measures 
    meal.slug = slugify(meal.title, { lower: true })
    meal.descriptions = xss(meal.descriptions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.image}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = meal.image.bufferArray()

    stream.write(Buffer.from(bufferedImage), (error) => {
        throw new Error('something went wrong')
    })

    meal.iamge = `/images/${fileName}`

    return (
        db.prepare('INSERT INTO meals {title, summary, name, price} VALUES {@title, @summary, @name, @price}').run(meal)
    )
}