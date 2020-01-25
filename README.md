# vlibrary-cloud-functions
In this repository are the cloud functions created for the vlibrary app. It respond to http request and some firebase feature triggered events

## Simple API created
Cloud functions can be triggered by http request and send response back. A simple cloud function I wrote that is getBooks. It can serve as an
API endpoint. The function can be triggered at 
```
https://us-central1-vlibrary-3fcc6.cloudfunctions.net/getBooks
```
If you want to fetch a book by ISBN, you can pass a request query 'isbn'like 
```
https://us-central1-vlibrary-3fcc6.cloudfunctions.net/getBooks?isbn=[isbn_number]
```
This will only fetch books that match the passed ISBN.
