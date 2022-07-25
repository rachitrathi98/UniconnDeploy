exports.recommended = async (req,res,next,Model)=>{
    // Model.constructor.modelName --> Model Name as defined
    console.log(req.body);
    console.log(`No ${Model.collection.collectionName} for your Interests, yet :-|`)
      const result = await Model.find({ "field_of_interest": { "$in": req.body.field_of_interest } });
      if (result.length)
        res.status("200").send(result);
      else
        res.status("404").send(`No ${Model.collection.collectionName}s for your Interests, yet :-|`);
    // next();
}