const functions = require('firebase-functions')
const admin = require('firebase-admin')
// // https://firebase.google.com/docs/functions/write-firebase-functions
admin.initializeApp();

// Respond to an https request with list of books
exports.getBooks = functions.https.onRequest((request, response) => {
 admin.firestore().collection('books').get()
 .then((querySnapshot) => {
     let results = [];
     querySnapshot.forEach(doc =>{
         let book = doc.data()
         book.id = doc.id
        results.push(book)
     })
     response.send(results)
 })
 .catch((error) =>{
     console.log(error)
     response.status(500).send(error)
 })
});

//When a new book is created, respond by creating the timestamp
exports.onBookCreated = functions.firestore.document('/books/{bookId}').onCreate((snapshot, context) => {
    console.log(`New book ${context.params.bookId} created`)
    return snapshot.ref.update({timestamp: {
        server_time: admin.firestore.FieldValue.serverTimestamp(),//server time
        created: nowTimestamp() 
    } })                                         
})

// when any book record is altered
exports.onBookBorrow = functions.firestore.document('/books/{bookId}').onUpdate((snapshot, context) => {
    const after = snapshot.after.data() //before update
    const before = snapshot.before.data() //after update
    //only check if the user value changed
    if(after.user !== null && (after.user !== before.user)){
       let timestamp = after.timestamp;
       timestamp.last_borrowed = nowTimestamp()
        return snapshot.after.ref.update({
            timestamp: timestamp
        })
    }
    return null //exit the function to avoid infinte loop
})

//simple funcion to return the current timestamp
function nowTimestamp(){
    return Math.round(new Date().getTime()/1000)
}
