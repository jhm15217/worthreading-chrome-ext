chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    code: "chrome.extension.sendRequest({selection: window.getSelection().toString() || 'Insert message', url: document.URL});"
  });
}); 

// function fakePost(text, link) {   
//     var form = document.createElement("form");
//     form.setAttribute("method", "post");
//     form.setAttribute("action", "http://www.worth-reading.org/chrome_extension/new");
//     form.setAttribute("accept-charset", "UTF-8");
//     var params = {text: text, link: link};
//     for(var key in params) {
//         var hiddenField = document.createElement("input");
//         hiddenField.setAttribute("type", "hidden");
//         hiddenField.setAttribute("name", key);
//         hiddenField.setAttribute("value", params[key]);
//         form.appendChild(hiddenField);
//     }
//     document.body.appendChild(form);
//     form.submit();
// };

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    // fakePostCode = fakePost.toString().replace(/(\n|\t)/gm, '');
    chrome.tabs.query({url: "http://worth-reading.org/*"}, function(tab) {
        if (tab[0]) {
            chrome.tabs.update(tab[0].id,  {
                'url': 'http://worth-reading.org/chrome_extension/new?text=' + request.selection
                    + '&link=' + request.url

                //  { 'url': "javascript:" + fakePostCode + "; fakePost('"
                //  + request.selection + "', '" + request.url + "');",
                //    'active': true
            });
        } else {
            chrome.tabs.create({
                'url': 'http://worth-reading.org/chrome_extension/new?text=' + request.selection
                    + '&link=' + request.url

                //  'url': "javascript:" + fakePostCode + "; fakePost('"
                //  + request.selection + "', '" + request.url + "');"
            });

            // Development mode
            // chrome.tabs.create({
            //   'url': 'http://localhost:3000/chrome_extension/new?text=' + request.selection
            //   + '&link=' + request.url
            // });
        }
    });
});

