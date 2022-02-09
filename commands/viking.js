module.exports = {
    name: "viking",
    description: "Survival game",

    database: 0,
    reference: 0,
    init() {
        this.reference = this.database.ref('viking');
    },

    getUser(id, callback) {
        const ref = this.database.ref('viking/users/' + id);
    
        ref.get().then((snapshot) => {
          if (snapshot.exists()) {
            return callback(snapshot.val());
          }
    
          let userData = {  };
          this.saveUser(id, userData);
          return callback(userData);
    
        }).catch((error) => {
          console.error(error);
          callback(0);
        });
    
      },
}