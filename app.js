// import bigchaindb-orm
import Orm from 'bigchaindb-orm'

// connect to BigchainDB
const bdbOrm = new Orm(
    "http://172.18.0.20:9984/api/v1/"
)

// define(<model name>,<additional information>)
// <model name>: represents the name of model you want to store
// <additional inf.>: any information you want to pass about the model (can be string or object)
// note: cannot be changed once set!
bdbOrm.define("Product", "https://schema.org/Product")

// create a public and private key that is going to be used by everyone
// also the private key must be made public and be shared because every user
// should be able to edit every product/producer/label/information
const publicKeypair = new bdbOrm.driver.Ed25519Keypair()

// the publicKeypair must be publbished openly somewhere and avilable to everyone

// the data should be signed by the user nevertheless, so
// create a public and private key for Alice as well
const aliceKeypair = new bdbOrm.driver.Ed25519Keypair()

// there must be a user registry (user assets), where Alice's username ("alice"),
// public key, email address etc. are stored

// how to make some data open (username, public key), but hide some other data (email address?)

const productData = {
  gtin: "7612100055557",
  createdBy: "alice",
  createdAt: new Date().toString(),
  producer: "Wander AG",
  labels: [{id: "H2892sKSksksdkwops9", name: {de: "UTZ zertifiziert", en: "UTZ certified"}}],
  locale: [
    {
      lang: "de",
      name: "Ovomaltine crunchy cream — 400 g",
      price: "4.99",
      currency: "€",
      description: "Brotaufstrich mit malzhaltigem Getränkepulver Ovomaltine",
      quantity: "400 g",
      ingredients: "33% malzhaltiges Getränkepulver: Ovomaltine (Gerstenmalzextrakt, kondensierte Magermilch, kondensiertes Milchserum, fettarmer Kakao, Zucker, Fruktose, Magnesiumcarbonat, Calciumphosphat, Rapsöl, Vitamine [A, E, B1, B2, Pantothensäure, B6, Folsäure, B12, C, Biotin, Niacin], Kochsalz, Aroma Vanillin), Zucker, Pflanzenöle (Raps- und Palmöl), 2.6% Haselnüsse, Calciumphosphat, fettarmer Kakao, Emulgator Sonnenblumenlecithin, Aroma Vanillin.",
      packaging: ["Glas", "Plastik"],
      categories: ["Brotaufstriche", "Frühstück", "Nougatcremes"],
      image: "products/1/de_1.png",
      productUrl: "http://www.ovomaltine.de/produkte/ovomaltine-crunchy-cream-1/"
    }
  ]
}
// TODO: Find a function for signing arbitrary data with Alice's Ed25519 private key
const dataSignature = "0x1f62a52c86fe9021b2834cd838392ed0192991a3"

// from the defined models in our bdbOrm we create an asset with Alice as owner
bdbOrm.models.Product
    .create({
        keypair: publicKeypair,
        data: {
          data: productData,
          signature: dataSignature
        }
    })
    .then(asset => {
        /*
            asset is an object with all our data and functions
            asset.id equals the id of the asset
            asset.data is data of the last (unspent) transaction
            asset.transactionHistory gives the full raw transaction history
            Note: Raw transaction history has different object structure then
            asset. You can find specific data change in metadata property.
        */
        console.log(asset.id)
    })
