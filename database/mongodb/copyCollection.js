db.waziuplocal.find().forEach(function (doc1) {
    var doc2 = db.waziupremote.find({ id: doc1.id }, { Temperature: 1 });
   // if (doc2 != null) {
        if(doc1.Timestamp != doc2.Timestamp){
        db.waziupremote.save(doc1);
    }
});
