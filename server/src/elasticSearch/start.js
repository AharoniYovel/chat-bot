import { Client } from '@elastic/elasticsearch';

const client = new Client({ "id": "iSo-uoQBp7JtTtBvj2p8", "name": "elasticSearch", "api_key": "mXpThA6IT1CG7Hq2zOu1QA", "encoded": "aVNvLXVvUUJwN0p0VHRCdmoycDg6bVhwVGhBNklUMUNHN0hxMnpPdTFRQQ==" })



async function run() {

    await client.index({
        index: 'game-of-thrones',
        document: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        document: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        document: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' })

    // Let's search!
    const result = await client.search({
        index: 'game-of-thrones',
        query: {
            match: { quote: 'winter' }
        }
    })

    console.log(result)
}

console.log(run);