import users from './raw/users'
import articles from './raw/articles'
import notifications from './raw/notifications'
import conversations from './raw/conversations'
import cards from './raw/cards'
import sqlite from './sqlite/sqlite'


function truncate() {

}

function createDatabase() {
    let sql = "create table if not exists data(key text, data text);";
    sqlite.transaction(tx => {
        tx.executeSql(
            sql,
            [],
            (_, success) => {
                //console.log(success);
            }, (_, error) => {
                console.log(error);
            }
        );
    });
}

let create = () => {
  // Get version
  let version = 0;
  if (version && version.length > 0)
    return;

  //truncate();
    createDatabase();
};

export default create
