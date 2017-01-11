var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
            firstName: String,
            lastName: String,
            email: {
                type: String,
                index: true,
                match: /.+\@.+\..+/
            },
            username: {
                type: String,
                trim: true,
                unique: true,
                required: true
            },
            password: {
                type: String,
                validate: [
                    function(password) {
                        return password.length >= 6;
                    },
                    'Password should be longer'
                ]
            },
            role: {
                type: String,
                enum: ['Admin', 'Owner', 'User']
            },
            created: {
                type: Date,
                default: Date.now
            },
            website: {
                type: String,
                get: function(url) {
                    if (!url) {
                        return url;
                    } else {
                        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                            url = 'http://' + url;
                        }

                        return url;
                    }
                  },
                    set: function(url) {
                        if (!url) {
                            return url;
                        } else {
                            if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                                url = 'http://' + url;
                            }

                            return url;
                        }
                    }
                }
            });

        mongoose.model('User', UserSchema); UserSchema.set('toJSON', {
            getters: true,
            virtuals: true
        }); UserSchema.virtual('fullName').get(function() {
            return this.firstName + ' ' + this.lastName;
        }).set(function(fullName) {
            var splitName = fullName.split(' ');
            this.firstName = splitName[0] || '';
            this.lastName = splitName[1] || '';
        });

        UserSchema.statics.findOneByUsername = function(username, callback) {
            this.findOne({
                username: new RegExp(username, 'i')
            }, callback);
        };

        UserSchema.methods.authenticate = function(password) {
            return this.password === password;
        };
