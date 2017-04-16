# butterscotch.add-posts

It is a plugins responsible for adding posts to the database.

## Decorators

| Name | postSubmittedContent  |
| ------------- |:-------------:|
| Description      | This method is called just before the JSON object is about to be sent to the database |
| Returns     | content |
| Parameters      | content |
| Execute in other | false |

```javascript
// To decorate this decorator
addPosts.wrap('postSubmittedContent', function (prev, content) {
    content = prev(content);
    //modify content here
    return content;
});
```
