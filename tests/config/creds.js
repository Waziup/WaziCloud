module.exports ={
  "user" : {
    "admin" : {
      "username": "admin",
      "password": process.env.ADMIN_PASS || "admin"
    },
    "normal" : {
      "username" : "waziup",
      "password" : "waziup"
    },
    "root_admin" : {
      "username": "admin",
      "password": "admin"
    }
  }
}