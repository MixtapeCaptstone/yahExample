Meteor.methods( {
  checkYT : function (search) {
    // search = 'macklemore';
    var url = "https://www.googleapis.com/youtube/v3/search";
    var params = {
        key: apiKey,
        part: "snippet",
        q: search,
        type: "video",
        maxResults: 5
    };
    var res = Meteor.http.call('GET', url, {params: params});
    return res;
}
});
