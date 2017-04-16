'use strict'
var mymongoose = require('mymongoose')
module.exports = {
  init: function (self) {
    self.register({
      name: 'createAdminUserSchemaDefinition',
      initialValue: function () {
        const def = {}
        return def
      }
    })
    self.register({
      name: 'getAdminUserSchemaDefinition',
      initialValue: function () {
        console.log(self.modifyAdminUserSchemaDefinition({}))
        return self.modifyAdminUserSchemaDefinition({})
      }
    })
    self.register({
      name: 'modifyAdminUserSchema',
      initialValue: function (postSchema) {
        postSchema
      }
    })
    self.register({
      name: 'getAdminUserSchemaModel',
      initialValue: function () {
        return mymongoose.model('adminUser')
      }
    })
    self.register({
      name: 'createUserDataBeforeInsert',
      initialValue: function (obj) {
        const temp = {}
        return temp
      }
    })
    self.register({
      name: 'insertUser',
      initialValue: function (plainUserData) {
        var userData,
          AdminUser,
          newRecord
        userData = self.createUserDataBeforeInsert(plainUserData)
        AdminUser = self.getAdminUserSchemaModel()
        newRecord = new AdminUser(userData)
        return newRecord.save()
      }
    })
    self.register({
      name: 'deleteUser',
      initialValue: function (id) {
        var userData,
          AdminUser,
          newRecord
        AdminUser = self.getAdminUserSchemaModel()
        return AdminUser.findByIdAndRemove(id).exec()
      }
    })
    self.register({
      name: 'updateUser',
      initialValue: function (id, update) {
        var userData,
          AdminUser,
          newRecord
        AdminUser = self.getAdminUserSchemaModel()
        return AdminUser.findByIdAndUpdate(id, update).exec()
      }
    })
  },
  execute: function (config, self) {
    var pluginName,
      adminUserSchema
    pluginName = config.pluginName
    adminUserSchema = mymongoose.Schema(self.createAdminUserSchemaDefinition())
    self.modifyAdminUserSchema(adminUserSchema)
    mymongoose.model('adminUser', adminUserSchema)
    console.log(pluginName + ' | adminUser Schema created hopefully!')
  }
}
