var MongoClient = require('mongodb').MongoClient;

// Connect to the db

var host = 'localhost' ;
var port = 27017  ;
var db =  'calendar' ;
var uri = "mongodb://" + host + ":" + port + "/" + db;

var insert = function (collectionName, entry) {
	MongoClient.connect(uri, function(err, db) {
  		if(!err) {
    		console.log("begin to insert");
  		}
  		var collection = db.collection(collectionName) ;
  		collection.insert(entry);
  		db.close();
  	})
}

var remove = function(collectionName, entry) {
	MongoClient.connect(uri, function(err, db) {
  		if(!err) {
    		console.log("begin to remove");
  		}
  		var collection = db.collection(collectionName) ;
  		collection.remove(entry);
  		db.close();
  	})
}

var update = function(collectionName, entry1, entry2) {
	MongoClient.connect(uri, function(err, db) {
  		if(!err) {
    		console.log("begin to update");
  		}
  		var collection = db.collection(collectionName) ;
  		collection.update(entry1, {$set: entry2});
  		db.close();
  	})
}

var find = function(collectionName, entry, callback){
	MongoClient.connect(uri, function(err, db) {
  		if(!err) {
    		console.log("begin to read");
  		}
  		var collection = db.collection(collectionName) ;
  		collection.findOne(entry, function(err, item) {
  	     callback(item);
  		});
  		db.close();
  	})
}

var  finds = function(collectionName, entry, callback){
  MongoClient.connect(uri, function(err, db) {
      if(!err) {
        console.log("begin to read");
      }
      var collection = db.collection(collectionName) ;
      collection.find(entry).toArray(function(err, items) {
        callback(items);
        db.close();
      });
  })
}

var insertUnique = function(collectionName, entry1, entry2){
	MongoClient.connect(uri, function(err, db) {
  		if(!err) {
    		console.log("begin to insertUnique");
  		}
  		var collection = db.collection(collectionName) ;
  		collection.findOne(entry1, function(err, item) {
  			if(!item){
  				collection.insert(entry2);
  			} else {
  				console.log("Already have: " + entry1) ;
  			}
  			db.close();
  			return item;
  		});
  	})
}

module.exports = { 
	'insert' : insert, 
	'remove': remove, 
	'update': update, 
	'find' : find, 
  'finds' : finds,
	'insertUnique' : insertUnique }



