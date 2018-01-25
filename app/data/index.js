import conversations from './raw/conversations'
import users from './raw/users'
import articles from './raw/articles'
import vouchers from './raw/cards'

class DataProvider {

  getUser(id = 1) {
    return users[0];
  }

  getConversation(userId = 1) {
    return conversations[0];
  }

 getArticles(type = 'article') {
    return articles[0];
  }

 getCards() {
     return vouchers[0];
  }




}

export let data = new DataProvider();